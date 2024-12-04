import React from 'react';

const emoticons = [
  { code: ':)', text: '😊' },
  { code: ':(', text: '😢' },
  { code: ':D', text: '😃' },
  { code: ';)', text: '😉' },
  { code: ':P', text: '😛' },
];

interface EmoticonPickerProps {
  onSelect: (emoticon: string) => void;
}

const EmoticonPicker: React.FC<EmoticonPickerProps> = ({ onSelect }) => {
  return (
    <div className="window-95-btn p-2 grid grid-cols-5 gap-1">
      {emoticons.map((emoticon) => (
        <button
          key={emoticon.code}
          className="window-95-btn p-1 text-sm hover:bg-win95-darkgray"
          onClick={() => onSelect(emoticon.code)}
        >
          {emoticon.text}
        </button>
      ))}
    </div>
  );
};

export default EmoticonPicker;