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
          <input title="image" type="file" accept="image/*" onChange={handleImageChange} />

          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border mx-auto"
            />
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
            className="px-4 py-1 text-white bg-purple-600 rounded hover:bg-purple-700"
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
