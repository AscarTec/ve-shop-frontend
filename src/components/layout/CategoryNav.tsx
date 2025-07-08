import { Button } from "@/components/ui/button";

const categories = [
  { name: "All Products", icon: "🛍️", active: true },
  { name: "Electronics", icon: "📱", active: false },
  { name: "Fashion", icon: "👕", active: false },
  { name: "Home & Garden", icon: "🏠", active: false },
  { name: "Sports", icon: "⚽", active: false },
  { name: "Beauty", icon: "💄", active: false },
  { name: "Books", icon: "📚", active: false },
  { name: "Toys & Games", icon: "🎮", active: false }
];

export const CategoryNav = () => {
  return (
    <section className="py-8 border-b border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
          <Button variant="ghost" className="text-primary font-semibold">
            View All Categories →
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={category.active ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-normal ${
                category.active 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'hover:bg-primary/10 hover:border-primary hover:text-primary'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-sm font-medium text-center">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};