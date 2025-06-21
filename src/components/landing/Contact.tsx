
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Contact = () => {
  const contactInfo = [
    { icon: Phone, title: "اتصل بنا", info: "+966 50 123 4567", color: "from-green-500 to-emerald-500" },
    { icon: Mail, title: "راسلنا", info: "info@sportshub.com", color: "from-blue-500 to-cyan-500" },
    { icon: MapPin, title: "موقعنا", info: "الرياض، المملكة العربية السعودية", color: "from-purple-500 to-pink-500" }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
          <p className="text-xl text-gray-600">نحن هنا لمساعدتك في أي وقت</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{contact.title}</h3>
                  <p className="text-gray-600 font-medium">{contact.info}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
