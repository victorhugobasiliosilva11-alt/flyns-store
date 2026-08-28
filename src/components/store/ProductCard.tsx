import { Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, formatSold, type Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <article className="card-hover silver-ring group flex flex-col overflow-hidden rounded-xl bg-card">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground shadow">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute right-2 top-2 rounded-md bg-navy px-2 py-0.5 text-[11px] font-bold text-navy-foreground shadow">
            -{discount}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">{product.name}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-star text-star" />
          <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
          <span>· {formatSold(product.sold)} vendidos</span>
        </div>
        {product.oldPrice && (
          <span className="text-xs text-muted-foreground line-through">
            {formatPrice(product.oldPrice)}
          </span>
        )}
        <span className="font-display text-lg font-bold text-primary">
          {formatPrice(product.price)}
        </span>
        {product.freeShipping && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
            <Truck className="size-3.5" /> Frete grátis
          </span>
        )}
        <Button
          size="sm"
          className="mt-auto w-full font-semibold"
          onClick={() => onAdd(product)}
        >
          Adicionar ao carrinho
        </Button>
      </div>
    </article>
  );
}
