import React, { useState } from 'react';
import { FileDown, Filter, QrCode, Printer } from 'lucide-react';
import { mockEquipment, mockDepartments } from '../../data/mockData';
import { EquipmentStatus, EquipmentType, ReportFilter } from '../../types';
import { exportToExcel } from '../../utils/exportUtils';
import { useReactToPrint } from 'react-to-print';

const Reports: React.FC = () => {
  const printRef = React.useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<ReportFilter>({
    startDate: '',
    endDate: '',
    departmentId: '',
    equipmentStatus: undefined,
    equipmentType: undefined,
  });

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value === 'all' ? undefined : value }));
  };

  const applyFilters = () => {
    let filteredData = [...mockEquipment];
    
    if (filter.startDate) {
      filteredData = filteredData.filter(item => 
        new Date(item.purchaseDate) >= new Date(filter.startDate!)
      );
    }
    
    if (filter.endDate) {
      filteredData = filteredData.filter(item => 
        new Date(item.purchaseDate) <= new Date(filter.endDate!)
      );
    }
    
    if (filter.departmentId) {
      filteredData = filteredData.filter(item => 
        item.departmentId === filter.departmentId
      );
    }
    
    if (filter.equipmentStatus) {
      filteredData = filteredData.filter(item => 
        item.status === filter.equipmentStatus
      );
    }
    
    if (filter.equipmentType) {
      filteredData = filteredData.filter(item => 
        item.type === filter.equipmentType
      );
    }
    
    return filteredData;
  };

  const filteredEquipment = applyFilters();

  const handleExportExcel = () => {
    exportToExcel(filteredEquipment, 'jihozlar_hisoboti');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hisobotlar</h1>
          <p className="mt-2 text-sm text-gray-700">
            Jihozlar bo'yicha hisobotlar yaratish va eksport qilish
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            type="button"
            onClick={handleExportExcel}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <FileDown className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
            Excel
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Printer className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
            Chop etish
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <QrCode className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
            Inventarizatsiya QR
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Filtrlar</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Boshlang'ich sana
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={filter.startDate}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              Yakuniy sana
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={filter.endDate}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">
              Bo'lim
            </label>
            <select
              id="departmentId"
              name="departmentId"
              value={filter.departmentId || ''}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">Barcha bo'limlar</option>
              {mockDepartments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="equipmentStatus" className="block text-sm font-medium text-gray-700">
              Holati
            </label>
            <select
              id="equipmentStatus"
              name="equipmentStatus"
              value={filter.equipmentStatus || 'all'}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">Barcha holatlar</option>
              <option value={EquipmentStatus.NEW}>Yangi</option>
              <option value={EquipmentStatus.USED}>Ishlatilgan</option>
              <option value={EquipmentStatus.BROKEN}>Buzilgan</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="equipmentType" className="block text-sm font-medium text-gray-700">
              Jihoz turi
            </label>
            <select
              id="equipmentType"
              name="equipmentType"
              value={filter.equipmentType || 'all'}
              onChange={handleFilterChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">Barcha turlar</option>
              <option value={EquipmentType.COMPUTER}>Kompyuter</option>
              <option value={EquipmentType.MEDICAL}>Tibbiy</option>
              <option value={EquipmentType.FURNITURE}>Mebel</option>
              <option value={EquipmentType.OTHER}>Boshqa</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setFilter({
              startDate: '',
              endDate: '',
              departmentId: '',
              equipmentStatus: undefined,
              equipmentType: undefined,
            })}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Tozalash
          </button>
        </div>
      </div>

      {/* Report Results */}
      <div ref={printRef} className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 print:text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Jihozlar hisoboti</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {new Date().toLocaleDateString('uz-UZ')} holatiga koʻra
          </p>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
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
                    Xona
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Seriya raqami
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Sotib olingan sana
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Holati
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredEquipment.map((equipment) => (
                  <tr key={equipment.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {equipment.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {equipment.type === EquipmentType.COMPUTER && 'Kompyuter'}
                      {equipment.type === EquipmentType.MEDICAL && 'Tibbiy'}
                      {equipment.type === EquipmentType.FURNITURE && 'Mebel'}
                      {equipment.type === EquipmentType.OTHER && 'Boshqa'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {mockDepartments.find(d => d.id === equipment.departmentId)?.name || 'Noma\'lum'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {equipment.roomNumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {equipment.serialNumber}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {equipment.purchaseDate}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {equipment.status === EquipmentStatus.NEW && 'Yangi'}
                      {equipment.status === EquipmentStatus.USED && 'Ishlatilgan'}
                      {equipment.status === EquipmentStatus.BROKEN && 'Buzilgan'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredEquipment.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              Ushbu filtrlar bo'yicha ma'lumotlar topilmadi.
            </div>
          )}
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Jihozlar soni</dt>
                <dd className="mt-1 text-sm text-gray-900">{filteredEquipment.length}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Yangi jihozlar</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {filteredEquipment.filter(e => e.status === EquipmentStatus.NEW).length}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Buzilgan jihozlar</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {filteredEquipment.filter(e => e.status === EquipmentStatus.BROKEN).length}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;