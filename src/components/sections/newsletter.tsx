
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Star } from "lucide-react";

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
import { cn } from "@/lib/utils";

const formSchema = z.object({
    name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
    email: z.string().email({ message: "Por favor, insira um email válido." }),
    whatsapp: z.string()
      .refine(val => !val || /^\d{10,11}$/.test(val), {
          message: "O WhatsApp deve ter 10 ou 11 dígitos numéricos (DDD + número).",
      })
      .optional(),
    rating: z.number().min(1).max(5).default(5),
});

export default function NewsletterSection() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [hoverRating, setHoverRating] = useState(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      rating: 5,
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
          description: "Obrigado! Recebemos sua classificação e seus dados.",
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
    <section className="bg-secondary py-20 md:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
          Sua Opinião é Importante
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Como você avalia sua expectativa para nossas novidades? Deixe sua nota e seus dados para um presente especial.
        </p>

        <div className="mt-8 mx-auto max-w-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-medium">Sua nota:</FormLabel>
                      <FormControl>
                        <div className="flex justify-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="focus:outline-none transition-transform hover:scale-125"
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => field.onChange(star)}
                            >
                              <Star
                                className={cn(
                                  "h-8 w-8 transition-colors",
                                  (hoverRating || field.value) >= star
                                    ? "fill-accent text-accent"
                                    : "text-muted-foreground"
                                )}
                              />
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Seu melhor e-mail" {...field} className="bg-background" />
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
                  {isSubmitting ? "Enviando..." : "Enviar Avaliação & Cadastrar"}
                </Button>
              </form>
            </Form>
        </div>
      </div>
    </section>
  );
}
