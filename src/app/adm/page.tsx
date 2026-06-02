
"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, writeBatch, getDocs, Timestamp, where } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { format, startOfDay, subDays, isSameDay, subMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LogOut, Users, Mail, Phone, Lock, ArrowUpDown, ChevronUp, ChevronDown, Bell, Search, Star, MessageSquare, Eye, ShoppingBag, Copy, MapPin, Instagram, Youtube, Download, CalendarCheck, Check, Trash2, Calendar as CalendarIcon, RefreshCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ADM_AUTH_KEY = "oliva_adm_session";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  
  const { toast } = useToast();
  const firestore = useFirestore();
  const initialLoadTime = useRef(new Date());
  const prevLeadsCount = useRef<number | null>(null);
  const clickTimerRef = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  const urls = {
    whatsapp: "https://wa.me/5541988483621",
    ifood: "https://www.ifood.com.br/delivery/curitiba-pr/oliva-montaditos-bom-retiro/2b88f26f-a586-4600-ab74-19d3852d4ddd?UTM_Medium=share",
    instagram: "https://www.instagram.com/olivamontaditos/",
    tiktok: "https://www.tiktok.com/@olivamontaditos",
    youtube: "https://www.youtube.com/@OlivaMontaditos",
    maps: "https://share.google/fnyW3LtaK1bazQDRv",
    review: "https://www.google.com/maps/place/Oliva+Montaditos/@-25.4017127,-49.2859022,1027m/data=!3m2!1e3!4b1!4m6!3m5!1s0x94dce7b94e3b9a4d:0xced8f0805bee5fe5!8m2!3d-25.4017127!4d-49.2833273!16s%2Fg%2F11n9htw6j1?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
  };

  useEffect(() => {
    const session = localStorage.getItem(ADM_AUTH_KEY);
    if (session === "active") {
      setIsLoggedIn(true);
      initialLoadTime.current = new Date();
      console.log("Oliva ADM: Sessão administrativa restaurada.");
    }
  }, []);

  const leadsQuery = useMemoFirebase(() => {
    if (!firestore || !isLoggedIn) return null;
    return query(collection(firestore, 'coming_soon_leads'), orderBy('submissionDate', 'desc'));
  }, [firestore, isLoggedIn]);

  const analyticsQuery = useMemoFirebase(() => {
    if (!firestore || !isLoggedIn) return null;
    return query(collection(firestore, 'analytics_events'), orderBy('timestamp', 'desc'));
  }, [firestore, isLoggedIn]);

  const activeUsersQuery = useMemoFirebase(() => {
    if (!firestore || !isLoggedIn) return null;
    const sixtySecondsAgo = subMinutes(new Date(), 1);
    return query(collection(firestore, 'presence'), where('lastSeen', '>=', sixtySecondsAgo));
  }, [firestore, isLoggedIn]);

  const { data: leads, isLoading: leadsLoading } = useCollection(leadsQuery);
  const { data: analytics } = useCollection(analyticsQuery);
  const { data: activeSessions } = useCollection(activeUsersQuery);

  const activeUsersCount = activeSessions?.length || 0;

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
    if (!analytics) return { pageViews: 0, whatsappClicks: 0, ifoodClicks: 0, addressClicks: 0, instagramClicks: 0, tiktokClicks: 0, youtubeClicks: 0, reviewClicks: 0, eventsClicks: 0 };
    return {
      pageViews: analytics.filter(e => e.type === 'page_view').length,
      whatsappClicks: analytics.filter(e => e.type === 'whatsapp_click').length,
      ifoodClicks: analytics.filter(e => e.type === 'ifood_click').length,
      addressClicks: analytics.filter(e => e.type === 'address_click').length,
      instagramClicks: analytics.filter(e => e.type === 'instagram_click').length,
      tiktokClicks: analytics.filter(e => e.type === 'tiktok_click').length,
      youtubeClicks: analytics.filter(e => e.type === 'youtube_click').length,
      reviewClicks: analytics.filter(e => e.type === 'review_click').length,
      eventsClicks: analytics.filter(e => e.type === 'events_click').length,
    };
  }, [analytics]);

  const dailyStats = useMemo(() => {
    if (!analytics) return [];
    const last30Days = Array.from({ length: 30 }, (_, i) => subDays(new Date(), i)).reverse();
    
    return last30Days.map(date => {
      const dayStart = startOfDay(date);
      const views = analytics.filter(e => {
        if (!e.timestamp?.toDate) return false;
        return e.type === 'page_view' && isSameDay(e.timestamp.toDate(), dayStart);
      }).length;
      
      return {
        date: format(dayStart, "dd/MM"),
        views: views
      };
    });
  }, [analytics]);

  const filteredAndSortedLeads = useMemo(() => {
    if (!leads) return [];
    
    const filtered = leads.filter(lead => {
      const search = searchTerm.toLowerCase();
      const matchesSearch = (
        lead.name?.toLowerCase().includes(search) ||
        lead.email?.toLowerCase().includes(search) ||
        lead.whatsapp?.toLowerCase().includes(search)
      );
      
      const matchesDate = !selectedDate || (lead.submissionDate?.toDate && isSameDay(lead.submissionDate.toDate(), selectedDate));
      
      return matchesSearch && matchesDate;
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
  }, [leads, sortField, sortOrder, searchTerm, selectedDate]);

  const handleResetAnalytics = async () => {
    if (!firestore) return;
    setIsResetDialogOpen(false);
    
    try {
      console.log("Oliva ADM: Iniciando limpeza de métricas...");
      const batch = writeBatch(firestore);
      
      const analyticsSnap = await getDocs(collection(firestore, 'analytics_events'));
      analyticsSnap.forEach(doc => batch.delete(doc.ref));
      
      const presenceSnap = await getDocs(collection(firestore, 'presence'));
      presenceSnap.forEach(doc => batch.delete(doc.ref));

      await batch.commit();
      console.log("Oliva ADM: Métricas zeradas com sucesso.");
      
      toast({
        title: "Métricas zeradas!",
        description: "Todo o histórico de interações e presença foi removido.",
      });
    } catch (e) {
      console.error("Oliva ADM: Erro ao resetar dados", e);
      toast({
        variant: "destructive",
        title: "Erro ao resetar",
        description: "Não foi possível limpar os dados.",
      });
    }
  };

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

  const handleMetricAction = (url: string, label: string) => {
    if (clickTimerRef.current[label]) {
      clearTimeout(clickTimerRef.current[label]!);
      clickTimerRef.current[label] = null;
      navigator.clipboard.writeText(url);
      window.open(url, '_blank');
      toast({
        title: "Link Aberto e Copiado!",
        description: `O link do ${label} foi copiado e aberto em uma nova aba.`,
        action: <Check className="h-4 w-4 text-green-500" />
      });
    } else {
      clickTimerRef.current[label] = setTimeout(() => {
        clickTimerRef.current[label] = null;
        navigator.clipboard.writeText(url);
        toast({
          title: "Link Copiado!",
          description: `O link do ${label} foi copiado. Clique duas vezes para abrir.`,
          action: <Check className="h-4 w-4 text-blue-500" />
        });
      }, 300);
    }
  };

  const handleExportCSV = () => {
    if (filteredAndSortedLeads.length === 0) return;

    const headers = ['Data', 'Status (Estrelas)', 'Nome', 'E-mail', 'WhatsApp', 'Notas'];
    const rows = filteredAndSortedLeads.map(lead => {
      const date = lead.submissionDate?.toDate ? format(lead.submissionDate.toDate(), "dd/MM/yyyy HH:mm") : '-';
      return [
        date,
        lead.rating || 0,
        lead.name || '',
        lead.email || '',
        lead.whatsapp || '',
        `"${(lead.notes || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_oliva_${format(new Date(), 'dd-MM-yyyy')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === 'om' && password === '2010') {
      setIsLoggedIn(true);
      setError('');
      localStorage.setItem(ADM_AUTH_KEY, "active");
      initialLoadTime.current = new Date();
      console.log("Oliva ADM: Login administrativo bem-sucedido.");
    } else {
      console.warn("Oliva ADM: Tentativa de login falhou.");
      setError('Credenciais inválidas.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(ADM_AUTH_KEY);
    console.log("Oliva ADM: Logout realizado.");
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
    return sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4 text-primary" /> : <ChevronDown className="ml-2 h-4 w-4 text-primary" />;
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
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-headline text-4xl font-bold text-primary">Painel Oliva</h1>
            <p className="text-muted-foreground mt-2">Gestão estratégica e dados em tempo real.</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">
              {activeUsersCount} Online agora
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 text-destructive border-destructive/20 hover:bg-destructive hover:text-white">
                <Trash2 className="h-4 w-4" />
                Zerar Métricas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tem certeza absoluta?</DialogTitle>
                <DialogDescription>
                  Esta ação irá deletar permanentemente todos os registros de acessos, cliques e histórico de presença. Os contatos (leads) não serão afetados.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>Cancelar</Button>
                <Button variant="destructive" onClick={handleResetAnalytics} className="gap-2">
                  <RefreshCcw className="h-4 w-4" /> Sim, zerar tudo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleLogout} className="group gap-2 border-destructive/20 text-destructive hover:bg-destructive hover:text-white">
            <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            Sair
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4 mb-10">
        <Dialog>
          <DialogTrigger asChild>
            <Card className="bg-primary/5 border-primary/10 p-4 cursor-pointer hover:bg-primary/10 transition-colors group">
              <div className="flex flex-col items-center text-center gap-2 relative">
                <Eye className="h-5 w-5 text-primary" />
                <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Acessos</p><p className="text-xl font-bold text-primary">{analyticsStats.pageViews}</p></div>
                <ChevronUp className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Estatísticas de Acesso</DialogTitle>
              <DialogDescription>Visualização diária dos últimos 30 dias.</DialogDescription>
            </DialogHeader>
            <div className="h-[350px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DialogContent>
        </Dialog>

        <Card className="bg-accent/5 border-accent/10 p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Leads</p><p className="text-xl font-bold text-accent">{leads?.length || 0}</p></div>
          </div>
        </Card>
        
        <div onClick={() => handleMetricAction(urls.whatsapp, "WhatsApp")} className="block cursor-pointer select-none">
          <Card className="bg-green-500/5 border-green-500/10 p-4 hover:bg-green-500/10 h-full group">
            <div className="flex flex-col items-center text-center gap-2 relative">
              <Phone className="h-5 w-5 text-green-500" />
              <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">WhatsApp</p><p className="text-xl font-bold text-green-500">{analyticsStats.whatsappClicks}</p></div>
              <Copy className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div onClick={() => handleMetricAction(urls.ifood, "iFood")} className="block cursor-pointer select-none">
          <Card className="bg-red-500/5 border-red-500/10 p-4 hover:bg-red-500/10 h-full group">
            <div className="flex flex-col items-center text-center gap-2 relative">
              <ShoppingBag className="h-5 w-5 text-red-500" />
              <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">iFood</p><p className="text-xl font-bold text-red-500">{analyticsStats.ifoodClicks}</p></div>
              <Copy className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div onClick={() => handleMetricAction(urls.review, "Avaliação")} className="block cursor-pointer select-none">
          <Card className="bg-accent/5 border-accent/10 p-4 hover:bg-accent/10 h-full group">
            <div className="flex flex-col items-center text-center gap-2 relative">
              <Star className="h-5 w-5 text-accent" />
              <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Avaliação</p><p className="text-xl font-bold text-accent">{analyticsStats.reviewClicks}</p></div>
              <Copy className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div onClick={() => handleMetricAction(urls.maps, "Endereço")} className="block cursor-pointer select-none">
          <Card className="bg-blue-500/5 border-blue-500/10 p-4 hover:bg-blue-500/10 h-full group">
            <div className="flex flex-col items-center text-center gap-2 relative">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Endereço</p><p className="text-xl font-bold text-blue-500">{analyticsStats.addressClicks}</p></div>
              <Copy className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div onClick={() => handleMetricAction(urls.instagram, "Instagram")} className="block cursor-pointer select-none">
          <Card className="bg-pink-500/5 border-pink-500/10 p-4 hover:bg-pink-500/10 h-full group">
            <div className="flex flex-col items-center text-center gap-2 relative">
              <Instagram className="h-5 w-5 text-pink-500" />
              <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Instagram</p><p className="text-xl font-bold text-pink-500">{analyticsStats.instagramClicks}</p></div>
              <Copy className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div onClick={() => handleMetricAction(urls.tiktok, "TikTok")} className="block cursor-pointer select-none">
          <Card className="bg-foreground/5 border-foreground/10 p-4 hover:bg-foreground/10 h-full group">
            <div className="flex flex-col items-center text-center gap-2 relative">
              <TikTokIcon className="h-5 w-5 text-foreground" />
              <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">TikTok</p><p className="text-xl font-bold text-foreground">{analyticsStats.tiktokClicks}</p></div>
              <Copy className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div onClick={() => handleMetricAction(urls.youtube, "YouTube")} className="block cursor-pointer select-none">
          <Card className="bg-red-600/5 border-red-600/10 p-4 hover:bg-red-600/10 h-full group">
            <div className="flex flex-col items-center text-center gap-2 relative">
              <Youtube className="h-5 w-5 text-red-600" />
              <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">YouTube</p><p className="text-xl font-bold text-red-600">{analyticsStats.youtubeClicks}</p></div>
              <Copy className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div onClick={() => handleMetricAction(urls.whatsapp, "Eventos")} className="block cursor-pointer select-none">
          <Card className="bg-orange-500/5 border-orange-500/10 p-4 hover:bg-orange-500/10 h-full group">
            <div className="flex flex-col items-center text-center gap-2 relative">
              <CalendarCheck className="h-5 w-5 text-orange-500" />
              <div><p className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Eventos</p><p className="text-xl font-bold text-orange-500">{analyticsStats.eventsClicks}</p></div>
              <Copy className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            </div>
          </Card>
        </div>
      </div>

      <Card className="border-primary/10 bg-card/30 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-primary/5 border-b border-primary/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <CardTitle className="text-xl flex items-center gap-2"><Mail className="h-5 w-5 text-primary" />Contatos Detalhados</CardTitle>
            <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={filteredAndSortedLeads.length === 0} className="gap-2 text-xs md:text-sm">
              <Download className="h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full md:w-[240px] justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : <span>Filtrar por data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus locale={ptBR} />
                {selectedDate && (
                  <div className="p-3 border-t">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedDate(undefined)} className="w-full text-xs">Limpar Filtro</Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar por nome, email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-background/50 h-10" />
            </div>
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
                        <TableCell>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <button
                                key={s}
                                type="button"
                                className="focus:outline-none transition-transform hover:scale-125"
                                onClick={() => handleRateLead(lead.id, lead.rating === s ? 0 : s)}
                              >
                                <Star className={cn("h-4 w-4", s <= (lead.rating || 0) ? "fill-accent text-accent" : "text-muted-foreground/30")} />
                              </button>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-foreground">{lead.name}</TableCell>
                        <TableCell>
                          <button onClick={() => { navigator.clipboard.writeText(lead.email); toast({ title: "E-mail copiado!" }); }} className="text-primary hover:underline text-xs flex items-center gap-2 group/email text-left transition-all">
                            <span className="truncate max-w-[160px]">{lead.email}</span>
                            <Copy className="h-3 w-3 opacity-0 group-hover/email:opacity-100" />
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
