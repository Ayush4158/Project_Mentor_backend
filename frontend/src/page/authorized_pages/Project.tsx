import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

type TaskType = {
  _id: string;
  title: string;
  status: string;
  description: string;
  hint: string;
};

type ProjectType = {
  _id: string;
  name: string;
  status: string;
  techStack: string;
  description: string;
  task: TaskType[];
};

const Project = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectType | null>(null);
  const [taskHints, setTaskHints] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const getProject = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:7777/api/project/getProject/${id}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setProject(res.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [id]);

  const toggleProjectStatus = async () => {
    if (!project) return;
    const newStatus =
      project.status === "completed"
        ? "pending"
        : project.status === "pending"
        ? "in_progress"
        : "completed";

    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/project/updateStatus/${project._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setProject({ ...project, status: newStatus });
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/project/updateTaskStatus/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      setProject((prev) =>
        prev
          ? {
              ...prev,
              task: prev.task.map((t) =>
                t._id === taskId ? { ...t, status: newStatus } : t
              ),
            }
          : null
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleHint = (taskId: string) => {
    setTaskHints((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-400">
        No project found.
      </div>
    );
  }

  const totalTasks = project.task.length;
  const completedTasks = project.task.filter(
    (t) => t.status === "completed"
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div
      className={`min-h-screen px-6 sm:px-10 py-10 transition-all duration-500 
      bg-gradient-to-br from-gray-50 via-indigo-50/10 to-gray-100 
      dark:from-[#0b1120] dark:via-[#111827] dark:to-[#1a2333]`}
    >
      <div className="w-full lg:max-w-[90%] mx-auto mb-12">
        <div className="p-6 rounded-2xl shadow-md dark:border-gray-700 dark:bg-[#1e293b]/60 bg-white backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold dark:text-gray-100">
              {project.name}
            </h1>
            <button
              onClick={toggleProjectStatus}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${
                project.status === "completed"
                  ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300"
                  : project.status === "in_progress"
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300"
                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300"
              }`}
            >
              {project.status}
            </button>
          </div>
          <p className="text-indigo-600 dark:text-indigo-400 mb-2 font-medium">
            {project.techStack}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl shadow-sm dark:bg-[#1e293b]/60 bg-white border dark:border-gray-700 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Tasks</p>
            <p className="text-2xl font-semibold dark:text-gray-100">
              {totalTasks}
            </p>
          </div>
          <div className="p-4 rounded-xl shadow-sm dark:bg-[#1e293b]/60 bg-white border dark:border-gray-700 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Completed</p>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
              {completedTasks}
            </p>
          </div>
          <div className="p-4 rounded-xl shadow-sm dark:bg-[#1e293b]/60 bg-white border dark:border-gray-700 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Pending</p>
            <p className="text-2xl font-semibold text-yellow-500 dark:text-yellow-300">
              {pendingTasks}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 dark:text-gray-100">Tasks</h2>

        {project.task.length > 0 ? (
          <div className="flex flex-col gap-6">
            {project.task.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border rounded-2xl p-5 dark:border-gray-700 dark:bg-[#1e293b]/50 bg-white backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold dark:text-gray-100">
                    {item.title}
                  </h3>

                  {/* Dropdown for task status */}
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateTaskStatus(item._id, e.target.value)
                    }
                    className={`text-xs font-medium rounded-full px-3 py-1 outline-none cursor-pointer border
                      ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-400"
                          : item.status === "in_progress"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-400"
                      }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <p className="text-sm dark:text-gray-300 text-gray-700 mb-3">
                  {item.description}
                </p>

                <button
                  onClick={() => toggleHint(item._id)}
                  className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
                >
                  {taskHints[item._id] ? "Hide Hint" : "Show Hint"}
                </button>

                {taskHints[item._id] && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 p-3 rounded-lg border-l-4 border-indigo-500/50 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-200 text-sm"
                  >
                    💡 {item.hint}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-sm italic text-gray-500 dark:text-gray-400">
            No tasks available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
