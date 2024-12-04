import React from 'react';

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  return (
    <div
      className="flex flex-col items-center gap-1 cursor-pointer p-2 hover:bg-win95-navy/20"
      onClick={onClick}
    >
      <div className="w-8 h-8 bg-win95-gray shadow-win95" />
      <span className="text-white text-sm text-center">{label}</span>
    </div>
  );
};

export default DesktopIcon;