import axiosInstance from "./axios";

const getProfile = async () => {
  const userId = localStorage.getItem("id");
  try {
    const res = await axiosInstance.get(`/profile/user/${userId}/`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch profile", err);
    throw err;
  }
};

export default getProfile;
