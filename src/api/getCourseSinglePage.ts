import axiosInstance from "./axios";

const getCourseSinglePage = async () => {
    try {
        const res = await axiosInstance.get(`/course-single-page/`);
        return res.data;
    } catch (err) {
        console.error("Failed to fetch course single image", err);
    }
}

export default getCourseSinglePage