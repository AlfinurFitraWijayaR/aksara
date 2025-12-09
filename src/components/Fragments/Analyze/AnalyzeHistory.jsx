"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { History } from "lucide-react";
import { getAnalysisHistory } from "@/services/authService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

  const formatDesc = (title) => {
    return title.split(".").slice(0, -1).join(".");
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

  const title = (product, desc) => {
    return `Hasil generate ${product}: ${desc}`;
  };

  console.log(history.map((item) => resAnalyze(item).data.error));

  return (
    <Card className="p-6 h-fit">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Riwayat Generate</h2>
        </div>
        <div className="space-y-3">
          {history.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild className="cursor-pointer">
                <DialogHeader>
                  <DialogTitle>
                    {title(
                      formatDesc(item.file_name),
                      resAnalyze(item).data.deskripsi
                    )}
                  </DialogTitle>
                </DialogHeader>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogDescription>
                    History{" "}
                    <span className="font-medium">
                      {formatDesc(item.file_name)}
                    </span>
                    , {item.created_at.split("T")[0]}
                  </DialogDescription>
                </DialogHeader>
                <div className="text-lg font-semibold">
                  Rekomendasi Deskripsi e-Commerce
                  <p className="text-sm  font-normal text-gray-700 leading-relaxed">
                    {resAnalyze(item).data.deskripsi}
                  </p>
                </div>
                <div className="text-lg font-semibold">
                  Rekomendasi Caption Sosial Media
                  <p className="text-sm  font-normal text-gray-700 leading-relaxed">
                    {resAnalyze(item).data.caption}
                  </p>
                </div>
                <div className="text-lg font-semibold">
                  Rekomendasi Ide Konten Sosial Media
                  <div className="text-sm font-normal text-gray-700 whitespace-pre-wrap leading-relaxed">
                    <ul className=" ml-8 list-disc [&>li]:mt-2">
                      {Array.isArray(resAnalyze(item).data.ideKonten) &&
                      resAnalyze(item).data.ideKonten.length > 0 ? (
                        resAnalyze(item).data.ideKonten.map((idk, idx) => (
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
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </Card>
  );
}
