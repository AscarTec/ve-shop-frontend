
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ConfirmDeleteModal from '@/components/forms/ConfirmDeleteModal';
import { toast } from '@/hooks/use-toast';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  address: string;
  emergencyContact: string;
  createdAt: string;
}

const ClientList = () => {
  const { t } = useTranslation();
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Ahmed Mohamed',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      dateOfBirth: '1990-05-15',
      gender: 'male',
      address: 'Riyadh, Saudi Arabia',
      emergencyContact: '+966509876543',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Fatima Al-Zahra',
      email: 'fatima@example.com',
      phone: '+966507654321',
      dateOfBirth: '1985-12-20',
      gender: 'female',
      address: 'Jeddah, Saudi Arabia',
      emergencyContact: '+966501111111',
      createdAt: '2024-01-10'
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; clientId: string | null; clientName: string }>({
    isOpen: false,
    clientId: null,
    clientName: ''
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleDeleteClick = (client: Client) => {
    setDeleteModal({
      isOpen: true,
      clientId: client.id,
      clientName: client.name
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.clientId) {
      setClients(prev => prev.filter(c => c.id !== deleteModal.clientId));
      toast({
        title: t('success'),
        description: t('client_deleted_successfully'),
      });
    }
    setDeleteModal({ isOpen: false, clientId: null, clientName: '' });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, clientId: null, clientName: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t('clients')}
        </h1>
        <Button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          {t('add_client')}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t('search_clients')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('email')}</TableHead>
                <TableHead className="hidden sm:table-cell">{t('phone')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('gender')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('created_at')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{client.name}</div>
                      <div className="text-sm text-gray-500 md:hidden">{client.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{client.email}</TableCell>
                  <TableCell className="hidden sm:table-cell">{client.phone}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="capitalize">{t(client.gender)}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                        <span className="hidden sm:inline ml-2">{t('edit')}</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteClick(client)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline ml-2">{t('delete')}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message={t('are_you_sure_delete_client')}
        itemName={deleteModal.clientName}
      />
    </div>
  );
};

export default ClientList;
