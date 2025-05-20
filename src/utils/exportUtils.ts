import * as XLSX from 'xlsx';
import { Equipment, EquipmentStatus, EquipmentType } from '../types';

export const exportToExcel = (data: Equipment[], filename: string) => {
  // Map equipment statuses to readable names
  const mapStatus = (status: EquipmentStatus): string => {
    switch (status) {
      case EquipmentStatus.NEW: return 'Yangi';
      case EquipmentStatus.USED: return 'Ishlatilgan';
      case EquipmentStatus.BROKEN: return 'Buzilgan';
      default: return status;
    }
  };

  // Map equipment types to readable names
  const mapType = (type: EquipmentType): string => {
    switch (type) {
      case EquipmentType.COMPUTER: return 'Kompyuter';
      case EquipmentType.MEDICAL: return 'Tibbiy';
      case EquipmentType.FURNITURE: return 'Mebel';
      case EquipmentType.OTHER: return 'Boshqa';
      default: return type;
    }
  };

  // Map department IDs to names
  const mapDepartment = (departmentId: string): string => {
    switch (departmentId) {
      case '1': return 'Jarrohlik bo\'limi';
      case '2': return 'Nevrologiya bo\'limi';
      case '3': return 'Terapiya bo\'limi';
      case '4': return 'Laboratoriya';
      default: return 'Noma\'lum bo\'lim';
    }
  };

  // Transform data for export
  const exportData = data.map(item => ({
    'Jihoz nomi': item.name,
    'Turi': mapType(item.type),
    'Seriya raqami': item.serialNumber,
    'Sotib olingan sana': item.purchaseDate,
    'Bo\'lim': mapDepartment(item.departmentId),
    'Xona': item.roomNumber,
    'Holati': mapStatus(item.status),
    'Izoh': item.notes || ''
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  
  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Jihozlar');
  
  // Generate Excel file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPdf = (data: any, filename: string) => {
  // This would use jsPDF to create PDF exports
  // Implementation depends on specific PDF formatting requirements
  console.log('PDF export for', data, filename);
};