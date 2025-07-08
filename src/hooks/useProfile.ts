import getProfile from "../api/getProfile";
import { useState, useEffect } from "react";
import type { Profile } from "../api/types";

const useProfile = (profileId: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!profileId) return;

    getProfile()
      .then((res) => {
        setProfile(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [profileId]);

  return { profile, loading, error };
};

export default useProfile;
