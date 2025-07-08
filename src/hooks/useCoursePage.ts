import getCoursePage from "../api/getCoursePage";
import { useEffect, useState } from "react";
import type { Course } from "../api/types"; // make sure it's Course[]

export default function useCoursePage() {
  const [coursePage, setCoursePage] = useState<Course[]>([]); // ✅ FIXED
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getCoursePage()
      .then((res) => {
        setCoursePage(res); // must be Course[]
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { coursePage, loading, error };
}
