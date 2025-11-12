import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ProjectType = {
  _id: string;
  name: string;
  status: string;
  techStack: string;
  description: string;
};

type ThemeType = {
  theme: string;
};

const AllProject: React.FC<ThemeType> = ({ theme }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProjectType[]>([]);

  const navigate = useNavigate()

  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:7777/api/project/getAllProject",
          { withCredentials: true }
        );
        if (res.status === 200) {
          setData(res.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full px-4 sm:px-6 md:px-10 py-8 transition-all duration-500 
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#0a0f1e] via-[#111827] to-[#1e293b] text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-indigo-50/20 to-gray-100 text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Projects</h1>
        <p
          className={`text-sm sm:text-base ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          View, track, and manage all your projects in one place.
        </p>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-6 pb-12">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item._id}
              className={`w-full sm:w-[90%] mx-auto rounded-2xl border backdrop-blur-sm 
              transition-all duration-300 hover:scale-[1.01] hover:shadow-lg p-6
              ${
                theme === "dark"
                  ? "border-gray-700/50 bg-[#1e293b]/70 hover:bg-[#27354d]/80 hover:shadow-[0_0_15px_rgba(79,70,229,0.25)]"
                  : "border-gray-200 bg-white hover:shadow-md"
              }`}
            >
              {/* Header Row */}
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg sm:text-xl font-semibold">
                  {item.name}
                </h2>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full 
                  ${
                    item.status.toLowerCase() === "completed"
                      ? theme === "dark"
                        ? "bg-green-700/30 text-green-300 border border-green-600/30"
                        : "bg-green-100 text-green-700"
                      : theme === "dark"
                      ? "bg-yellow-700/30 text-yellow-300 border border-yellow-600/30"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Tech Stack */}
              <p
                className={`text-xs sm:text-sm mb-3 font-medium ${
                  theme === "dark"
                    ? "text-indigo-300/90"
                    : "text-indigo-600 font-semibold"
                }`}
              >
                {item.techStack}
              </p>

              {/* Description */}
              <p
                className={`text-sm leading-relaxed ${
                  theme === "dark"
                    ? "text-gray-300/90"
                    : "text-gray-700"
                }`}
              >
                {item.description}
              </p>

              <div className="flex flex-row-reverse">
                <button onClick={() => navigate(`/project/${item._id}`)}
                 className="bg-blue-500 text-white px-5 py-1 rounded-lg">Open</button>
              </div>
            </div>
          ))
        ) : (
          <div
            className={`text-center py-20 text-sm italic ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No projects available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProject;
