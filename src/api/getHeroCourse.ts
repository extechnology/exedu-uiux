import axiosInstance from "./axios";
import type { HeroCourse } from "./types";

const getHeroCourse = async (): Promise<HeroCourse[]> => {
  try {
    const res = await axiosInstance.get(`course-page-details/`);
    return res.data; // this should be an array
  } catch (err) {
    console.error("Failed to fetch hero course", err);
    return []; // return empty array on error to keep types consistent
  }
};

export default getHeroCourse;
