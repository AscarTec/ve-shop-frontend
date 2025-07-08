import { useState } from "react";
import { Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    description: string;
    inStock: boolean;
    stockCount: number;
    sku: string;
    colors?: string[];
    sizes?: string[];
    badge?: string;
    features?: string[];
  };
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { t } = useTranslation(['product', 'common']);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const { addNotification } = useNotificationStore();

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${product.id}-${selectedColor || 'default'}-${selectedSize || 'default'}`,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        color: selectedColor,
        size: selectedSize,
      });
    }
    
    setIsLoading(false);
    toast.success(t('common:messages.item_added_to_cart'));
    addNotification({
      type: 'success',
      title: t('common:messages.item_added_to_cart'),
      message: `${product.name} (${quantity})`,
      category: 'order'
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success(t('common:messages.item_removed_from_wishlist'));
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        rating: product.rating,
        reviewCount: product.reviewCount,
      });
      toast.success(t('common:messages.item_added_to_wishlist'));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success(t('product:actions.link_copied', 'Link copied to clipboard'));
    }
  };

  return (
    <div className="space-y-6">
      {/* Brand and Badge */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground uppercase tracking-wide">
          {product.brand}
        </span>
        {product.badge && (
          <Badge variant="secondary">{product.badge}</Badge>
        )}
      </div>

      {/* Product Name */}
      <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-muted-foreground'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{product.rating}</span>
        <span className="text-sm text-muted-foreground">
          ({product.reviewCount} {t('product:reviews.reviews', 'reviews')})
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
            <Badge variant="destructive" className="text-sm">
              {discountPercentage}% {t('product:labels.off', 'OFF')}
            </Badge>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            {t('product:labels.color', 'Color')}: {selectedColor}
          </Label>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 transition-colors ${
                  selectedColor === color
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-muted-foreground hover:border-primary'
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => setSelectedColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            {t('product:labels.size', 'Size')}
          </Label>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Quantity */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          {t('product:labels.quantity', 'Quantity')}
        </Label>
        <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[...Array(Math.min(10, product.stockCount))].map((_, i) => (
              <SelectItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm">
          {product.inStock 
            ? t('product:status.in_stock', `In Stock (${product.stockCount} available)`)
            : t('product:status.out_of_stock', 'Out of Stock')
          }
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <Button 
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            className="flex-1"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {isLoading ? t('product:actions.adding', 'Adding...') : t('common:actions.add_to_cart')}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleWishlistToggle}
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold">{t('product:labels.key_features', 'Key Features')}</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Shipping & Service Info */}
      <div className="border-t pt-6 space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="w-5 h-5 text-muted-foreground" />
          <span>{t('product:shipping.free_shipping', 'Free shipping on orders over $100')}</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw className="w-5 h-5 text-muted-foreground" />
          <span>{t('product:shipping.returns', '30-day free returns')}</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <Shield className="w-5 h-5 text-muted-foreground" />
          <span>{t('product:shipping.warranty', '2-year warranty included')}</span>
        </div>
      </div>

      {/* SKU */}
      <div className="text-xs text-muted-foreground">
        {t('product:labels.sku', 'SKU')}: {product.sku}
      </div>
    </div>
  );
};