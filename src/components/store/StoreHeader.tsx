import { Search, ShoppingCart, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StoreHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export function StoreHeader({ query, onQueryChange, cartCount, onOpenCart }: StoreHeaderProps) {
  return (
    <header className="sticky top-0 z-40">
      <div className="gradient-brand text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 text-xs">
          <span className="inline-flex items-center gap-1 font-medium">
            <Zap className="size-3.5" /> Frete grátis em pedidos acima de R$ 99
          </span>
          <span className="ml-auto hidden opacity-80 sm:block">Venda na Flyns</span>
          <span className="hidden opacity-80 sm:block">Ajuda</span>
        </div>
      </div>
      <div className="border-b border-silver bg-navy text-navy-foreground shadow-lg shadow-navy/20">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <a href="/" className="font-display text-2xl font-bold tracking-tight">
            Flyns
            <span className="text-sky">.</span>
          </a>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Buscar produtos, marcas e muito mais..."
              className="border-silver bg-background pl-9 text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
            />
          </div>
          <button
            onClick={onOpenCart}
            className="relative rounded-full p-2 transition-colors hover:bg-white/10"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="size-6" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-sky text-[11px] font-bold text-sky-foreground ring-2 ring-silver">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
