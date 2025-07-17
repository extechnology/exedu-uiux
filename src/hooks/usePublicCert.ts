import { useEffect, useState } from "react";
import axiosPublic from "../api/axiosPublic";
import type { StudentCertificates } from "../api/types";

const usePublicCertificates = (uniqueId: string) => {
  const [certificates, setCertificates] = useState<StudentCertificates[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axiosPublic.get(`/public-certificates/${uniqueId}/`);
        setCertificates(res.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (uniqueId) {
      fetchCertificates();
    }
  }, [uniqueId]);

  return { certificates, loading, error };
};

export default usePublicCertificates;
