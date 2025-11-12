import React from "react";

const LandingPageFooter = () => {
  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Problem", id: "problem-section" },
    { name: "Solution", id: "solution-section" },
    { name: "Features", id: "features" },
    { name: "How it Works", id: "how-it-works" },
  ];

  return (
    <footer className="bg-white border-t border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-purple-600 cursor-pointer">
          Men<span className="text-gray-900">Ject</span>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 font-medium text-gray-700">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const section = document.getElementById(item.id);
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative group transition duration-300 hover:text-purple-600"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 md:mt-0">
          <button className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-300 shadow-md">
            Sign In
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-purple-100 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MenJect. All rights reserved.
      </div>
    </footer>
  );
};

export default LandingPageFooter;
