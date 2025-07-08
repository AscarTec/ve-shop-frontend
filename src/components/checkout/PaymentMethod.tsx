import { useState } from "react";
import { CreditCard, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useOrderStore } from "@/stores/orderStore";
import { useCartStore } from "@/store/cartStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const PaymentMethod = () => {
  const { t } = useTranslation('cart');
  const [selectedMethod, setSelectedMethod] = useState('stripe');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  
  const { 
    setPaymentMethod, 
    setCheckoutStep, 
    checkoutData, 
    addOrder 
  } = useOrderStore();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { addNotification } = useNotificationStore();

  const subtotal = getSubtotal();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const discount = checkoutData.discount || 0;
  const total = subtotal + tax + shipping - discount;

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: CreditCard
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      description: 'Touch ID or Face ID required',
      icon: CreditCard
    }
  ];

  const handlePlaceOrder = async () => {
    if (!checkoutData.shippingAddress) {
      toast.error(t('checkout.missing_shipping_address', 'Shipping address is required'));
      return;
    }

    if (!selectedMethod) {
      toast.error(t('checkout.select_payment_method', 'Please select a payment method'));
      return;
    }

    if (selectedMethod === 'stripe' && (!cardData.number || !cardData.expiry || !cardData.cvc || !cardData.name)) {
      toast.error(t('checkout.complete_card_details', 'Please complete card details'));
      return;
    }

    setPaymentMethod(selectedMethod);

    // Create order
    const order = addOrder({
      items,
      total,
      subtotal,
      tax,
      shipping,
      status: 'pending',
      shippingAddress: checkoutData.shippingAddress,
      paymentMethod: selectedMethod,
      couponCode: checkoutData.couponCode,
      discount,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
    });

    // Clear cart
    clearCart();

    // Add notification
    addNotification({
      type: 'success',
      title: t('checkout.order_placed_successfully', 'Order Placed Successfully'),
      message: `${t('checkout.order_number', 'Order Number')}: ${order.orderNumber}`,
      category: 'order'
    });

    toast.success(t('checkout.order_placed_successfully'));
    setCheckoutStep(4);
  };

  const handleBack = () => {
    setCheckoutStep(2);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t('checkout.payment_method')}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('checkout.select_payment_method', 'Select Payment Method')}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <method.icon className="w-5 h-5" />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">{method.description}</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Card Details Form */}
          {selectedMethod === 'stripe' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  {t('checkout.card_details', 'Card Details')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardName">{t('checkout.cardholder_name', 'Cardholder Name')}</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardData.name}
                    onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber">{t('checkout.card_number', 'Card Number')}</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">{t('checkout.expiry_date', 'MM/YY')}</Label>
                    <Input
                      id="expiry"
                      placeholder="12/25"
                      value={cardData.expiry}
                      onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvc">{t('checkout.cvc', 'CVC')}</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={cardData.cvc}
                      onChange={(e) => setCardData(prev => ({ ...prev, cvc: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>{t('checkout.order_summary')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('cart.subtotal')}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('cart.shipping')}</span>
                <span>{shipping === 0 ? t('cart.free', 'Free') : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('cart.tax')}</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>{t('cart.discount')}</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>{t('cart.total')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address Summary */}
            {checkoutData.shippingAddress && (
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">{t('checkout.shipping_to', 'Shipping to:')}</h4>
                <div className="text-sm text-muted-foreground">
                  <p>{checkoutData.shippingAddress.name}</p>
                  <p>{checkoutData.shippingAddress.street}</p>
                  <p>{checkoutData.shippingAddress.city}, {checkoutData.shippingAddress.state}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          {t('checkout.back_to_shipping', 'Back to Shipping')}
        </Button>
        
        <Button onClick={handlePlaceOrder} className="bg-green-600 hover:bg-green-700">
          <Lock className="w-4 h-4 mr-2" />
          {t('checkout.place_order')} - ${total.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};