import React, { useState } from 'react';

interface FileTransferProps {
  onFileSelect: (file: File) => void;
}

const FileTransfer: React.FC<FileTransferProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div className="window-95-btn p-2 flex flex-col gap-2">
      <div className="text-sm">Select a file to send:</div>
      <input
        type="file"
        onChange={handleFileChange}
        className="text-sm"
      />
      {selectedFile && (
        <div className="text-sm">
          Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
        </div>
      )}
    </div>
  );
};

export default FileTransfer;