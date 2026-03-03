"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

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
import { subscribeToNewsletter, type SubscribeState } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? "Enviando..." : "OK"}
    </Button>
  );
}

export default function NewsletterSection() {
  const [state, formAction] = useFormState<SubscribeState, FormData>(subscribeToNewsletter, { message: null, status: null });
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Sucesso!",
        description: state.message,
      });
      form.reset();
    } else if (state.status === 'error') {
      toast({
        title: "Erro",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, form]);

  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
          Receba Nossas Novidades
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Assine para receber novidades, novos pratos, promoções e eventos.
        </p>

        <Form {...form}>
          <form
            action={formAction}
            className="mt-8 mx-auto max-w-lg"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="sr-only">E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SubmitButton />
            </div>
            
          </form>
        </Form>
      </div>
    </section>
  );
}
