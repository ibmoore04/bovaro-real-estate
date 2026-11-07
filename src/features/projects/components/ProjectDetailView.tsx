"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Share2,
  Heart,
  Bed,
  Bath,
  Maximize2,
  Car,
  Sparkles,
  Phone,
  ArrowUpRight,
  Images,
  FileText,
  Check,
  MapPin,
} from "lucide-react";
import { Project } from "@/types/project";
import { projects } from "@/data/projects";
import { ImageGalleryModal } from "@/components/media/ImageGalleryModal";
import {
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getProjectJsonLd,
} from "@/lib/jsonld";
import { trackProjectView, trackWhatsAppClick } from "@/lib/analytics";

interface ProjectDetailViewProps {
  project: Project;
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    trackProjectView(project.slug, project.name);
  }, [project.slug, project.name]);

  const relatedProjects = projects.filter((item) => item.slug !== project.slug);

  const openGalleryAt = (index: number) => {
    setGalleryStartIndex(index);
    setIsGalleryOpen(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.name,
          text: project.tagline,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const projectJsonLd = getProjectJsonLd(project);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: project.name, url: `/projects/${project.slug}` },
  ]);
  const faqJsonLd = getFaqJsonLd(project.faqs);

  const whatsappMessage = encodeURIComponent(
    `Hello Bovaro Real Estate, I am interested in inquiring about ${project.name} (${project.location.district}, ${project.location.emirate}). Please provide current availability and the brochure.`
  );

  return (
    <main className="min-h-screen bg-pure-white text-charcoal pb-36">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
      )}

      {/* Top Mobile/Desktop Navigation Bar matching reference */}
      <nav
        aria-label="Project Navigation"
        className="sticky top-0 z-30 bg-pure-white/90 backdrop-blur-md border-b border-charcoal/5 px-4 sm:px-8 py-3.5"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/projects"
            className="w-10 h-10 rounded-full bg-light-grey hover:bg-soft-sage text-charcoal flex items-center justify-center transition-colors"
            aria-label="Back to projects"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>

          <span className="text-sm font-medium text-charcoal">
            House details
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-light-grey hover:bg-soft-sage text-charcoal flex items-center justify-center transition-colors relative"
              aria-label="Share property"
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-deep-emerald" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`w-10 h-10 rounded-full transition-colors flex items-center justify-center ${
                isSaved
                  ? "bg-deep-emerald text-pure-white"
                  : "bg-light-grey hover:bg-soft-sage text-charcoal"
              }`}
              aria-label={isSaved ? "Saved to favorites" : "Save to favorites"}
            >
              <Heart
                className={`w-4 h-4 ${isSaved ? "fill-current text-pure-white" : ""}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
        {/* Semantic Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-charcoal/50">
            <li>
              <Link href="/" className="hover:text-deep-emerald transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/projects"
                className="hover:text-deep-emerald transition-colors"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-charcoal font-medium" aria-current="page">
              {project.name}
            </li>
          </ol>
        </nav>

        {/* Giant Rounded Hero Image matching reference */}
        <section aria-label="Project Visual Presentation" className="relative">
          <figure className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-light-grey shadow-md">
            <Image
              src={project.media.coverImage}
              alt={project.media.altText}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <figcaption className="sr-only">
              {project.name} by {project.developer} in {project.location.district},{" "}
              {project.location.emirate} — {project.tagline}
            </figcaption>

            {/* Floating Top Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-4 py-1.5 rounded-full bg-charcoal/80 text-pure-white text-xs font-medium backdrop-blur-md">
                {project.specs.propertyTypeBadge}
              </span>
            </div>

            {/* Floating Image Indicators matching reference */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              {/* Left Photo Counter Pill */}
              <span className="px-3.5 py-1.5 rounded-full bg-charcoal/70 backdrop-blur-md text-pure-white text-xs font-mono">
                1/{project.media.gallery.length}
              </span>

              {/* Right Gallery Preview & Trigger Pill */}
              <button
                type="button"
                onClick={() => openGalleryAt(0)}
                aria-label={`Open all ${project.media.gallery.length} gallery photos`}
                className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal/80 hover:bg-deep-emerald text-pure-white backdrop-blur-md text-xs font-medium transition-colors shadow-sm"
              >
                <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-pure-white/40">
                  <Image
                    src={project.media.gallery[1] || project.media.coverImage}
                    alt={`${project.name} gallery preview thumbnail`}
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>
                <span>+{project.media.gallery.length - 1} photos</span>
              </button>
            </div>
          </figure>
        </section>

        {/* Project Header & Specifications matching reference layout */}
        <section aria-label="Property Specifications" className="mt-8">
          <p className="text-xs font-semibold tracking-wider uppercase text-charcoal/50">
            FOR SALE • {project.specs.matchScore || "EXCLUSIVE"}
          </p>

          <div className="mt-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <h1 className="text-3xl sm:text-5xl font-light text-charcoal tracking-tight">
              {project.name}
            </h1>
            <span className="text-2xl sm:text-3xl font-bold text-charcoal font-mono">
              {project.priceDisplay}
            </span>
          </div>

          <p className="mt-2 text-sm text-charcoal/60">
            {project.location.district}, {project.location.emirate}, {project.location.country} • Developed by {project.developer}
          </p>

          {/* Specification Pills Grid matching reference */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-soft-sage/60 text-charcoal text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
              <Bed className="w-4 h-4 text-deep-emerald" />
              <span>{project.specs.beds}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-soft-sage/60 text-charcoal text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
              <Bath className="w-4 h-4 text-deep-emerald" />
              <span>{project.specs.baths}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-soft-sage/60 text-charcoal text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
              <Maximize2 className="w-4 h-4 text-deep-emerald" />
              <span>{project.specs.area}</span>
            </div>

            {project.specs.parking && (
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-soft-sage/60 text-charcoal text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
                <Car className="w-4 h-4 text-deep-emerald" />
                <span>{project.specs.parking}</span>
              </div>
            )}

            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-soft-sage/60 text-charcoal text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
              <Sparkles className="w-4 h-4 text-soft-gold" />
              <span>Handover {project.handoverYear}</span>
            </div>
          </div>
        </section>

        {/* Gallery Thumbnails Strip (All project images clickable as requested) */}
        <section aria-label="Interactive Photo Gallery" className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-charcoal">
              Project Gallery ({project.media.gallery.length} Images)
            </h2>
            <button
              onClick={() => openGalleryAt(0)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-deep-emerald hover:underline"
            >
              <Images className="w-4 h-4" />
              <span>View Fullscreen Lightbox</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {project.media.gallery.map((imagePath, index) => (
              <button
                key={index}
                type="button"
                onClick={() => openGalleryAt(index)}
                aria-label={`Open gallery at image ${index + 1}`}
                className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-light-grey border border-charcoal/5 hover:border-soft-gold transition-all shadow-2xs"
              >
                <Image
                  src={imagePath}
                  alt={`${project.name} in ${project.location.district}, ${project.location.emirate} — Architectural & Interior View ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-full bg-pure-white/90 text-charcoal flex items-center justify-center shadow-xs">
                    <Images className="w-4 h-4 text-deep-emerald" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Cinematic Video Showcase (Dark Emerald overlay as specified) */}
        {project.media.heroVideo && (
          <section aria-labelledby="cinematic-video" className="mt-14">
            <div className="p-6 sm:p-8 rounded-[32px] bg-dark-emerald text-pure-white relative overflow-hidden shadow-xl">
              <div className="relative z-10 max-w-2xl mb-6">
                <span className="text-xs uppercase tracking-widest text-soft-gold font-semibold">
                  Cinematic Showcase
                </span>
                <h2
                  id="cinematic-video"
                  className="text-2xl sm:text-3xl font-light text-pure-white mt-1"
                >
                  Experience {project.name}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-pure-white/80">
                  Full motion tour capturing the architectural scale, natural light, and bespoke craftsmanship.
                </p>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/40 border border-pure-white/10">
                <video
                  src={project.media.heroVideo}
                  poster={project.media.videoPoster || project.media.coverImage}
                  aria-label={`${project.name} architectural showcase video`}
                  controls
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Digital Brochure Download (Only when PDF exists as requested) */}
        {project.media.pdfBrochure && (
          <section aria-labelledby="digital-brochure" className="mt-12">
            <div className="p-6 sm:p-8 rounded-[28px] bg-light-grey border border-charcoal/8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-deep-emerald text-pure-white flex items-center justify-center shrink-0 shadow-sm">
                  <FileText className="w-6 h-6 text-soft-gold" />
                </div>
                <div>
                  <h3
                    id="digital-brochure"
                    className="text-lg font-medium text-charcoal"
                  >
                    Official Digital Brochure
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-1">
                    {project.media.pdfTitle || "Complete Floor Plans, Specifications & Developer Presentation (PDF)"}
                  </p>
                </div>
              </div>

              <a
                href={project.media.pdfBrochure}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-deep-emerald hover:bg-dark-emerald text-pure-white text-xs font-semibold transition-colors shadow-sm shrink-0"
              >
                <span>Download PDF Brochure</span>
                <ArrowUpRight className="w-4 h-4 text-soft-gold" />
              </a>
            </div>
          </section>
        )}

        {/* Narrative Overview & Developer Profile */}
        <section aria-labelledby="project-narrative" className="mt-14 max-w-3xl">
          <h2
            id="project-narrative"
            className="text-2xl font-light text-charcoal sm:text-3xl"
          >
            Architectural Philosophy & Living Experience
          </h2>
          <p className="mt-4 text-base text-charcoal/80 leading-relaxed">
            {project.overview}
          </p>
          <div className="mt-6 p-5 rounded-2xl bg-light-grey/70 border border-charcoal/6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-deep-emerald">
              Developer — {project.developer}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              {project.developerProfile}
            </p>
          </div>
        </section>

        {/* Property Categories, Verified Prices, Payment Plan & Handover Timeline */}
        <section
          aria-labelledby="property-categories-heading"
          className="mt-12"
        >
          <h2
            id="property-categories-heading"
            className="text-xl font-medium text-charcoal"
          >
            Residence Categories, Verified Pricing & Timeline
          </h2>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 p-6 rounded-[28px] bg-light-grey border border-charcoal/6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">
                Available Property Categories & Collections
              </h3>
              <ul className="mt-3 space-y-2.5">
                {project.propertyTypes.map((category, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2.5 text-xs sm:text-sm font-medium text-charcoal"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-deep-emerald shrink-0" />
                    <span>{category}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-[28px] bg-soft-sage/40 border border-charcoal/6 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/50 block">
                  Verified Starting Price
                </span>
                <p className="mt-1 text-xl font-bold text-charcoal font-mono">
                  {project.startingPrice}
                </p>
              </div>
              <div className="pt-3 border-t border-charcoal/8">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/50 block">
                  Estimated Handover Timeline
                </span>
                <p className="mt-1 text-sm font-medium text-deep-emerald">
                  {project.handoverYear}
                </p>
              </div>
              <div className="pt-3 border-t border-charcoal/8">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/50 block">
                  Payment Plan Structure
                </span>
                <p className="mt-1 text-xs text-charcoal/75 leading-relaxed">
                  {project.paymentPlanNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architectural Highlights */}
        <section aria-labelledby="architectural-highlights" className="mt-12">
          <h2
            id="architectural-highlights"
            className="text-xl font-medium text-charcoal"
          >
            Key Design Attributes
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {project.architecturalHighlights.map((highlight, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-light-grey/80 border border-charcoal/5 flex items-start space-x-3"
              >
                <span className="text-soft-gold font-bold">✦</span>
                <span className="text-xs sm:text-sm text-charcoal/80">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Amenities */}
        <section aria-labelledby="exclusive-amenities" className="mt-12">
          <h2
            id="exclusive-amenities"
            className="text-xl font-medium text-charcoal"
          >
            Resident Amenities & Privileges
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {project.keyAmenities.map((amenity, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-soft-sage/40 text-charcoal text-xs sm:text-sm font-medium flex items-center space-x-2.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-deep-emerald shrink-0" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Location, Connectivity & Nearby Attractions */}
        <section
          aria-labelledby="location-connectivity-heading"
          className="mt-12"
        >
          <h2
            id="location-connectivity-heading"
            className="text-xl font-medium text-charcoal"
          >
            Location & Nearby Landmarks — {project.location.district},{" "}
            {project.location.emirate}
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {project.nearbyAttractions.map((landmark, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-light-grey/70 border border-charcoal/5 flex items-center space-x-3"
              >
                <MapPin className="w-4 h-4 text-deep-emerald shrink-0" />
                <span className="text-xs sm:text-sm text-charcoal/80">
                  {landmark}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Private Enquiry & Acquisition Process */}
        <section aria-labelledby="enquiry-process-heading" className="mt-12">
          <div className="p-6 sm:p-8 rounded-[28px] bg-soft-sage/35 border border-charcoal/8">
            <h2
              id="enquiry-process-heading"
              className="text-xl font-medium text-charcoal"
            >
              Private Acquisition & Enquiry Process
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/75 leading-relaxed max-w-3xl">
              {project.enquiryProcess}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/contact?project=${project.slug}`}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold text-pure-white bg-deep-emerald hover:bg-dark-emerald transition-colors"
              >
                Schedule Private Consultation
              </Link>
              <a
                href={`https://wa.me/971567212983?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(project.slug, "project_page")}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-charcoal bg-pure-white border border-charcoal/10 hover:bg-light-grey transition-colors"
              >
                <span>Request Unit Availability via WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-soft-gold" />
              </a>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        {project.faqs && project.faqs.length > 0 && (
          <section aria-labelledby="faqs-heading" className="mt-16 max-w-3xl">
            <h2
              id="faqs-heading"
              className="text-2xl font-light text-charcoal"
            >
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-4">
              {project.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-light-grey border border-charcoal/6"
                >
                  <h3 className="text-sm sm:text-base font-medium text-charcoal">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Internal Links to Other Flagship Developments */}
        <section
          aria-labelledby="related-developments-heading"
          className="mt-16 pt-10 border-t border-charcoal/8"
        >
          <div className="flex items-center justify-between mb-5">
            <h2
              id="related-developments-heading"
              className="text-xl font-medium text-charcoal"
            >
              Explore Other Flagship UAE Developments
            </h2>
            <Link
              href="/projects"
              className="text-xs font-semibold text-deep-emerald hover:underline"
            >
              View All Projects
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProjects.map((related) => (
              <Link
                key={related.id}
                href={`/projects/${related.slug}`}
                className="group p-4 rounded-2xl bg-light-grey hover:bg-soft-sage/50 border border-charcoal/6 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-deep-emerald block">
                    {related.location.district}, {related.location.emirate}
                  </span>
                  <h3 className="mt-1 text-sm font-medium text-charcoal group-hover:text-deep-emerald transition-colors">
                    {related.name}
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/60">
                    {related.specs.propertyTypeBadge} • {related.specs.beds}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-charcoal/8 flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-charcoal">
                    {related.priceDisplay}
                  </span>
                  <span className="text-[11px] font-medium text-deep-emerald inline-flex items-center gap-0.5">
                    Explore
                    <ArrowUpRight className="w-3 h-3 text-soft-gold" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Bottom Action Bar matching reference image EXACTLY */}
      <aside
        aria-label="Acquisition and Consultation Actions"
        className="fixed bottom-6 left-0 right-0 z-40 px-3 sm:px-4 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto w-full max-w-lg bg-pure-white/95 backdrop-blur-xl border border-charcoal/10 rounded-full p-1.5 sm:p-2 shadow-2xl flex items-center justify-between gap-2 sm:gap-3">
          {/* Left Action: Book a Visit */}
          <Link
            href="/contact"
            className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2.5 py-2.5 sm:py-3 px-2 sm:px-4 rounded-full text-[11px] sm:text-xs font-semibold text-charcoal hover:bg-light-grey transition-colors whitespace-nowrap"
          >
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-light-grey flex items-center justify-center shrink-0">
              <Phone className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-deep-emerald" />
            </span>
            <span>Book a Visit</span>
          </Link>

          {/* Right Action: Buy / Inquire WhatsApp Pill Button matching reference */}
          <a
            href={`https://wa.me/971567212983?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(project.slug, "project_page")}
            className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-5 rounded-full bg-charcoal hover:bg-deep-emerald text-pure-white text-[11px] sm:text-xs font-semibold transition-colors shadow-md whitespace-nowrap"
          >
            <span className="truncate">Inquire • {project.priceDisplay}</span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-pure-white/20 flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-pure-white" />
            </span>
          </a>
        </div>
      </aside>

      {/* Fullscreen Gallery Lightbox Modal */}
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={project.media.gallery}
        projectTitle={project.name}
        initialIndex={galleryStartIndex}
      />
    </main>
  );
}
