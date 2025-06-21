
import React from 'react';
import { Target } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "الخدمات",
      items: ["حجز السباحة", "حجز الملاعب", "الدروس الخاصة", "الأنشطة الجماعية"]
    },
    {
      title: "الشركة", 
      items: ["من نحن", "فريق العمل", "المدونة", "الوظائف"]
    },
    {
      title: "الدعم",
      items: ["مركز المساعدة", "تواصل معنا", "الأسئلة الشائعة", "سياسة الخصوصية"]
    }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Sports Hub</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              منصة الحجز الرياضي الرائدة في المملكة العربية السعودية
            </p>
          </div>
          
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 Sports Hub. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
