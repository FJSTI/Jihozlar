import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash, QrCode, Calendar, Tag, MapPin } from 'lucide-react';
import { mockEquipment, mockDepartments } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { EquipmentType, EquipmentStatus, Role } from '../../types';
import StatusBadge from '../../components/equipment/StatusBadge';
import { toast } from 'react-hot-toast';
import EquipmentQrModal from '../../components/equipment/EquipmentQrModal';

const EquipmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showQrModal, setShowQrModal] = React.useState(false);
  
  const equipment = mockEquipment.find(e => e.id === id);
  const department = mockDepartments.find(d => d.id === equipment?.departmentId);
  
  if (!equipment) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Jihoz topilmadi</h2>
        <Link to="/equipment" className="mt-4 text-blue-600 hover:text-blue-800">
          Jihozlar ro'yxatiga qaytish
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Haqiqatan ham bu jihozni o\'chirmoqchimisiz?')) {
      // In a real application, you would make an API request to delete
      toast.success('Jihoz muvaffaqiyatli o\'chirildi');
      navigate('/equipment');
    }
  };

  const getEquipmentTypeLabel = (type: EquipmentType): string => {
    switch (type) {
      case EquipmentType.COMPUTER: return 'Kompyuter';
      case EquipmentType.MEDICAL: return 'Tibbiy';
      case EquipmentType.FURNITURE: return 'Mebel';
      case EquipmentType.OTHER: return 'Boshqa';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to="/equipment"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
            Orqaga
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{equipment.name}</h1>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <QrCode className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
            QR kod
          </button>
          
          {user?.role === Role.ADMIN && (
            <>
              <Link
                to={`/equipment/edit/${equipment.id}`}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <Edit className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                Tahrirlash
              </Link>
              
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <Trash className="-ml-0.5 mr-1.5 h-5 w-5" />
                O'chirish
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Image and Main Info */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                <img
                  src={equipment.image}
                  alt={equipment.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Asosiy ma'lumotlar</h3>
                <dl className="mt-2 divide-y divide-gray-200">
                  <div className="flex justify-between py-3">
                    <dt className="text-sm font-medium text-gray-500">Holati</dt>
                    <dd className="text-sm text-right">
                      <StatusBadge status={equipment.status} />
                    </dd>
                  </div>
                  <div className="flex justify-between py-3">
                    <dt className="text-sm font-medium text-gray-500">Seriya raqami</dt>
                    <dd className="text-sm text-gray-900">{equipment.serialNumber}</dd>
                  </div>
                  <div className="flex justify-between py-3">
                    <dt className="text-sm font-medium text-gray-500">Turi</dt>
                    <dd className="text-sm text-gray-900">{getEquipmentTypeLabel(equipment.type)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Batafsil ma'lumot</h3>
              
              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <h4 className="ml-2 text-sm font-medium text-gray-500">Sotib olingan sana</h4>
                  </div>
                  <p className="mt-2 text-sm text-gray-900">{equipment.purchaseDate}</p>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-gray-400" />
                    <h4 className="ml-2 text-sm font-medium text-gray-500">Bo'lim</h4>
                  </div>
                  <p className="mt-2 text-sm text-gray-900">{department?.name || 'Bo\'lim ko\'rsatilmagan'}</p>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <h4 className="ml-2 text-sm font-medium text-gray-500">Joylashuvi</h4>
                  </div>
                  <p className="mt-2 text-sm text-gray-900">
                    {department?.location || 'Joylashuv ko\'rsatilmagan'}, Xona {equipment.roomNumber}
                  </p>
                </div>
                
                {equipment.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Qo'shimcha ma'lumot</h4>
                    <p className="mt-2 text-sm text-gray-900">{equipment.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Activity log could be added here */}
          <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-6 py-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Faoliyat tarixi</h3>
            </div>
            <div className="border-t border-gray-200 px-6 py-5">
              <p className="text-sm text-gray-500 italic">Bu jihozda hali faoliyat qayd etilmagan.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* QR Modal */}
      {showQrModal && (
        <EquipmentQrModal 
          equipment={equipment} 
          onClose={() => setShowQrModal(false)} 
        />
      )}
    </div>
  );
};

export default EquipmentDetail;