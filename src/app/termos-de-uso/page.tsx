import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function TermsOfUsePage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-6 py-20">
        <h1 className="font-headline text-4xl font-bold text-primary">Termos de Uso</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2>1. Termos</h2>
          <p>
            Ao acessar ao site OLIVA MONTADITOS, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
          </p>

          <h2>2. Uso de Licença</h2>
          <p>
            É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site OLIVA MONTADITOS, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, не uma transferência de título e, sob esta licença, você não pode:
          </p>
          <ol>
            <li>modificar ou copiar os materiais;</li>
            <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
            <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site OLIVA MONTADITOS;</li>
            <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
            <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
          </ol>
          <p>
            Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por OLIVA MONTADITOS a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.
          </p>

          <h2>3. Limitações</h2>
          <p>
            Em nenhum caso o OLIVA MONTADITOS ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em OLIVA MONTADITOS, mesmo que OLIVA MONTADITOS ou um representante autorizado da OLIVA MONTADITOS tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos consequentes ou incidentais, essas limitações могут não se aplicar a você.
          </p>

        </div>
      </main>
      <Footer />
    </>
  );
}
