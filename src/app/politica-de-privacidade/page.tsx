"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function PrivacyPolicyPage() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString("pt-BR"));
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-20">
        <h1 className="font-headline text-4xl font-bold text-primary">Política de Privacidade</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          <p>Última atualização: {date}</p>
          
          <p>
            A sua privacidade é importante para nós. É política do OLIVA MONTADITOS respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site OLIVA MONTADITOS, e outros sites que possuímos e operamos.
          </p>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
          </p>
          <p>
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
          </p>
          <p>
            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
          </p>
          <p>
            O nosso site pode ter links para sites externos que не são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
          </p>
          <p>
            Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
          </p>
          <p>
            O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
          </p>

          <h2>Publicidade e Cookies</h2>
          <p>O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.</p>
          <p>Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.</p>
          <p>Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.</p>
          <p>Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.</p>

          <h2>Compromisso do Usuário</h2>
          <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o OLIVA MONTADITOS oferece no site e com caráter enunciativo, mas não limitativo:</p>
          <ol>
              <li>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</li>
              <li>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, de sites de apostas ou de azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
              <li>C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do OLIVA MONTADITOS, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</li>
          </ol>

          <h2>Mais informações</h2>
          <p>
            Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
