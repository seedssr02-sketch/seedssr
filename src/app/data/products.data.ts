import { Product } from '../models/product.model';

const PLACEHOLDER = (label: string, color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><rect width='400' height='400' fill='${color}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, sans-serif' font-size='28' font-weight='700' fill='white'>${label}</text></svg>`
  )}`;

export const PRODUCTS: Product[] = [
  /*
  {
    id: 'p1',
    slug: 'super-lemon-haze-auto',
    name: 'Super Lemon Haze Autoflorescente',
    category: 'autoflorescentes',
    genetics: 'Lemon Skunk x Super Silver Haze',
    thc: '20%',
    cbd: '0,8%',
    flowering: '8-9 semanas',
    yield: '450-550 g/m²',
    type: 'Sativa-dominante',
    price: 96.0,
    oldPrice: 120.0,
    image: PLACEHOLDER('Super Lemon Haze', '#1f7a3a'),
    shortDescription: 'Aroma cítrico marcante e efeito energético.',
    description:
      'Super Lemon Haze Auto é uma variedade premiada que combina o sabor cítrico característico com a facilidade do cultivo autoflorescente. Efeito cerebral e estimulante.',
    bestSeller: true,
    promo: true,
    stock: 50,
  },
  */
  {
    id: 'p2',
    slug: 'purple-punch-fem',
    name: 'Purple Punch Feminizada',
    category: 'feminizadas',
    genetics: 'Larry OG x Granddaddy Purple',
    thc: '22%',
    cbd: '0,5%',
    flowering: '8 semanas',
    yield: '500-600 g/m²',
    type: 'Indica-dominante',
    price: 123.0,
    image: PLACEHOLDER('Purple Punch', '#5b2d82'),
    shortDescription: 'Doce, frutado e relaxante.',
    description:
      'Purple Punch é a sobremesa das genéticas: notas de uva e baunilha, com efeito profundamente relaxante. Ideal para final de tarde.',
    bestSeller: true,
    stock: 40,
  },
  {
    id: 'p3',
    slug: 'wedding-cake-auto',
    name: 'Wedding Cake Autoflorescente',
    category: 'autoflorescentes',
    genetics: 'Triangle Kush x Animal Mints',
    thc: '24%',
    cbd: '0,3%',
    predominance: '65% Indica 35% Sativa',
    medicinal: 'Relaxamento e bem-estar',
    effects: 'Euforia, Relaxamento, Foco',
    height: '90-120cm',
    flowering: '9-10 semanas',
    flavor: 'Baunilha, Doce, Cremoso',
    yield: '500-600 g/m²',
    type: 'Indica-dominante',
    price: 110.0,
    image: '/img3.jpeg',
    shortDescription: 'Doce com toque de baunilha, alta potência.',
    description:
      'Wedding Cake Auto entrega cogumelos densos cobertos de tricomas. Sabor adocicado e efeito potente, recomendado para usuários experientes.',
    bestSeller: true,
    stock: 35,
  },
  {
    id: 'p4',
    slug: 'gorilla-glue-fem',
    name: 'Gorilla Glue #4 Feminizada',
    category: 'feminizadas',
    genetics: 'Sour Dubb x Chem Sis x Chocolate Diesel',
    thc: '26%',
    cbd: '0,2%',
    predominance: '55% Indica 45% Sativa',
    medicinal: 'Relaxamento intenso e alívio muscular',
    effects: 'Sono, Relaxamento, Corpo pesado',
    height: '100-140cm',
    flowering: '8-9 semanas',
    flavor: 'Terroso, Diesel, Pinho',
    yield: '550-650 g/m²',
    type: 'Híbrida balanceada',
    price: 135.0,
    image: '/img4.jpeg',
    shortDescription: 'Resinosa, potente e premiada.',
    description:
      'Gorilla Glue #4 é mundialmente conhecida por sua produção excepcional de resina. Tricomas grudentos e efeito relaxante de longa duração.',
    bestSeller: true,
    stock: 30,
  },
  {
    id: 'p5',
    slug: 'amnesia-haze-fem',
    name: 'Amnésia Kush Fem - Pack 3/5 seeds',
    category: 'feminizadas',
    genetics: 'OG Kush x Amnesia Haze',
    thc: '23%+-',
    cbd: '0,5%+-',
    predominance: '70% Sativa 30% Indica',
    medicinal: 'Ajuda no tratamento de dores, ansiedade e depressão',
    effects: 'Felicidade, Fome, Foco, Criatividade, Energético',
    height: '100-180cm',
    flowering: '10 a 12 semanas (Colheita outdoor entre agosto e outubro)',
    flavor: 'Cítrico, Limão, Capim Santo, Pungente',
    yield: '100 a 600 gramas por metro quadrado',
    type: 'Sativa-dominante',
    price: 125.98,
    image: '/img1.jpeg',
    shortDescription: 'Clássica sativa cerebral com alto rendimento.',
    description:
      'Amnésia Kush Fem é uma genética premiada para cultivadores que buscam rendimento e efeito motivador. Ideal para uso diurno e criativo.',
    stock: 25,
    bestSeller: true,
  },
  {
    id: 'p6',
    slug: 'purple-punch-fem',
    name: 'Purple Punch Feminizada',
    category: 'feminizadas',
    genetics: 'Larry OG x Granddaddy Purple',
    thc: '22%',
    cbd: '0,5%',
    predominance: '60% Indica 40% Sativa',
    medicinal: 'Relaxamento e alívio de dor leve',
    effects: 'Sono, Calmante, Apetite',
    height: '90-140cm',
    flowering: '8 semanas',
    flavor: 'Uva, Doce, Baunilha',
    yield: '500-600 g/m²',
    type: 'Indica-dominante',
    price: 123.0,
    image: '/img2.jpeg',
    shortDescription: 'Doce, frutado e relaxante.',
    description:
      'Purple Punch oferece sabor de uva com efeito profundamente relaxante. Ideal para terminar o dia com tranquilidade.',
    bestSeller: true,
    stock: 40,
  },
  {
    id: 'p7',
    slug: 'northern-lights-auto',
    name: 'Northern Lights Autoflorescente',
    category: 'autoflorescentes',
    genetics: 'Northern Lights x Ruderalis',
    thc: '18%',
    cbd: '0,4%',
    flowering: '7-8 semanas',
    yield: '400-500 g/m²',
    type: 'Indica-dominante',
    price: 89.0,
    image: PLACEHOLDER('Northern Lights', '#264653'),
    shortDescription: 'Clássica indica, rápida e resistente.',
    description:
      'Northern Lights Auto é a escolha perfeita para iniciantes: ciclo curto, planta compacta, resistente a pragas e produtiva.',
    stock: 60,
  },
  /*
  {
    id: 'p8',
    slug: 'cali-zkittlez',
    name: 'Zkittlez California',
    category: 'cali',
    genetics: 'Grape Ape x Grapefruit',
    thc: '23%',
    cbd: '0,3%',
    flowering: '8-9 semanas',
    yield: '500-600 g/m²',
    type: 'Indica-dominante',
    price: 160.0,
    image: PLACEHOLDER('Zkittlez Cali', '#e63946'),
    shortDescription: 'Sabor de frutas tropicais, importação Cali.',
    description:
      'Zkittlez vencedora de prêmios, oferece perfil aromático complexo de frutas. Linhagem premium da California Seed Co.',
    promo: true,
    stock: 15,
  },
  */
  {
    id: 'p9',
    slug: 'cali-runtz',
    name: 'Runtz California',
    category: 'cali',
    genetics: 'Zkittlez x Gelato',
    thc: '25%',
    cbd: '0,2%',
    flowering: '8-9 semanas',
    yield: '500-600 g/m²',
    type: 'Híbrida balanceada',
    price: 175.0,
    image: PLACEHOLDER('Runtz Cali', '#9d4edd'),
    shortDescription: 'Aroma doce, efeito potente e duradouro.',
    description:
      'Runtz é uma das genéticas mais procuradas do mundo. Sabor de doce, tricomas densos e efeito balanceado.',
    stock: 18,
  },
  /*
  {
    id: 'p10',
    slug: 'atacado-pack-25-mix',
    name: 'Pack Atacado 25 sementes mix',
    category: 'atacado',
    genetics: 'Mix de variedades feminizadas',
    price: 1499.0,
    oldPrice: 1899.0,
    image: PLACEHOLDER('Pack 25 Atacado', '#145d2a'),
    shortDescription: '25 sementes selecionadas, preço de atacado.',
    description:
      'Ideal para growshops e cultivadores comerciais. Mix selecionado pelo time Señores SEEDS BANK — alta germinação garantida.',
    promo: true,
    stock: 10,
  },
  */
  {
    id: 'p11',
    slug: 'headshop-grinder-aluminio',
    name: 'Grinder de Alumínio 4 Partes',
    category: 'headshop',
    price: 89.99,
    image: PLACEHOLDER('Grinder 4 partes', '#444'),
    shortDescription: 'Alumínio aeronáutico, 4 partes com filtro de pólen.',
    description:
      'Grinder de alta durabilidade, dentes afiados em formato diamante. Coletor de pólen integrado.',
    stock: 50,
  },
  {
    id: 'p12',
    slug: 'headshop-papel-organico',
    name: 'Papel de Seda Orgânico King Size',
    category: 'headshop',
    price: 12.5,
    image: PLACEHOLDER('Papel King Size', '#8a6d3b'),
    shortDescription: 'Papel orgânico ultra fino, sabor neutro.',
    description:
      'Papel de seda 100% orgânico, sem cloro nem aditivos. Combustão lenta e uniforme.',
    stock: 200,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getBestSellers(): Product[] {
  return PRODUCTS.filter((p) => p.bestSeller);
}

export function getPromos(): Product[] {
  return PRODUCTS.filter((p) => p.promo);
}
