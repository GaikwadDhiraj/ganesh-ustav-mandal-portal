"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon, CheckCircle2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ImageUploader({ value, onChange, label, placeholder = "इमेज फाईल निवडा किंवा URL टाका" }) {
  const [compressing, setCompressing] = useState(false);
  const [origSize, setOrigSize] = useState(null);
  const [compSize, setCompSize] = useState(null);

  const compressAndSetFile = (file) => {
    if (!file) return;

    const originalKb = (file.size / 1024).toFixed(0);
    setOrigSize(originalKb);

    if (file.size > 10 * 1024 * 1024) {
      toast.error("फाईल साईझ खूप मोठी आहे (कमाल 10 MB). लहान फाईल निवडा.");
      return;
    }

    setCompressing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        // Create canvas for image compression
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG with 0.75 quality
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
        const compressedKb = (compressedDataUrl.length * (3 / 4) / 1024).toFixed(0);

        setCompSize(compressedKb);
        setCompressing(false);

        if (compressedDataUrl.length * (3 / 4) > 512000) {
          toast.error(`कॉम्प्रेशननंतरही साईझ 500 KB पेक्षा जास्त आहे (${compressedKb} KB). लहान इमेज निवडा.`);
          return;
        }

        onChange(compressedDataUrl);
        toast.success(`इमेज यशस्वीरीत्या कॉम्प्रेस व अपलोड झाली! (${originalKb} KB → ${compressedKb} KB)`);
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-bold text-gray-800 block">{label}</label>}

      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        {/* URL Input */}
        <div className="relative flex-1">
          <Input
            value={value || ""}
            onChange={(e) => {
              setOrigSize(null);
              setCompSize(null);
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            className="pr-8"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOrigSize(null);
                setCompSize(null);
              }}
              className="absolute right-2.5 top-3 text-gray-400 hover:text-red-600 transition-colors"
              title="इमेज हटवा"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* System File Upload Button */}
        <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 font-bold text-sm cursor-pointer transition-all shrink-0">
          <Upload className="w-4 h-4 text-orange-700" />
          <span>{compressing ? "कॉम्प्रेस होत आहे..." : "डिव्हाईसवरून फाईल निवडा (Auto-Compress)"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => compressAndSetFile(e.target.files?.[0])}
            className="hidden"
            disabled={compressing}
          />
        </label>
      </div>

      <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
        <span>डिव्हाईसवरून इमेज निवडल्यास आपोआप कॉम्प्रेस (Compress) होऊन डेटाबेस स्पेस वाचवते.</span>
        <span className="text-amber-800 font-bold">कमाल साईझ: 500 KB</span>
      </div>

      {origSize && compSize && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>स्पेस बचत: {origSize} KB वरून {compSize} KB कॉम्प्रेस झाले!</span>
        </div>
      )}

      {/* Image Preview Box */}
      {value && (
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-300 bg-amber-50 shadow-md">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/hero-royal-ganesha.jpg";
            }}
          />
        </div>
      )}
    </div>
  );
}
