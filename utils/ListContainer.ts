type ListContainerType = {
  id: number;
  container: string;
};
type CategoryContainerType = {
  category: string;
  container: ListContainerType[];
};

export const ListContainer: CategoryContainerType[] = [
  {
    category: "DEPOSITO ELEVADO",
    container: [
      {
        id: 1,
        container: "Ligado a rede",
      },
      {
        id: 2,
        container: "Não ligado a rede",
      },
    ],
  },
  {
    category: "DEPOSITO NÃO ELEVADO",
    container: [
      {
        id: 3,
        container: "Ligado a rede",
      },
      {
        id: 4,
        container: "Não ligado a rede",
      },
    ],
  },
  {
    category: "MÓVEIS",
    container: [
      {
        id: 5,
        container: "Vasos de planta na água",
      },
      {
        id: 6,
        container: "Vasos de planta",
      },
      {
        id: 7,
        container: "Prato/Pingadeira",
      },
      {
        id: 8,
        container: "Consumo animal",
      },
      {
        id: 9,
        container: "Deposito para construção",
      },
      {
        id: 10,
        container: "Depósito de horticultura",
      },
      {
        id: 11,
        container: "Piscina desmontavel",
      },
      {
        id: 12,
        container: "Lata, frascos, plastico utilizável",
      },
      {
        id: 13,
        container: "Garrafas retornáveis",
      },
      {
        id: 14,
        container: "Balde/regador",
      },
      {
        id: 15,
        container: "Bandeja geladeira/Ar condicionado",
      },
      {
        id: 16,
        container: "Material de construção",
      },
      {
        id: 17,
        container: "Outros",
      },
    ],
  },
  {
    category: "LIXOS",
    container: [
      {
        id: 18,
        container: "Ralo interno",
      },
      {
        id: 19,
        container: "Ralo externo",
      },
      {
        id: 20,
        container: "Laje",
      },
      {
        id: 21,
        container: "Calha",
      },
      {
        id: 22,
        container: "Vaso sanitário/Cx de descarga",
      },
      {
        id: 23,
        container: "Piscina",
      },
      {
        id: 24,
        container: "Depósito p/ construção",
      },
      {
        id: 25,
        container: "Depósito para Horticultura",
      },
      {
        id: 26,
        container: "Consumo animal",
      },
      {
        id: 27,
        container: "Outros",
      },
    ],
  },
  {
    category: "PNEUS",
    container: [
      {
        id: 28,
        container: "Pneu",
      },
      {
        id: 29,
        container: "Outros correlatos",
      },
    ],
  }, {
    category: "Passivel remoção/Interação",
    container: [
      {
        id: 30,
        container: "Latas, frascos, Plástico",
      },
      {
        id: 31,
        container: 'Garrafa descartável'
      },
      {
        id: 32,
        container: 'Lona, encerado, plástico'
      },
      {
        id: 33,
        container: 'Entulho de construção'
      },
      {
        id: 34,
        container: 'Peças e sucatas'
      },
      {
        id: 35,
        container: 'Masseira'
      },
      {
        id: 36,
        container: 'Banco'
      },
      {
        id: 37,
        container: 'Outros'
      }
    ],
  }, {
    category: "Naturais",
    container: [
      {
        id: 38,
        container: "Oco de Árvores e Banbus",
      },
      {
        id: 39,
        container: 'Bromélias'
      },
      {
        id: 40,
        container: 'Outros'
      }
    ],
  },
];
