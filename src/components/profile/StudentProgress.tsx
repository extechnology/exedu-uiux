import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  ChevronUp,
  ChevronDown,
  Zap,
  Target,
} from "lucide-react";


interface ProgressData {
  coursesCompleted: number;
  totalCourses: number;
  skillsAcquired: number;
  totalSkills: number;
  studyHours: number;
  targetHours: number;
  overallProgress: number;
  currentStreak: number;
  badges: number;
}

const StudentProgressComponent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isVisible] = useState(true);

  const progressData: ProgressData = {
    coursesCompleted: 7,
    totalCourses: 12,
    skillsAcquired: 15,
    totalSkills: 20,
    studyHours: 127,
    targetHours: 200,
    overallProgress: 68,
    currentStreak: 12,
    badges: 8,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressData.overallProgress);
    }, 500);
    return () => clearTimeout(timer);
  }, [progressData.overallProgress]);

  const CircularProgress: React.FC<{ percentage: number; size?: string }> = ({
    percentage,
    size = "w-16 h-16",
  }) => {
    const circumference = 2 * Math.PI * 20;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className={`${size} relative`}>
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke="rgba(99, 102, 241, 0.2)"
            strokeWidth="3"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{percentage}%</span>
        </div>
      </div>
    );
  };

  const ProgressBar: React.FC<{
    current: number;
    total: number;
    label: string;
    icon: React.ReactNode;
    delay?: number;
  }> = ({ current, total, label, icon, delay = 0 }) => {
    const [animatedWidth, setAnimatedWidth] = useState(0);
    const percentage = Math.round((current / total) * 100);

    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedWidth(percentage);
      }, delay);
      return () => clearTimeout(timer);
    }, [percentage, delay]);

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            {icon}
            <span>{label}</span>
          </div>
          <span className="text-white font-semibold">
            {current}/{total}
          </span>
        </div>
        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${animatedWidth}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  };

  const StatCard: React.FC<{
    value: number;
    label: string;
    icon: React.ReactNode;
    gradient: string;
  }> = ({ value, label, icon, gradient }) => (
    <div
      className={`p-3 rounded-xl bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/10`}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="text-white/80">{icon}</div>
        <div className="text-xs text-white/70">{label}</div>
      </div>
      <div className="text-lg font-bold text-white">{value}</div>
    </div>
  );

  return (
    <>
      <div
        className={`fixed bottom-0 right-6 z-50 transition-all duration-300 ${
          !isVisible ? "translate-x-full opacity-0" : ""
        }`}
      >
        {/* Collapsed State */}
        <div
          className={`bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 cursor-pointer transition-all duration-300 hover:scale-105 ${
            isExpanded
              ? "scale-0 opacity-0 pointer-events-none"
              : "scale-100 opacity-100"
          }`}
          onClick={() => setIsExpanded(true)}
        >
          <div className="p-4 flex items-center gap-3">
            <div className="relative">
              <CircularProgress
                percentage={animatedProgress}
                size="w-12 h-12"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Progress</div>
              <div className="text-slate-300 text-xs">
                {progressData.overallProgress}% Complete
              </div>
            </div>
            <ChevronUp className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Expanded State */}
        <div
          className={`bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 ${
            isExpanded
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
          style={{ minWidth: "320px", maxWidth: "380px" }}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <CircularProgress percentage={animatedProgress} />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full animate-pulse flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Learning Progress
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Keep pushing forward! 🚀
                  </p>
                </div>
              </div>
              <button
                type="button"
                title="Close"
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Progress Bars */}
            <div className="space-y-4">
              <ProgressBar
                current={progressData.coursesCompleted}
                total={progressData.totalCourses}
                label="Courses"
                icon={<BookOpen className="w-4 h-4" />}
                delay={200}
              />
              <ProgressBar
                current={progressData.skillsAcquired}
                total={progressData.totalSkills}
                label="Skills"
                icon={<Target className="w-4 h-4" />}
                delay={400}
              />
              <ProgressBar
                current={progressData.studyHours}
                total={progressData.targetHours}
                label="Study Hours"
                icon={<Clock className="w-4 h-4" />}
                delay={600}
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                value={progressData.currentStreak}
                label="Day Streak"
                icon={<TrendingUp className="w-4 h-4" />}
                gradient="from-orange-500/20 to-red-500/20"
              />
              <StatCard
                value={progressData.badges}
                label="Badges"
                icon={<Award className="w-4 h-4" />}
                gradient="from-yellow-500/20 to-amber-500/20"
              />
            </div>

            {/* Action Button */}
            <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Continue Learning
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Visibility Button (for demo) */}
      {/* <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-6 right-6 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg transition-colors z-40"
      >
        {isVisible ? "Hide" : "Show"} Progress
      </button> */}
    </>
  );
};

export default StudentProgressComponent;
