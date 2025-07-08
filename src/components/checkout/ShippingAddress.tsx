import { useState } from "react";
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddressForm } from "@/components/forms/AddressForm";
import { useOrderStore, type Address } from "@/stores/orderStore";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const ShippingAddress = () => {
  const { t } = useTranslation('cart');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const {
    addresses,
    addAddress,
    updateAddress,
    removeAddress,
    setShippingAddress,
    setCheckoutStep,
    checkoutData
  } = useOrderStore();

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setShippingAddress(address);
  };

  const handleAddAddress = (addressData: Omit<Address, 'id'>) => {
    addAddress(addressData);
    setShowAddressForm(false);
    toast.success(t('address.added_successfully', 'Address added successfully'));
  };

  const handleUpdateAddress = (addressData: Omit<Address, 'id'>) => {
    if (editingAddress) {
      updateAddress(editingAddress.id, addressData);
      setEditingAddress(null);
      toast.success(t('address.updated_successfully', 'Address updated successfully'));
    }
  };

  const handleDeleteAddress = (address: Address) => {
    removeAddress(address.id);
    if (selectedAddress?.id === address.id) {
      setSelectedAddress(null);
    }
    toast.success(t('address.removed_successfully', 'Address removed successfully'));
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      toast.error(t('checkout.select_shipping_address', 'Please select a shipping address'));
      return;
    }
    setCheckoutStep(3);
  };

  const handleBack = () => {
    setCheckoutStep(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t('checkout.shipping_address')}</h2>
        
        <Dialog open={showAddressForm} onOpenChange={setShowAddressForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t('address.add_new', 'Add New Address')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('address.add_new')}</DialogTitle>
            </DialogHeader>
            <AddressForm
              onSubmit={handleAddAddress}
              onCancel={() => setShowAddressForm(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              {t('address.no_saved_addresses', 'No saved addresses found')}
            </p>
            <Button onClick={() => setShowAddressForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              {t('address.add_first', 'Add Your First Address')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card 
              key={address.id}
              className={`cursor-pointer transition-colors ${
                selectedAddress?.id === address.id 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-muted/50'
              }`}
              onClick={() => handleSelectAddress(address)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{address.name}</CardTitle>
                  <div className="flex gap-1">
                    <Dialog open={editingAddress?.id === address.id} onOpenChange={(open) => {
                      if (!open) setEditingAddress(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingAddress(address);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t('address.edit', 'Edit Address')}</DialogTitle>
                        </DialogHeader>
                        <AddressForm
                          initialData={address}
                          onSubmit={handleUpdateAddress}
                          onCancel={() => setEditingAddress(null)}
                        />
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(address);
                      }}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                  <p>{address.country}</p>
                  {address.phone && <p>{t('address.phone', 'Phone')}: {address.phone}</p>}
                </div>
                
                {address.isDefault && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                      {t('address.default', 'Default')}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={handleBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          {t('checkout.back_to_cart', 'Back to Cart')}
        </Button>
        
        <Button 
          onClick={handleProceedToPayment}
          disabled={!selectedAddress}
        >
          {t('checkout.continue_to_payment', 'Continue to Payment')}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};