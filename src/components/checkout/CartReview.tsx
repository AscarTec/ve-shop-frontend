import { useState } from "react";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const CartReview = () => {
  const { t } = useTranslation(['cart', 'ui']);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const { setCheckoutStep, setCouponCode: setOrderCoupon } = useOrderStore();
  const { addNotification } = useNotificationStore();

  const subtotal = getSubtotal();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
  const total = subtotal + tax + shipping - discount;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast.success(t('ui:toast.item_removed_from_cart'));
    addNotification({
      type: 'info',
      title: t('ui:toast.item_removed_from_cart'),
      message: `${name} ${t('cart:cart.remove_item')}`,
      category: 'order'
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    // Mock coupon validation
    const mockCoupons: Record<string, number> = {
      'SAVE10': 10,
      'WELCOME20': 20,
      'STUDENT15': 15
    };
    
    const couponDiscount = mockCoupons[couponCode.toUpperCase()];
    
    if (couponDiscount) {
      const discountAmount = (subtotal * couponDiscount) / 100;
      setDiscount(discountAmount);
      setAppliedCoupon(couponCode.toUpperCase());
      setOrderCoupon(couponCode.toUpperCase(), discountAmount);
      toast.success(t('cart:cart.coupon_applied', `Coupon applied! ${couponDiscount}% discount`));
    } else {
      toast.error(t('cart:cart.invalid_coupon', 'Invalid coupon code'));
    }
  };

  const handleProceedToShipping = () => {
    if (items.length === 0) {
      toast.error(t('cart:cart.empty_cart'));
      return;
    }
    setCheckoutStep(2);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          {t('cart:cart.empty_cart')}
        </h2>
        <Button onClick={() => window.history.back()}>
          {t('cart:cart.continue_shopping')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{item.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {item.color && <span>{t('cart:product.color', 'Color')}: {item.color}</span>}
                    {item.size && <span>{t('cart:product.size', 'Size')}: {item.size}</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-semibold text-primary">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    {t('cart:cart.remove_item')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coupon Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              {t('cart:cart.coupon_code')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {appliedCoupon ? (
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    {appliedCoupon}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setAppliedCoupon(null);
                      setDiscount(0);
                      setCouponCode('');
                    }}
                    className="text-xs"
                  >
                    {t('cart:cart.remove', 'Remove')}
                  </Button>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400">
                  ${discount.toFixed(2)} {t('cart:cart.discount')}
                </p>
              </div>
            ) : (
              <>
                <Input
                  placeholder={t('cart:cart.enter_coupon_code', 'Enter coupon code')}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button onClick={handleApplyCoupon} className="w-full">
                  {t('cart:cart.apply_coupon')}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('cart:checkout.order_summary')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>{t('cart:cart.subtotal')}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span>{t('cart:cart.shipping')}</span>
              <span>{shipping === 0 ? t('cart:cart.free', 'Free') : `$${shipping.toFixed(2)}`}</span>
            </div>
            
            <div className="flex justify-between">
              <span>{t('cart:cart.tax')}</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>{t('cart:cart.discount')}</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>{t('cart:cart.total')}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button onClick={handleProceedToShipping} className="w-full mt-4">
              {t('cart:checkout.proceed_to_shipping', 'Proceed to Shipping')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};