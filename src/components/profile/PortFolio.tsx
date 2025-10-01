import { useState } from "react";
import { Link } from "react-router-dom";
import useStudentWorks from "../../hooks/useStudentWorks";
import useProfile from "../../hooks/useProfile";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios";

interface WorkFormData {
  id?: number;
  title: string;
  description: string;
  link: string;
  image: string;
}

const PortFolio = () => {
  const { studentWorks } = useStudentWorks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWork, setEditingWork] = useState<WorkFormData | null>(null);
  const { profile } = useProfile();
  console.log(studentWorks, "student works");

  console.log(profile, "profile");
  const student = profile?.unique_id;

  const openAddModal = () => {
    setEditingWork(null); // empty form
    setIsModalOpen(true);
  };

  // const openEditModal = (work: WorkFormData) => {
  //   setEditingWork(work); 
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingWork(null);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // attach student id (backend needs it)
    if (student) {
      formData.append("student", student);
    }

    try {
      if (editingWork) {
        // update existing
        await axiosInstance.put(`/works/${editingWork.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Work updated successfully!");
      } else {
        // create new
        await axiosInstance.post("/works/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Work added successfully!");
      }

      // ✅ re-fetch works (or update state directly)
      // If your hook exposes a `fetchStudentWorks` function, call that
      // otherwise reload page or append new item to state
      // e.g. fetchStudentWorks();

      closeModal();
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-8 py-5">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Student Portfolio</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full hover:opacity-90 transition-opacity shadow-sm"
        >
          + Add Work
        </button>
      </div>

      {/* Works Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {studentWorks?.map((item: any) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <Link
              to={item.link}
              target="_blank"
              className="flex flex-col h-full"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <h2 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-200 line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Footer */}
              <div className="p-5 pt-0 mt-auto flex justify-between items-center">
                <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
                  View Project →
                </span>
                {/* <button
                  onClick={(e) => {
                    e.preventDefault();
                    openEditModal(item);
                  }}
                  className="ml-3 text-sm text-yellow-300 hover:text-yellow-400"
                >
                  ✏ Edit
                </button> */}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <h2 className="text-xl font-semibold mb-4">
              {editingWork ? "Edit Work" : "Add New Work"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                defaultValue={editingWork?.title || ""}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                defaultValue={editingWork?.description || ""}
                className="w-full border rounded-lg px-3 py-2"
                rows={3}
              />
              <input
                type="url"
                name="link"
                placeholder="Project Link"
                defaultValue={editingWork?.link || ""}
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="file"
                name="image"
                placeholder="Image "
                defaultValue={editingWork?.image || ""}
                className="w-full border rounded-lg px-3 py-2"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {editingWork ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default PortFolio;
