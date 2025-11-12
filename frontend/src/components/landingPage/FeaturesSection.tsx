import React from "react";
import { Code, Brain, Github, Rocket } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-28 bg-gray-950 text-white overflow-hidden">
      {/* Glowing background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(139,92,246,0.15),_transparent_50%)]"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Powerful <span className="text-purple-400">AI-Driven</span> Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            MenJect empowers developers to learn by building — guided by smart AI tools that turn ideas into projects, one task at a time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-600/20 mb-6">
              <Brain className="text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Auto AI Task Generation</h3>
            <p className="text-gray-400">
              Get your project roadmap instantly. MenJect’s AI breaks down complex goals into actionable, structured tasks — no overthinking required.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-600/20 mb-6">
              <Code className="text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Help Assistant</h3>
            <p className="text-gray-400">
              Stuck anywhere? Get instant, contextual help from MenJect’s AI tool — from debugging to project architecture guidance.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-600/20 mb-6">
              <Github className="text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart GitHub Tracker</h3>
            <p className="text-gray-400">
              MenJect tracks your latest commits and provides AI suggestions if your recent push needs optimization, cleanup, or better structure.
            </p>
          </div>

          {/* Feature 4 — extra feature */}
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-600/20 mb-6">
              <Rocket className="text-purple-400" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Progress Insights</h3>
            <p className="text-gray-400">
              Get real-time insights on your coding habits, time spent, and completion rate — with AI-powered feedback to help you grow faster.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-fuchsia-500/30 transition-all duration-300">
            Explore MenJect Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
