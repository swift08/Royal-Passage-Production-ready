import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ExperienceCard } from "@/components/site/ExperienceCard";
import { HomeHero } from "@/components/site/HomeHero";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/site/ScrollReveal";
import { getCatalogForUi } from "@/lib/marketplace-fns";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export const Route = createFileRoute("/")({
  loader: async () => await getCatalogForUi(),
  head: () => ({
    meta: [
      { title: "The Royal Passage — Curated experiences, by invitation of taste" },
      {
        name: "description",
        content:
          "A curated marketplace of premium, time-bound experiences hosted by verified artisans, chefs, and guides across the world.",
      },
      { property: "og:title", content: "The Royal Passage" },
      { property: "og:description", content: "Curated experiences, by invitation of taste." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const { experiences, categories } = Route.useLoaderData();
  const featured = experiences.slice(0, 4);
  const reduceMotion = usePrefersReducedMotion();
  const categoryCounts = new Map(
    categories.map((c) => [c, experiences.filter((e) => e.category === c).length]),
  );
  const tickerCategories = [...categories, ...categories];

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "The Royal Passage",
    description:
      "A curated marketplace of premium, time-bound experiences hosted by verified providers.",
    url: "https://theroyalpassage.com",
  };

  return (
    <div className="overflow-x-hidden pt-[var(--header-height)] text-foreground">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />

      <HomeHero />

      {/* MARQUEE STATS */}
      <ScrollReveal>
        <section className="glass border-y border-[oklch(0.88_0.08_86_/_0.12)]">
          <div className="container-page grid grid-cols-2 gap-6 py-8 text-sm md:grid-cols-4 md:gap-8">
            <Stat label="Experiences" value="42" delay={0} />
            <Stat label="Cities" value="6" delay={0.05} />
            <Stat label="Verified hosts" value="38" delay={0.1} />
            <Stat label="Average rating" value="4.88 ★" delay={0.15} />
          </div>
        </section>
      </ScrollReveal>

      {/* CATEGORIES */}
      <section className="container-page py-20 md:py-28">
        <ScrollReveal>
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div>
              <div className="eyebrow mb-3">Browse by intention</div>
              <h2 className="font-display text-4xl tracking-tight md:text-5xl lg:text-6xl">
                What calls to you tonight?
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Filter the library by craft, place, and mood — every listing is time-bound and
              capacity-limited.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="category-ticker-mask border-y border-[oklch(0.72_0.09_78_/_0.22)] bg-border/20 py-1">
            <div
              className={`category-ticker-track ${reduceMotion ? "category-ticker-paused" : ""}`}
            >
              {tickerCategories.map((c, i) => (
                <div key={`${c}-${i}`} className="category-ticker-item">
                  <Link
                    to="/experiences"
                    search={{ category: c }}
                    className="group glass glass-hover glass-hover-active block h-full border-0 px-4 py-8 text-center transition-all duration-500"
                  >
                    <div className="font-display text-lg transition-colors group-hover:text-ember md:text-xl">
                      {c}
                    </div>
                    <div className="mt-1.5 text-xs text-muted-foreground">
                      {categoryCounts.get(c) ?? 0} experiences
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FEATURED */}
      <section className="container-page pb-24 md:pb-32">
        <ScrollReveal>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
            <div>
              <div className="eyebrow mb-3">The shortlist</div>
              <h2 className="font-display text-4xl tracking-tight md:text-5xl lg:text-6xl">
                Currently in the library
              </h2>
            </div>
            <Link
              to="/experiences"
              className="inline-flex items-center gap-2 text-sm underline-offset-[6px] transition-colors hover:text-ember"
            >
              View all experiences
              <span aria-hidden>→</span>
            </Link>
          </div>
        </ScrollReveal>
        <ScrollRevealGroup className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((e) => (
            <ScrollRevealItem key={e.id}>
              <ExperienceCard exp={e} />
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </section>

      {/* MANIFESTO */}
      <section className="glass-strong relative overflow-hidden border-t border-[oklch(0.88_0.08_86_/_0.12)]">
        <div
          className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.12_78_/_0.22),transparent_70%)] blur-2xl"
          aria-hidden
        />
        <ScrollReveal>
          <div className="container-page relative grid gap-10 py-24 md:grid-cols-12 md:py-32">
            <div className="eyebrow md:col-span-4">Our standard</div>
            <motion.p
              className="font-display text-3xl leading-[1.2] tracking-tight text-foreground md:col-span-8 md:text-4xl lg:text-[2.75rem]"
              initial={reduceMotion ? undefined : { opacity: 0.25, filter: "blur(8px)" }}
              whileInView={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-10%" }}
            >
              Every experience is reviewed by hand. Every host is met. Capacity is kept small on
              purpose — because the difference between a memory and a transaction is the room you
              give it.
            </motion.p>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <motion.div
      className="flex items-baseline gap-3"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      <div className="font-display text-2xl tabular-nums md:text-3xl">{value}</div>
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </motion.div>
  );
}
