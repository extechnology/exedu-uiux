import axiosInstance from "./axios";
import type { SectionImage } from "./types";

export const getSectionImages = async (): Promise<SectionImage[]> => {
  try {
    const res = await axiosInstance.get<SectionImage[]>("/section-images/");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch section images", err);
    return []; // or you can throw the error if needed
  }
};
