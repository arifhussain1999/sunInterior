import { Metadata } from "next";
import Link from "next/link";
import { VideoGalleryClient } from "@/components/video-gallery-client";
import { siteConfig } from "@/data/catalog";
import { buildWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Video Gallery | SUN SEATINGS",
  description: "Watch premium outdoor furniture showcases, styling guides, craft tours, and collections from SUN SEATINGS."
};

export default function VideoGalleryPage() {
  return (
    <section className="section-space pt-8">
      <div className="container-shell">
        {/* Page Hero */}
        <div className="mb-8 rounded-[38px] bg-white p-8 shadow-card sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#2874F0]">Video Gallery</p>
          <h1 className="mt-3 font-[var(--font-heading)] text-5xl font-semibold text-[#1f2937] sm:text-6xl">
            Visualizing Comfort: Showcases & Styling
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[#6b7280] sm:text-base">
            Take a closer look at our luxury design finishes, durability tests, styling guides, and factory craftsmanship tours.
          </p>
        </div>

        {/* Video Gallery Client component */}
        <VideoGalleryClient />

        {/* Call to action section */}
        <div className="relative mt-12 overflow-hidden rounded-[38px] bg-white p-8 shadow-card text-center sm:p-12">
          <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-500/5 blur-xl"></div>
          <div className="absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-yellow-500/5 blur-xl"></div>
          
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#2874F0]">Custom Bespoke Designs</p>
          <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-semibold text-[#1f2937] sm:text-4xl">
            Looking for something custom?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-[#6b7280] sm:text-base">
            Our designers can assist you with custom sizes, color configurations, and layouts to fit your terrace, balcony, cafe, or resort.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={buildWhatsAppLink(siteConfig.whatsappNumber, "Hi, I watched your video gallery. I'd like to discuss custom outdoor furniture options.")}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#24d366] px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#20ba5a] transition-all"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
            >
              Send an Enquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
