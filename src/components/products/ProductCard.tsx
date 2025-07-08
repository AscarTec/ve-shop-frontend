import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  isOnSale?: boolean;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  image,
  badge,
  isOnSale
}: ProductCardProps) => {
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(false);
  
  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(id));

  const handleAddToCart = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart({
      id,
      name,
      price,
      originalPrice,
      image
    });
    
    toast.success(t('messages.item_added_to_cart'));
    setIsLoading(false);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(id);
      toast.success(t('messages.item_removed_from_wishlist'));
    } else {
      addToWishlist({
        id,
        name,
        price,
        originalPrice,
        image,
        rating,
        reviewCount
      });
      toast.success(t('messages.item_added_to_wishlist'));
    }
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card className="group overflow-hidden transition-all duration-normal hover:shadow-product hover:-translate-y-1 bg-card hover:bg-card-hover">
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-muted/50">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-normal group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOnSale && discount > 0 && (
            <Badge className="bg-sale text-white font-semibold">
              -{discount}%
            </Badge>
          )}
          {badge && (
            <Badge variant="secondary" className="bg-badge text-white">
              {badge}
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 transition-all duration-fast ${
            isInWishlist 
              ? 'bg-background text-sale' 
              : 'bg-background/80 text-muted-foreground hover:text-sale'
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart 
            className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} 
          />
        </Button>

        {/* Quick add to cart - appears on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
          <Button 
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-md"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isLoading ? t('messages.loading') : t('actions.add_to_cart')}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-card-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-fast">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) 
                    ? 'text-rating fill-current' 
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviewCount} {t('labels.reviews')})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-price">
            ${price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-price-strike line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};