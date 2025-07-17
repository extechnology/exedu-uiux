import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

interface ImageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

const ImageEditModal: React.FC<ImageEditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("profile_image", selectedImage);
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <Dialog.Title className="text-lg font-semibold mb-4">
          Change Profile Image
        </Dialog.Title>

        <div className="space-y-4">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {selectedImage && (
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border mx-auto"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 text-white bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedImage}
          >
            Save
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ImageEditModal;
