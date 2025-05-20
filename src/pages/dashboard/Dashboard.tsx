import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Package, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { mockStats, mockEquipment, mockNotifications } from '../../data/mockData';
import { EquipmentStatus } from '../../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = () => {
  // Data for department chart
  const departmentChartData = {
    labels: mockStats.byDepartment.map(d => d.name),
    datasets: [
      {
        label: 'Jihozlar soni',
        data: mockStats.byDepartment.map(d => d.count),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for equipment type chart
  const typeChartData = {
    labels: mockStats.byType.map(t => t.name),
    datasets: [
      {
        label: 'Jihozlar soni',
        data: mockStats.byType.map(t => t.count),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900">Bosh sahifa</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Barcha jihozlar</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{mockStats.total}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Yangi jihozlar</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{mockStats.new}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-6 w-6 text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Ishlatilgan jihozlar</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{mockStats.used}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Buzilgan jihozlar</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{mockStats.broken}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <h2 className="text-lg font-medium text-gray-900">Bo'limlar bo'yicha jihozlar</h2>
            <div className="mt-4 h-64">
              <Bar 
                data={departmentChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <h2 className="text-lg font-medium text-gray-900">Jihozlar turlari</h2>
            <div className="mt-4 h-64 flex justify-center">
              <Doughnut 
                data={typeChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Equipment & Notifications */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <h2 className="text-lg font-medium text-gray-900">So'nggi qo'shilgan jihozlar</h2>
            <div className="mt-4 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {mockEquipment.slice(0, 3).map((equipment) => (
                  <li key={equipment.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img 
                          className="h-12 w-12 rounded-md object-cover" 
                          src={equipment.image} 
                          alt={equipment.name} 
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{equipment.name}</p>
                        <p className="truncate text-sm text-gray-500">
                          Seriya: {equipment.serialNumber}
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          equipment.status === EquipmentStatus.NEW 
                            ? 'bg-green-100 text-green-800' 
                            : equipment.status === EquipmentStatus.USED 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {equipment.status === EquipmentStatus.NEW ? 'Yangi' : 
                           equipment.status === EquipmentStatus.USED ? 'Ishlatilgan' : 'Buzilgan'}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="/equipment"
                className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Barcha jihozlarni ko'rish
              </a>
            </div>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <h2 className="text-lg font-medium text-gray-900">Bildirishnomalar</h2>
            <div className="mt-4 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {mockNotifications.map((notification) => (
                  <li key={notification.id} className="py-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 pt-0.5">
                        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                          notification.isRead ? 'bg-gray-100' : 'bg-red-100'
                        }`}>
                          <AlertTriangle className={`h-5 w-5 ${
                            notification.isRead ? 'text-gray-500' : 'text-red-500'
                          }`} />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-500">{notification.message}</p>
                        <p className="mt-1 text-xs text-gray-400">{notification.createdAt}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Barcha bildirishnomalarni ko'rish
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;