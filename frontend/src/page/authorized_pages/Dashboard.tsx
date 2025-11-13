import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import SideBar from "../../components/SideBar";

type WeeklyData = { _id: number; completedCount: number };
type ProjectData = { _id: string; name: string };
type ThemeType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const Dashboard: React.FC<ThemeType> = ({ theme, setTheme }) => {
  const [data, setData] = useState<{ week: string; completed: number }[]>([]);
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    completionRate: 0,
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user-performance/analysis`, {
        withCredentials: true,
      })
      .then((res) => {
        const weeklyData = res.data?.data?.weeklyData || [];
        const formatted = weeklyData.map((item: WeeklyData) => ({
          week: `Week ${item._id}`,
          completed: item.completedCount,
        }));
        setData(formatted);

        setMetrics({
          totalProjects: res.data?.data?.totalProject || 0,
          completedProjects: res.data?.data?.completedProject || 0,
          totalTasks: res.data?.data?.totalTask || 0,
          completionRate: Math.floor(res.data?.data?.completionRate) || 0,
        });
        setProjects(res.data?.data?.project || []);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 mt-14 md:mt-0 pb-24 transition-all">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-xl sm:text-2xl font-bold ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Welcome Back 👋
          </h1>
          <p
            className={`hidden sm:block text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Overview of your weekly performance
          </p>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
          {[
            {
              title: "Total Projects",
              value: metrics.totalProjects,
              icon: "📁",
            },
            {
              title: "Completed Projects",
              value: metrics.completedProjects,
              icon: "✅",
            },
            {
              title: "Completion Rate",
              value: `${metrics.completionRate}%`,
              icon: "📊",
            },
            {
              title: "Total Tasks",
              value: metrics.totalTasks,
              icon: "📝",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border h-28 sm:h-36 flex flex-col items-center justify-center font-semibold transition-all
                ${
                  theme === "dark"
                    ? "border-[#1f2937]/80 bg-[#0f172a]/70 text-gray-200 shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]"
                    : "border-gray-200 bg-white text-gray-700 shadow-sm hover:shadow-md"
                }`}
            >
              <span className="text-indigo-500 text-2xl mb-1">{item.icon}</span>
              <p className="text-sm sm:text-base">{item.title}</p>
              <p className="text-lg sm:text-xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Chart & Insights */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chart */}
          <div
            className={`flex-1 rounded-2xl p-6 backdrop-blur-sm border transition-all
              ${
                theme === "dark"
                  ? "bg-[#0f172a]/80 border-[#1f2937] text-gray-200 shadow-[0_0_25px_rgba(99,102,241,0.1)]"
                  : "bg-white border border-gray-200 text-gray-800 shadow-sm"
              }`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              Weekly Project Completion
              <span className="text-indigo-500 text-xs font-normal">
                (last 4 weeks)
              </span>
            </h2>
            <div className="h-[230px] sm:h-[300px] md:h-[350px] lg:h-[380px]">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400 animate-pulse">
                  Loading chart...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} barSize={25}>
                    <defs>
                      <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#A5B4FC" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={theme === "dark" ? "#374151" : "#E5E7EB"}
                    />
                    <XAxis
                      dataKey="week"
                      tick={{
                        fill: theme === "dark" ? "#a5b4fc" : "#6B7280",
                        fontSize: 11,
                      }}
                      interval={0}
                    />
                    <YAxis
                      tick={{
                        fill: theme === "dark" ? "#a5b4fc" : "#6B7280",
                        fontSize: 11,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor:
                          theme === "dark" ? "#111827" : "#fff",
                        borderRadius: "10px",
                        border: `1px solid ${
                          theme === "dark" ? "#4f46e5" : "#E5E7EB"
                        }`,
                        color: theme === "dark" ? "#f9fafb" : "#000",
                      }}
                    />
                    <Bar
                      dataKey="completed"
                      fill="url(#colorBar)"
                      radius={[10, 10, 0, 0]}
                      animationDuration={800}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Insights */}
          <div className="w-full lg:w-[25%] flex flex-col sm:flex-row lg:flex-col gap-4">
            {/* Completed Projects */}
            <div
              className={`relative flex-1 rounded-2xl flex flex-col items-center font-medium p-3 transition-all duration-300 overflow-hidden border
                ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-gray-200 border-[#1f2937] shadow-[0_0_25px_rgba(99,102,241,0.1)]"
                    : "bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-700 border-gray-200 shadow-sm"
                }`}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-indigo-400 tracking-wide">
                Completed Projects
              </h3>
              <div className="flex flex-col w-full gap-y-3 overflow-y-auto max-h-[260px] pr-2 scrollbar-hide">
                {projects.length > 0 ? (
                  projects.map((project: ProjectData) => (
                    <div
                      key={project._id}
                      className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm cursor-pointer flex items-center justify-between transition-all duration-300 border
                        ${
                          theme === "dark"
                            ? "bg-[#1e293b]/70 hover:bg-indigo-600/30 border-[#2d3748]"
                            : "bg-white hover:bg-indigo-100 border-gray-200"
                        }`}
                    >
                      <span className="truncate text-sm sm:text-base">
                        {project.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-lg ${
                          theme === "dark"
                            ? "text-indigo-300 bg-indigo-900/60"
                            : "text-indigo-700 bg-indigo-100"
                        }`}
                      >
                        Done
                      </span>
                    </div>
                  ))
                ) : (
                  <p
                    className={`text-sm italic mt-10 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No completed projects yet.
                  </p>
                )}
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 h-10 pointer-events-none rounded-b-2xl ${
                  theme === "dark"
                    ? "bg-gradient-to-t from-[#0f172a] to-transparent"
                    : "bg-gradient-to-t from-indigo-50 to-transparent"
                }`}
              ></div>
            </div>

            {/* Productivity Tips */}
            <div
              className={`flex-1 rounded-2xl flex flex-col items-center justify-center font-medium p-4 sm:p-6 border transition-all
                ${
                  theme === "dark"
                    ? "bg-[#0f172a]/80 border-[#1f2937] text-gray-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                    : "bg-white border-gray-200 text-gray-700 shadow-sm"
                }`}
            >
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-indigo-500">
                🚀 Productivity Tips
              </h3>
              <p className="text-xs sm:text-sm text-center px-2 sm:px-4 leading-relaxed">
                Try breaking tasks into smaller goals to boost completion rate.
                Small wins = big progress!
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
