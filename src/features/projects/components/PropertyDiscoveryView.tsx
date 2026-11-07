"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, ChevronDown, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

interface PropertyDiscoveryViewProps {
  eyebrow?: string;
  heading?: string;
  seoSubtitle?: string;
  gridHeading?: string;
  children?: React.ReactNode;
}

export function PropertyDiscoveryView({
  eyebrow = "Bovaro Private Client Portal",
  heading = "Welcome home",
  seoSubtitle = "Luxury Real Estate Agency & Property Consultants in Dubai, Abu Dhabi & Ras Al Khaimah",
  gridHeading = "Featured UAE Luxury Real Estate Developments",
  children,
}: PropertyDiscoveryViewProps = {}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTypeDropdownOpen(false);
      }
    }
    if (isTypeDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isTypeDropdownOpen]);

  const filterTabs = ["All", "Dubai", "Ras Al Khaimah", "Abu Dhabi"];
  const propertyTypes = [
    "All Types",
    "Sky Mansion",
    "Branded Tower",
    "Lagoon Villa",
    "Island Waterfront",
    "Master Community",
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesEmirate =
      activeFilter === "All" || project.location.emirate === activeFilter;

    const matchesType =
      selectedType === "All Types" ||
      project.specs.propertyTypeBadge.toLowerCase().includes(selectedType.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === "" ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.overview.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesEmirate && matchesType && matchesSearch;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-28">
      {/* Greeting Header matching reference */}
      <section aria-label="Welcome and Discovery" className="mb-6">
        <p className="text-sm text-charcoal/50 font-normal">
          {eyebrow}
        </p>
        <h1 className="text-2xl sm:text-4xl font-normal text-charcoal tracking-tight mt-0.5">
          {heading}
          <span className="sr-only"> — {seoSubtitle}</span>
        </h1>
      </section>

      {/* AI Discovery Search Bar with Iridescent Orb matching reference */}
      <div className="relative mb-6">
        <div className="relative flex items-center bg-light-grey rounded-full px-4 py-3 border border-charcoal/8 focus-within:border-deep-emerald/40 focus-within:bg-pure-white transition-all shadow-2xs">
          {/* Iridescent AI Orb matching reference */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-amber-300 flex items-center justify-center shrink-0 shadow-xs mr-3">
            <Sparkles className="w-3.5 h-3.5 text-pure-white" />
          </div>

          <input
            type="text"
            aria-label="Search luxury properties by development, district, or property type"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask AI: 3 bed sky mansion in Business Bay, lagoon villa..."
            className="w-full min-w-0 bg-transparent text-xs sm:text-sm text-charcoal placeholder:text-charcoal/45 focus:outline-hidden"
          />

          <div className="flex items-center space-x-1.5 ml-2 shrink-0">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-charcoal/40 hover:text-charcoal px-1.5"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              aria-label="Voice Search"
              className="w-8 h-8 rounded-full bg-charcoal/5 hover:bg-charcoal/10 flex items-center justify-center text-charcoal/70 transition-colors"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Row: Emirates Horizontal Carousel + Pinned Property Type Dropdown matching reference */}
      <div className="relative mb-8">
        <div className="flex items-center gap-2">
          {/* Scrollable Emirate Pills */}
          <div className="flex-1 min-w-0 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                  activeFilter === tab
                    ? "bg-charcoal text-pure-white shadow-xs"
                    : "bg-soft-sage/60 hover:bg-soft-sage text-charcoal"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Property Type Dropdown — Pinned outside the scrollable container so it NEVER clips or scrolls away */}
          <div ref={typeDropdownRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
              className={`inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                selectedType !== "All Types"
                  ? "bg-charcoal text-pure-white shadow-xs"
                  : "bg-soft-sage/60 hover:bg-soft-sage text-charcoal"
              }`}
              aria-expanded={isTypeDropdownOpen}
            >
              <span className="whitespace-nowrap">{selectedType}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                  isTypeDropdownOpen ? "rotate-180" : ""
                } ${
                  selectedType !== "All Types"
                    ? "text-pure-white/70"
                    : "text-charcoal/60"
                }`}
              />
            </button>

            {isTypeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-pure-white border border-charcoal/10 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setSelectedType(type);
                      setIsTypeDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                      selectedType === type
                        ? "bg-soft-sage text-deep-emerald font-semibold"
                        : "hover:bg-light-grey text-charcoal"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Cards Stack / Grid matching reference cards */}
      <section aria-labelledby="developments-grid-heading">
        <h2 id="developments-grid-heading" className="sr-only">
          {gridHeading}
        </h2>
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-light-grey/60 rounded-[32px] p-8 border border-charcoal/5">
            <p className="text-base font-medium text-charcoal">
              No developments matched your criteria
            </p>
            <p className="text-xs text-charcoal/60 mt-1">
              Try adjusting your search terms or emirate filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("All");
                setSelectedType("All Types");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-deep-emerald text-pure-white text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                priority={index < 2}
              />
            ))}
          </div>
        )}
      </section>

      {children}
    </div>
  );
}
