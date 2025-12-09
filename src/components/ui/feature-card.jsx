import { motion } from "framer-motion";
import { Card } from "./card";

export function FeatureCard({ icon, color, title, desc }) {
  return (
    <motion.div whileHover={{ y: -5 }}>
      <Card className="bg-white/50 backdrop-blur-md border border-white/60 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-violet-100 transition-all duration-300">
        <div
          className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shadow-lg shadow-violet-500/20 mb-2 scroll`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 -mb-2">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
      </Card>
    </motion.div>
  );
}
