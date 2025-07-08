import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface CheckoutStepsProps {
  currentStep: number;
}

export const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  const { t } = useTranslation('cart');
  
  const steps = [
    { key: 1, label: t('checkout.cart_review', 'Cart Review') },
    { key: 2, label: t('checkout.shipping_address') },
    { key: 3, label: t('checkout.payment_method') },
    { key: 4, label: t('checkout.confirmation', 'Confirmation') }
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.key} className="flex items-center flex-1">
          {/* Step Circle */}
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step.key < currentStep
                  ? 'bg-primary text-primary-foreground'
                  : step.key === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.key < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                step.key
              )}
            </div>
            
            {/* Step Label */}
            <span
              className={`ml-2 text-sm font-medium transition-colors ${
                step.key <= currentStep
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 transition-colors ${
                step.key < currentStep
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};