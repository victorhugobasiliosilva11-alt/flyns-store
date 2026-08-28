import { Minus, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatPrice, type Product } from "@/lib/products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onChangeQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export function CartDrawer({ open, onOpenChange, items, onChangeQty, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display">Seu carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-4 overflow-y-auto px-4">
          {items.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Seu carrinho está vazio. Que tal conferir as ofertas?
            </p>
          )}
          {items.map(({ product, qty }) => (
            <div key={product.id} className="silver-ring flex gap-3 rounded-lg bg-card p-3">
              <img
                src={product.image}
                alt={product.name}
                className="size-16 rounded-md object-cover"
                loading="lazy"
              />
              <div className="flex flex-1 flex-col">
                <p className="line-clamp-2 text-xs font-medium">{product.name}</p>
                <span className="mt-1 text-sm font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <div className="mt-auto flex items-center gap-2">
                  <button
                    onClick={() => onChangeQty(product.id, -1)}
                    className="silver-ring flex size-6 items-center justify-center rounded-md hover:bg-accent"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-5 text-center text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => onChangeQty(product.id, 1)}
                    className="silver-ring flex size-6 items-center justify-center rounded-md hover:bg-accent"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="size-3" />
                  </button>
                  <button
                    onClick={() => onRemove(product.id)}
                    className="ml-auto text-muted-foreground transition-colors hover:text-destructive"
                    aria-label="Remover item"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <SheetFooter className="border-t border-silver">
            <div className="flex items-center justify-between text-base font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(total)}</span>
            </div>
            <Button className="w-full font-semibold" size="lg">
              Finalizar compra
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
