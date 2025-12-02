"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { History } from "lucide-react";
import { getAnalysisHistory } from "@/services/authService";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AnalysisHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const resAnalyze = (item) => {
    return JSON.parse(item.analysis_result);
  };

  const loadHistory = async () => {
    setLoading(true);
    try {
      const result = await getAnalysisHistory();
      if (result?.success) {
        setHistory(result.data || []);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error(err);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">Memuat riwayat...</p>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">Belum ada riwayat analisis</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-fit">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Riwayat Generate</h2>
        </div>
        <div className="space-y-3">
          {/* <HistoryAnalyzeModal /> */}
          {history.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild className="cursor-pointer mb-3">
                <DialogHeader>
                  <DialogTitle>{item.file_name}</DialogTitle>
                </DialogHeader>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogDescription>
                    History {item.created_at.split("T")[0]},{" "}
                    <span className="font-medium">{item.file_name}</span>
                  </DialogDescription>
                </DialogHeader>
                <div className="text-lg font-semibold">
                  1. Rekomendasi Deskripsi e-Commerce
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-1.5">
                  {resAnalyze(item).deskripsi}
                </p>
                <div className="text-lg font-semibold">
                  2. Rekomendasi Caption Sosial Media
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-1.5">
                  {resAnalyze(item).caption}
                </p>
                <div className="text-lg font-semibold">
                  3. Rekomendasi Ide Konten Sosial Media
                </div>
                <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-1.5">
                  <ul className=" ml-6 list-disc [&>li]:mt-2">
                    {Array.isArray(resAnalyze(item).ideKonten) &&
                    resAnalyze(item).ideKonten.length > 0 ? (
                      resAnalyze(item).ideKonten.map((idk, idx) => (
                        <li key={idx}>
                          {idk.judul && <em>{idk.judul}: </em>}
                          {idk.deskripsi ?? JSON.stringify(idk)}
                        </li>
                      ))
                    ) : (
                      <li>Tidak ada ide konten.</li>
                    )}
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </Card>
  );
}
