import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2 } from 'lucide-react';

const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
            <Building2 className="h-12 w-12 text-blue-600" />
            <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Fargʻona jamoat salomatligi tibbiyot instituti
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Jihozlarni ro'yxatga olish tizimi
            </p>
          </div>
          <Outlet />
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Medical institute"
        />
      </div>
    </div>
  );
};

export default AuthLayout;