export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: 'Como funciona a compra pelo WhatsApp?',
    answer:
      'Você monta seu carrinho normalmente no site. Ao finalizar, geramos uma mensagem com seu pedido e abrimos o WhatsApp para você enviar ao nosso atendimento. Lá combinamos pagamento e frete.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'Trabalhamos com PIX, transferência bancária e criptomoedas. O atendente passa os detalhes assim que receber seu pedido.',
  },
  {
    question: 'Como é feito o envio?',
    answer:
      'Enviamos para todo o Brasil via embalagem discreta. O prazo é informado no fechamento do pedido, junto do código de rastreio quando disponível.',
  },
  {
    question: 'Qual a diferença entre sementes feminizadas e autoflorescentes?',
    answer:
      'Feminizadas produzem apenas plantas fêmeas, com ciclo dependente de fotoperíodo. Autoflorescentes florescem automaticamente após algumas semanas, sem depender de luz, e têm ciclo mais curto.',
  },
  {
    question: 'Vocês garantem a germinação?',
    answer:
      'Sim. Trabalhamos com bancos selecionados e fazemos controle de qualidade. Em caso de problema, basta entrar em contato via WhatsApp.',
  },
  {
    question: 'Posso comprar no atacado?',
    answer:
      'Sim, temos categoria específica de atacado e condições especiais para growshops e cultivadores comerciais. Fale conosco para cotações personalizadas.',
  },
  {
    question: 'A embalagem é discreta?',
    answer:
      'Total discrição. As sementes são embaladas de forma segura e sem identificação externa do conteúdo.',
  },
];
