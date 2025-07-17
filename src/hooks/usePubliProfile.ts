import { useEffect, useState } from "react";
import axiosPublic from "../api/axiosPublic"; 
import type { Profile } from "../api/types";

const usePublicProfile = (uniqueId: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosPublic.get(`/public-profile/${uniqueId}/`);
        setProfile(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (uniqueId) fetchProfile();
  }, [uniqueId]);

  return { profile, loading, error };
};

export default usePublicProfile;
