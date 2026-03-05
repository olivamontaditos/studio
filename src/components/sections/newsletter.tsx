"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
});

export default function NewsletterSection() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // This is a client-side mock submission because Server Actions are not
    // supported in a static export for GitHub Pages.
    console.log("Newsletter submission (static):", values);
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Sucesso!",
      description: "Obrigado por se inscrever!",
    });
    form.reset();
  }

  const { isSubmitting } = form.formState;

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
            onSubmit={form.handleSubmit(onSubmit)}
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
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                {isSubmitting ? "Enviando..." : "OK"}
              </Button>
            </div>
            
          </form>
        </Form>
      </div>
    </section>
  );
}
