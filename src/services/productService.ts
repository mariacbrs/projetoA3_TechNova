export type Product = {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly booking: string;
};

export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Preenchimento",
          description:
            "Lábios, olheiras, mandíbula e muito mais.",
          booking: "#",
        },
        {
          id: 2,
          title: "Peeling Retinóico",
          description:
            "Dê adeus para a acne, linhas finas e hiperpigmentação.",
          booking: "#",
        },
        {
          id: 3,
          title: "Lavieen",
          description:
            "Rejuvenescimento e revitalização da pele com tecnologia avançada.",
          booking: "#",
        },
        {
          id: 4,
          title: "Máscara de Ouro",
          description:
            "Hidratação e renovação da textura da pele.",
          booking: "#",
        },
        {
          id: 5,
          title: "Microagulhamento",
          description:
            "Rejuvenescimento, amenização de manchas e cicatrizes.",
          booking: "#",
        },
        {
          id: 6,
          title: "Ultraformer III",
          description:
            "Efeito lifting e rejuvenescimento sem cirurgia.",
          booking: "#",
        },
      ]);
    }, 1000); 
  });
}
