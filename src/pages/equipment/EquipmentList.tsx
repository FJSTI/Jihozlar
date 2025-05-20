import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, Search, FileDown, QrCode } from 'lucide-react';
import { mockEquipment } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Equipment, EquipmentStatus, EquipmentType, Role } from '../../types';
import StatusBadge from '../../components/equipment/StatusBadge';
import EquipmentQrModal from '../../components/equipment/EquipmentQrModal';
import { exportToExcel } from '../../utils/exportUtils';

const EquipmentList: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<EquipmentStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<EquipmentType | 'all'>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  // Filter equipment based on search and filters
  const filteredEquipment = useMemo(() => {
    return mockEquipment.filter((equipment) => {
      // Text search
      const matchesSearch = 
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = filterStatus === 'all' || equipment.status === filterStatus;
      
      // Type filter
      const matchesType = filterType === 'all' || equipment.type === filterType;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, filterStatus, filterType]);

  const handleExportExcel = () => {
    exportToExcel(filteredEquipment, 'jihozlar_royxati');
  };

  const openQrModal = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setShowQrModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jihozlar ro'yxati</h1>
          <p className="mt-2 text-sm text-gray-700">
            Institutning barcha jihozlari ro'yxati
          </p>
        </div>
        {user?.role === Role.ADMIN && (
          <Link
            to="/equipment/add"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Yangi jihoz qo'shish
          </Link>
        )}
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <label htmlFor="search" className="sr-only">
            Qidirish
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Nom yoki seriya raqami bo'yicha qidirish..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="sr-only">
            Holati bo'yicha
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Filter className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <select
              id="status"
              name="status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as EquipmentStatus | 'all')}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="all">Barcha holatlar</option>
              <option value={EquipmentStatus.NEW}>Yangi</option>
              <option value={EquipmentStatus.USED}>Ishlatilgan</option>
              <option value={EquipmentStatus.BROKEN}>Buzilgan</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="type" className="sr-only">
            Turi bo'yicha
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Filter className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <select
              id="type"
              name="type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as EquipmentType | 'all')}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="all">Barcha turlar</option>
              <option value={EquipmentType.COMPUTER}>Kompyuter</option>
              <option value={EquipmentType.MEDICAL}>Tibbiy</option>
              <option value={EquipmentType.FURNITURE}>Mebel</option>
              <option value={EquipmentType.OTHER}>Boshqa</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-2 md:col-span-4">
          <button
            type="button"
            onClick={handleExportExcel}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <FileDown className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Excel
          </button>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Jihoz nomi
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Turi
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Bo'lim
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Joylashuvi
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Holati
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Seriya raqami
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Amallar</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredEquipment.map((equipment) => (
                <tr key={equipment.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-md object-cover" src={equipment.image} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{equipment.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {equipment.type === EquipmentType.COMPUTER && 'Kompyuter'}
                    {equipment.type === EquipmentType.MEDICAL && 'Tibbiy'}
                    {equipment.type === EquipmentType.FURNITURE && 'Mebel'}
                    {equipment.type === EquipmentType.OTHER && 'Boshqa'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {/* Use the departmentId to get the department name from mockDepartments */}
                    {equipment.departmentId === '1' && 'Jarrohlik bo\'limi'}
                    {equipment.departmentId === '2' && 'Nevrologiya bo\'limi'}
                    {equipment.departmentId === '3' && 'Terapiya bo\'limi'}
                    {equipment.departmentId === '4' && 'Laboratoriya'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {equipment.roomNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <StatusBadge status={equipment.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {equipment.serialNumber}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/equipment/${equipment.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Ko'rish
                      </Link>
                      {user?.role === Role.ADMIN && (
                        <Link
                          to={`/equipment/edit/${equipment.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Tahrirlash
                        </Link>
                      )}
                      <button
                        onClick={() => openQrModal(equipment)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <QrCode className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && selectedEquipment && (
        <EquipmentQrModal
          equipment={selectedEquipment}
          onClose={() => setShowQrModal(false)}
        />
      )}
    </div>
  );
};

export default EquipmentList;