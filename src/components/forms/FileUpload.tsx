
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload, File } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  multiple?: boolean;
  onChange: (files: Array<{id: string, name: string, type: string, date: string}>) => void;
  value?: Array<{id: string, name: string, type: string, date: string}>;
  maxFiles?: number;
  acceptedFileTypes?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  onChange,
  value = [],
  maxFiles = 5,
  acceptedFileTypes = ".pdf,.jpg,.jpeg,.png"
}) => {
  const [files, setFiles] = useState<Array<{id: string, name: string, type: string, date: string}>>(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFiles = Array.from(e.target.files).map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      date: new Date().toISOString().split('T')[0]
    }));

    if (!multiple) {
      setFiles(newFiles);
      onChange(newFiles);
      return;
    }

    if (files.length + newFiles.length > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} files`);
      return;
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="file"
          id="file-upload"
          multiple={multiple}
          className="hidden"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          <Upload className="mr-2 h-4 w-4" />
          Choose {multiple ? 'Files' : 'File'}
        </label>
        <p className="text-sm text-muted-foreground">
          {multiple ? `${files.length} of ${maxFiles} files uploaded` : files.length ? '1 file selected' : 'No file selected'}
        </p>
      </div>
      
      {files.length > 0 && (
        <div className="border rounded-md p-2 bg-secondary/30">
          <ul className="space-y-2">
            {files.map(file => (
              <li key={file.id} className="flex justify-between items-center p-2 bg-background rounded-md text-sm">
                <div className="flex items-center">
                  <File className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate max-w-[200px]">{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
