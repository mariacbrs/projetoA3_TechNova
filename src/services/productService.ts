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
          title: "AppFinanças",
          description:
            "Gestão financeira pessoal e empresarial com relatórios e metas.",
          booking: "#",
        },
        {
          id: 2,
          title: "EdukaOnline",
          description:
            "Plataforma EAD com gamificação e relatórios de desempenho.",
          booking: "#",
        },
      ]);
    }, 1000); 
  });
}
