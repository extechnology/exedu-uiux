// src/api/profile.ts
import axiosInstance from "./axios";

export const toggleProfileVisibility = async (
  profileId: string,
  isPublic: boolean
) => {
  try {
    const response = await axiosInstance.put(`profile/${profileId}/`, {
      is_public: isPublic,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating visibility", error);
    throw error;
  }
};
