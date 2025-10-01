import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import type { Session } from "../api/types";


export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axiosInstance.get<Session[]>("/student-session/");
        setSessions(res.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to fetch sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return { sessions, loading, error };
}
