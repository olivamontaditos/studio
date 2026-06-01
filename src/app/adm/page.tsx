"use client";

import { useState } from 'react';
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { LogOut, Users, Mail, Phone, Lock } from 'lucide-react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const firestore = useFirestore();

  // Memoize a query para evitar re-renders infinitos
  const leadsQuery = useMemoFirebase(() => {
    if (!firestore || !isLoggedIn) return null;
    return query(collection(firestore, 'coming_soon_leads'), orderBy('submissionDate', 'desc'));
  }, [firestore, isLoggedIn]);

  const { data: leads, isLoading } = useCollection(leadsQuery);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === 'om' && password === '2010') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLogin('');
    setPassword('');
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
          <h1 className="font-headline text-4xl font-bold text-primary">Painel de Interessados</h1>
          <p className="text-muted-foreground mt-2">Acompanhe as pessoas que entraram em contato através do site.</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total de Leads</p>
                <p className="text-2xl font-bold text-primary">{leads?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/10 bg-card/30 backdrop-blur-sm overflow-hidden">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-xl flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Contatos Recebidos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground font-medium">Carregando dados...</p>
            </div>
          ) : leads && leads.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[180px]">Data e Hora</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>WhatsApp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead: any) => (
                    <TableRow key={lead.id} className="hover:bg-primary/5 transition-colors">
                      <TableCell className="text-muted-foreground whitespace-nowrap text-xs">
                        {lead.submissionDate?.toDate ? 
                          format(lead.submissionDate.toDate(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR }) : 
                          'Agora'}
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
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-xl font-headline text-muted-foreground">Nenhum interessado ainda.</p>
              <p className="text-sm text-muted-foreground/60 max-w-xs mt-2">Os leads aparecerão aqui assim que preencherem o formulário no site.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
