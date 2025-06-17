
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const resetSchema = z.object({
  email: z.string().email('يرجى إدخال بريد إلكتروني صحيح'),
});

type ResetForm = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ResetForm) => {
    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        toast({
          title: 'خطأ',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        setEmailSent(true);
        toast({
          title: 'تم إرسال الرابط',
          description: 'تحقق من بريدك الإلكتروني لإعادة تعيين كلمة المرور',
        });
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

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">تم إرسال الرابط</h2>
          <p className="text-gray-600 mb-8">
            تحقق من بريدك الإلكتروني واتبع التعليمات لإعادة تعيين كلمة المرور
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للصفحة الرئيسية
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">إعادة تعيين كلمة المرور</h1>
          <p className="text-gray-600">أدخل بريدك الإلكتروني لإرسال رابط إعادة التعيين</p>
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-medium transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                'إرسال رابط إعادة التعيين'
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
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

export default ResetPassword;
