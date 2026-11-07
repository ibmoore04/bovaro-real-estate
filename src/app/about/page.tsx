import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { generatePageMetadata } from "@/lib/seo";
import { getBreadcrumbJsonLd } from "@/lib/jsonld";
import { TopBar } from "@/components/navigation/TopBar";
import { FloatingNavDock } from "@/components/navigation/FloatingNavDock";

export const metadata: Metadata = generatePageMetadata({
  title: "About Bovaro Real Estate | Premier UAE Luxury Property Advisory",
  description:
    "Bovaro Real Estate is a private real estate consultancy in Dubai providing high-net-worth buyers and investors with discreet advisory across Dubai, Abu Dhabi, and Ras Al Khaimah.",
  path: "/about",
  keywords: [
    "About Bovaro Real Estate",
    "Dubai property consultants",
    "Luxury real estate advisors UAE",
    "Private real estate advisory Dubai",
  ],
});

export default function AboutPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <div className="min-h-screen bg-pure-white flex flex-col pb-28">
      {/* Schema.org Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <TopBar />

      <main className="flex-1 px-4 sm:px-6 py-8 max-w-5xl mx-auto w-full">
        {/* Semantic Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-charcoal/50">
            <li>
              <Link href="/" className="hover:text-deep-emerald">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-charcoal font-medium">About</li>
          </ol>
        </nav>

        <header className="max-w-3xl mb-12">
          <div className="mb-4">
            <Image
              src="/branding/logo.png"
              alt="Bovaro Real Estate"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </div>
          <p className="text-xs font-semibold uppercase tracking-widest text-deep-emerald">
            Bovaro Real Estate
          </p>
          <h1 className="mt-3 text-3xl font-light tracking-tight text-charcoal sm:text-5xl">
            Discreet Advisory for Discerning Real Estate Investors
          </h1>
          <p className="mt-5 text-base sm:text-lg text-charcoal/70 leading-relaxed">
            Headquartered in the United Arab Emirates, Bovaro Real Estate bridges
            global private capital with the UAE’s most architecturally significant
            residential developments.
          </p>
        </header>

        {/* Philosophy Section */}
        <section aria-labelledby="our-philosophy" className="max-w-4xl space-y-4">
          <h2
            id="our-philosophy"
            className="text-2xl font-light text-charcoal sm:text-3xl"
          >
            Our Advisory Philosophy
          </h2>
          <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
            We operate as confidential advisors rather than transaction brokers.
            Every property in our portfolio represents verified architectural
            integrity, master-developer prestige, and clear long-term capital
            appreciation prospects.
          </p>
        </section>

        {/* Regional Focus Grid */}
        <section aria-labelledby="regional-presence" className="mt-14 max-w-5xl">
          <h2
            id="regional-presence"
            className="text-xl font-medium text-charcoal mb-6"
          >
            Regional Market Focus
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {siteConfig.operatingEmirates.map((emirate) => (
              <article
                key={emirate.name}
                className="p-6 bg-light-grey rounded-[28px] border border-charcoal/6 shadow-2xs"
              >
                <h3 className="text-lg font-medium text-deep-emerald">
                  {emirate.name}
                </h3>
                <p className="mt-2 text-xs text-charcoal/70">{emirate.focus}</p>
                <div className="mt-4 pt-4 border-t border-charcoal/8">
                  <span className="text-[10px] font-semibold text-charcoal/50 uppercase tracking-wider block">
                    Key Markets
                  </span>
                  <p className="text-xs text-charcoal/80 mt-1">
                    {emirate.keyDistricts.join(", ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Box */}
        <aside className="mt-16 p-8 bg-soft-sage/40 rounded-[32px] border border-charcoal/6 max-w-3xl">
          <h2 className="text-xl font-medium text-charcoal">
            Begin a Confidential Real Estate Discussion
          </h2>
          <p className="mt-2 text-sm text-charcoal/70">
            Our senior advisors are available for private consultations regarding
            acquisitions, off-plan allocations, and portfolio management.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold text-pure-white bg-deep-emerald hover:bg-dark-emerald transition-colors"
            >
              Contact Bovaro
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold text-deep-emerald bg-pure-white border border-charcoal/10 hover:bg-light-grey transition-colors"
            >
              Explore Developments
            </Link>
          </div>
        </aside>
      </main>

      <FloatingNavDock />
    </div>
  );
}
