import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useReactToPrint } from 'react-to-print';
import { X, Printer } from 'lucide-react';
import { Equipment } from '../../types';

interface EquipmentQrModalProps {
  equipment: Equipment;
  onClose: () => void;
}

const EquipmentQrModal: React.FC<EquipmentQrModalProps> = ({ equipment, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Generate a QR code value that includes equipment details
  const qrValue = JSON.stringify({
    id: equipment.id,
    name: equipment.name,
    serialNumber: equipment.serialNumber,
  });

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={onClose}
            >
              <span className="sr-only">Yopish</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div ref={printRef} className="p-4">
            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Jihoz QR kodi
              </h3>
              <div className="mt-4 flex justify-center">
                <QRCodeSVG 
                  value={qrValue}
                  size={200}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"H"}
                  includeMargin={true}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Jihoz: <span className="font-medium">{equipment.name}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Seriya raqami: <span className="font-medium">{equipment.serialNumber}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
              onClick={handlePrint}
            >
              <Printer className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Chop etish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentQrModal;