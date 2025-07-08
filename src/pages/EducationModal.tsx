import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

interface EducationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    secondary_school?: string;
    secondary_year?: string;
    university?: string;
    university_major?: string;
    university_year?: string;
  };
  onSubmit: (formData: FormData) => void;
}

const EducationEditModal: React.FC<EducationEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  const [formState, setFormState] = useState({
    secondary_school: "",
    secondary_year: "",
    university: "",
    university_major: "",
    university_year: "",
  });

  useEffect(() => {
    setFormState({ ...initialData } as {
      secondary_school: string;
      secondary_year: string;
      university: string;
      university_major: string;
      university_year: string;
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const data = new FormData();
    for (const key in formState) {
      data.append(key, formState[key as keyof typeof formState]);
    }
    onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
        <Dialog.Title className="text-lg font-semibold mb-4">
          Edit Education
        </Dialog.Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Secondary School", name: "secondary_school" },
            { label: "Secondary Year", name: "secondary_year", type: "number" },
            { label: "University", name: "university" },
            { label: "University Major", name: "university_major" },
            {
              label: "Graduation Year",
              name: "university_year",
              type: "number",
            },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="space-y-1">
              <label className="text-sm text-gray-600">{label}</label>
              <input
                title="Please enter a valid value"
                type={type}
                name={name}
                value={formState[name as keyof typeof formState] || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
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

export default EducationEditModal;
