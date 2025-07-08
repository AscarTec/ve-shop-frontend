import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Address } from "@/stores/orderStore";
import { useTranslation } from "react-i18next";

interface AddressFormProps {
  initialData?: Partial<Address>;
  onSubmit: (data: Omit<Address, 'id'>) => void;
  onCancel: () => void;
}

export const AddressForm = ({ initialData, onSubmit, onCancel }: AddressFormProps) => {
  const { t } = useTranslation('cart');
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    street: initialData?.street || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    country: initialData?.country || 'US',
    phone: initialData?.phone || '',
    isDefault: initialData?.isDefault || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('address.errors.name_required', 'Name is required');
    }
    if (!formData.street.trim()) {
      newErrors.street = t('address.errors.street_required', 'Street address is required');
    }
    if (!formData.city.trim()) {
      newErrors.city = t('address.errors.city_required', 'City is required');
    }
    if (!formData.state.trim()) {
      newErrors.state = t('address.errors.state_required', 'State is required');
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = t('address.errors.zip_required', 'ZIP code is required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">{t('address.fields.name', 'Full Name')} *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder={t('address.placeholders.name', 'Enter full name')}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="street">{t('address.fields.street', 'Street Address')} *</Label>
        <Input
          id="street"
          value={formData.street}
          onChange={(e) => handleChange('street', e.target.value)}
          placeholder={t('address.placeholders.street', 'Enter street address')}
          className={errors.street ? 'border-destructive' : ''}
        />
        {errors.street && <p className="text-sm text-destructive mt-1">{errors.street}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">{t('address.fields.city', 'City')} *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder={t('address.placeholders.city', 'Enter city')}
            className={errors.city ? 'border-destructive' : ''}
          />
          {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
        </div>

        <div>
          <Label htmlFor="state">{t('address.fields.state', 'State')} *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
            placeholder={t('address.placeholders.state', 'Enter state')}
            className={errors.state ? 'border-destructive' : ''}
          />
          {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zipCode">{t('address.fields.zip', 'ZIP Code')} *</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
            placeholder={t('address.placeholders.zip', 'Enter ZIP code')}
            className={errors.zipCode ? 'border-destructive' : ''}
          />
          {errors.zipCode && <p className="text-sm text-destructive mt-1">{errors.zipCode}</p>}
        </div>

        <div>
          <Label htmlFor="country">{t('address.fields.country', 'Country')}</Label>
          <Select value={formData.country} onValueChange={(value) => handleChange('country', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="MX">Mexico</SelectItem>
              <SelectItem value="GB">United Kingdom</SelectItem>
              <SelectItem value="DE">Germany</SelectItem>
              <SelectItem value="FR">France</SelectItem>
              <SelectItem value="JP">Japan</SelectItem>
              <SelectItem value="AU">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="phone">{t('address.fields.phone', 'Phone Number')}</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder={t('address.placeholders.phone', 'Enter phone number')}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isDefault"
          checked={formData.isDefault}
          onCheckedChange={(checked) => handleChange('isDefault', checked === true)}
        />
        <Label htmlFor="isDefault" className="text-sm">
          {t('address.fields.set_default', 'Set as default address')}
        </Label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          {t('common:actions.cancel', 'Cancel')}
        </Button>
        <Button type="submit" className="flex-1">
          {initialData ? t('common:actions.update', 'Update') : t('common:actions.add', 'Add')} {t('address.address', 'Address')}
        </Button>
      </div>
    </form>
  );
};