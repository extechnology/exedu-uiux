import axiosInstance from "./axios";

const getNotifications = async () => {
  try {
    const res = await axiosInstance.get(`/notifications/`); // no need to add full URL or headers
    return res.data;
  } catch (err) {
    console.error("Failed to fetch notifications", err);
    throw err;
  }
};

export default getNotifications;
