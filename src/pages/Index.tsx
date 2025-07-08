import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/layout/HeroSection";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { FeaturedSection } from "@/components/products/FeaturedSection";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategorySidebar } from "@/components/products/CategorySidebar";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation('common');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filters, setFilters] = useState<any>({});
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryNav />
        <FeaturedSection />
        
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('labels.featured')} {t('navigation.products')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('messages.welcome')}
              </p>
            </div>
            
            <div className="flex gap-6">
              {/* Sidebar with categories and filters */}
              <div className="hidden lg:flex flex-col gap-6">
                <CategorySidebar 
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
                <ProductFilters onFiltersChange={setFilters} />
              </div>
              
              {/* Main content */}
              <div className="flex-1">
                <ProductGrid />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
