import { TrendingUp, AlertCircle, ArrowRight, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProtectedLink from "@/components/ui/protected-link";
import { Button } from "@/components/ui/button";

const Input = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  icon: Icon,
}) => (
  <div className="space-y-2">
    {label && (
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        type={type}
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white/50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9 transition-all duration-200"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled
      />
      {Icon && (
        <Icon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
      )}
    </div>
  </div>
);

export const HealthCheckFeature = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center p-2">
        {/* Left */}
        <div className="space-y-4">
          <Input
            label="Total Omzet (Bulanan)"
            placeholder="Rp 50.000.000"
            icon={TrendingUp}
          />
          <Input
            label="Biaya Operasional"
            placeholder="Rp 20.000.000"
            icon={AlertCircle}
          />
          <Input
            label="Total Hutang Usaha"
            placeholder="Rp 6.000.000"
            icon={CreditCard}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <Label>Arus Kas / Cash Flow</Label>
              <Select>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Lancar" />
                </SelectTrigger>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Pencatatan Keuangan</Label>
              <Select>
                <SelectTrigger className="w-full h-12">
                  <SelectValue placeholder="Rapi & Rutin" />
                </SelectTrigger>
              </Select>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-100"
              />
              <motion.circle
                initial={{ strokeDashoffset: 502 }}
                animate={{ strokeDashoffset: 502 - 502 * 0.9 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                cx="96"
                cy="96"
                r="80"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="502"
                strokeLinecap="round"
                className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-bold text-slate-800"
              >
                90
                <span className="text-lg text-slate-400 font-normal">/100</span>
              </motion.span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                Bisnis Sehat
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-4 bg-white/90 backdrop-blur-sm shadow-sm border border-slate-100 rounded-lg p-3 flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs text-slate-600">Margin laba stabil di 30%</p>
          </motion.div>
        </div>
      </div>
      <ProtectedLink href="business-health">
        <Button className="mt-10 w-2/3 mx-auto cursor-pointer bg-slate-900 h-10 rounded-md transition-colors flex items-center justify-center group shadow-md">
          Coba Sekarang
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </ProtectedLink>
    </>
  );
};
