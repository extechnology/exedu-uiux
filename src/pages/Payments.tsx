import { CreditCard, Calendar, CheckCircle } from "lucide-react";
import useProfile from "../hooks/useProfile";
import useCoursePage from "../hooks/useCoursePage";

export default function Payments() {
  const { profile, loading: profileLoading } = useProfile();
  const { coursePage, loading: courseLoading } = useCoursePage();
  console.log(profile, "profile");
  console.log(coursePage, "coursePage");

  if (profileLoading || courseLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-2 border-violet-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (!profile || !coursePage) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load payment details
      </p>
    );
  }

  // ✅ Dynamic values
  const totalFee = Number(coursePage[0].price);
  const paid = Number(profile.paid_amount);
  const remaining = totalFee - paid;
  const progress = Math.min((paid / totalFee) * 100, 100);

  // Example due date logic → you can get this from backend if available
  const dueDate = "2025-09-30";

  return (
    <div className="min-h-screen bg-gradient-to-br mt-18 from-violet-50 via-white to-fuchsia-50 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-3">
          <CreditCard className="h-8 w-8 text-violet-600" />
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Payment Details
          </h1>
        </div>
        <p className="text-gray-600 mt-2">
          Track your payments, dues, and history at one place
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Fee</h3>
            <p className="text-xl font-bold text-gray-800">
              ₹{totalFee.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Paid</h3>
            <p className="text-xl font-bold text-green-600">
              ₹{paid.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Remaining</h3>
            <p className="text-xl font-bold text-red-500">
              ₹{remaining.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 text-right mt-1">
            {progress.toFixed(0)}% completed
          </p>
        </div>

        {/* Due Date */}
        <div className="flex items-center justify-center mt-6 text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-violet-500" />
          Next Due Date: <span className="ml-1 font-medium">{dueDate}</span>
        </div>
      </div>

      {/* Transaction History (replace with API later) */}
      <div className="w-full max-w-3xl mt-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Payment History
        </h2>
        <div className="space-y-4">
          {/* Example: mark all as Paid if payment_completed */}
          <div
            className={`flex justify-between items-center bg-white p-4 rounded-xl shadow border border-gray-100`}
          >
            <div>
              <p className="font-medium text-gray-800">
                ₹{paid.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Latest Payment</p>
            </div>
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                profile.payment_completed
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
              {profile.payment_completed ? "Paid" : "Pending"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
