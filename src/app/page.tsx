import type { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@/components/navigation/TopBar";
import { FloatingNavDock } from "@/components/navigation/FloatingNavDock";
import { PropertyDiscoveryView } from "@/features/projects/components/PropertyDiscoveryView";
import { generatePageMetadata } from "@/lib/seo";
import { getFaqJsonLd } from "@/lib/jsonld";

const homepageFaqs = [
  {
    question:
      "Why choose Bovaro Real Estate for the best luxury real estate in Dubai?",
    answer:
      "Bovaro Real Estate operates as a discreet private property consultancy in Downtown Dubai, giving buyers direct access to flagship branded residences, waterfront mansions, and off-plan allocations including Bugatti Residences by Binghatti, Mercedes-Benz Places, The Oasis by Emaar, Oystra on Al Marjan Island, and Sobha City Abu Dhabi.",
  },
  {
    question:
      "What are the best luxury real estate developments in Dubai and the UAE?",
    answer:
      "Among the most sought-after luxury developments in the UAE are Bugatti Residences by Binghatti in Business Bay (from AED 19.09M, handover 2027), Mercedes-Benz Places in Downtown Dubai (from AED 8.8M, handover 2028), The Oasis by Emaar in Dubailand (from AED 8.1M, handover 2030), Oystra by Richmind on Al Marjan Island RAK (from AED 2.3M, handover 2029), and Sobha City Abu Dhabi (from AED 1.95M, handover 2029).",
  },
  {
    question:
      "How do I book a private consultation with Bovaro Real Estate in Dubai?",
    answer:
      "You can schedule a confidential property consultation directly via WhatsApp at +971 56 721 2983, by emailing enquiries@bovarorealestate.com, or through the acquisition request form on our Contact page.",
  },
];

export const metadata: Metadata = generatePageMetadata({
  title:
    "Bovaro Real Estate | Best Luxury Real Estate Agency & Property Consultants in Dubai",
  description:
    "Discover the best real estate in Dubai with Bovaro Real Estate. Premier Dubai property consultants representing Bugatti Residences, Mercedes-Benz Places, The Oasis by Emaar, Oystra RAK, and Sobha City Abu Dhabi.",
  path: "/",
  keywords: [
    "Bovaro Real Estate",
    "Best real estate in Dubai",
    "Best real estate company in Dubai",
    "Best real estate agency in Dubai",
    "Real estate agency in Dubai",
    "Luxury real estate in Dubai",
    "Dubai property consultants",
    "Luxury properties in Dubai",
  ],
});

export default function HomePage() {
  const faqJsonLd = getFaqJsonLd(homepageFaqs);

  return (
    <div className="min-h-screen bg-pure-white flex flex-col">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd),
          }}
        />
      )}
      <TopBar />
      <main className="flex-1">
        <PropertyDiscoveryView
          eyebrow="Bovaro Private Client Portal"
          heading="Welcome home"
          seoSubtitle="Bovaro Real Estate: Best Luxury Real Estate in Dubai, Abu Dhabi & Ras Al Khaimah"
          gridHeading="Best Luxury Real Estate Developments in Dubai, Ras Al Khaimah & Abu Dhabi"
        >
          {/* Server-Rendered Commercial & Advisory Context */}
          <section
            aria-labelledby="bovaro-advisory-heading"
            className="mt-16 pt-10 border-t border-charcoal/8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 sm:p-8 bg-light-grey rounded-[28px] border border-charcoal/6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-deep-emerald">
                  Private Property Consultancy
                </p>
                <h2
                  id="bovaro-advisory-heading"
                  className="mt-2 text-xl sm:text-2xl font-light text-charcoal"
                >
                  Bovaro Real Estate — Discreet Luxury Real Estate Agency in Dubai
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-charcoal/75 leading-relaxed">
                  As dedicated Dubai property consultants, Bovaro Real Estate
                  advises private buyers, family offices, and international
                  investors acquiring luxury properties in Dubai, Abu Dhabi, and
                  Ras Al Khaimah. Our curated mandate spans architectural
                  landmarks including{" "}
                  <Link
                    href="/projects/bugatti"
                    className="text-deep-emerald font-medium hover:underline"
                  >
                    Bugatti Residences by Binghatti
                  </Link>{" "}
                  in Business Bay,{" "}
                  <Link
                    href="/projects/mercedes-benz"
                    className="text-deep-emerald font-medium hover:underline"
                  >
                    Mercedes-Benz Places Binghatti City
                  </Link>{" "}
                  in Downtown Dubai,{" "}
                  <Link
                    href="/projects/emaar-oasis"
                    className="text-deep-emerald font-medium hover:underline"
                  >
                    The Oasis by Emaar
                  </Link>{" "}
                  in Dubailand,{" "}
                  <Link
                    href="/projects/oystra"
                    className="text-deep-emerald font-medium hover:underline"
                  >
                    Oystra by Richmind
                  </Link>{" "}
                  on Al Marjan Island, and{" "}
                  <Link
                    href="/projects/sobha-city"
                    className="text-deep-emerald font-medium hover:underline"
                  >
                    Sobha City Abu Dhabi
                  </Link>
                  .
                </p>
              </div>

              <aside
                aria-label="Private Client Services"
                className="p-6 sm:p-8 bg-soft-sage/40 rounded-[28px] border border-charcoal/6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-medium text-charcoal">
                    Bespoke Acquisition Advisory
                  </h3>
                  <p className="mt-2 text-xs text-charcoal/70 leading-relaxed">
                    Receive verified developer floor plans, off-plan allocation
                    briefings, and private viewing arrangements across the UAE.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold text-pure-white bg-deep-emerald hover:bg-dark-emerald transition-colors"
                  >
                    Speak with an Advisor
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold text-charcoal bg-pure-white border border-charcoal/10 hover:bg-light-grey transition-colors"
                  >
                    About Bovaro
                  </Link>
                </div>
              </aside>
            </div>

            {/* Homepage FAQ Section matching ProjectDetailView styling */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {homepageFaqs.map((faq, index) => (
                <article
                  key={index}
                  className="p-5 rounded-2xl bg-light-grey/70 border border-charcoal/6"
                >
                  <h3 className="text-xs sm:text-sm font-medium text-charcoal">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-xs text-charcoal/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </PropertyDiscoveryView>
      </main>
      <FloatingNavDock />
    </div>
  );
}
