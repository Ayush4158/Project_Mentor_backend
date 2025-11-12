import React, { useState } from "react";
import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";

const LandingPageNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { idx: 1, name: "Home", id: "home" },
    { idx: 2, name: "Problem", id: "problem-section" },
    { idx: 3, name: "Solution", id: "solution-section" },
    { idx: 4, name: "Features", id: "features" },
    { idx: 5, name: "How it Works", id: "how-it-works" },
  ];

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // close menu after click
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-5 md:px-10">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-purple-600 tracking-wide cursor-pointer"
          onClick={() => handleScroll("home")}
        >
          Men<span className="text-gray-900">Ject</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-x-8 text-gray-700 font-medium">
          {menuItems.map((item) => (
            <button
              key={item.idx}
              className="relative group transition duration-300"
              onClick={() => handleScroll(item.id)}
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md">
          <button className="px-5 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-300 shadow-md">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-x-5">
          <button className="px-6 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-all duration-300 shadow-md">
            Sign In
          </button>
          <div
            className="md:hidden text-purple-600 text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <RiCloseLine /> : <RiMenu3Fill />}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-purple-100 shadow-lg">
          <div className="flex flex-col items-center gap-4 py-4 text-gray-700 font-medium">
            {menuItems.map((item) => (
              <button
                key={item.idx}
                className="w-full text-center py-2 hover:text-purple-600 transition-colors duration-300"
                onClick={() => handleScroll(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingPageNavBar;
