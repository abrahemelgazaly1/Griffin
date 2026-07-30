import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";

import m1 from "@/assets/m1.jpeg";
import m2 from "@/assets/m2.jpeg";
import m3 from "@/assets/m3.jpeg";
import m4 from "@/assets/m4.jpeg";
import m5 from "@/assets/m5.jpeg";
import m6 from "@/assets/m6.jpeg";
import m7 from "@/assets/m7.jpeg";
import m8 from "@/assets/m8.jpeg";
import m9 from "@/assets/m9.jpeg";
import m10 from "@/assets/m10.jpeg";
import m11 from "@/assets/m11.jpeg";
import m12 from "@/assets/m12.jpeg";
import m13 from "@/assets/m13.jpeg";
import m14 from "@/assets/m14.jpeg";
import m15 from "@/assets/m15.jpeg";
import m16 from "@/assets/m16.jpeg";
import m17 from "@/assets/m17.jpeg";
import m18 from "@/assets/m18.jpeg";
import m19 from "@/assets/m19.jpeg";
import m20 from "@/assets/m20.jpeg";

// Menu page scans in printed order (m1 → m20). They render stacked with zero gap.
const menuPages = [
  m1, m2, m3, m4, m5, m6, m7, m8, m9, m10,
  m11, m12, m13, m14, m15, m16, m17, m18, m19, m20,
].map((src, i) => ({ src, alt: `Griffin Coffee menu page ${i + 1}` }));

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | Griffin Coffee — El-Mahalla El-Kubra" },
      {
        name: "description",
        content:
          "Browse the full Griffin Coffee menu: specialty espresso, cold brews, sourdough meals, breakfast plates and desserts in El-Mahalla El-Kubra.",
      },
      { property: "og:title", content: "Menu | Griffin Coffee" },
      {
        property: "og:description",
        content:
          "The full Griffin Coffee menu — specialty coffee, sourdough meals and desserts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <section className="px-6 py-14 text-center sm:py-20">
          <h1 className="font-display text-4xl uppercase tracking-[0.2em] text-copper sm:text-6xl">
            Menu Griffin
          </h1>
          <div className="rule-copper mx-auto mt-6 w-48" />
          <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground">
            Specialty coffee, sourdough kitchen and desserts — served all day, every day
            from 7:30 AM to 1:00 AM.
          </p>
        </section>

        <section className="mx-auto max-w-4xl">
          <div className="flex flex-col">
            {menuPages.map((page, i) => (
              <img
                key={i}
                src={page.src}
                alt={page.alt}
                width={1008}
                height={1408}
                loading={i < 2 ? "eager" : "lazy"}
                className="block h-auto w-full align-top"
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
