// User related types
export enum Role {
  ADMIN = 'admin',
  DEPARTMENT_HEAD = 'department_head',
  GUEST = 'guest'
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  departmentId: string | null;
}

// Equipment related types
export enum EquipmentStatus {
  NEW = 'new',
  USED = 'used',
  BROKEN = 'broken'
}

export enum EquipmentType {
  COMPUTER = 'computer',
  MEDICAL = 'medical',
  FURNITURE = 'furniture',
  OTHER = 'other'
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  serialNumber: string;
  purchaseDate: string;
  departmentId: string;
  roomNumber: string;
  status: EquipmentStatus;
  image?: string;
  notes?: string;
}

// Department related types
export interface Department {
  id: string;
  name: string;
  headId: string | null;
  location: string;
  description?: string;
}

// Report related types
export interface ReportFilter {
  startDate?: string;
  endDate?: string;
  departmentId?: string;
  equipmentStatus?: EquipmentStatus;
  equipmentType?: EquipmentType;
}

// Notification related types
export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  userId: string;
  equipmentId?: string;
}