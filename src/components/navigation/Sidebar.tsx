import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Building2, 
  FileText, 
  Settings,
  Building 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navigation = [
    { name: 'Bosh sahifa', href: '/', icon: LayoutDashboard, roles: [Role.ADMIN, Role.DEPARTMENT_HEAD, Role.GUEST] },
    { name: 'Jihozlar', href: '/equipment', icon: Package, roles: [Role.ADMIN, Role.DEPARTMENT_HEAD, Role.GUEST] },
    { name: "Bo'limlar", href: '/departments', icon: Building2, roles: [Role.ADMIN, Role.DEPARTMENT_HEAD] },
    { name: 'Hisobotlar', href: '/reports', icon: FileText, roles: [Role.ADMIN, Role.DEPARTMENT_HEAD] },
    { name: 'Sozlamalar', href: '/settings', icon: Settings, roles: [Role.ADMIN] },
  ];

  const filteredNavigation = navigation.filter(
    item => user && item.roles.includes(user.role)
  );

  return (
    <div className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-white md:flex md:flex-col">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <Building className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-lg font-semibold text-gray-900">FJSTI Jihozlar</span>
        </div>
        <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon
                className="mr-3 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;