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
        {
          id: 3,
          title: "LogiTrack",
          description:
            "Monitoramento logístico em tempo real com mapas interativos.",
          booking: "#",
        },
        {
          id: 4,
          title: "HealthSync",
          description:
            "Integração de prontuários eletrônicos com atendimento remoto.",
          booking: "#",
        },
        {
          id: 5,
          title: "MarketBoost",
          description: "Ferramentas de automação de marketing digital e CRM.",
          booking: "#",
        },
        {
          id: 6,
          title: "SafeAccess",
          description:
            "Controle de acesso físico e digital com autenticação biométrica.",
          booking: "#",
        },
        {
          id: 7,
          title: "AgroData",
          description:
            "Análise de dados agrícolas com previsões climáticas integradas.",
          booking: "#",
        },
        {
          id: 8,
          title: "BuildPlan",
          description: "Gestão de obras e planejamento com dashboard visual.",
          booking: "#",
        },
        {
          id: 9,
          title: "RetailMax",
          description: "ERP para varejo com controle de estoque e vendas.",
          booking: "#",
        },
        {
          id: 10,
          title: "EcoMonitor",
          description:
            "Soluções ambientais para monitoramento de emissões e resíduos.",
          booking: "#",
        },
      ]);
    }, 1000); 
  });
}
