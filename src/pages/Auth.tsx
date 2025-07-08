import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('auth:validation.email_invalid'),
  password: z.string().min(1, 'auth:validation.required'),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  firstName: z.string().min(2, 'auth:validation.required'),
  lastName: z.string().min(2, 'auth:validation.required'),
  email: z.string().email('auth:validation.email_invalid'),
  phone: z.string().min(10, 'auth:validation.phone_invalid').optional(),
  password: z.string().min(8, 'auth:validation.password_min'),
  confirmPassword: z.string().min(8, 'auth:validation.password_min'),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'auth:validation.required',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'auth:validation.passwords_not_match',
  path: ['confirmPassword'],
});

const forgotPasswordSchema = z.object({
  email: z.string().email('auth:validation.email_invalid'),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;
type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function Auth() {
  const { t } = useTranslation(['auth', 'common']);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register, forgotPassword, isLoading, isAuthenticated } = useAuth();
  
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  // Login form
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Register form
  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  // Forgot password form
  const forgotPasswordForm = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onLogin = async (data: LoginForm) => {
    const result = await login(data.email, data.password);
    
    if (result.success) {
      toast.success(t('messages.success'));
      navigate('/');
    } else {
      toast.error(result.error || t('messages.error'));
    }
  };

  const onRegister = async (data: RegisterForm) => {
    const result = await register({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    });
    
    if (result.success) {
      toast.success(t('messages.success'));
      navigate('/');
    } else {
      toast.error(result.error || t('messages.error'));
    }
  };

  const onForgotPassword = async (data: ForgotPasswordForm) => {
    const result = await forgotPassword(data.email);
    
    if (result.success) {
      setForgotPasswordSent(true);
      toast.success('Password reset email sent!');
    } else {
      toast.error(result.error || t('messages.error'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common:navigation.home')}
          </Button>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Ve-Shop
            </h1>
          </div>
        </div>

        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {activeTab === 'login' && t('login.title')}
              {activeTab === 'register' && t('register.title')}
              {activeTab === 'forgot' && 'Reset Password'}
            </CardTitle>
            <CardDescription>
              {activeTab === 'login' && 'Welcome back! Please sign in to your account.'}
              {activeTab === 'register' && 'Create your account to start shopping.'}
              {activeTab === 'forgot' && 'Enter your email to reset your password.'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{t('login.sign_in')}</TabsTrigger>
                <TabsTrigger value="register">{t('register.create_account')}</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t('login.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder={t('login.email')}
                        className="pl-10"
                        {...loginForm.register('email')}
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {t(loginForm.formState.errors.email.message as string)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t('login.password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('login.password')}
                        className="pl-10 pr-10"
                        {...loginForm.register('password')}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {t(loginForm.formState.errors.password.message as string)}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        {...loginForm.register('rememberMe')}
                      />
                      <Label htmlFor="remember-me" className="text-sm">
                        {t('login.remember_me')}
                      </Label>
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setActiveTab('forgot')}
                      className="text-sm p-0 h-auto"
                    >
                      {t('login.forgot_password')}
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : t('login.sign_in')}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      {t('login.or')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full" disabled>
                    {t('login.sign_in_google')}
                  </Button>
                  <Button variant="outline" className="w-full" disabled>
                    {t('login.sign_in_facebook')}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  {t('login.no_account')}{' '}
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setActiveTab('register')}
                    className="p-0 h-auto text-primary"
                  >
                    {t('login.create_account')}
                  </Button>
                </p>

                {/* Demo credentials */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Demo Credentials:</p>
                  <p className="text-xs text-muted-foreground">Email: demo@veshop.com</p>
                  <p className="text-xs text-muted-foreground">Password: password123</p>
                  <p className="text-xs text-muted-foreground mt-1">Admin: admin@veshop.com</p>
                </div>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">{t('register.first_name')}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="first-name"
                          placeholder={t('register.first_name')}
                          className="pl-10"
                          {...registerForm.register('firstName')}
                        />
                      </div>
                      {registerForm.formState.errors.firstName && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {t(registerForm.formState.errors.firstName.message as string)}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last-name">{t('register.last_name')}</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="last-name"
                          placeholder={t('register.last_name')}
                          className="pl-10"
                          {...registerForm.register('lastName')}
                        />
                      </div>
                      {registerForm.formState.errors.lastName && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {t(registerForm.formState.errors.lastName.message as string)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t('register.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder={t('register.email')}
                        className="pl-10"
                        {...registerForm.register('email')}
                      />
                    </div>
                    {registerForm.formState.errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {t(registerForm.formState.errors.email.message as string)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('register.phone')}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={t('register.phone')}
                        className="pl-10"
                        {...registerForm.register('phone')}
                      />
                    </div>
                    {registerForm.formState.errors.phone && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {t(registerForm.formState.errors.phone.message as string)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t('register.password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('register.password')}
                        className="pl-10 pr-10"
                        {...registerForm.register('password')}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {registerForm.formState.errors.password && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {t(registerForm.formState.errors.password.message as string)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t('register.confirm_password')}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={t('register.confirm_password')}
                        className="pl-10 pr-10"
                        {...registerForm.register('confirmPassword')}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {registerForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {t(registerForm.formState.errors.confirmPassword.message as string)}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accept-terms"
                      {...registerForm.register('acceptTerms')}
                    />
                    <Label htmlFor="accept-terms" className="text-sm">
                      {t('register.terms_agreement')}
                    </Label>
                  </div>
                  {registerForm.formState.errors.acceptTerms && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {t(registerForm.formState.errors.acceptTerms.message as string)}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : t('register.create_account')}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  {t('register.already_have_account')}{' '}
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setActiveTab('login')}
                    className="p-0 h-auto text-primary"
                  >
                    {t('register.sign_in')}
                  </Button>
                </p>
              </TabsContent>
            </Tabs>

            {/* Forgot Password Modal/Section */}
            {activeTab === 'forgot' && (
              <div className="space-y-4">
                {!forgotPasswordSent ? (
                  <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPassword)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="forgot-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          {...forgotPasswordForm.register('email')}
                        />
                      </div>
                      {forgotPasswordForm.formState.errors.email && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {t(forgotPasswordForm.formState.errors.email.message as string)}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending...' : 'Send Reset Email'}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setActiveTab('login')}
                      className="w-full"
                    >
                      Back to Login
                    </Button>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Check your email</h3>
                      <p className="text-sm text-muted-foreground">
                        We've sent password reset instructions to your email address.
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setActiveTab('login');
                        setForgotPasswordSent(false);
                      }}
                      className="w-full"
                    >
                      Back to Login
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}