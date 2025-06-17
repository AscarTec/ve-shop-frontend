
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('يرجى إدخال بريد إلكتروني صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

type LoginForm = z.infer<typeof loginSchema>;

interface AuthCardProps {
  onClose: () => void;
}

const AuthCard: React.FC<AuthCardProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast({
          title: 'خطأ في تسجيل الدخول',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'تم تسجيل الدخول بنجاح',
          description: 'مرحباً بك في النظام',
        });
        onClose();
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ غير متوقع',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">تسجيل الدخول</h2>
        <p className="text-gray-600">ادخل بياناتك للوصول إلى حسابك</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right block">البريد الإلكتروني</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="email"
                      placeholder="example@domain.com"
                      className="pr-10 text-right"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right block">كلمة المرور</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pr-10 text-right"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-right" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-medium transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                جاري تسجيل الدخول...
              </>
            ) : (
              'تسجيل الدخول'
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 space-y-4">
        <div className="text-center">
          <button
            onClick={() => {
              onClose();
              navigate('/reset-password');
            }}
            className="text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
          >
            نسيت كلمة المرور؟
          </button>
        </div>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-2">ليس لديك حساب؟</p>
          <button
            onClick={() => {
              onClose();
              navigate('/register');
            }}
            className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            إنشاء حساب جديد
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthCard;
