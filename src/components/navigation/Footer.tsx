import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between text-sm text-gray-500">
          <div>
            &copy; {currentYear} Fargʻona jamoat salomatligi tibbiyot instituti
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-900">
              Yordam
            </a>
            <a href="#" className="hover:text-gray-900">
              Biz haqimizda
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;