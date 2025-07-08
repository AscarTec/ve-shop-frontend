import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  Camera,
  Edit,
  Plus,
  Eye,
  Calendar,
  CreditCard,
  Shield,
  Bell
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Profile update schema
const profileSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required').optional(),
});

// Password update schema
const passwordSchema = z.object({
  currentPassword: z.string().min(8, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your password'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Address schema
const addressSchema = z.object({
  type: z.enum(['home', 'work', 'other']),
  name: z.string().min(2, 'Name is required'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  isDefault: z.boolean().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;
type AddressForm = z.infer<typeof addressSchema>;

// Types for addresses
interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Mock data
const mockOrders = [
  {
    id: '1001',
    date: '2024-01-15',
    status: 'delivered',
    total: 299.99,
    items: 3,
  },
  {
    id: '1002',
    date: '2024-01-20',
    status: 'shipped',
    total: 149.50,
    items: 2,
  },
  {
    id: '1003',
    date: '2024-01-25',
    status: 'processing',
    total: 89.99,
    items: 1,
  },
];

const mockAddresses: Address[] = [
  {
    id: '1',
    type: 'home',
    name: 'Home Address',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    isDefault: true,
  },
  {
    id: '2',
    type: 'work',
    name: 'Work Address',
    street: '456 Business Ave',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    country: 'United States',
    isDefault: false,
  },
];

export default function Profile() {
  const { t } = useTranslation(['auth', 'common']);
  const navigate = useNavigate();
  const { user, logout, updateProfile, updatePassword, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [addresses, setAddresses] = useState(mockAddresses);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // Redirect if not authenticated
  if (!user) {
    navigate('/auth');
    return null;
  }

  // Profile form
  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
    },
  });

  // Password form
  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Address form
  const addressForm = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      type: 'home',
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      isDefault: false,
    },
  });

  const onUpdateProfile = async (data: ProfileForm) => {
    const result = await updateProfile(data);
    
    if (result.success) {
      toast.success('Profile updated successfully');
      setIsEditingProfile(false);
    } else {
      toast.error(result.error || 'Failed to update profile');
    }
  };

  const onUpdatePassword = async (data: PasswordForm) => {
    const result = await updatePassword(data.currentPassword, data.newPassword);
    
    if (result.success) {
      toast.success('Password updated successfully');
      passwordForm.reset();
    } else {
      toast.error(result.error || 'Failed to update password');
    }
  };

  const onAddAddress = (data: AddressForm) => {
    const newAddress: Address = {
      id: Date.now().toString(),
      type: data.type,
      name: data.name,
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
      isDefault: data.isDefault || false,
    };
    
    // If this is the default address, remove default from others
    if (data.isDefault) {
      setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
    }
    
    setAddresses(prev => [...prev, newAddress]);
    setIsAddingAddress(false);
    addressForm.reset();
    toast.success('Address added successfully');
  };

  const removeAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    toast.success('Address removed');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
    toast.success('Default address updated');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-success text-success-foreground';
      case 'shipped':
        return 'bg-primary text-primary-foreground';
      case 'processing':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-lg font-semibold">
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={user.emailVerified ? 'default' : 'secondary'}>
                    {user.emailVerified ? 'Verified' : 'Unverified'}
                  </Badge>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{mockOrders.length}</div>
                    <p className="text-xs text-muted-foreground">
                      +2 from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Lifetime value
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">
                      Items saved
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest order activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total}</p>
                          <p className="text-sm text-muted-foreground">{order.items} items</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => setActiveTab('orders')}
                  >
                    View All Orders
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>Manage and track your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {order.date}
                            </p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total}</p>
                          <p className="text-sm text-muted-foreground">{order.items} items</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          {order.status === 'delivered' && (
                            <Button variant="outline" size="sm">
                              Reorder
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Saved Addresses</CardTitle>
                    <CardDescription>Manage your shipping and billing addresses</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddingAddress(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Address
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{address.name}</h3>
                            <Badge variant={address.type === 'home' ? 'default' : 'secondary'} className="mt-1">
                              {address.type}
                            </Badge>
                          </div>
                          {address.isDefault && (
                            <Badge variant="outline">Default</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                          <p>{address.country}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          {!address.isDefault && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setDefaultAddress(address.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => removeAddress(address.id)}
                            className="text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Address Form */}
                  {isAddingAddress && (
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Add New Address</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={addressForm.handleSubmit(onAddAddress)} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="address-name">Address Name</Label>
                              <Input
                                id="address-name"
                                placeholder="e.g., Home, Work"
                                {...addressForm.register('name')}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="address-type">Type</Label>
                              <select
                                id="address-type"
                                className="w-full p-2 border rounded-md"
                                {...addressForm.register('type')}
                              >
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input
                              id="street"
                              placeholder="123 Main Street"
                              {...addressForm.register('street')}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="city">City</Label>
                              <Input
                                id="city"
                                placeholder="New York"
                                {...addressForm.register('city')}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              <Input
                                id="state"
                                placeholder="NY"
                                {...addressForm.register('state')}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zipCode">ZIP Code</Label>
                              <Input
                                id="zipCode"
                                placeholder="10001"
                                {...addressForm.register('zipCode')}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              placeholder="United States"
                              {...addressForm.register('country')}
                            />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="isDefault"
                              {...addressForm.register('isDefault')}
                            />
                            <Label htmlFor="isDefault">Set as default address</Label>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button type="submit" disabled={isLoading}>
                              Add Address
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={() => setIsAddingAddress(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                  <CardDescription>Items you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-muted-foreground mb-4">
                      Save items you're interested in to your wishlist
                    </p>
                    <Button onClick={() => navigate('/')}>
                      Start Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              {/* Profile Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditingProfile ? (
                    <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            {...profileForm.register('firstName')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            {...profileForm.register('lastName')}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...profileForm.register('email')}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...profileForm.register('phone')}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button type="submit" disabled={isLoading}>
                          Save Changes
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setIsEditingProfile(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>First Name</Label>
                          <p className="text-foreground">{user.firstName}</p>
                        </div>
                        <div>
                          <Label>Last Name</Label>
                          <p className="text-foreground">{user.lastName}</p>
                        </div>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <p className="text-foreground">{user.email}</p>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <p className="text-foreground">{user.phone || 'Not provided'}</p>
                      </div>
                      <Button onClick={() => setIsEditingProfile(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Password Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={passwordForm.handleSubmit(onUpdatePassword)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        {...passwordForm.register('currentPassword')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        {...passwordForm.register('newPassword')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...passwordForm.register('confirmPassword')}
                      />
                    </div>
                    
                    <Button type="submit" disabled={isLoading}>
                      <Shield className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive order updates and promotions
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked={user.preferences.notifications} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get text updates about your orders
                      </p>
                    </div>
                    <input type="checkbox" />
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="destructive"
                    onClick={logout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}