import { useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'range' | 'rating';
  options?: { id: string; label: string; count?: number }[];
  min?: number;
  max?: number;
  value?: any;
}

interface ProductFiltersProps {
  onFiltersChange?: (filters: any) => void;
  className?: string;
}

export const ProductFilters = ({ onFiltersChange, className }: ProductFiltersProps) => {
  const { t } = useTranslation(['common', 'product']);
  const [openSections, setOpenSections] = useState<string[]>(['price', 'brand', 'rating']);
  const [filters, setFilters] = useState<any>({
    priceRange: [0, 1000],
    brands: [],
    colors: [],
    rating: 0,
    freeShipping: false,
    onSale: false,
  });

  const filterSections: FilterSection[] = [
    {
      id: 'price',
      title: t('product:filters.price_range'),
      type: 'range',
      min: 0,
      max: 1000,
      value: filters.priceRange,
    },
    {
      id: 'brand',
      title: t('product:filters.brand'),
      type: 'checkbox',
      options: [
        { id: 'apple', label: 'Apple', count: 145 },
        { id: 'samsung', label: 'Samsung', count: 98 },
        { id: 'sony', label: 'Sony', count: 67 },
        { id: 'lg', label: 'LG', count: 54 },
        { id: 'nike', label: 'Nike', count: 89 },
        { id: 'adidas', label: 'Adidas', count: 72 },
      ],
    },
    {
      id: 'color',
      title: t('product:filters.color'),
      type: 'checkbox',
      options: [
        { id: 'black', label: 'Black', count: 234 },
        { id: 'white', label: 'White', count: 198 },
        { id: 'blue', label: 'Blue', count: 156 },
        { id: 'red', label: 'Red', count: 123 },
        { id: 'green', label: 'Green', count: 98 },
      ],
    },
    {
      id: 'rating',
      title: t('product:filters.rating_above'),
      type: 'rating',
      min: 0,
      max: 5,
      value: filters.rating,
    },
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleFilterChange = (sectionId: string, value: any) => {
    const newFilters = { ...filters, [sectionId]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleCheckboxChange = (sectionId: string, optionId: string, checked: boolean) => {
    const currentValues = filters[sectionId] || [];
    const newValues = checked
      ? [...currentValues, optionId]
      : currentValues.filter((id: string) => id !== optionId);
    
    handleFilterChange(sectionId, newValues);
  };

  const clearFilters = () => {
    const clearedFilters = {
      priceRange: [0, 1000],
      brands: [],
      colors: [],
      rating: 0,
      freeShipping: false,
      onSale: false,
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.brands.length > 0) count++;
    if (filters.colors.length > 0) count++;
    if (filters.rating > 0) count++;
    if (filters.freeShipping) count++;
    if (filters.onSale) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    return count;
  };

  return (
    <Card className={`w-80 h-fit ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {t('product:filters.apply_filters')}
          </CardTitle>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </div>
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="w-fit p-0 h-auto text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            {t('product:filters.clear_filters')}
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="space-y-1">
          {/* Quick filters */}
          <div className="px-4 pb-4 space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={filters.freeShipping}
                onCheckedChange={(checked) => handleFilterChange('freeShipping', checked)}
              />
              <span className="text-sm">{t('product:filters.free_shipping')}</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={filters.onSale}
                onCheckedChange={(checked) => handleFilterChange('onSale', checked)}
              />
              <span className="text-sm">{t('product:filters.discount')}</span>
            </label>
          </div>

          {/* Filter sections */}
          {filterSections.map((section) => (
            <Collapsible
              key={section.id}
              open={openSections.includes(section.id)}
              onOpenChange={() => toggleSection(section.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between px-4 py-3 h-auto font-medium"
                >
                  <span>{section.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    openSections.includes(section.id) ? 'rotate-180' : ''
                  }`} />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="px-4 pb-4">
                {section.type === 'range' && (
                  <div className="space-y-4">
                    <Slider
                      value={filters[section.id] || [section.min, section.max]}
                      min={section.min}
                      max={section.max}
                      step={10}
                      onValueChange={(value) => handleFilterChange(section.id, value)}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${filters[section.id]?.[0] || section.min}</span>
                      <span>${filters[section.id]?.[1] || section.max}</span>
                    </div>
                  </div>
                )}

                {section.type === 'checkbox' && section.options && (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {section.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={filters[section.id]?.includes(option.id) || false}
                            onCheckedChange={(checked) => 
                              handleCheckboxChange(section.id, option.id, checked as boolean)
                            }
                          />
                          <span className="text-sm">{option.label}</span>
                        </div>
                        {option.count && (
                          <span className="text-xs text-muted-foreground">
                            {option.count}
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}

                {section.type === 'rating' && (
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={filters.rating === rating}
                          onCheckedChange={() => 
                            handleFilterChange('rating', filters.rating === rating ? 0 : rating)
                          }
                        />
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < rating ? 'text-rating' : 'text-muted-foreground'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-sm ml-1">{t('common:labels.rating')} {rating}+</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};