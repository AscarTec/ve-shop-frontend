import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../store/cartStore';

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  couponCode?: string;
  discount?: number;
  createdAt: string;
  estimatedDelivery?: string;
}

interface OrderState {
  orders: Order[];
  addresses: Address[];
  currentCheckoutStep: number;
  checkoutData: {
    shippingAddress?: Address;
    paymentMethod?: string;
    couponCode?: string;
    discount?: number;
  };
  
  // Order methods
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  // Address methods
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  
  // Checkout methods
  setCheckoutStep: (step: number) => void;
  setShippingAddress: (address: Address) => void;
  setPaymentMethod: (method: string) => void;
  setCouponCode: (code: string, discount: number) => void;
  clearCheckout: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addresses: [],
      currentCheckoutStep: 1,
      checkoutData: {},
      
      addOrder: (orderData) => {
        const orderNumber = `VE${Date.now().toString().slice(-8)}`;
        const order: Order = {
          ...orderData,
          id: Date.now().toString(),
          orderNumber,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          orders: [order, ...state.orders],
        }));
        
        return order;
      },
      
      getOrderById: (id) => {
        return get().orders.find((order) => order.id === id);
      },
      
      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        }));
      },
      
      addAddress: (addressData) => {
        const address: Address = {
          ...addressData,
          id: Date.now().toString(),
        };
        
        set((state) => ({
          addresses: [...state.addresses, address],
        }));
      },
      
      updateAddress: (id, addressData) => {
        set((state) => ({
          addresses: state.addresses.map((address) =>
            address.id === id ? { ...address, ...addressData } : address
          ),
        }));
      },
      
      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((address) => address.id !== id),
        }));
      },
      
      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((address) => ({
            ...address,
            isDefault: address.id === id,
          })),
        }));
      },
      
      setCheckoutStep: (step) => {
        set({ currentCheckoutStep: step });
      },
      
      setShippingAddress: (address) => {
        set((state) => ({
          checkoutData: { ...state.checkoutData, shippingAddress: address },
        }));
      },
      
      setPaymentMethod: (method) => {
        set((state) => ({
          checkoutData: { ...state.checkoutData, paymentMethod: method },
        }));
      },
      
      setCouponCode: (code, discount) => {
        set((state) => ({
          checkoutData: { ...state.checkoutData, couponCode: code, discount },
        }));
      },
      
      clearCheckout: () => {
        set({
          currentCheckoutStep: 1,
          checkoutData: {},
        });
      },
    }),
    {
      name: 've-shop-orders',
    }
  )
);