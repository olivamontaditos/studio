"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function CookiePolicyPage() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString("pt-BR"));
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-20">
        <h1 className="font-headline text-4xl font-bold text-primary">Política de Cookies</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          <p>Última atualização: {date}</p>
          
          <h2>O que são cookies?</h2>
          <p>
            Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou 'quebrar' certos elementos da funcionalidade do site.
          </p>

          <h2>Como usamos os cookies?</h2>
          <p>
            Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão da indústria para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles, caso sejam usados para fornecer um serviço que você usa.
          </p>

          <h2>Desativar cookies</h2>
          <p>
            Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do seu navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto, é recomendável que você não desative os cookies.
          </p>

          <h2>Mais informações</h2>
          <p>
            Esperamos que isso tenha esclarecido as coisas para você. Como mencionado anteriormente, se houver algo que você не tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
