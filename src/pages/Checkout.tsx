import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartReview } from "@/components/checkout/CartReview";
import { ShippingAddress } from "@/components/checkout/ShippingAddress";
import { PaymentMethod } from "@/components/checkout/PaymentMethod";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { useOrderStore } from "@/stores/orderStore";
import { useCartStore } from "@/store/cartStore";
import { useTranslation } from "react-i18next";

const Checkout = () => {
  const { t } = useTranslation('cart');
  const navigate = useNavigate();
  const { currentCheckoutStep, setCheckoutStep, clearCheckout } = useOrderStore();
  const { items, getItemCount } = useCartStore();

  // Redirect if cart is empty (except on confirmation step)
  useEffect(() => {
    if (getItemCount() === 0 && currentCheckoutStep < 4) {
      navigate('/');
    }
  }, [getItemCount, currentCheckoutStep, navigate]);

  // Clear checkout data when component unmounts
  useEffect(() => {
    return () => {
      if (currentCheckoutStep === 4) {
        clearCheckout();
      }
    };
  }, [currentCheckoutStep, clearCheckout]);

  const renderStep = () => {
    switch (currentCheckoutStep) {
      case 1:
        return <CartReview />;
      case 2:
        return <ShippingAddress />;
      case 3:
        return <PaymentMethod />;
      case 4:
        return <OrderConfirmation />;
      default:
        return <CartReview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('checkout.checkout')}
            </h1>
            <CheckoutSteps currentStep={currentCheckoutStep} />
          </div>
          
          <div className="bg-card rounded-lg shadow-sm border p-6">
            {renderStep()}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;