import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useTranslation } from "react-i18next";

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  count?: number;
  subcategories?: CategoryItem[];
}

interface CategorySidebarProps {
  onCategorySelect?: (categoryId: string) => void;
  selectedCategory?: string;
}

export const CategorySidebar = ({ onCategorySelect, selectedCategory }: CategorySidebarProps) => {
  const { t } = useTranslation('common');
  const [openCategories, setOpenCategories] = useState<string[]>(['electronics']);

  const categories: CategoryItem[] = [
    {
      id: 'electronics',
      name: t('categories.electronics'),
      icon: '📱',
      count: 1250,
      subcategories: [
        { id: 'smartphones', name: 'Smartphones', icon: '📱', count: 320 },
        { id: 'laptops', name: 'Laptops', icon: '💻', count: 180 },
        { id: 'headphones', name: 'Headphones', icon: '🎧', count: 95 },
        { id: 'cameras', name: 'Cameras', icon: '📷', count: 75 },
        { id: 'gaming', name: 'Gaming', icon: '🎮', count: 140 },
      ]
    },
    {
      id: 'fashion',
      name: t('categories.fashion'),
      icon: '👕',
      count: 2100,
      subcategories: [
        { id: 'mens-clothing', name: "Men's Clothing", icon: '👔', count: 580 },
        { id: 'womens-clothing', name: "Women's Clothing", icon: '👗', count: 920 },
        { id: 'shoes', name: 'Shoes', icon: '👟', count: 340 },
        { id: 'accessories', name: 'Accessories', icon: '👜', count: 260 },
      ]
    },
    {
      id: 'home',
      name: t('categories.home'),
      icon: '🏠',
      count: 890,
      subcategories: [
        { id: 'furniture', name: 'Furniture', icon: '🪑', count: 240 },
        { id: 'kitchen', name: 'Kitchen', icon: '🍳', count: 180 },
        { id: 'decor', name: 'Home Decor', icon: '🖼️', count: 150 },
        { id: 'garden', name: 'Garden', icon: '🌱', count: 120 },
      ]
    },
    {
      id: 'sports',
      name: t('categories.sports'),
      icon: '⚽',
      count: 560,
      subcategories: [
        { id: 'fitness', name: 'Fitness', icon: '💪', count: 180 },
        { id: 'outdoor', name: 'Outdoor', icon: '🏕️', count: 140 },
        { id: 'team-sports', name: 'Team Sports', icon: '⚽', count: 120 },
        { id: 'water-sports', name: 'Water Sports', icon: '🏄', count: 80 },
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect?.(categoryId);
  };

  return (
    <Card className="w-80 h-fit">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {t('navigation.categories')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {/* All Products option */}
          <Button
            variant="ghost"
            className={`w-full justify-start px-4 py-3 h-auto ${
              selectedCategory === 'all' ? 'bg-primary/10 text-primary' : ''
            }`}
            onClick={() => handleCategoryClick('all')}
          >
            <span className="text-lg mr-3">🛍️</span>
            <span className="flex-1 text-left">{t('categories.all')}</span>
          </Button>

          {/* Category list */}
          {categories.map((category) => (
            <Collapsible
              key={category.id}
              open={openCategories.includes(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-start px-4 py-3 h-auto ${
                    selectedCategory === category.id ? 'bg-primary/10 text-primary' : ''
                  }`}
                >
                  <span className="text-lg mr-3">{category.icon}</span>
                  <span className="flex-1 text-left">{category.name}</span>
                  <span className="text-xs text-muted-foreground mr-2">
                    {category.count}
                  </span>
                  {category.subcategories && (
                    openCategories.includes(category.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )
                  )}
                </Button>
              </CollapsibleTrigger>
              
              {category.subcategories && (
                <CollapsibleContent className="pl-4">
                  {category.subcategories.map((subcategory) => (
                    <Button
                      key={subcategory.id}
                      variant="ghost"
                      className={`w-full justify-start px-4 py-2 h-auto text-sm ${
                        selectedCategory === subcategory.id ? 'bg-primary/10 text-primary' : ''
                      }`}
                      onClick={() => handleCategoryClick(subcategory.id)}
                    >
                      <span className="mr-3">{subcategory.icon}</span>
                      <span className="flex-1 text-left">{subcategory.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {subcategory.count}
                      </span>
                    </Button>
                  ))}
                </CollapsibleContent>
              )}
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};