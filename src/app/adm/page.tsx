
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
import { LogOut, Users, Mail, Phone, Lock, ArrowUpDown, ChevronUp, ChevronDown, Bell, Search, Star, TrendingUp, Filter, MessageSquare, MousePointerClick, Eye, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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

  const stats = useMemo(() => {
    if (!leads) return { total: 0, qualified: 0, pending: 0, chartData: [] };
    
    const total = leads.length;
    const qualified = leads.filter(l => (l.rating || 0) >= 4).length;
    const pending = leads.filter(l => (l.rating || 0) === 0).length;

    const dailyCounts: { [key: string]: number } = {};
    leads.forEach(lead => {
      const date = lead.submissionDate?.toDate ? format(lead.submissionDate.toDate(), 'dd/MM') : format(new Date(), 'dd/MM');
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    const chartData = Object.entries(dailyCounts)
      .map(([date, count]) => ({ date, count }))
      .reverse()
      .slice(-7);

    return { total, qualified, pending, chartData };
  }, [leads]);

  const analyticsStats = useMemo(() => {
    if (!analytics) return { pageViews: 0, whatsappClicks: 0, ifoodClicks: 0 };
    return {
      pageViews: analytics.filter(e => e.type === 'page_view').length,
      whatsappClicks: analytics.filter(e => e.type === 'whatsapp_click').length,
      ifoodClicks: analytics.filter(e => e.type === 'ifood_click').length,
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full"><Eye className="h-6 w-6 text-primary" /></div>
              <div><p className="text-sm font-medium text-muted-foreground">Total de Acessos</p><p className="text-2xl font-bold text-primary">{analyticsStats.pageViews}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/5 border-green-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-full"><Phone className="h-6 w-6 text-green-500" /></div>
              <div><p className="text-sm font-medium text-muted-foreground">Cliques WhatsApp</p><p className="text-2xl font-bold text-green-500">{analyticsStats.whatsappClicks}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-500/5 border-red-500/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-full"><ShoppingBag className="h-6 w-6 text-red-500" /></div>
              <div><p className="text-sm font-medium text-muted-foreground">Cliques iFood</p><p className="text-2xl font-bold text-red-500">{analyticsStats.ifoodClicks}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-accent/5 border-accent/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-full"><Users className="h-6 w-6 text-accent" /></div>
              <div><p className="text-sm font-medium text-muted-foreground">Leads Capturados</p><p className="text-2xl font-bold text-accent">{stats.total}</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <Card className="lg:col-span-2 border-primary/10 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" />Volume de Captura</CardTitle>
            <CardDescription>Volume de novos contatos nos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData}>
                <defs><linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/><stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}} />
                <YAxis hide />
                <Tooltip contentStyle={{backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))'}} />
                <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorCount)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-primary/10 bg-card/50">
          <CardHeader><CardTitle className="text-lg">Resumo de Qualidade</CardTitle><CardDescription>Leads por classificação</CardDescription></CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex justify-between items-center"><span className="text-sm">🔥 Quentes (4-5★)</span><span className="font-bold text-accent">{stats.qualified}</span></div>
            <div className="flex justify-between items-center"><span className="text-sm">⏳ Pendentes</span><span className="font-bold">{stats.pending}</span></div>
            <div className="pt-4 border-t border-border/50"><p className="text-xs text-muted-foreground text-center">Classifique os leads na tabela abaixo para organizar sua estratégia.</p></div>
          </CardContent>
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
                        <TableCell><a href={`mailto:${lead.email}`} className="text-primary hover:underline text-xs block truncate max-w-[180px]">{lead.email}</a></TableCell>
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
