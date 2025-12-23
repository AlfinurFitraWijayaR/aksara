"use client";

import { useState, useRef } from "react";
import { Activity, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { fileToBase64, validateImageFile } from "@/lib/utils";
import Image from "next/image";

export default function ImageUpload({ onAnalyze, isAnalyzing }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    setSelectedFile(file);
    const base64 = await fileToBase64(file);
    setPreview(base64);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !preview) return;
    try {
      await onAnalyze(selectedFile, preview);
      handleRemoveFile();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect({ target: { files } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!preview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Klik untuk memilih <span className="font-semibold">gambar</span>{" "}
              atau drag & drop
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Format yang didukung: SVG, JPG, JPEG, PNG
              <span className="text-red-500 font-semibold"> (Maks. 1MB)</span>
            </p>
            <div className="mt-2">
              <p className="text-sm text-yellow-500 ">
                <span className="font-bold">WARNING!! </span>
                Untuk menghindari batas limit generate, pastikan gambar yang
                diunggah sesuai dengan produk UMKM.
              </p>
            </div>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              className="hidden"
              accept=".svg,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600 rounded-lg border p-2">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={preview}
                  alt="preview"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="block truncate">{selectedFile?.name}</span>
                <span className="text-gray-400">
                  ({(selectedFile?.size / 1024).toFixed(2)} KB)
                </span>
              </div>

              <Button
                onClick={handleRemoveFile}
                variant="destructive"
                size="icon"
                className="h-6 w-6 cursor-pointer text-white"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 text-white font-bold shadow-lg shadow-purple-200 transition-all active:scale-[0.99] cursor-pointer"
              size="lg"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <Activity className="w-5 h-5 animate-spin" /> ASMA sedang
                  membuat konten....
                </span>
              ) : (
                "Mulai"
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
