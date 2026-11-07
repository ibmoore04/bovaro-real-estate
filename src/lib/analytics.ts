/**
 * Bovaro Real Estate — Analytics & Conversion Tracking Architecture
 *
 * Provides standardized event dispatchers for GA4, Google Tag Manager,
 * and custom conversion tracking.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (
      command: "event" | "config" | "set",
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Tracks when a user views a specific luxury project page.
 */
export function trackProjectView(projectSlug: string, projectName: string) {
  if (typeof window === "undefined") return;

  const eventData = {
    event: "view_project_details",
    project_slug: projectSlug,
    project_name: projectName,
    timestamp: new Date().toISOString(),
  };

  if (window.dataLayer) {
    window.dataLayer.push(eventData);
  }

  if (window.gtag) {
    window.gtag("event", "view_project_details", {
      project_slug: projectSlug,
      project_name: projectName,
    });
  }
}

/**
 * Tracks when a user clicks the direct WhatsApp consultation link.
 */
export function trackWhatsAppClick(
  projectSlug?: string,
  placement: "header" | "floating_cta" | "project_page" | "contact_page" = "floating_cta"
) {
  if (typeof window === "undefined") return;

  const eventData = {
    event: "contact_whatsapp_click",
    placement,
    project_slug: projectSlug || "general",
    timestamp: new Date().toISOString(),
  };

  if (window.dataLayer) {
    window.dataLayer.push(eventData);
  }

  if (window.gtag) {
    window.gtag("event", "contact_whatsapp_click", {
      placement,
      project_slug: projectSlug || "general",
    });
  }
}

/**
 * Tracks qualified property enquiry form submission.
 */
export function trackEnquirySubmit(
  projectSlug: string,
  enquiryType: "brochure_download" | "viewing_request" | "general_enquiry",
  leadSource: string = "organic_search"
) {
  if (typeof window === "undefined") return;

  const eventData = {
    event: "lead_enquiry_submitted",
    project_slug: projectSlug,
    enquiry_type: enquiryType,
    lead_source: leadSource,
    timestamp: new Date().toISOString(),
  };

  if (window.dataLayer) {
    window.dataLayer.push(eventData);
  }

  if (window.gtag) {
    window.gtag("event", "generate_lead", {
      project_slug: projectSlug,
      enquiry_type: enquiryType,
      lead_source: leadSource,
    });
  }
}
