// NotificationsPage.tsx
import { Bell, Clock, Check } from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";
import axiosInstance from "../api/axios";
import { useState, useEffect } from "react";

export default function NotificationsPage() {
  const { notifications, loading, error } = useNotifications();
  const [notificationList, setNotificationList] = useState(notifications);

  useEffect(() => {
    // keep local state in sync with hook data
    setNotificationList(notifications);
  }, [notifications]);

  const markAsRead = async (id: string) => {
    try {
      // Update backend
      await axiosInstance.patch(`/notification/${id}/mark-read/`);

      // Update frontend state
      setNotificationList((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  // ✅ Only SESSION + REQUEST notifications
  const studentNotifications = notificationList.filter(
    (note) => note.type === "SESSION" || note.type === "REQUEST"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br mt-18 from-violet-50 via-white to-fuchsia-50 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-3">
          <Bell className="h-8 w-8 text-violet-600 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Notifications
          </h1>
        </div>
        <p className="text-gray-600 mt-2">
          Stay updated with your sessions and access requests
        </p>
      </div>

      {/* Notifications List */}
      <div className="w-full max-w-3xl space-y-4">
        {studentNotifications.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-5 flex items-start gap-4 border border-gray-100"
          >
            {/* Icon */}
            <div
              className={`p-3 rounded-full flex items-center justify-center ${
                note.type === "SESSION"
                  ? "bg-violet-100 text-violet-600"
                  : "bg-fuchsia-100 text-fuchsia-600"
              }`}
            >
              <Bell className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-lg text-gray-800">
                  {note.title}
                </h2>

                {/* Mark as read button */}
                {!note.is_read ? (
                  <button
                    onClick={() => markAsRead(note.id)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                    Read
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-sm mt-1">{note.message}</p>

              {/* Timestamp */}
              <div className="flex items-center text-gray-400 text-xs mt-2 gap-1">
                <Clock className="h-4 w-4" />
                {new Date(note.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        ))}

        {studentNotifications.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No new notifications 🎉
          </div>
        )}
      </div>
    </div>
  );
}
