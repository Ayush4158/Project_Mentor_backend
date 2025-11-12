import React from "react";
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: "Start Your Project",
      description:
        "Enter your project idea and tech stack — MenJect sets up everything for you instantly.",
      icon: "💡",
    },
    {
      id: 2,
      title: "AI Task Breakdown",
      description:
        "Our AI creates a complete roadmap with milestones, helping you stay on track every step of the way.",
      icon: "⚙️",
    },
    {
      id: 3,
      title: "Track & Launch",
      description:
        "Monitor progress, mark tasks complete, and push your final project confidently to GitHub or live.",
      icon: "🚀",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-28 bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 left-0 w-[20rem] h-[20rem] bg-fuchsia-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[22rem] h-[22rem] bg-purple-700/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          How <span className="text-fuchsia-300">MenJect</span> Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-purple-100 text-lg max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Turn your idea into a real project in just three simple steps — no more
          tutorial loops, just pure creation.
        </motion.p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative group bg-purple-900/40 border border-fuchsia-400/20 rounded-2xl p-8 shadow-xl hover:shadow-fuchsia-400/20 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Number Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-fuchsia-400 to-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                {step.id}
              </div>

              {/* Icon */}
              <div className="text-5xl mb-4">{step.icon}</div>

              {/* Title & Description */}
              <h3 className="text-2xl font-semibold text-fuchsia-200 mb-3">
                {step.title}
              </h3>
              <p className="text-purple-100 text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <button className="px-10 py-3.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-700 font-semibold text-white shadow-lg hover:shadow-fuchsia-300/40 transition-all duration-300">
            ✨ Start Your First Project
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
