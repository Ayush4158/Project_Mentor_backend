import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

interface LayoutProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Layout = ({ theme, setTheme }: LayoutProps) => {
  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row transition-all duration-500 
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#0a0f1e] via-[#111827] to-[#1e293b]"
          : "bg-gradient-to-br from-gray-50 via-indigo-50/20 to-gray-100"
      }`}
    >
      {/* Sidebar appears on all nested pages */}
      <SideBar theme={theme} setTheme={setTheme} />

      {/* Outlet renders the child routes */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
