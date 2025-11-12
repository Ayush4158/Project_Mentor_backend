import React from "react";

const ProblemSolSection = () => {
  return (
    <section className="relative py-28 bg-purple-950 overflow-hidden">
      {/* Decorative gradient glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-fuchsia-400 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-purple-900 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start justify-between gap-16 relative z-10 text-white">
        {/* Problem Side */}
        <div id="problem-section" className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            The <span className="text-fuchsia-300">Problem</span>
          </h2>

          <p className="text-purple-100 text-lg leading-relaxed">
            You spend countless hours watching tutorials but never actually
            finish a project. You jump between videos and frameworks, trying to
            connect ideas that never form something real. Eventually, motivation
            drops, and consistency fades.
          </p>

          <div className="mt-6 bg-purple-900 rounded-2xl shadow-xl p-6 space-y-3 border border-fuchsia-400/30">
            <p className="font-semibold text-fuchsia-300">❌ Endless tutorial hopping</p>
            <p className="font-semibold text-fuchsia-300">❌ Lack of direction</p>
            <p className="font-semibold text-fuchsia-300">❌ No measurable progress</p>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-fuchsia-200">70%</h3>
              <p className="text-purple-100 text-sm">Learners never finish courses</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-fuchsia-200">5+</h3>
              <p className="text-purple-100 text-sm">Projects started but abandoned</p>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="hidden md:block w-[2px] bg-gradient-to-b from-fuchsia-400 to-purple-300 rounded-full"></div>

        {/* Solution Side */}
        <div id="solution-section" className="md:w-1/2 space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            The{" "}
            <span className="bg-gradient-to-r from-fuchsia-300 to-purple-100 text-transparent bg-clip-text">
              Solution
            </span>
          </h2>

          <p className="text-purple-100 text-lg leading-relaxed">
            <span className="font-semibold text-fuchsia-200">MenJect</span> helps
            you break the tutorial cycle and actually build your own real-world
            projects — guided by AI. Get personalized project roadmaps, track
            your progress, and build with clarity and confidence.
          </p>

          <div className="mt-6 bg-gradient-to-r from-fuchsia-500 to-purple-700 rounded-2xl shadow-2xl p-6 space-y-3 border border-fuchsia-400/30">
            <p className="font-semibold">✅ AI-generated task roadmap</p>
            <p className="font-semibold">✅ Progress tracking dashboard</p>
            <p className="font-semibold">✅ Real-world project templates</p>
            <p className="font-semibold">✅ Learn by building, not watching</p>
          </div>

          <button className="mt-6 px-10 py-3.5 rounded-full bg-white text-purple-700 font-semibold border-2 border-fuchsia-200 shadow-lg hover:bg-fuchsia-50 transition-all duration-300">
            🚀 Try MenJect Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolSection;
