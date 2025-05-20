import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white pt-16 pb-12">
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
        <div className="flex flex-shrink-0 justify-center">
          <a href="/" className="inline-flex">
            <span className="sr-only">Fargʻona jamoat salomatligi tibbiyot instituti</span>
          </a>
        </div>
        <div className="py-16">
          <div className="text-center">
            <p className="text-base font-semibold text-blue-600">404</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Sahifa topilmadi</h1>
            <p className="mt-2 text-base text-gray-500">Kechirasiz, siz qidirayotgan sahifa mavjud emas.</p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <Home className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                Bosh sahifaga qaytish
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;