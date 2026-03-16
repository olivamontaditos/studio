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
    };

    return addDoc(leadsCollection, dataToSave)
      .then(() => {
        toast({
          title: "Sucesso!",
          description: "Obrigado! Entraremos em contato em breve.",
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

        // Re-throw to let react-hook-form know the submission failed.
        throw e;
      });
  }

  const { isSubmitting } = form.formState;

  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
          Receba Nossas Novidades
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Deixe seus dados para receber novidades e um presente de inauguração.
        </p>

        <div className="mt-8 mx-auto max-w-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Seu melhor e-mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {isSubmitting ? "Enviando..." : "Quero Novidades"}
                </Button>
              </form>
            </Form>
        </div>
      </div>
    </section>
  );
}
