"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error);
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // Set file and preview
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

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="file-upload" className="text-lg font-semibold">
            Upload Gambar untuk Generate
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Format yang didukung: SVG, JPG, JPEG, PNG (Maks. 2MB)
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!preview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Klik untuk memilih gambar atau drag & drop
            </p>
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
            <div className="relative flex items-center gap-2 text-sm text-gray-600 rounded-lg overflow-hidden border">
              {preview ? (
                <Image src={preview} alt="preview" width={50} height={50} />
              ) : null}
              <span className="truncate">{selectedFile?.name}</span>
              <span className="text-gray-400">
                ({(selectedFile?.size / 1024).toFixed(2)} KB)
              </span>
              <Button
                onClick={handleRemoveFile}
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? "Menggenerate..." : "Generate Gambar"}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
