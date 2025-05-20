import { Equipment, EquipmentStatus, EquipmentType, Department, Notification } from '../types';
import { format, subDays, addDays } from 'date-fns';

// Mock departments
export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Jarrohlik bo\'limi',
    headId: '2',
    location: '1-bino, 2-qavat',
    description: 'Asosiy jarrohlik bo\'limi'
  },
  {
    id: '2',
    name: 'Nevrologiya bo\'limi',
    headId: null,
    location: '2-bino, 1-qavat',
    description: 'Nevrologik kasalliklar bo\'limi'
  },
  {
    id: '3',
    name: 'Terapiya bo\'limi',
    headId: null,
    location: '1-bino, 3-qavat',
    description: 'Ichki kasalliklar bo\'limi'
  },
  {
    id: '4',
    name: 'Laboratoriya',
    headId: null,
    location: '3-bino, 1-qavat',
    description: 'Markaziy laboratoriya'
  }
];

// Mock equipment
export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Noutbuk Dell Latitude',
    type: EquipmentType.COMPUTER,
    serialNumber: 'DL78923X',
    purchaseDate: format(subDays(new Date(), 180), 'yyyy-MM-dd'),
    departmentId: '1',
    roomNumber: '103',
    status: EquipmentStatus.NEW,
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    notes: 'Administratsiya uchun yangi noutbuk'
  },
  {
    id: '2',
    name: 'Monitor LG 27"',
    type: EquipmentType.COMPUTER,
    serialNumber: 'LG456789',
    purchaseDate: format(subDays(new Date(), 365), 'yyyy-MM-dd'),
    departmentId: '1',
    roomNumber: '103',
    status: EquipmentStatus.USED,
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    notes: 'Jarrohlik bo\'limi uchun'
  },
  {
    id: '3',
    name: 'Ultratovush apparati Philips',
    type: EquipmentType.MEDICAL,
    serialNumber: 'PH78923XYZ',
    purchaseDate: format(subDays(new Date(), 90), 'yyyy-MM-dd'),
    departmentId: '2',
    roomNumber: '205',
    status: EquipmentStatus.NEW,
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    notes: 'Nevrologiya bo\'limi uchun yangi ultratovush apparati'
  },
  {
    id: '4',
    name: 'Stol va stul komplekti',
    type: EquipmentType.FURNITURE,
    serialNumber: 'FN-ST-345',
    purchaseDate: format(subDays(new Date(), 730), 'yyyy-MM-dd'),
    departmentId: '3',
    roomNumber: '308',
    status: EquipmentStatus.USED,
    image: 'https://images.pexels.com/photos/116910/pexels-photo-116910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    notes: 'Terapiya bo\'limi shifokorlar xonasi uchun'
  },
  {
    id: '5',
    name: 'Mikroskop Olympus',
    type: EquipmentType.MEDICAL,
    serialNumber: 'OL-MS-789',
    purchaseDate: format(subDays(new Date(), 45), 'yyyy-MM-dd'),
    departmentId: '4',
    roomNumber: '102',
    status: EquipmentStatus.NEW,
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    notes: 'Laboratoriya uchun yangi raqamli mikroskop'
  },
  {
    id: '6',
    name: 'EKG apparati',
    type: EquipmentType.MEDICAL,
    serialNumber: 'ECG-234-XYZ',
    purchaseDate: format(subDays(new Date(), 400), 'yyyy-MM-dd'),
    departmentId: '3',
    roomNumber: '301',
    status: EquipmentStatus.BROKEN,
    image: 'https://images.pexels.com/photos/4226894/pexels-photo-4226894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    notes: 'Ta\'mirga muhtoj, ishlamayapti'
  }
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Jihozni tekshirish vaqti keldi',
    message: 'EKG apparati tekshirish muddati o\'tib ketdi. Iltimos, texnik xizmatni rejalashtiring.',
    isRead: false,
    createdAt: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
    userId: '1',
    equipmentId: '6'
  },
  {
    id: '2',
    title: 'Yangi jihozlar qo\'shildi',
    message: 'Laboratoriya uchun 3 ta yangi jihoz qo\'shildi. Ularni qabul qilib olishingiz kerak.',
    isRead: true,
    createdAt: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
    userId: '1'
  },
  {
    id: '3',
    title: 'Xizmat muddati tugayapti',
    message: 'Kompyuter monitori (LG) xizmat muddati 30 kun ichida tugaydi.',
    isRead: false,
    createdAt: format(new Date(), 'yyyy-MM-dd'),
    userId: '1',
    equipmentId: '2'
  }
];

// Equipment statistics
export const mockStats = {
  total: mockEquipment.length,
  new: mockEquipment.filter(e => e.status === EquipmentStatus.NEW).length,
  used: mockEquipment.filter(e => e.status === EquipmentStatus.USED).length,
  broken: mockEquipment.filter(e => e.status === EquipmentStatus.BROKEN).length,
  byDepartment: [
    { name: 'Jarrohlik', count: mockEquipment.filter(e => e.departmentId === '1').length },
    { name: 'Nevrologiya', count: mockEquipment.filter(e => e.departmentId === '2').length },
    { name: 'Terapiya', count: mockEquipment.filter(e => e.departmentId === '3').length },
    { name: 'Laboratoriya', count: mockEquipment.filter(e => e.departmentId === '4').length }
  ],
  byType: [
    { name: 'Kompyuter', count: mockEquipment.filter(e => e.type === EquipmentType.COMPUTER).length },
    { name: 'Tibbiy', count: mockEquipment.filter(e => e.type === EquipmentType.MEDICAL).length },
    { name: 'Mebel', count: mockEquipment.filter(e => e.type === EquipmentType.FURNITURE).length },
    { name: 'Boshqa', count: mockEquipment.filter(e => e.type === EquipmentType.OTHER).length }
  ],
  recentActivity: [
    { date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), action: 'Yangi jihoz qo\'shildi', equipment: 'Mikroskop Olympus' },
    { date: format(subDays(new Date(), 7), 'yyyy-MM-dd'), action: 'Jihoz ta\'mirlandi', equipment: 'Kompyuter' },
    { date: format(subDays(new Date(), 15), 'yyyy-MM-dd'), action: 'Jihoz ko\'chirildi', equipment: 'Monitor' }
  ]
};