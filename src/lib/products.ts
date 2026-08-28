import fone from "@/assets/products/fone.jpg";
import smartwatch from "@/assets/products/smartwatch.jpg";
import tenis from "@/assets/products/tenis.jpg";
import mochila from "@/assets/products/mochila.jpg";
import caixaSom from "@/assets/products/caixa-som.jpg";
import oculos from "@/assets/products/oculos.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  sold: number;
  image: string;
  freeShipping: boolean;
  badge?: string;
}

export const categories = [
  "Todos",
  "Eletrônicos",
  "Moda",
  "Esporte",
  "Acessórios",
] as const;

export const products: Product[] = [
  {
    id: "1",
    name: "Fone de Ouvido Bluetooth Flyns Sound Pro com Cancelamento de Ruído",
    category: "Eletrônicos",
    price: 189.9,
    oldPrice: 349.9,
    rating: 4.8,
    sold: 12400,
    image: fone,
    freeShipping: true,
    badge: "Mais vendido",
  },
  {
    id: "2",
    name: "Smartwatch Flyns Fit Série 5 — Monitor Cardíaco e GPS",
    category: "Eletrônicos",
    price: 299.9,
    oldPrice: 499.9,
    rating: 4.7,
    sold: 8300,
    image: smartwatch,
    freeShipping: true,
    badge: "Oferta relâmpago",
  },
  {
    id: "3",
    name: "Tênis Esportivo Flyns Runner Azul — Conforto para Corrida",
    category: "Esporte",
    price: 219.9,
    oldPrice: 329.9,
    rating: 4.9,
    sold: 5100,
    image: tenis,
    freeShipping: true,
  },
  {
    id: "4",
    name: "Mochila Flyns Urban Azul-Marinho 25L com Zíper Prata",
    category: "Moda",
    price: 149.9,
    oldPrice: 229.9,
    rating: 4.6,
    sold: 3200,
    image: mochila,
    freeShipping: false,
  },
  {
    id: "5",
    name: "Caixa de Som Portátil Flyns Beat — À Prova d'Água IPX7",
    category: "Eletrônicos",
    price: 129.9,
    oldPrice: 199.9,
    rating: 4.5,
    sold: 7800,
    image: caixaSom,
    freeShipping: true,
    badge: "-35%",
  },
  {
    id: "6",
    name: "Óculos de Sol Flyns Aviator Prata com Lente Azul UV400",
    category: "Acessórios",
    price: 99.9,
    oldPrice: 159.9,
    rating: 4.7,
    sold: 2900,
    image: oculos,
    freeShipping: false,
  },
];

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatSold(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(1).replace(".", ",")} mil` : String(value);
}
