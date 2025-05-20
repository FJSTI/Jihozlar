import React from 'react';
import { EquipmentStatus } from '../../types';

interface StatusBadgeProps {
  status: EquipmentStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let classes = '';
  let label = '';

  switch (status) {
    case EquipmentStatus.NEW:
      classes = 'bg-green-100 text-green-800';
      label = 'Yangi';
      break;
    case EquipmentStatus.USED:
      classes = 'bg-blue-100 text-blue-800';
      label = 'Ishlatilgan';
      break;
    case EquipmentStatus.BROKEN:
      classes = 'bg-red-100 text-red-800';
      label = 'Buzilgan';
      break;
    default:
      classes = 'bg-gray-100 text-gray-800';
      label = 'Noma\'lum';
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${classes}`}
    >
      {label}
    </span>
  );
};

export default StatusBadge;