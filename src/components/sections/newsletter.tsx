
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const formSchema = z.object({
    name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
    email: z.string().email({ message: "Por favor, insira um email válido." }),
    whatsapp: z.string()
      .refine(val => !val || /^\d{10,11}$/.test(val), {
          message: "O WhatsApp deve ter 10 ou 11 dígitos numéricos (DDD + número).",
      })
      .optional(),
    birthDate: z.string().optional(),
});

export default function NewsletterSection() {
  const { toast } = useToast();
  const firestore = useFirestore();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      birthDate: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) {
      toast({
        variant: "destructive",
        title: "Erro de Conexão",
        description: "Não foi possível conectar ao banco de dados. Tente novamente mais tarde.",
      });
      return;
    }

    const leadsCollection = collection(firestore, 'coming_soon_leads');
    const dataToSave = {
      ...values,
      submissionDate: serverTimestamp(),
      rating: 0, 
    };

    return addDoc(leadsCollection, dataToSave)
      .then(() => {
        toast({
          title: "Sucesso!",
          description: "Obrigado! Seus dados foram cadastrados com sucesso.",
        });
        form.reset();
      })
      .catch((e) => {
        const permissionError = new FirestorePermissionError({
            path: leadsCollection.path,
            operation: 'create',
            requestResourceData: dataToSave,
        });
        errorEmitter.emit('permission-error', permissionError);
        
        toast({
          variant: "destructive",
          title: "Uh oh! Algo deu errado.",
          description: "Não foi possível concluir seu cadastro. Tente novamente.",
        });

        throw e;
      });
  }

  const { isSubmitting } = form.formState;

  return (
    <section id="cadastro" className="bg-secondary py-20 md:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
          Fique por dentro das novidades
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Cadastre-se para receber convites exclusivos para nossos eventos e atualizações do cardápio.
        </p>

        <div className="mt-8 mx-auto max-w-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Seu e-mail" {...field} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">Data de Nascimento</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className="bg-background" title="Data de Nascimento" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">WhatsApp (Opcional)</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            maxLength={11}
                            placeholder="Seu WhatsApp (Opcional)"
                            {...field}
                            className="bg-background"
                            onChange={(e) => {
                              const { value } = e.target;
                              if (/^\d*$/.test(value)) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-lg font-bold">
                  {isSubmitting ? "Enviando..." : "Quero receber novidades"}
                </Button>
              </form>
            </Form>
        </div>
      </div>
    </section>
  );
}
