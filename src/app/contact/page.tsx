import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { generatePageMetadata } from "@/lib/seo";
import { getBreadcrumbJsonLd } from "@/lib/jsonld";
import { TopBar } from "@/components/navigation/TopBar";
import { FloatingNavDock } from "@/components/navigation/FloatingNavDock";
import {
  ContactEnquiryForm,
  ContactWhatsAppLink,
} from "@/features/contact/components/ContactEnquiryForm";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Bovaro Real Estate | Private Property Consultations in Dubai",
  description:
    "Schedule a confidential real estate consultation with Bovaro Real Estate's Dubai property consultants. Connect via WhatsApp, telephone, or private appointment in Downtown Dubai.",
  path: "/contact",
  keywords: [
    "Contact Bovaro Real Estate",
    "Dubai property consultants",
    "Private property consultation Dubai",
    "Luxury real estate advisory UAE",
  ],
});

export default function ContactPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
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
        {/* Semantic Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-charcoal/50">
            <li>
              <Link href="/" className="hover:text-deep-emerald">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-charcoal font-medium">Contact</li>
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
            Private Consultations
          </p>
          <h1 className="mt-3 text-3xl font-light tracking-tight text-charcoal sm:text-5xl">
            Connect with a Bovaro Luxury Property Specialist
          </h1>
          <p className="mt-4 text-base text-charcoal/70 leading-relaxed">
            Whether you are exploring off-plan allocations in Bugatti Residences,
            waterfront villas in The Oasis, or island properties on Al Marjan
            Island, our senior advisors offer discreet, data-backed guidance.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl">
          {/* Contact Channels */}
          <section aria-labelledby="contact-channels" className="space-y-6">
            <h2
              id="contact-channels"
              className="text-xl font-medium text-charcoal"
            >
              Direct Advisory Channels
            </h2>

            <div className="p-6 bg-light-grey rounded-[32px] border border-charcoal/6 space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 block">
                  Direct WhatsApp Advisory
                </span>
                <ContactWhatsAppLink />
                <p className="text-xs text-charcoal/60 mt-1">
                  Typical response within minutes during UAE business hours.
                </p>
              </div>

              <div className="pt-4 border-t border-charcoal/8">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 block">
                  Client Advisory Email
                </span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-1 text-sm font-medium text-charcoal hover:text-deep-emerald block"
                >
                  {siteConfig.contact.email}
                </a>
              </div>

              <div className="pt-4 border-t border-charcoal/8">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 block">
                  Direct Phone
                </span>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="mt-1 text-sm font-medium text-charcoal hover:text-deep-emerald block"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>

              <div className="pt-4 border-t border-charcoal/8">
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 block">
                  Primary Advisory Office
                </span>
                <p className="mt-1 text-xs text-charcoal/80">
                  {siteConfig.contact.address.streetAddress},{" "}
                  {siteConfig.contact.address.addressLocality},{" "}
                  {siteConfig.contact.address.addressCountry}
                </p>
              </div>
            </div>
          </section>

          {/* Enquiry Form */}
          <section
            aria-labelledby="enquiry-form"
            className="p-8 bg-pure-white rounded-[32px] border border-charcoal/10 shadow-xs"
          >
            <h2
              id="enquiry-form"
              className="text-xl font-medium text-charcoal"
            >
              Submit Acquisition Request
            </h2>
            <p className="mt-1 text-xs text-charcoal/50">
              All inquiries are held in strict commercial confidence.
            </p>

            <ContactEnquiryForm />
          </section>
        </div>
      </main>

      <FloatingNavDock />
    </div>
  );
}
