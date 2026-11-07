"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  projectTitle: string;
  initialIndex?: number;
}

export function ImageGalleryModal({
  isOpen,
  onClose,
  images,
  projectTitle,
  initialIndex = 0,
}: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [prevInitialIndex, setPrevInitialIndex] = useState(initialIndex);

  if (initialIndex !== prevInitialIndex) {
    setPrevInitialIndex(initialIndex);
    setCurrentIndex(initialIndex);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, images.length, onClose]);

  if (!isOpen || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} Gallery`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-md p-4 sm:p-6"
    >
      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-pure-white px-2">
        <div className="flex items-center space-x-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-soft-gold">
            Bovaro Gallery
          </span>
          <span className="text-sm font-light text-pure-white/80 hidden sm:inline">
            — {projectTitle}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 rounded-full bg-pure-white/10 text-xs font-mono tracking-wider">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            aria-label="Close Gallery"
            className="w-10 h-10 rounded-full bg-pure-white/10 hover:bg-pure-white/25 flex items-center justify-center transition-colors text-pure-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
        <Image
          src={images[currentIndex]}
          alt={`${projectTitle} - photo ${currentIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-contain rounded-2xl select-none"
        />

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={prevImage}
            aria-label="Previous Image"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal/60 hover:bg-deep-emerald text-pure-white flex items-center justify-center backdrop-blur-xs transition-all border border-pure-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={nextImage}
            aria-label="Next Image"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal/60 hover:bg-deep-emerald text-pure-white flex items-center justify-center backdrop-blur-xs transition-all border border-pure-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 px-4 overflow-x-auto py-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Jump to image ${idx + 1}`}
              className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                currentIndex === idx
                  ? "border-soft-gold scale-105 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
