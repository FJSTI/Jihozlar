import React, { useState } from 'react';
import { mockDepartments } from '../../data/mockData';
import { Building2, Edit, Trash, Plus, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Department } from '../../types';

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    description: ''
  });

  const openModal = (department?: Department) => {
    if (department) {
      setEditingDepartment(department);
      setFormData({
        id: department.id,
        name: department.name,
        location: department.location,
        description: department.description || ''
      });
    } else {
      setEditingDepartment(null);
      setFormData({
        id: '',
        name: '',
        location: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location) {
      toast.error("Bo'lim nomi va joylashuvini to'ldiring");
      return;
    }
    
    if (editingDepartment) {
      // Update existing department
      const updatedDepartments = departments.map(dept => 
        dept.id === editingDepartment.id ? { ...dept, ...formData } : dept
      );
      setDepartments(updatedDepartments);
      toast.success("Bo'lim muvaffaqiyatli yangilandi");
    } else {
      // Add new department
      const newDepartment: Department = {
        id: Date.now().toString(),
        name: formData.name,
        location: formData.location,
        description: formData.description,
        headId: null
      };
      setDepartments([...departments, newDepartment]);
      toast.success("Yangi bo'lim qo'shildi");
    }
    
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Haqiqatan ham bu bo'limni o'chirmoqchimisiz?")) {
      setDepartments(departments.filter(dept => dept.id !== id));
      toast.success("Bo'lim muvaffaqiyatli o'chirildi");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bo'limlar</h1>
          <p className="mt-2 text-sm text-gray-700">
            Institut bo'limlari va ularning ma'lumotlari
          </p>
        </div>
        <button
          type="button"
          onClick={() => openModal()}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Yangi bo'lim qo'shish
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <div
            key={department.id}
            className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{department.name}</h3>
                  <p className="text-sm text-gray-500">{department.location}</p>
                </div>
              </div>
              
              {department.description && (
                <p className="mt-4 text-sm text-gray-600">{department.description}</p>
              )}
              
              <div className="mt-5 flex items-center text-sm text-gray-500">
                <Users className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <span>
                  Bo'lim boshlig'i: {department.headId ? 'Mavjud' : 'Tayinlanmagan'}
                </span>
              </div>
              
              <div className="mt-5 flex space-x-3">
                <button
                  type="button"
                  onClick={() => openModal(department)}
                  className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <Edit className="-ml-0.5 mr-1.5 h-4 w-4 text-gray-400" aria-hidden="true" />
                  Tahrirlash
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(department.id)}
                  className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50"
                >
                  <Trash className="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
                  O'chirish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Department Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>

            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={closeModal}
                >
                  <span className="sr-only">Close</span>
                  <Trash className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {editingDepartment ? "Bo'limni tahrirlash" : "Yangi bo'lim qo'shish"}
                  </h3>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Bo'lim nomi *
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                          Joylashuvi *
                        </label>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          required
                          value={formData.location}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Tavsif
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          rows={3}
                          value={formData.description}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {editingDepartment ? "Saqlash" : "Qo'shish"}
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                          onClick={closeModal}
                        >
                          Bekor qilish
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;