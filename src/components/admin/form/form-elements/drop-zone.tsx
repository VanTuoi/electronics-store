import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { ProductImageInput } from "~/types";

interface DropzoneProps {
  label?: string;
  value?: ProductImageInput[];
  onChange?: (files: ProductImageInput[]) => void;
  error?: string;
  maxFiles?: number;
}

const DropzoneComponent: React.FC<DropzoneProps> = ({ label, value = [], onChange, error, maxFiles = 10 }) => {
  const [activePreviews, setActivePreviews] = useState<(ProductImageInput & { preview: string; index: number })[]>([]);

  useEffect(() => {
    const previews = value
      .map((item, index) => ({
        ...item,
        preview: item.url ? item.url : item.file ? URL.createObjectURL(item.file) : "",
        index
      }))
      .filter(item => !item.isDelete);

    setActivePreviews(previews);

    return () => {
      previews.forEach(item => {
        if (item.preview.startsWith("blob:")) URL.revokeObjectURL(item.preview);
      });
    };
  }, [value]);

  useEffect(() => {
    if (value.length > 0 && !value.some(img => img.isMain && !img.isDelete)) {
      const firstAvailableIndex = value.findIndex(img => !img.isDelete);
      if (firstAvailableIndex >= 0) {
        const updated = [...value];
        updated[firstAvailableIndex].isMain = true;
        onChange?.(updated);
      }
    }
  }, [value, onChange]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles: ProductImageInput[] = acceptedFiles.map(file => ({ file }));
    const activeImages = value.filter(img => !img.isDelete);
    const combined = [...activeImages, ...newFiles].slice(0, maxFiles);

    if (combined.length > 0 && !combined.some(img => img.isMain)) {
      combined[0].isMain = true;
    }

    onChange?.(combined);
  };

  const removeImage = (index: number) => {
    const updated = [...value];
    const isRemovingMain = updated[index]?.isMain;

    if (updated[index].url) {
      updated[index] = { ...updated[index], isDelete: true };
    } else {
      updated.splice(index, 1);
    }

    if (isRemovingMain && updated.some(img => !img.isDelete)) {
      const firstAvailableIndex = updated.findIndex(img => !img.isDelete);
      if (firstAvailableIndex >= 0) {
        updated[firstAvailableIndex].isMain = true;
      }
    }

    onChange?.(updated);
  };

  const setAsMain = (index: number) => {
    const updated = value.map((img, i) => ({
      ...img,
      isMain: i === index
    }));
    onChange?.(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": []
    },
    maxFiles,
    multiple: true
  });

  return (
    <div className="space-y-2">
      {label && <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">{label}</label>}

      {activePreviews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {activePreviews.map(({ preview, index, isMain }) => (
            <div key={index} className="relative group">
              <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => setAsMain(index)}
                className={`absolute top-2 left-2 p-1 rounded-full text-white ${
                  isMain ? "bg-green-500" : "bg-gray-400 opacity-0 group-hover:opacity-100"
                } transition-opacity`}
                title="Đặt làm ảnh chính"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {isMain && (
                <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Ảnh chính
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
        <div
          {...getRootProps()}
          className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
                    ${
                      isDragActive
                        ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                        : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                    }`}
        >
          <input {...getInputProps()} />
          <div className="dz-message flex flex-col items-center m-0">
            <div className="mb-[22px] flex justify-center">
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <svg className="fill-current" width="29" height="28" viewBox="0 0 29 28">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                  />
                </svg>
              </div>
            </div>

            <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
              {isDragActive ? "Thả ảnh vào đây" : "Kéo & thả ảnh vào đây"}
            </h4>

            <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
              {`Kéo thả hoặc click để chọn ảnh (tối đa ${maxFiles} ảnh)`}
            </span>

            <span className="font-medium underline text-theme-sm text-brand-500">Chọn ảnh</span>
          </div>
        </div>
      </div>

      {error && <p className="mt-1.5 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default DropzoneComponent;
