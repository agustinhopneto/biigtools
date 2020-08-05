/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import { DropzoneContainer } from './styles';

import excelImg from '../../assets/images/excel.svg';

interface DropzoneProps {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  function onDrop(acceptedFiles: File[]): void {
    if (acceptedFiles[0]) {
      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xlsx',
  });

  return (
    <DropzoneContainer {...getRootProps()}>
      <input {...getInputProps()} accept=".xlsx" />
      {selectedFileUrl ? (
        <img src={excelImg} alt="Excel icon" />
      ) : (
        <p>
          <FiUpload />
          .xlsx
        </p>
      )}
    </DropzoneContainer>
  );
};

export default Dropzone;
