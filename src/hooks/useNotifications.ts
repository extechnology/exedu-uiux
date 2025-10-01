import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import type { Notification } from "../api/types";

export function useNotifications(types?: Notification[]) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let query = "";
    if (types && types.length > 0) {
      query = `?type=${types.join(",")}`;
    }

    axiosInstance
      .get(`/notification/${query}`)
      .then((res) => setNotifications(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [types]);

  return { notifications, loading, error };
}
