import axiosInstance from "./axios";

const getStudentWorks = async () => {
    try {
        const res = await axiosInstance.get(`/works/`); 
        return res.data;
    } catch (err) {
        console.error("Failed to fetch student works", err);
        throw err;
    }
};

export default getStudentWorks;