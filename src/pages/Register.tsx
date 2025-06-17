
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const registerSchema = z.object({
  fullName: z.string().min(2, 'الاسم الكامل مطلوب'),
  email: z.string().email('يرجى إدخال بريد إلكتروني صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        toast({
          title: 'خطأ في إنشاء الحساب',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'تم إنشاء الحساب بنجاح',
          description: 'يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب',
        });
        navigate('/');
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">إنشاء حساب جديد</h1>
          <p className="text-gray-600">انضم إلينا واحجز أنشطتك الرياضية</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right block">الاسم الكامل</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="أدخل اسمك الكامل"
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right block">تأكيد كلمة المرور</FormLabel>
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
                  جاري إنشاء الحساب...
                </>
              ) : (
                'إنشاء الحساب'
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm mb-4">لديك حساب بالفعل؟</p>
          <Link
            to="/"
            className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة لتسجيل الدخول
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
