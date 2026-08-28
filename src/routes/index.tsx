import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BadgePercent, ShieldCheck, Truck, Zap } from "lucide-react";
import { toast } from "sonner";
import { StoreHeader } from "@/components/store/StoreHeader";
import { ProductCard } from "@/components/store/ProductCard";
import { CartDrawer, type CartItem } from "@/components/store/CartDrawer";
import { categories, products, type Product } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flyns — Ofertas em eletrônicos, moda e muito mais" },
      {
        name: "description",
        content:
          "Compre na Flyns: eletrônicos, moda e acessórios com frete grátis, ofertas relâmpago e os melhores preços do Brasil.",
      },
      { property: "og:title", content: "Flyns — Sua loja online" },
      {
        property: "og:description",
        content: "Eletrônicos, moda e acessórios com frete grátis e ofertas relâmpago.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const perks = [
  { icon: Truck, label: "Frete grátis", sub: "em milhares de produtos" },
  { icon: BadgePercent, label: "Ofertas do dia", sub: "até 60% de desconto" },
  { icon: ShieldCheck, label: "Compra protegida", sub: "seu dinheiro seguro" },
  { icon: Zap, label: "Entrega rápida", sub: "para todo o Brasil" },
];

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCategory = category === "Todos" || p.category === category;
      const matchQuery = !q || p.name.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [query, category]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    toast.success("Adicionado ao carrinho", { description: product.name });
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === id ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <StoreHeader
        query={query}
        onQueryChange={setQuery}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Categorias */}
      <nav className="border-b border-silver bg-card">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </nav>

      {/* Banner hero */}
      <section className="gradient-brand relative overflow-hidden text-primary-foreground">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full border-[24px] border-silver/30" />
        <div className="pointer-events-none absolute -bottom-24 right-24 size-48 rounded-full border-[16px] border-silver/20" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest ring-1 ring-silver/60">
            Semana Flyns
          </span>
          <h1 className="font-display mt-4 max-w-xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Ofertas relâmpago com até 60% OFF
          </h1>
          <p className="mt-3 max-w-md text-sm text-primary-foreground/85 sm:text-base">
            Eletrônicos, moda e acessórios com frete grátis e entrega rápida para todo o Brasil.
          </p>
          <a
            href="#ofertas"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-bold text-primary shadow-lg transition-transform hover:scale-105"
          >
            <Zap className="size-4" /> Ver ofertas
          </a>
        </div>
      </section>

      {/* Vantagens */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-6 sm:grid-cols-4">
        {perks.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="silver-ring flex items-center gap-3 rounded-xl bg-card p-3"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold">{label}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Vitrine */}
      <main id="ofertas" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-xl font-bold sm:text-2xl">
            Ofertas para <span className="text-gradient-brand">você</span>
          </h2>
          <span className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            Nenhum produto encontrado para "{query}". Tente outra busca.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      {/* Rodapé */}
      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="font-display text-2xl font-bold">
            Flyns<span className="text-sky">.</span>
          </p>
          <p className="mt-2 max-w-sm text-sm opacity-80">
            Sua loja online com as melhores ofertas, frete grátis e compra protegida.
          </p>
          <div className="mt-6 border-t border-white/15 pt-4 text-xs opacity-60">
            © 2026 Flyns. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cart}
        onChangeQty={changeQty}
        onRemove={removeItem}
      />
    </div>
  );
}
