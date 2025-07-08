import { useEffect, useState } from "react";
import { CheckCircle, Package, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrderStore } from "@/stores/orderStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const OrderConfirmation = () => {
  const { t } = useTranslation('cart');
  const navigate = useNavigate();
  const { orders, clearCheckout } = useOrderStore();
  const [currentOrder, setCurrentOrder] = useState(orders[0]);

  useEffect(() => {
    // Get the most recent order
    if (orders.length > 0) {
      setCurrentOrder(orders[0]);
    }
  }, [orders]);

  const handleContinueShopping = () => {
    clearCheckout();
    navigate('/');
  };

  const handleViewOrder = () => {
    navigate(`/profile?tab=orders`);
  };

  if (!currentOrder) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          {t('order.no_order_found', 'No order found')}
        </h2>
        <Button onClick={handleContinueShopping}>
          {t('cart.continue_shopping')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t('order.order_confirmed')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('order.thank_you')}
        </p>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              {t('order.order_details')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">{t('order.order_number')}</span>
              <span className="text-primary font-mono">{currentOrder.orderNumber}</span>
            </div>
            
            <div className="flex justify-between">
              <span>{t('order.order_date', 'Order Date')}</span>
              <span>{new Date(currentOrder.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span>{t('order.order_status')}</span>
              <span className="capitalize bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-sm">
                {t(`order.${currentOrder.status}`, currentOrder.status)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>{t('order.estimated_delivery')}</span>
              <span>{currentOrder.estimatedDelivery ? new Date(currentOrder.estimatedDelivery).toLocaleDateString() : t('order.calculating', 'Calculating...')}</span>
            </div>
            
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>{t('cart.total')}</span>
              <span>${currentOrder.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle>{t('checkout.shipping_address')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{currentOrder.shippingAddress.name}</p>
              <p>{currentOrder.shippingAddress.street}</p>
              <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}</p>
              <p>{currentOrder.shippingAddress.country}</p>
              {currentOrder.shippingAddress.phone && (
                <p>{t('address.phone', 'Phone')}: {currentOrder.shippingAddress.phone}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>{t('order.items_ordered', 'Items Ordered')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentOrder.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    {item.color && <span>{t('product.color', 'Color')}: {item.color} </span>}
                    {item.size && <span>{t('product.size', 'Size')}: {item.size}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${item.price.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">
                    {t('product.qty', 'Qty')}: {item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button onClick={handleContinueShopping} variant="outline" className="flex-1">
          {t('cart.continue_shopping')}
        </Button>
        
        <Button onClick={handleViewOrder} className="flex-1">
          {t('order.view_order_details', 'View Order Details')}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Additional Information */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>{t('order.confirmation_email', 'A confirmation email has been sent to your email address.')}</p>
            <p>{t('order.tracking_info', 'You will receive tracking information once your order ships.')}</p>
            <p>{t('order.support_message', 'If you have any questions, please contact our customer support.')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};