import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { User as UserType } from '../../types';

interface UserMenuProps {
  user: UserType | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const { logout } = useAuth();
  
  if (!user) return null;

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <span className="text-sm font-medium">{user.name.charAt(0)}</span>
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm">Xush kelibsiz,</p>
            <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
          </div>
          
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center px-4 py-2 text-sm text-gray-700`}
              >
                <User className="mr-3 h-4 w-4" />
                Profil
              </a>
            )}
          </Menu.Item>
          
          <Menu.Item>
            {({ active }) => (
              <a
                href="/settings"
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center px-4 py-2 text-sm text-gray-700`}
              >
                <Settings className="mr-3 h-4 w-4" />
                Sozlamalar
              </a>
            )}
          </Menu.Item>
          
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={logout}
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Chiqish
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;