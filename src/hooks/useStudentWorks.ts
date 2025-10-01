import { useEffect, useState } from "react";
import getStudentWorks from "../api/getStudentWorks";
import type { StudentWorks } from "../api/types";

const useStudentWorks = () => {
  const [studentWorks, setStudentWorks] = useState<StudentWorks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStudentWorks()
      .then((res) => {
        setStudentWorks(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { studentWorks, loading, error };
};

export default useStudentWorks;
