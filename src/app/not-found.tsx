import type { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@/components/navigation/TopBar";
import { FloatingNavDock } from "@/components/navigation/FloatingNavDock";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The requested page could not be found. Explore Bovaro Real Estate's luxury residential portfolio across Dubai, Ras Al Khaimah, and Abu Dhabi.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-pure-white flex flex-col pb-28">
      <TopBar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-16 flex flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-deep-emerald">
          404 • Residence or Page Unavailable
        </p>
        <h1 className="mt-3 text-3xl sm:text-5xl font-light tracking-tight text-charcoal">
          We could not locate the requested page
        </h1>
        <p className="mt-4 text-sm sm:text-base text-charcoal/70 max-w-2xl leading-relaxed">
          The URL you followed may have moved or is no longer active. Explore
          Bovaro Real Estate&apos;s flagship developments across Dubai, Al Marjan
          Island, and Abu Dhabi below, or connect directly with our private
          client advisory team.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold text-pure-white bg-deep-emerald hover:bg-dark-emerald transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold text-charcoal bg-soft-sage/60 hover:bg-soft-sage transition-colors"
          >
            View All Flagship Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold text-deep-emerald bg-pure-white border border-charcoal/15 hover:bg-light-grey transition-colors"
          >
            Private Consultation
          </Link>
        </div>

        <section
          aria-labelledby="featured-portfolio-links"
          className="mt-14 pt-8 border-t border-charcoal/8"
        >
          <h2
            id="featured-portfolio-links"
            className="text-sm font-semibold uppercase tracking-wider text-charcoal/60 mb-4"
          >
            Direct Development Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="p-4 rounded-2xl bg-light-grey hover:bg-soft-sage/50 border border-charcoal/6 transition-colors"
              >
                <span className="block text-sm font-medium text-charcoal">
                  {project.name}
                </span>
                <span className="block text-xs text-charcoal/60 mt-0.5">
                  {project.location.district}, {project.location.emirate}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <FloatingNavDock />
    </div>
  );
}

