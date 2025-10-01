import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import type { AttendanceRecord } from "../api/types";


export function useAttendance(profileId: string, courseId: number) {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profileId || !courseId) return;

    setLoading(true);
    setError(null);

    axiosInstance
      .get("/attendance/", { params: { student: profileId, course: courseId } })
      .then((res) => {
        setAttendance(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch attendance:", err);
        setError("Could not load attendance");
      })
      .finally(() => setLoading(false));
  }, [profileId, courseId]);

  return { attendance, loading, error };
}
