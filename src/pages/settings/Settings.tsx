import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Shield, Bell, Users, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [generalSettings, setGeneralSettings] = useState({
    instituteName: 'Fargʻona jamoat salomatligi tibbiyot instituti',
    instituteLogo: '',
    language: 'uz',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    sendMaintenanceAlerts: true,
    daysBeforeMaintenance: 30,
  });

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Sozlamalar saqlandi');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sozlamalar</h1>
        <p className="mt-2 text-sm text-gray-700">
          Tizim sozlamalarini boshqarish
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            <a
              href="#general"
              className="bg-blue-50 border-blue-500 text-blue-700 group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              <Shield className="-ml-1 mr-3 h-5 w-5 text-blue-500" />
              <span className="truncate">Umumiy sozlamalar</span>
            </a>
            <a
              href="#notifications"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
            >
              <Bell className="-ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              <span className="truncate">Bildirishnomalar</span>
            </a>
            <a
              href="#users"
              className="border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
            >
              <Users className="-ml-1 mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              <span className="truncate">Foydalanuvchilar</span>
            </a>
          </nav>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSaveSettings}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
                <div>
                  <h2 id="general" className="text-lg font-medium leading-6 text-gray-900">Umumiy sozlamalar</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Tizimning asosiy sozlamalari
                  </p>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="instituteName" className="block text-sm font-medium text-gray-700">
                      Institut nomi
                    </label>
                    <input
                      type="text"
                      name="instituteName"
                      id="instituteName"
                      value={generalSettings.instituteName}
                      onChange={handleGeneralSettingsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="instituteLogo" className="block text-sm font-medium text-gray-700">
                      Institut logo havolasi (ixtiyoriy)
                    </label>
                    <input
                      type="text"
                      name="instituteLogo"
                      id="instituteLogo"
                      value={generalSettings.instituteLogo}
                      onChange={handleGeneralSettingsChange}
                      placeholder="https://example.com/logo.png"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                      Til
                    </label>
                    <select
                      id="language"
                      name="language"
                      value={generalSettings.language}
                      onChange={handleGeneralSettingsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="uz">O'zbek</option>
                      <option value="ru">Русский</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-6 bg-white px-4 py-6 sm:p-6 border-t border-gray-200">
                <div>
                  <h2 id="notifications" className="text-lg font-medium leading-6 text-gray-900">Bildirishnomalar</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Bildirishnomalar va eslatmalar sozlamalari
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="enableEmailNotifications"
                        name="enableEmailNotifications"
                        type="checkbox"
                        checked={notificationSettings.enableEmailNotifications}
                        onChange={handleNotificationSettingsChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="enableEmailNotifications" className="font-medium text-gray-700">
                        Email bildirishnomalarini yoqish
                      </label>
                      <p className="text-gray-500">
                        Tizim hodimlariga email orqali bildirishnomalar yuborish.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="sendMaintenanceAlerts"
                        name="sendMaintenanceAlerts"
                        type="checkbox"
                        checked={notificationSettings.sendMaintenanceAlerts}
                        onChange={handleNotificationSettingsChange}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="sendMaintenanceAlerts" className="font-medium text-gray-700">
                        Xizmat muddati eslatmalarini yuborish
                      </label>
                      <p className="text-gray-500">
                        Jihozlarning xizmat muddati tugashi haqida ogohlantirish.
                      </p>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="daysBeforeMaintenance" className="block text-sm font-medium text-gray-700">
                      Necha kun oldin eslatma yuborish
                    </label>
                    <input
                      type="number"
                      name="daysBeforeMaintenance"
                      id="daysBeforeMaintenance"
                      min="1"
                      max="90"
                      value={notificationSettings.daysBeforeMaintenance}
                      onChange={handleNotificationSettingsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="-ml-0.5 mr-1.5 h-5 w-5" />
                  Saqlash
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;