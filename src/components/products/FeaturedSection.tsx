import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";

const featuredProducts = [
  {
    id: "f1",
    name: "Premium Wireless Earbuds Pro Max",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.9,
    reviewCount: 2456,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
    badge: "Editor's Choice",
    isOnSale: true
  },
  {
    id: "f2",
    name: "Smart Home Assistant Display 10\"",
    price: 249.99,
    rating: 4.7,
    reviewCount: 1834,
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=400&h=400&fit=crop",
    badge: "New Release"
  },
  {
    id: "f3",
    name: "Professional DSLR Camera Kit",
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.8,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    isOnSale: true
  },
  {
    id: "f4",
    name: "Luxury Smartwatch Series X",
    price: 399.99,
    rating: 4.6,
    reviewCount: 1234,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
    badge: "Limited Edition"
  }
];

export const FeaturedSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked products that our customers love most. Premium quality, 
            exceptional value, and outstanding reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
          >
            View All Featured Products
          </Button>
        </div>
      </div>
    </section>
  );
};