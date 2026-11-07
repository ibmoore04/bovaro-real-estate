import type { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@/components/navigation/TopBar";
import { FloatingNavDock } from "@/components/navigation/FloatingNavDock";
import { PropertyDiscoveryView } from "@/features/projects/components/PropertyDiscoveryView";
import { projects } from "@/data/projects";
import { generatePageMetadata } from "@/lib/seo";
import {
  getBreadcrumbJsonLd,
  getProjectsCollectionJsonLd,
} from "@/lib/jsonld";

export const metadata: Metadata = generatePageMetadata({
  title:
    "Luxury Properties in Dubai, Ras Al Khaimah (Al Marjan Island) & Abu Dhabi",
  description:
    "Explore Bovaro Real Estate's flagship developments: branded sky mansions in Dubai, waterfront properties on Al Marjan Island in Ras Al Khaimah, and luxury villas in Abu Dhabi.",
  path: "/projects",
  keywords: [
    "Luxury properties in Ras Al Khaimah",
    "Properties on Al Marjan Island",
    "Waterfront properties in Ras Al Khaimah",
    "Luxury properties in Abu Dhabi",
    "Flagship luxury developments UAE",
  ],
});

export default function ProjectsIndexPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
  ]);
  const collectionJsonLd = getProjectsCollectionJsonLd(projects);

  return (
    <div className="min-h-screen bg-pure-white flex flex-col">
      {/* Schema.org Breadcrumb & CollectionPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionJsonLd),
        }}
      />

      <TopBar />
      <main className="flex-1">
        <PropertyDiscoveryView
          eyebrow="UAE Flagship Portfolio • Dubai, Ras Al Khaimah & Abu Dhabi"
          heading="Curated Developments"
          seoSubtitle="Luxury Properties in Dubai, Waterfront Properties on Al Marjan Island in Ras Al Khaimah, and Luxury Communities in Abu Dhabi"
          gridHeading="All Flagship UAE Developments"
        >
          {/* Regional Market Breakdown for Location Search Intent */}
          <section
            aria-labelledby="regional-locations-heading"
            className="mt-16 pt-10 border-t border-charcoal/8"
          >
            <h2
              id="regional-locations-heading"
              className="text-xl sm:text-2xl font-light text-charcoal mb-6"
            >
              Explore Luxury Properties by UAE Destination
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <article className="p-6 bg-light-grey rounded-[28px] border border-charcoal/6">
                <h3 className="text-base font-medium text-deep-emerald">
                  Dubai Branded & Lagoon Residences
                </h3>
                <p className="mt-2 text-xs text-charcoal/75 leading-relaxed">
                  Featuring hyper-luxury sky mansions at{" "}
                  <Link
                    href="/projects/bugatti"
                    className="text-deep-emerald font-medium hover:underline"
                  >
                    Bugatti Residences by Binghatti
                  </Link>{" "}
                  (Business Bay), Burj Khalifa views at{" "}
                  <Link
                    href="/projects/mercedes-benz"
                    className="text-deep-emerald font-medium hover:underline"
                  >
                    Mercedes-Benz Places Binghatti City
                  </Link>{" "}
                  (Downtown Dubai), and swimmable crystal lagoon mansions at{" "}
                  <Link
                    href="/projects/emaar-oasis"
                    className="text-deep-emerald font-medium hover:underline"
                  >
                    The Oasis by Emaar
                  </Link>{" "}
                  (Dubailand).
                </p>
              </article>

              <article className="p-6 bg-light-grey rounded-[28px] border border-charcoal/6">
                <h3 className="text-base font-medium text-deep-emerald">
                  Ras Al Khaimah & Al Marjan Island Waterfront
                </h3>
                <p className="mt-2 text-xs text-charcoal/75 leading-relaxed">
                  Discover luxury properties in Ras Al Khaimah and beachfront
                  properties on Al Marjan Island.{" "}
                  <Link
                    href="/projects/oystra"
                    className="text-deep-emerald font-medium hover:underline"
                  >
                    Oystra by Richmind
                  </Link>{" "}
                  delivers direct Arabian Gulf beach frontage near the landmark
                  Wynn Al Marjan Island resort district.
                </p>
              </article>

              <article className="p-6 bg-light-grey rounded-[28px] border border-charcoal/6">
                <h3 className="text-base font-medium text-deep-emerald">
                  Abu Dhabi Master-Planned Communities
                </h3>
                <p className="mt-2 text-xs text-charcoal/75 leading-relaxed">
                  Explore luxury properties in Abu Dhabi anchored by{" "}
                  <Link
                    href="/projects/sobha-city"
                    className="text-deep-emerald font-medium hover:underline"
                  >
                    Sobha City Abu Dhabi
                  </Link>
                  , offering handcrafted 1 to 3-bedroom apartments, 4-bedroom
                  townhouses, and 5 to 6-bedroom signature villas by Sobha
                  Realty.
                </p>
              </article>
            </div>
          </section>
        </PropertyDiscoveryView>
      </main>
      <FloatingNavDock />
    </div>
  );
}
