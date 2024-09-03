import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileExplorer = React.forwardRef(({ onFileSelect }, ref) => {
  const onDrop = useCallback((acceptedFiles) => {
    onFileSelect(acceptedFiles);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const openFileDialog = () => {
    getInputProps().onClick(); // Open the file dialog
  };

  return (
    <div
      {...getRootProps({
        className: `dropzone ${isDragActive ? 'active' : ''}`,
      })}
      onClick={openFileDialog} // Allow clicking anywhere on the dropzone to open file dialog
    >
      <input {...getInputProps()} ref={ref} />
    </div>
  );
});

export default FileExplorer;