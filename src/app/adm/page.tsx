
"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LogOut, Users, Mail, Phone, Lock, ArrowUpDown, ChevronUp, ChevronDown, Bell, Search, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

type SortField = 'submissionDate' | 'name' | 'email' | 'whatsapp' | 'rating';
type SortOrder = 'asc' | 'desc';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sortField, setSortField] = useState<SortField>('submissionDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { toast } = useToast();
  const firestore = useFirestore();
  const initialLoadTime = useRef(new Date());
  const prevLeadsCount = useRef<number | null>(null);

  const leadsQuery = useMemoFirebase(() => {
    if (!firestore || !isLoggedIn) return null;
    return query(collection(firestore, 'coming_soon_leads'), orderBy('submissionDate', 'desc'));
  }, [firestore, isLoggedIn]);

  const { data: leads, isLoading } = useCollection(leadsQuery);

  useEffect(() => {
    if (leads && isLoggedIn) {
      if (prevLeadsCount.current !== null && leads.length > prevLeadsCount.current) {
        toast({
          title: "Novo contato recebido!",
          description: "Um novo interessado acaba de preencher o formulário.",
          action: <Bell className="h-4 w-4 text-primary" />,
        });
      }
      prevLeadsCount.current = leads.length;
    }
  }, [leads, isLoggedIn, toast]);

  const filteredAndSortedLeads = useMemo(() => {
    if (!leads) return [];
    
    const filtered = leads.filter(lead => {
      const search = searchTerm.toLowerCase();
      return (
        lead.name?.toLowerCase().includes(search) ||
        lead.email?.toLowerCase().includes(search) ||
        lead.whatsapp?.toLowerCase().includes(search)
      );
    });

    return [...filtered].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'submissionDate') {
        valA = a.submissionDate?.toDate?.() || new Date(0);
        valB = b.submissionDate?.toDate?.() || new Date(0);
      } else if (sortField === 'rating') {
        valA = a.rating || 0;
        valB = b.rating || 0;
      } else {
        valA = String(valA || '').toLowerCase();
        valB = String(valB || '').toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [leads, sortField, sortOrder, searchTerm]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleRateLead = (leadId: string, newRating: number) => {
    if (!firestore) return;
    
    const leadRef = doc(firestore, 'coming_soon_leads', leadId);
    updateDoc(leadRef, { rating: newRating })
      .catch((err) => {
        const permissionError = new FirestorePermissionError({
          path: leadRef.path,
          operation: 'update',
          requestResourceData: { rating: newRating },
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === 'om' && password === '2010') {
      setIsLoggedIn(true);
      setError('');
      initialLoadTime.current = new Date();
    } else {
      setError('Credenciais inválidas.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLogin('');
    setPassword('');
    setSearchTerm('');
    prevLeadsCount.current = null;
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    return sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4 text-primary" /> : <ChevronDown className="ml-2 h-4 w-4 text-primary" />;
  };

  const StarRating = ({ rating, leadId }: { rating: number, leadId: string }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            className="focus:outline-none transition-transform hover:scale-125"
            onMouseEnter={() => setHoverRating(s)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={(e) => {
                e.stopPropagation();
                const finalRating = rating === s ? 0 : s;
                handleRateLead(leadId, finalRating);
            }}
          >
            <Star 
              className={cn(
                "h-4 w-4",
                s <= (hoverRating || rating || 0) ? "fill-accent text-accent" : "text-muted-foreground/30"
              )} 
            />
          </button>
        ))}
      </div>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-4">
        <Card className="w-full max-w-md border-primary/20 bg-card/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl text-primary">Acesso Administrativo</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">Área restrita do Oliva Montaditos</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Usuário</label>
                <Input 
                  value={login} 
                  onChange={(e) => setLogin(e.target.value)} 
                  placeholder="Usuário" 
                  className="bg-background/50 h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Senha</label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••" 
                  className="bg-background/50 h-12"
                />
              </div>
              {error && <p className="text-sm font-medium text-destructive animate-pulse text-center">{error}</p>}
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-bold shadow-lg">
                Entrar no Painel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="font-headline text-4xl font-bold text-primary">Painel de Leads</h1>
          <p className="text-muted-foreground mt-2">Qualifique os contatos para identificar os melhores clientes.</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="group gap-2 border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all">
          <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          Sair do Painel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Interessados</p>
                <p className="text-2xl font-bold text-primary">{leads?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/10 bg-card/30 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-primary/5 border-b border-primary/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Contatos Recebidos
          </CardTitle>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nome, email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 h-10"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground font-medium">Carregando dados...</p>
            </div>
          ) : filteredAndSortedLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[180px] cursor-pointer hover:bg-muted transition-colors" onClick={() => handleSort('submissionDate')}>
                      <div className="flex items-center">Data <SortIcon field="submissionDate" /></div>
                    </TableHead>
                    <TableHead className="w-[140px] cursor-pointer hover:bg-muted transition-colors" onClick={() => handleSort('rating')}>
                      <div className="flex items-center">Qualificação <SortIcon field="rating" /></div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted transition-colors" onClick={() => handleSort('name')}>
                      <div className="flex items-center">Nome <SortIcon field="name" /></div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted transition-colors" onClick={() => handleSort('email')}>
                      <div className="flex items-center">E-mail <SortIcon field="email" /></div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted transition-colors" onClick={() => handleSort('whatsapp')}>
                      <div className="flex items-center">WhatsApp <SortIcon field="whatsapp" /></div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedLeads.map((lead: any) => {
                    const submissionDate = lead.submissionDate?.toDate?.() || new Date();
                    const isNew = submissionDate > initialLoadTime.current;
                    
                    return (
                      <TableRow 
                        key={lead.id} 
                        className={cn(
                          "transition-all duration-500",
                          isNew ? "bg-primary/10 animate-pulse-slow border-l-4 border-l-primary" : "hover:bg-primary/5"
                        )}
                      >
                        <TableCell className="text-muted-foreground whitespace-nowrap text-xs">
                          {lead.submissionDate?.toDate ? 
                            format(lead.submissionDate.toDate(), "dd/MM/yy HH:mm", { locale: ptBR }) : 
                            'Agora'}
                          {isNew && <span className="ml-2 inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">Novo</span>}
                        </TableCell>
                        <TableCell>
                          <StarRating rating={lead.rating} leadId={lead.id} />
                        </TableCell>
                        <TableCell className="font-semibold text-foreground">{lead.name}</TableCell>
                        <TableCell>
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-primary hover:underline text-sm">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          {lead.whatsapp ? (
                            <a href={`https://wa.me/55${lead.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-500 hover:underline text-sm font-medium">
                              <Phone className="h-3 w-3" />
                              {lead.whatsapp}
                            </a>
                          ) : (
                            <span className="text-muted-foreground italic text-xs">Não informado</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              {searchTerm ? (
                <>
                  <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="text-xl font-headline text-muted-foreground">Nenhum resultado encontrado.</p>
                  <Button variant="link" onClick={() => setSearchTerm('')} className="mt-4 text-primary">Limpar busca</Button>
                </>
              ) : (
                <>
                  <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="text-xl font-headline text-muted-foreground">Nenhum interessado ainda.</p>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
