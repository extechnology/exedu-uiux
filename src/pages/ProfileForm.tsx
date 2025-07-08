import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

interface SectionEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldName: string;
  fieldKey: string;
  initialValue?: string;
  onSubmit: (formData: FormData) => void;
}

const SectionEditModal: React.FC<SectionEditModalProps> = ({
  isOpen,
  onClose,
  fieldName,
  fieldKey,
  initialValue = "",
  onSubmit,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  const handleSave = () => {
    const formData = new FormData();
    formData.append(fieldKey, value);
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
      <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <Dialog.Title className="text-lg font-semibold text-gray-800 mb-4">
          Edit {fieldName}
        </Dialog.Title>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={fieldKey === "career_objective" ? 4 : 1}
          placeholder={`Enter your ${fieldName.toLowerCase()}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-1 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1 text-white bg-purple-600 rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default SectionEditModal;
