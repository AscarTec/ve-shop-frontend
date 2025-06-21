
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { facilitiesService, SwimmingActivity, FieldActivity } from '@/services/facilities';
import { FacilityModal } from './FacilityModal';
import { useToast } from '@/hooks/use-toast';

const FacilitiesManagement = () => {
  const [swimmingActivities, setSwimmingActivities] = useState<SwimmingActivity[]>([]);
  const [fieldActivities, setFieldActivities] = useState<FieldActivity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<SwimmingActivity | FieldActivity | null>(null);
  const [facilityType, setFacilityType] = useState<'swimming' | 'field'>('swimming');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const [swimming, field] = await Promise.all([
        facilitiesService.getSwimmingActivities(),
        facilitiesService.getFieldActivities()
      ]);
      setSwimmingActivities(swimming);
      setFieldActivities(field);
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في تحميل المرافق',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFacility = (type: 'swimming' | 'field') => {
    setFacilityType(type);
    setSelectedFacility(null);
    setIsModalOpen(true);
  };

  const handleEditFacility = (facility: SwimmingActivity | FieldActivity, type: 'swimming' | 'field') => {
    setFacilityType(type);
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  const handleDeleteFacility = async (id: number, type: 'swimming' | 'field') => {
    if (!confirm('هل أنت متأكد من حذف هذا المرفق؟')) return;

    try {
      if (type === 'swimming') {
        await facilitiesService.deleteSwimmingActivity(id);
      } else {
        await facilitiesService.deleteFieldActivity(id);
      }
      await fetchFacilities();
      toast({
        title: 'تم الحذف',
        description: 'تم حذف المرفق بنجاح'
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'فشل في حذف المرفق',
        variant: 'destructive'
      });
    }
  };

  const handleModalSave = async () => {
    await fetchFacilities();
    setIsModalOpen(false);
  };

  const filterFacilities = (facilities: (SwimmingActivity | FieldActivity)[]) => {
    return facilities.filter(facility =>
      facility.title_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (facility.title_en && facility.title_en.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const FacilityCard = ({ facility, type }: { facility: SwimmingActivity | FieldActivity; type: 'swimming' | 'field' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">{facility.title_ar}</CardTitle>
            <Badge variant={facility.active ? 'default' : 'secondary'}>
              {facility.active ? 'نشط' : 'غير نشط'}
            </Badge>
          </div>
          {facility.title_en && (
            <CardDescription className="text-sm text-gray-600">{facility.title_en}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">نوع الوحدة:</span>
              <p>{facility.unit_type === 'hour' ? 'ساعة' : 'جلسة'}</p>
            </div>
            <div>
              <span className="font-medium">السعر:</span>
              <p className="text-lg font-bold text-green-600">{facility.price} ر.س</p>
            </div>
            <div>
              <span className="font-medium">نسبة المقدم:</span>
              <p>{facility.deposit_percentage}%</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEditFacility(facility, type)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 hover:bg-red-50"
              onClick={() => handleDeleteFacility(facility.id, type)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold">إدارة المرافق</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في المرافق..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="swimming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="swimming">أنشطة السباحة</TabsTrigger>
          <TabsTrigger value="field">أنشطة الملاعب</TabsTrigger>
        </TabsList>

        <TabsContent value="swimming" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">أنشطة السباحة</h2>
            <Button onClick={() => handleCreateFacility('swimming')}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة نشاط سباحة
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterFacilities(swimmingActivities).map((facility) => (
              <FacilityCard key={facility.id} facility={facility} type="swimming" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="field" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">أنشطة الملاعب</h2>
            <Button onClick={() => handleCreateFacility('field')}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة نشاط ملعب
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterFacilities(fieldActivities).map((facility) => (
              <FacilityCard key={facility.id} facility={facility} type="field" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <FacilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        facility={selectedFacility}
        type={facilityType}
      />
    </div>
  );
};

export default FacilitiesManagement;
