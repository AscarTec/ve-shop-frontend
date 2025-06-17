
export interface PricingRule {
  activityType: 'swimming_private' | 'swimming_free' | 'swimming_school' | 'field_football' | 'field_tennis';
  unitType: 'hour' | 'session' | 'day';
  basePrice: number;
  minimumDeposit: number; // percentage
  currency: 'SAR';
}

export const PRICING_RULES: PricingRule[] = [
  {
    activityType: 'swimming_private',
    unitType: 'hour',
    basePrice: 200,
    minimumDeposit: 30,
    currency: 'SAR'
  },
  {
    activityType: 'swimming_free',
    unitType: 'session',
    basePrice: 50,
    minimumDeposit: 100, // pay full amount
    currency: 'SAR'
  },
  {
    activityType: 'swimming_school',
    unitType: 'hour',
    basePrice: 40, // per student per hour
    minimumDeposit: 25,
    currency: 'SAR'
  },
  {
    activityType: 'field_football',
    unitType: 'hour',
    basePrice: 300,
    minimumDeposit: 40,
    currency: 'SAR'
  },
  {
    activityType: 'field_tennis',
    unitType: 'hour',
    basePrice: 150,
    minimumDeposit: 35,
    currency: 'SAR'
  }
];

export interface BookingCalculation {
  totalPrice: number;
  depositAmount: number;
  remainingAmount: number;
  currency: string;
}

export const calculateBookingPrice = (
  activityType: PricingRule['activityType'],
  duration: number,
  participants: number = 1
): BookingCalculation => {
  const rule = PRICING_RULES.find(r => r.activityType === activityType);
  
  if (!rule) {
    throw new Error(`Pricing rule not found for activity: ${activityType}`);
  }

  let totalPrice = rule.basePrice * duration;
  
  // For school bookings, multiply by number of students
  if (activityType === 'swimming_school') {
    totalPrice = totalPrice * participants;
  }

  const depositAmount = Math.ceil((totalPrice * rule.minimumDeposit) / 100);
  const remainingAmount = totalPrice - depositAmount;

  return {
    totalPrice,
    depositAmount,
    remainingAmount,
    currency: rule.currency
  };
};

export const formatPrice = (amount: number, currency: string = 'SAR'): string => {
  return `${amount} ${currency === 'SAR' ? 'ريال' : currency}`;
};
