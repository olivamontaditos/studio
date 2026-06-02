
"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LogOut, Users, Mail, Phone, Lock, ArrowUpDown, ChevronUp, ChevronDown, Bell, Search, Star, MessageSquare, Eye, ShoppingBag, Copy, MapPin, Instagram, Youtube, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const TikTokIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

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

  // Queries
  const leadsQuery = useMemoFirebase(() => {
    if (!firestore || !isLoggedIn) return null;
    return query(collection(firestore, 'coming_soon_leads'), orderBy('submissionDate', 'desc'));
  }, [firestore, isLoggedIn]);

  const analyticsQuery = useMemoFirebase(() => {
    if (!firestore || !isLoggedIn) return null;
    return query(collection(firestore, 'analytics_events'), orderBy('timestamp', 'desc'));
  }, [firestore, isLoggedIn]);

  const { data: leads, isLoading: leadsLoading } = useCollection(leadsQuery);
  const { data: analytics } = useCollection(analyticsQuery);

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

  const analyticsStats = useMemo(() => {
    if (!analytics) return { pageViews: 0, whatsappClicks: 0, ifoodClicks: 0, addressClicks: 0, instagramClicks: 0, tiktokClicks: 0, youtubeClicks: 0 };
    return {
      pageViews: analytics.filter(e => e.type === 'page_view').length,
      whatsappClicks: analytics.filter(e => e.type === 'whatsapp_click').length,
      ifoodClicks: analytics.filter(e => e.type === 'ifood_click').length,
      addressClicks: analytics.filter(e => e.type === 'address_click').length,
      instagramClicks: analytics.filter(e => e.type === 'instagram_click').length,
      tiktokClicks: analytics.filter(e => e.type === 'tiktok_click').length,
      youtubeClicks: analytics.filter(e => e.type === 'youtube_click').length,
    };
  }, [analytics]);

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
    updateDoc(leadRef, { rating: newRating }).catch(() => {});
  };

  const handleUpdateNote = (leadId: string, notes: string) => {
    if (!firestore) return;
    const leadRef = doc(firestore, 'coming_soon_leads', leadId);
    updateDoc(leadRef, { notes }).catch(() => {});
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast({
      title: "E-mail copiado!",
      description: `O endereço ${email} foi copiado para sua área de transferência.`,
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
                handleRateLead(leadId, rating === s ? 0 : s);
            }}
          >
            <Star className={cn("h-4 w-4", s <= (hoverRating || rating || 0) ? "fill-accent text-accent" : "text-muted-foreground/30")} />
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
                <Input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Usuário" className="bg-background/50 h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Senha</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" className="bg-background/50 h-12" />
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
          <h1 className="font-headline text-4xl font-bold text-primary">Painel Oliva</h1>
          <p className="text-muted-foreground mt-2">Dados em tempo real e gestão de contatos.</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="group gap-2 border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all">
          <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          Sair do Painel
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
        <Card className="bg-primary/5 border-primary/10 p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Acessos</p><p className="text-xl font-bold text-primary">{analyticsStats.pageViews}</p></div>
          </div>
        </Card>
        <Card className="bg-green-500/5 border-green-500/10 p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <Phone className="h-5 w-5 text-green-500" />
            <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">WhatsApp</p><p className="text-xl font-bold text-green-500">{analyticsStats.whatsappClicks}</p></div>
          </div>
        </Card>
        <Card className="bg-red-500/5 border-red-500/10 p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <ShoppingBag className="h-5 w-5 text-red-500" />
            <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">iFood</p><p className="text-xl font-bold text-red-500">{analyticsStats.ifoodClicks}</p></div>
          </div>
        </Card>
        <Card className="bg-blue-500/5 border-blue-500/10 p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Endereço</p><p className="text-xl font-bold text-blue-500">{analyticsStats.addressClicks}</p></div>
          </div>
        </Card>
        <Card className="bg-pink-500/5 border-pink-500/10 p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <Instagram className="h-5 w-5 text-pink-500" />
            <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Instagram</p><p className="text-xl font-bold text-pink-500">{analyticsStats.instagramClicks}</p></div>
          </div>
        </Card>
        <Card className="bg-foreground/5 border-foreground/10 p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <TikTokIcon className="h-5 w-5 text-foreground" />
            <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">TikTok</p><p className="text-xl font-bold text-foreground">{analyticsStats.tiktokClicks}</p></div>
          </div>
        </Card>
        <Card className="bg-red-600/5 border-red-600/10 p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <Youtube className="h-5 w-5 text-red-600" />
            <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">YouTube</p><p className="text-xl font-bold text-red-600">{analyticsStats.youtubeClicks}</p></div>
          </div>
        </Card>
        <Card className="bg-accent/5 border-accent/10 p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Leads</p><p className="text-xl font-bold text-accent">{filteredAndSortedLeads.length}</p></div>
          </div>
        </Card>
      </div>

      <Card className="border-primary/10 bg-card/30 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-primary/5 border-b border-primary/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-xl flex items-center gap-2"><Mail className="h-5 w-5 text-primary" />Contatos Detalhados</CardTitle>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Buscar por nome, email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-background/50 h-10" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {leadsLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4"><div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /><p className="text-muted-foreground font-medium">Carregando...</p></div>
          ) : filteredAndSortedLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[140px] cursor-pointer" onClick={() => handleSort('submissionDate')}>Data <SortIcon field="submissionDate" /></TableHead>
                    <TableHead className="w-[120px] cursor-pointer" onClick={() => handleSort('rating')}>Status <SortIcon field="rating" /></TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>Nome <SortIcon field="name" /></TableHead>
                    <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort('email')}>E-mail <SortIcon field="email" /></TableHead>
                    <TableHead className="w-[150px] cursor-pointer" onClick={() => handleSort('whatsapp')}>WhatsApp <SortIcon field="whatsapp" /></TableHead>
                    <TableHead className="w-[250px]"><div className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" />Notas</div></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedLeads.map((lead: any) => {
                    const submissionDate = lead.submissionDate?.toDate?.() || new Date();
                    const isNew = submissionDate > initialLoadTime.current;
                    return (
                      <TableRow key={lead.id} className={cn("transition-all", isNew ? "bg-primary/10 animate-pulse-slow border-l-4 border-l-primary" : "hover:bg-primary/5")}>
                        <TableCell className="text-muted-foreground text-xs">{lead.submissionDate?.toDate ? format(lead.submissionDate.toDate(), "dd/MM/yy HH:mm", { locale: ptBR }) : 'Agora'}</TableCell>
                        <TableCell><StarRating rating={lead.rating} leadId={lead.id} /></TableCell>
                        <TableCell className="font-semibold text-foreground">{lead.name}</TableCell>
                        <TableCell>
                          <button 
                            onClick={() => handleCopyEmail(lead.email)}
                            className="text-primary hover:underline text-xs flex items-center gap-2 group/email text-left transition-all"
                            title="Clique para copiar e-mail"
                          >
                            <span className="truncate max-w-[160px]">{lead.email}</span>
                            <Copy className="h-3 w-3 opacity-0 group-hover/email:opacity-100 transition-opacity" />
                          </button>
                        </TableCell>
                        <TableCell>{lead.whatsapp ? <a href={`https://wa.me/55${lead.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline text-xs font-medium flex items-center gap-1"><Phone className="h-3 w-3"/>{lead.whatsapp}</a> : '-'}</TableCell>
                        <TableCell><Input defaultValue={lead.notes || ''} placeholder="Nota..." className="bg-transparent border-none text-xs h-8" onBlur={(e) => handleUpdateNote(lead.id, e.target.value)} /></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center"><Users className="h-12 w-12 text-muted-foreground/30 mb-4" /><p className="text-xl font-headline text-muted-foreground">Nenhum resultado.</p></div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
