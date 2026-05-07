import { Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { lazy, Suspense, useRef } from "react";
import heroImg from "@/assets/hero.jpg";
import expCraftImg from "@/assets/exp-craft.jpg";
import expDiningImg from "@/assets/exp-dining.jpg";
import expDriveImg from "@/assets/exp-drive.jpg";
import expSailImg from "@/assets/exp-sail.jpg";
import expTastingImg from "@/assets/exp-tasting.jpg";
import expWellnessImg from "@/assets/exp-wellness.jpg";
import logoUrl from "@/assets/logo/logo.png";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";

const RippleGrid = lazy(() => import("@/components/effects/RippleGrid"));

const softEase = [0.22, 1, 0.36, 1] as const;

const revealParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: softEase },
  },
};

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const slides = [
    { src: heroImg, alt: "A candlelit private dinner table set in a glasshouse at dusk" },
    { src: expDiningImg, alt: "A plated culinary course in dramatic light" },
    { src: expCraftImg, alt: "Hands shaping clay on a pottery wheel" },
    { src: expSailImg, alt: "A sailing yacht at sunset on calm water" },
    { src: expWellnessImg, alt: "A serene bath ritual in soft daylight" },
    { src: expTastingImg, alt: "A book and a glass of wine in warm candlelight" },
    { src: expDriveImg, alt: "A classic car on an open road through misty hills" },
  ];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rawImgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 72]);
  const imgY = useSpring(rawImgY, { stiffness: 110, damping: 28, mass: 0.45 });

  const rawScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.05]);
  const imgScale = useSpring(rawScale, { stiffness: 95, damping: 30 });

  const imgFade = useTransform(scrollYProgress, [0, 0.9], [1, reduceMotion ? 1 : 0.5]);

  const cardRotateX = useTransform(scrollYProgress, [0, 0.75], [0, reduceMotion ? 0 : -5]);
  const cardRotateXSpring = useSpring(cardRotateX, { stiffness: 80, damping: 35 });

  const cardDepth = useTransform(scrollYProgress, [0, 0.5], [1, reduceMotion ? 1 : 0.985]);
  const cardDepthSpring = useSpring(cardDepth, { stiffness: 100, damping: 40 });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[min(100dvh,920px)] overflow-hidden border-b border-[oklch(0.88_0.08_86_/_0.12)]"
    >
      {!reduceMotion && (
        <div className="absolute inset-0 z-0 min-h-full">
          <Suspense fallback={null}>
            <RippleGrid
              enableRainbow={false}
              gridColor="#d4af37"
              rippleIntensity={0.05}
              gridSize={8.5}
              gridThickness={13}
              fadeDistance={1.4}
              vignetteStrength={2.4}
              glowIntensity={0.12}
              opacity={0.45}
              gridRotation={6}
              mouseInteraction
              mouseInteractionRadius={1.1}
            />
          </Suspense>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_65%_at_50%_-5%,oklch(0.55_0.12_78_/_0.18),transparent_55%),radial-gradient(ellipse_50%_55%_at_0%_60%,oklch(0.32_0.14_22_/_0.38),transparent_52%),linear-gradient(180deg,oklch(0.19_0.09_22)_0%,oklch(0.12_0.07_20)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_110%_85%_at_20%_50%,oklch(0.11_0.06_22_/_0.7),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.055] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
        aria-hidden
      />

      <div className="container-page relative z-10 flex min-h-[min(88dvh,780px)] items-center py-10 md:py-14">
        <div
          className="relative w-full [perspective:1400px]"
          style={{ perspectiveOrigin: "50% 40%" }}
        >
          <motion.div
            className="relative mx-auto max-w-6xl [transform-style:preserve-3d]"
            style={{
              rotateX: cardRotateXSpring,
              scale: cardDepthSpring,
            }}
          >
            <motion.div
              className="relative overflow-hidden rounded-lg border border-[oklch(0.82_0.11_78_/_0.35)] bg-[oklch(0.14_0.07_22_/_0.55)] shadow-[0_32px_80px_-24px_oklch(0.02_0.02_15_/_0.85),0_0_0_1px_oklch(0.88_0.1_78_/_0.12),inset_0_1px_0_oklch(0.95_0.04_85_/_0.1)] md:rounded-xl"
              initial={
                reduceMotion
                  ? { opacity: 1, rotateX: 0, scale: 1 }
                  : { opacity: 0, rotateX: 11, scale: 0.9 }
              }
              animate={{ opacity: 1, rotateX: 0, scale: 1 }}
              transition={{ duration: 1.15, ease: softEase }}
              style={{ transformOrigin: "50% 96%", transformStyle: "preserve-3d" }}
            >
              <div
                className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-ember/10 via-transparent to-oklch(0.05_0.04_20_/_0.5)"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-oklch(0.88_0.12_78_/_0.45) to-transparent"
                aria-hidden
              />

              <div className="relative z-20 grid md:grid-cols-2">
                <motion.div
                  className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14"
                  variants={revealParent}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35, margin: "-5% 0px" }}
                >
                  <motion.div variants={revealItem} className="mb-4 h-px w-14 bg-gradient-to-r from-ember/85 to-transparent" />
                  <motion.div variants={revealItem} className="eyebrow mb-5 text-muted-foreground">
                    No. 001 · A new chapter
                  </motion.div>
                  <motion.h1
                    variants={revealItem}
                    className="font-display text-[clamp(2.35rem,5.5vw,4.25rem)] leading-[0.97] tracking-tight [text-shadow:0_0.08em_1.4em_oklch(0.06_0.05_20_/_0.9)]"
                  >
                    Curated experiences,
                    <br />
                    <em className="italic text-ember [text-shadow:0_0_1.25em_oklch(0.55_0.14_78_/_0.4)]">
                      by invitation
                    </em>{" "}
                    of taste.
                  </motion.h1>
                  <motion.p
                    variants={revealItem}
                    className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground md:text-[1.05rem]"
                  >
                    A considered library of time-bound moments — crafts, fields, wellness, and heritage — hosted by
                    verified makers across Mysuru & beyond.
                  </motion.p>
                  <motion.div variants={revealItem} className="mt-9 flex flex-wrap gap-3 sm:gap-4">
                    <Link
                      to="/experiences"
                      className="group inline-flex items-center rounded-sm bg-ember px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-[var(--shadow-gold)] transition-all hover:brightness-110 sm:px-8 sm:py-4"
                    >
                      Explore the library
                      <motion.span className="ml-2 inline-block sm:ml-3" whileHover={{ x: 5 }}>
                        →
                      </motion.span>
                    </Link>
                    <Link
                      to="/hosts"
                      className="glass glass-hover glass-hover-active inline-flex items-center rounded-sm border border-[oklch(0.88_0.08_86_/_0.32)] px-7 py-3.5 text-sm tracking-wide text-foreground transition-colors hover:border-ember/50 hover:text-ember sm:px-8 sm:py-4"
                    >
                      Become a host
                    </Link>
                  </motion.div>
                </motion.div>

                <div className="relative min-h-[280px] md:min-h-0">
                  <motion.div
                    className="relative h-full min-h-[320px] overflow-hidden md:absolute md:inset-0 md:min-h-full"
                    style={{ y: imgY, scale: imgScale, opacity: imgFade }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-ember/25 via-transparent to-amber-950/30 mix-blend-overlay" />
                    <HeroSlideshow
                      images={slides}
                      reduceMotion={reduceMotion}
                      intervalMs={3800}
                      className="absolute inset-0"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(circle_at_60%_55%,black,transparent_58%)]"
                        aria-hidden
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.8_0.14_78_/_0.25),transparent_60%)]" />
                      </div>
                      <img
                        src={logoUrl}
                        alt=""
                        className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-auto -translate-x-1/2 -translate-y-1/2 opacity-[0.12] mix-blend-overlay sm:h-28 md:h-32"
                      />
                    </div>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 border-t border-[oklch(0.9_0.08_86_/_0.15)] bg-gradient-to-t from-black/85 via-black/30 to-transparent px-6 py-6 text-white backdrop-blur-[2px] sm:px-8 sm:py-8"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.65, ease: softEase }}
                    >
                      <div className="text-[0.65rem] uppercase tracking-[0.28em] opacity-90">Now in season</div>
                      <div className="font-display mt-2 text-xl tracking-tight sm:text-2xl md:text-3xl">
                        Candlelit Glasshouse Dinner — Lisbon
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[0.62rem] uppercase tracking-[0.38em] text-muted-foreground md:bottom-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.span
            className="opacity-75"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>
          <span className="h-9 w-px bg-gradient-to-b from-ember/55 to-transparent md:h-10" />
        </motion.div>
      )}
    </section>
  );
}
