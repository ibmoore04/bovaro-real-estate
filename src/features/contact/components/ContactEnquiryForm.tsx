"use client";

import { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { trackEnquirySubmit, trackWhatsAppClick } from "@/lib/analytics";
import { siteConfig } from "@/data/site";

export function ContactWhatsAppLink() {
  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("general", "contact_page")}
      className="mt-1 text-base font-medium text-deep-emerald hover:underline inline-flex items-center gap-1.5"
    >
      <span>Chat on WhatsApp ({siteConfig.contact.whatsapp})</span>
      <ArrowUpRight className="w-4 h-4 text-soft-gold" />
    </a>
  );
}

export function ContactEnquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const projectLabels: Record<string, string> = {
    bugatti: "Bugatti Residences by Binghatti (Business Bay)",
    "mercedes-benz": "Mercedes-Benz Places (Downtown Dubai)",
    "emaar-oasis": "The Oasis by Emaar (Dubailand)",
    oystra: "Oystra by Richmind (Al Marjan Island RAK)",
    "sobha-city": "Sobha City Abu Dhabi",
  };

  const getWhatsAppUrl = () => {
    const selectedProjectName = projectLabels[project] || "General Luxury Portfolio";
    const text = [
      `*New Acquisition Enquiry — Bovaro Real Estate*`,
      ``,
      `• *Client Name:* ${name.trim()}`,
      `• *Phone:* ${phone.trim()}`,
      `• *Email:* ${email.trim()}`,
      `• *Development of Interest:* ${selectedProjectName}`,
      message.trim() ? `• *Requirements:* ${message.trim()}` : "",
      ``,
      `_Submitted via Bovaro Real Estate Contact Portal_`,
    ]
      .filter(Boolean)
      .join("\n");

    const cleanNumber = siteConfig.contact.whatsapp.replace(/\D/g, "");
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const targetProject = project || "general";
    trackEnquirySubmit(targetProject, "general_enquiry", "organic_search");
    trackWhatsAppClick(targetProject, "contact_page");

    // Immediately open WhatsApp with the complete pre-composed enquiry
    const whatsappUrl = getWhatsAppUrl();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-6 p-6 rounded-2xl bg-soft-sage/50 border border-deep-emerald/20 space-y-4"
      >
        <div className="flex items-center space-x-2.5 text-deep-emerald">
          <span className="w-7 h-7 rounded-full bg-deep-emerald text-pure-white flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </span>
          <h3 className="text-sm font-semibold text-charcoal">
            Enquiry Prepared for WhatsApp Dispatch
          </h3>
        </div>
        <p className="text-xs text-charcoal/75 leading-relaxed">
          Thank you, {name}. Your confidential acquisition enquiry has been
          opened directly in WhatsApp to connect with a Bovaro Senior Property
          Advisor. If your WhatsApp window did not open automatically, click
          the button below:
        </p>
        <div className="flex flex-wrap gap-2.5 pt-1">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick(project || "general", "contact_page")
            }
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-deep-emerald hover:bg-dark-emerald text-pure-white text-xs font-semibold transition-colors"
          >
            <span>Open WhatsApp Chat Directly</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-soft-gold" />
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setMessage("");
            }}
            className="px-4 py-2.5 rounded-full bg-pure-white border border-charcoal/15 text-xs font-medium text-charcoal hover:bg-light-grey transition-colors cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-medium text-charcoal mb-1"
        >
          Full Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full border border-charcoal/15 bg-light-grey/50 text-xs text-charcoal focus:outline-deep-emerald"
          placeholder="Lord / Lady / Mr. / Ms."
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-medium text-charcoal mb-1"
        >
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full border border-charcoal/15 bg-light-grey/50 text-xs text-charcoal focus:outline-deep-emerald"
          placeholder="name@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-xs font-medium text-charcoal mb-1"
        >
          Phone Number (with country code) *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full border border-charcoal/15 bg-light-grey/50 text-xs text-charcoal focus:outline-deep-emerald"
          placeholder="+971 56 721 2983"
        />
      </div>

      <div>
        <label
          htmlFor="project"
          className="block text-xs font-medium text-charcoal mb-1"
        >
          Development of Interest
        </label>
        <select
          id="project"
          name="project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full border border-charcoal/15 bg-light-grey/50 text-xs text-charcoal focus:outline-deep-emerald"
        >
          <option value="">General Luxury Portfolio</option>
          <option value="bugatti">Bugatti Residences by Binghatti</option>
          <option value="mercedes-benz">
            Mercedes-Benz Places Binghatti City
          </option>
          <option value="emaar-oasis">The Oasis by Emaar</option>
          <option value="oystra">Oystra by Richmind (Al Marjan Island)</option>
          <option value="sobha-city">Sobha City Abu Dhabi</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-medium text-charcoal mb-1"
        >
          Message & Requirements
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl border border-charcoal/15 bg-light-grey/50 text-xs text-charcoal focus:outline-deep-emerald"
          placeholder="Property typology, timeframe, or specific inquiries..."
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 py-3 rounded-full text-xs font-semibold text-pure-white bg-deep-emerald hover:bg-dark-emerald transition-colors shadow-xs cursor-pointer"
      >
        Submit Confidential Enquiry
      </button>
    </form>
  );
}

