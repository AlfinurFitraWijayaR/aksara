"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Activity, CreditCard, TrendingUp, Wallet } from "lucide-react";

export default function BusinessForm({
  formData,
  setFormData,
  isCalculating,
  onAnalyze,
  disabled = false,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatIDR = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>
          Kategori Usaha<span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.kategori}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, kategori: value }))
          }
        >
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Pilih Kategori Usaha" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kategori</SelectLabel>
              <SelectItem value="kuliner">🥗 Kuliner (F&B)</SelectItem>
              <SelectItem value="fashion">⚠️ Fashion</SelectItem>
              <SelectItem value="jasa">👑 Jasa/Layanan</SelectItem>
              <SelectItem value="retail">🏠 Retail/Toko Kelontongan</SelectItem>
              <SelectItem value="agribisnis">🪴 Agribisnis</SelectItem>
              <SelectItem value="lainnya">Lainnya</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="omzet">
          Omzet Bulanan<span className="text-red-500">*</span>
        </Label>
        <div className="relative group">
          <Wallet className="absolute left-3 top-4 h-4 w-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
          <Input
            id="omzet"
            name="omzet"
            type="number"
            placeholder="0"
            className="pl-9 h-12 text-lg"
            value={formData.omzet}
            onChange={handleInputChange}
          />
        </div>
        {formData.omzet && (
          <p className="text-xs text-purple-600 font-medium text-right">
            {formatIDR(formData.omzet)}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hpp">
          HPP / Modal Belanja Bahan Baku<span className="text-red-500">*</span>
        </Label>
        <div className="relative group">
          <Wallet className="absolute left-3 top-4 h-4 w-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
          <Input
            id="hpp"
            name="hpp"
            type="number"
            placeholder="0"
            className="pl-9 h-12 text-lg"
            value={formData.hpp}
            onChange={handleInputChange}
          />
        </div>
        {formData.hpp && (
          <p className="text-xs text-purple-600 font-medium text-right">
            {formatIDR(formData.hpp)}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="operasional">
          Biaya Operasional Tetap<span className="text-red-500">*</span>
        </Label>
        <div className="relative group">
          <TrendingUp className="absolute left-3 top-4 h-4 w-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
          <Input
            id="operasional"
            name="operasional"
            type="number"
            placeholder="0"
            className="pl-9 h-12 text-lg"
            value={formData.operasional}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-slate-400">
            Termasuk gaji, listrik, sewa tempat, dll.
          </p>
          {formData.operasional && (
            <p className="text-xs text-purple-600 font-medium text-right">
              {formatIDR(formData.operasional)}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hutang">Total Hutang Usaha (opsional)</Label>
        <div className="relative group">
          <CreditCard className="absolute left-3 top-4 h-4 w-4 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
          <Input
            id="hutang"
            name="hutang"
            type="number"
            placeholder="0"
            className="pl-9 h-12 text-lg"
            value={formData.hutang}
            onChange={handleInputChange}
          />
        </div>
        {formData.hutang && (
          <p className="text-xs text-purple-600 font-medium text-right">
            {formatIDR(formData.hutang)}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="space-y-2">
          <Label>Arus Kas / Cash Flow</Label>
          <Select
            value={formData.kas}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, kas: value }))
            }
          >
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Pilih Kondisi Arus Kas" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Kondisi</SelectLabel>
                <SelectItem value="lancar">✅ Lancar</SelectItem>
                <SelectItem value="macet">⚠️ Macet</SelectItem>
                <SelectItem value="kosong">❌ Sering Kosong</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Pencatatan Keuangan</Label>
          <Select
            value={formData.catatan}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, catatan: value }))
            }
          >
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Pilih Kondisi Pencatatan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Kondisi</SelectLabel>
                <SelectItem value="rapi">📚 Rapi & Rutin</SelectItem>
                <SelectItem value="campur">🔄 Campur Uang Pribadi</SelectItem>
                <SelectItem value="tidak_ada">🚫 Tidak Ada</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4">
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white font-bold shadow-lg shadow-purple-200 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          onClick={onAnalyze}
          disabled={
            disabled || isCalculating || !formData.operasional || !formData.hpp
          }
          size="lg"
        >
          {isCalculating ? (
            <span className="flex items-center gap-2">
              <Activity className="w-5 h-5 animate-spin" /> ASMA sedang
              menganalisis...
            </span>
          ) : (
            <span className="flex items-center gap-2">Mulai Analisis</span>
          )}
        </Button>
      </div>
    </div>
  );
}
