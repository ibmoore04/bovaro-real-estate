"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, ArrowUpRight, Images, FileText } from "lucide-react";
import { Project } from "@/types/project";
import { ImageGalleryModal } from "@/components/media/ImageGalleryModal";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <>
      <article className="group relative flex flex-col justify-between bg-white rounded-[32px] p-4 sm:p-5 border border-charcoal/8 hover:border-soft-gold/50 shadow-xs hover:shadow-xl transition-all duration-300">
        {/* Visual Media Container */}
        <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-light-grey">
          <Link
            href={`/projects/${project.slug}`}
            className="absolute inset-0 z-0 block cursor-pointer"
            aria-label={`View ${project.name} details`}
          >
            <Image
              src={project.media.coverImage}
              alt={project.media.altText}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </Link>

          {/* Floating Top Badge */}
          <div className="absolute top-3.5 right-3.5 flex items-center space-x-2 z-10 pointer-events-none">
            <span className="px-3.5 py-1 rounded-full bg-charcoal/80 text-pure-white text-[11px] font-medium backdrop-blur-md">
              {project.specs.propertyTypeBadge}
            </span>
          </div>

          {/* Floating Bottom Specifications Strip */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1.5 pointer-events-none z-10">
            <div className="flex items-center gap-1.5 flex-nowrap shrink min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-medium text-charcoal shadow-2xs whitespace-nowrap shrink-0">
                <Bed className="w-3.5 h-3.5 text-deep-emerald" />
                {project.specs.beds}
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-medium text-charcoal shadow-2xs whitespace-nowrap shrink-0">
                <Bath className="w-3.5 h-3.5 text-deep-emerald" />
                {project.specs.baths}
              </span>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-medium text-charcoal shadow-2xs whitespace-nowrap shrink-0">
                <Maximize2 className="w-3.5 h-3.5 text-deep-emerald" />
                {project.specs.area}
              </span>
            </div>

            {/* Quick Gallery Trigger Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsGalleryOpen(true);
              }}
              aria-label={`View ${project.media.gallery.length} photos for ${project.name}`}
              className="pointer-events-auto inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-charcoal/80 hover:bg-deep-emerald text-pure-white backdrop-blur-md text-[10px] font-medium transition-colors shrink-0 whitespace-nowrap"
            >
              <Images className="w-3 h-3 text-soft-gold" />
              <span>+{project.media.gallery.length}</span>
            </button>
          </div>
        </div>

        {/* Card Body Information */}
        <div className="mt-4 px-1">
          {/* Title & Price Row */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-medium text-charcoal group-hover:text-deep-emerald transition-colors truncate">
              <Link href={`/projects/${project.slug}`}>
                {project.name}
              </Link>
            </h3>
            <span className="text-base sm:text-lg font-bold text-charcoal shrink-0 font-mono whitespace-nowrap">
              {project.priceDisplay}
            </span>
          </div>

          {/* Location & Developer */}
          <p className="mt-1 text-xs text-charcoal/60 truncate">
            {project.location.district}, {project.location.emirate} • {project.developer}
          </p>

          {/* Bottom Action Row */}
          <div className="mt-5 pt-3.5 border-t border-charcoal/6 flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 text-xs text-charcoal/60 shrink min-w-0">
              <span className="text-[11px] font-medium text-deep-emerald bg-soft-sage px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                {project.handoverYear}
              </span>
              {project.media.pdfBrochure && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-charcoal/60 whitespace-nowrap">
                  <FileText className="w-3 h-3 text-soft-gold" />
                  PDF Available
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-charcoal group-hover:bg-deep-emerald text-pure-white text-xs font-medium transition-colors whitespace-nowrap"
              >
                <span>View Details</span>
                <span className="w-5 h-5 rounded-full bg-pure-white/20 flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-3 h-3 text-pure-white" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Gallery Modal Lightbox */}
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={project.media.gallery}
        projectTitle={project.name}
      />
    </>
  );
}
