import React from "react";
import { motion } from "framer-motion";
import Hero from "./Fragments/LandingPage/Hero";
import ProblemSolution from "./Fragments/LandingPage/ProblemSolution";
import CTA from "./Fragments/LandingPage/CTA";
import FeatureShowcase from "./Fragments/LandingPage/FeatureShowCase";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="relative z-10 w-full mx-auto px-6 pt-35">
      <section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center max-w-5xl mx-auto pb-27 md:pb-20"
        >
          <Hero />
        </motion.div>
      </section>

      <FeatureShowcase />
      <ProblemSolution />
      <CTA />
    </div>
  );
}
