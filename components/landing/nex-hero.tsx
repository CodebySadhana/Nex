"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";
import { cn } from "@/lib/utils";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4";

const NAV_LINKS = [
  { href: "/generate", label: "Generate" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About" },
] as const;

const PLATFORM_OPTIONS = ["LinkedIn", "X", "Reddit", "Everywhere"] as const;

export function NexHero() {
  return (
    <div className="relative flex flex-col overflow-x-hidden bg-white font-sans text-neutral-900 antialiased selection:bg-[#EAECE9] selection:text-[#1C2E1E] lg:block lg:min-h-screen">
      <HeroNavbar />
      <BackgroundVideo />

      <div className="relative z-10 order-first flex w-full flex-col bg-white pb-8 lg:order-none lg:min-h-screen lg:bg-transparent lg:pb-0">
        <main
          id="spade-hero"
          className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-12 pt-28 sm:pt-32"
        >
          <Headline />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="mb-14 max-w-2xl text-lg leading-relaxed font-normal text-[#5A635A] md:text-xl">
              {"One topic, your audience, your tone — "}
              <br />
              {"Nex turns it into platform-native posts you can copy and publish in under a minute."}
            </p>
          </motion.div>
          <PlatformPicker />
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Background video with mouse scrubbing (desktop) / autoplay (mobile) */
/* ------------------------------------------------------------------ */

function BackgroundVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const targetTimeRef = React.useRef(0);
  const prevXRef = React.useRef<number | null>(null);
  const seekingRef = React.useRef(false);

  // Desktop: scrub the video with horizontal mouse movement.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (!video.duration || Number.isNaN(video.duration)) return;

      if (prevXRef.current === null) {
        prevXRef.current = event.clientX;
        return;
      }

      const delta = event.clientX - prevXRef.current;
      prevXRef.current = event.clientX;

      const next =
        targetTimeRef.current + (delta / window.innerWidth) * 0.8 * video.duration;
      targetTimeRef.current = Math.min(Math.max(next, 0), video.duration);

      if (!seekingRef.current) {
        seekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    // Chase the latest target frame-to-frame for smooth tracking.
    const handleSeeked = () => {
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
        video.currentTime = targetTimeRef.current;
      } else {
        seekingRef.current = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    video.addEventListener("seeked", handleSeeked);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  // Mobile: scrubbing is disabled, so play the video normally.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.innerWidth < 1024) {
      video.autoplay = true;
      video.loop = true;
      video.play().catch(() => {
        // Autoplay can be blocked; the poster frame is fine.
      });
    }
  }, []);

  return (
    <div className="pointer-events-none relative order-last aspect-square w-full overflow-hidden bg-neutral-50 md:aspect-video lg:absolute lg:inset-0 lg:z-0 lg:order-none lg:aspect-auto lg:h-full lg:bg-transparent">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover object-right lg:object-right-bottom"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

function HeroNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 flex flex-row items-center justify-between bg-transparent px-5 py-4 sm:px-8 sm:py-5">
        <Link href="/" className="flex flex-row items-center gap-3 select-none">
          <Image
            src="/nex-logo.jpg"
            alt="Nex"
            width={56}
            height={56}
            priority
            className="h-11 w-11 mix-blend-multiply sm:h-14 sm:w-14"
          />
          <span className="text-[21px] font-medium tracking-tight text-black sm:text-[26px]">
            Nex&reg;
          </span>
        </Link>

        <nav className="hidden flex-row text-[23px] text-black md:flex">
          {NAV_LINKS.map((link, index) => (
            <React.Fragment key={link.href}>
              {index > 0 && <span className="opacity-40">,&nbsp;</span>}
              <Link href={link.href} className="transition-opacity hover:opacity-60">
                {link.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>

        <Link
          href="/generate"
          className="hidden text-[23px] text-black underline underline-offset-2 transition-opacity hover:opacity-60 md:block"
        >
          Start creating
        </Link>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          className="z-[10] flex flex-col gap-[5px] md:hidden"
        >
          <span
            className={cn(
              "h-[2px] w-6 bg-black transition-all duration-300",
              isMobileMenuOpen && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-[2px] w-6 bg-black transition-all duration-300",
              isMobileMenuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "h-[2px] w-6 bg-black transition-all duration-300",
              isMobileMenuOpen && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </header>

      {/* Mobile navigation overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[9] flex flex-col items-center justify-center gap-8 bg-white/95 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-medium tracking-tight text-black transition-opacity hover:opacity-60"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/generate"
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-2xl text-black underline underline-offset-2 transition-opacity hover:opacity-60"
        >
          Start creating
        </Link>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Typewriter headline                                                 */
/* ------------------------------------------------------------------ */

function Headline() {
  const { displayed, done } = useTypewriter("one idea,\nevery platform.");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-8 w-full text-5xl font-normal tracking-tight whitespace-pre-wrap text-black select-none md:text-6xl lg:text-[76px] lg:leading-[1.08]">
        {displayed}
        {!done && (
          <span className="ml-[2px] inline-block h-[1.1em] w-[2px] animate-blink bg-black align-middle" />
        )}
      </h1>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Multi-select platform pills                                         */
/* ------------------------------------------------------------------ */

function PlatformPicker() {
  const [services, setServices] = React.useState<string[]>([]);
  const hasSelection = services.length > 0;

  function toggleService(option: string) {
    setServices((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="mb-2 text-2xl font-medium tracking-tight">Where are you posting?</h2>
      <p className="mb-8 text-[#738273] opacity-85">Select all that apply</p>

      <div className="flex max-w-2xl flex-wrap gap-3">
        {PLATFORM_OPTIONS.map((option) => {
          const isActive = services.includes(option);
          return (
            <motion.button
              key={option}
              type="button"
              onClick={() => toggleService(option)}
              whileTap={{ scale: 0.96 }}
              aria-pressed={isActive}
              className={cn(
                "flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors duration-200",
                isActive
                  ? "transform bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5"
                  : "border border-[#F1F3F1] bg-white text-[#1C2E1E] hover:bg-[#F1F3F1]/55",
              )}
            >
              {isActive && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex"
                >
                  <Check className="size-4" aria-hidden="true" />
                </motion.span>
              )}
              {option}
            </motion.button>
          );
        })}
      </div>

      {/*
       * Both states stay mounted and cross-fade via `animate` instead of
       * AnimatePresence: exit-based unmounting needs animation frames to
       * complete, so it wedges permanently in rAF-throttled contexts
       * (background tabs, embedded webviews). State-driven values recover.
       */}
      <div className="mt-8 max-w-2xl">
        <motion.p
          initial={false}
          animate={hasSelection ? { opacity: 0, height: 0 } : { opacity: 0.5, height: "auto" }}
          transition={{ duration: 0.2 }}
          aria-hidden={hasSelection}
          className="overflow-hidden text-xs italic"
        >
          Please click to select platforms above.
        </motion.p>
        <motion.div
          initial={false}
          animate={hasSelection ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          aria-hidden={!hasSelection}
          className="overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#F1F3F1] bg-[#FAFBF9] px-5 py-4">
            <p className="text-sm text-[#1C2E1E]">
              Ready to generate for: <span className="font-medium">{services.join(", ")}</span>
            </p>
            <Link
              href="/generate"
              tabIndex={hasSelection ? 0 : -1}
              className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#4D6D47] uppercase transition-opacity hover:opacity-70"
            >
              {"Let's Go"}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
