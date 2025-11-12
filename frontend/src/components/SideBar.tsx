import React, { useState } from 'react'
import { Menu, Home, BarChart3, User, CableCar } from "lucide-react";
import ThemeToggleBtn from './ThemeToggleBtn';

type ThemeType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const SideBar: React.FC<ThemeType> = ({theme, setTheme}) => {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  return (
          <aside
        onMouseEnter={() => setSideNavOpen(true)}
        onMouseLeave={() => setSideNavOpen(false)}
        className={`fixed bottom-0 md:static z-50 transition-all duration-300 ease-in-out
        ${
          theme === "dark"
            ? "bg-[#0f172a]/80 border-[#1f2937] text-gray-200 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
            : "bg-white/80 border-gray-200 text-gray-700 shadow-md"
        } backdrop-blur-xl border-t md:border-t-0 md:border-r 
        flex md:flex-col justify-around md:justify-start items-center md:items-start
        p-3 md:p-5 w-full
        ${sideNavOpen ? "md:w-60 lg:w-64" : "md:w-20 lg:w-24"}`}
      >
        {/* Logo / Title */}
        <div className="hidden md:flex items-center gap-3 mb-8">
          <div
            className={`p-2 rounded-xl shadow-md ${
              theme === "dark"
                ? "bg-indigo-600 text-white"
                : "bg-indigo-600 text-white"
            }`}
          >
            <Home className="w-5 h-5" />
          </div>
          <h2
            className={`text-lg font-semibold tracking-tight transition-opacity duration-300 ${
              sideNavOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Dashboard
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex md:flex-col gap-6 md:gap-4 w-full md:w-auto justify-around md:justify-start">
          {[
            { icon: Home, label: "Home" },
            { icon: BarChart3, label: "Analytics" },
            { icon: User, label: "Profile" },
            { icon: CableCar, label: "ai" },
            { icon: Menu, label: "More" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className={`flex items-center md:justify-start gap-2 md:gap-4 w-full
              transition-all duration-200 hover:translate-x-1 group
              ${
                theme === "dark"
                  ? "text-gray-300 hover:text-indigo-400"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              <div
                className={`flex items-center justify-center p-2 rounded-xl transition-all duration-200 ${
                  sideNavOpen
                    ? theme === "dark"
                      ? "bg-[#1e293b]/60 group-hover:bg-indigo-800/40"
                      : "bg-indigo-50 group-hover:bg-indigo-100"
                    : "bg-transparent"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span
                className={`font-medium transition-opacity duration-300 ${
                  sideNavOpen ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {label}
              </span>
            </button>
          ))}
          <ThemeToggleBtn theme={theme} setTheme={setTheme} />
        </nav>
      </aside>
  )
}

export default SideBar
