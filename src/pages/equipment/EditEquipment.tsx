import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { mockEquipment, mockDepartments } from '../../data/mockData';
import { EquipmentStatus, EquipmentType, Equipment } from '../../types';

const EditEquipment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Equipment>({
    id: '',
    name: '',
    type: EquipmentType.COMPUTER,
    serialNumber: '',
    purchaseDate: '',
    departmentId: '',
    roomNumber: '',
    status: EquipmentStatus.NEW,
    notes: '',
    image: ''
  });

  useEffect(() => {
    const equipment = mockEquipment.find(e => e.id === id);
    if (equipment) {
      setFormData(equipment);
    } else {
      toast.error('Jihoz topilmadi');
      navigate('/equipment');
    }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name) {
      toast.error('Iltimos, jihoz nomini kiriting');
      return;
    }
    
    if (!formData.serialNumber) {
      toast.error('Iltimos, seriya raqamini kiriting');
      return;
    }
    
    if (!formData.departmentId) {
      toast.error('Iltimos, bo\'limni tanlang');
      return;
    }
    
    // In a real application, you would make an API request to update
    toast.success('Jihoz muvaffaqiyatli yangilandi');
    navigate(`/equipment/${id}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <Link
            to={`/equipment/${id}`}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
            Orqaga
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Jihozni tahrirlash</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Asosiy ma'lumotlar</h3>
              <p className="mt-1 text-sm text-gray-500">
                Jihoz ma'lumotlarini yangilang
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Jihoz nomi *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Jihoz turi *
                </label>
                <div className="mt-1">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value={EquipmentType.COMPUTER}>Kompyuter</option>
                    <option value={EquipmentType.MEDICAL}>Tibbiy</option>
                    <option value={EquipmentType.FURNITURE}>Mebel</option>
                    <option value={EquipmentType.OTHER}>Boshqa</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
                  Seriya raqami *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="serialNumber"
                    id="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
                  Sotib olingan sana *
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="purchaseDate"
                    id="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Holati *
                </label>
                <div className="mt-1">
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value={EquipmentStatus.NEW}>Yangi</option>
                    <option value={EquipmentStatus.USED}>Ishlatilgan</option>
                    <option value={EquipmentStatus.BROKEN}>Buzilgan</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Joylashuv ma'lumotlari</h3>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">
                  Bo'lim *
                </label>
                <div className="mt-1">
                  <select
                    id="departmentId"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Tanlang</option>
                    {mockDepartments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">
                  Xona raqami *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="roomNumber"
                    id="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Rasm havolasi (ixtiyoriy)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="image"
                    id="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Jihoz rasmini havola sifatida kiriting
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Izohlar (ixtiyoriy)
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Jihoz haqida qo'shimcha ma'lumotlar
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link
              to={`/equipment/${id}`}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Bekor qilish
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save className="-ml-0.5 mr-1.5 h-5 w-5" />
              Saqlash
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEquipment;