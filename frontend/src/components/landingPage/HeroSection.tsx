import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-32 flex pb-20 bg-gradient-to-b from-purple-50 via-white to-purple-400 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-fuchsia-300/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10 gap-16 relative z-10">
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left md:w-1/2 space-y-6"
        >
          <p className="inline-block bg-purple-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg tracking-wide animate-bounce">
            🚀Build Your Next Big Thing
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Empower Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-transparent bg-clip-text">
              Ideas
            </span>{" "}
            with <span className="text-purple-700">MenJect</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed">
            Manage your projects smarter — plan, build, and launch with clarity
            and creativity using MenJect’s intuitive tools.
          </p>

          <div className="flex justify-center md:justify-start gap-4 pt-6">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-fuchsia-300 transition-all duration-300"
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3.5 rounded-full border-2 border-purple-600 text-purple-700 font-semibold hover:bg-purple-50 hover:shadow-md transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Right Visual Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex flex-col items-center md:items-end gap-10 justify-center"
        >
          {/* Top Text */}
          <p className="text-lg font-semibold text-gray-800 text-center md:text-right leading-snug">
            Skip the <span className="text-purple-600">Tutorial Hell</span> —  
            Build Real <span className="text-fuchsia-600">Projects</span> Instead
          </p>

          {/* Dashboard Preview Cards */}
          <div className="relative w-full flex flex-col justify-center items-center gap-8 mt-6">
            {/* Card 1 */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="w-72 sm:w-80 h-28 rounded-2xl bg-white shadow-2xl border border-purple-100 flex items-center justify-between px-5 backdrop-blur-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100/40 via-transparent to-fuchsia-100/30" />
              <div className="h-14 w-14 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                💡
              </div>
              <div className="text-right">
                <p className="text-gray-800 font-semibold text-lg">Project Setup</p>
                <p className="text-gray-500 text-sm">Initialize your next idea</p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="w-72 sm:w-80 h-28 rounded-2xl bg-gradient-to-br from-purple-700 to-fuchsia-600 text-white shadow-2xl flex items-center justify-between px-5"
            >
              <div className="h-14 w-14 bg-white/20 rounded-xl flex items-center justify-center text-white text-2xl shadow-inner">
                ⚙️
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">Manage Tasks</p>
                <p className="text-purple-100 text-sm">Track workflow & goals</p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="w-72 sm:w-80 h-28 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white shadow-2xl flex items-center justify-between px-5"
            >
              <div className="h-14 w-14 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl">
                🚀
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">Launch Fast</p>
                <p className="text-gray-300 text-sm">Deploy in one click</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Text */}
          <p className="text-gray-700 text-base sm:text-lg text-center md:text-right font-medium max-w-sm leading-relaxed">
            Turn your creativity into action. <br />
            <span className="font-semibold text-purple-600">MenJect</span> helps you
            launch ideas that matter.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
