import axiosInstance from "./axios";

const getCertificate = async () => {
  try {
    const res = await axiosInstance.get("certificate/"); // no need to add full URL or headers
    return res.data;
  } catch (err) {
    console.error("Failed to fetch certificate", err);
    throw err;
  }
};

export default getCertificate;
