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
    image:
      'https://neerlandseedsbank.com/wp-content/uploads/2021/10/tyson-punch--821x1024.jpeg',
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
    image:
      'https://neerlandseedsbank.com/wp-content/uploads/2021/10/goriila-glue-.1--821x1024.jpg',
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
    image:
      'https://neerlandseedsbank.com/wp-content/uploads/2021/10/super-lemon-1-821x1024.jpeg',
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
    image:
      'https://neerlandseedsbank.com/wp-content/uploads/2021/10/nyc-diesel--821x1024.jpeg',
    shortDescription: 'Doce, frutado e relaxante.',
    description:
      'Purple Punch oferece sabor de uva com efeito profundamente relaxante. Ideal para terminar o dia com tranquilidade.',
    bestSeller: true,
    stock: 40,
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
