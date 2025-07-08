import axiosInstance from "./axios";

const getCoursePage = async () => {
    try {
        const res = await axiosInstance.get(`/course/`);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch course page", err);
    }
};

export default getCoursePage;