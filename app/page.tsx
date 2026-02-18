"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

/** WhatsApp Link */
const readWaEnv = (): string | null => {
  const env = typeof process !== "undefined" ? process.env : undefined;
  return env?.NEXT_PUBLIC_WHATSAPP_NUMBER
    ? String(env.NEXT_PUBLIC_WHATSAPP_NUMBER)
    : null;
};

const __WA_ENV__ = readWaEnv();
// Fallback is lightly obfuscated to avoid plain-text exposure in source
const __WA_FALLBACK__ = ["44", "7922", "309925"].join("");
const getWhatsAppNumber = () => __WA_ENV__ || __WA_FALLBACK__;

export function waLink(message: string) {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(
    message
  )}`;
}

/** UI */
function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-7 max-w-2xl text-center">
      {kicker ? (
        <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-[#F6E27A]">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.52 3.48A11.78 11.78 0 0012.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.14 1.6 5.95L0 24l6.38-1.67a11.8 11.8 0 005.67 1.44h.01c6.55 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.15-3.39-8.31zM12.06 21.4h-.01a9.46 9.46 0 01-4.82-1.32l-.35-.21-3.79.99 1.01-3.7-.23-.38a9.44 9.44 0 01-1.45-5.03c0-5.23 4.25-9.48 9.48-9.48a9.41 9.41 0 016.7 2.78 9.41 9.41 0 012.78 6.7c0 5.23-4.25 9.48-9.48 9.48zm5.2-7.07c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.91 1.12-.17.19-.33.21-.62.07-.29-.15-1.23-.45-2.35-1.43-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.03 2.83 1.17 3.03c.14.19 2.02 3.09 4.9 4.33.69.3 1.22.48 1.63.61.69.22 1.31.19 1.8.11.55-.08 1.7-.69 1.94-1.35.24-.67.24-1.24.17-1.35-.07-.12-.26-.19-.55-.33z" />
    </svg>
  );
}

function CTAButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-black " +
        "bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] " +
        "shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 transition " +
        "sm:w-auto sm:px-7 sm:py-3 " +
        className
      }
    >
      <WhatsAppIcon />
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

function PricingToggle({
  value,
  onChange,
}: {
  value: "monthly" | "sixmonth" | "annual";
  onChange: (v: "monthly" | "sixmonth" | "annual") => void;
}) {
  const options: Array<{
    id: "monthly" | "sixmonth" | "annual";
    label: string;
    badge?: string;
  }> = [
    { id: "monthly", label: "Monthly" },
    { id: "sixmonth", label: "6 Months" },
    { id: "annual", label: "1 Year", badge: "Best Value" },
  ];

  return (
    <div className="inline-flex w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur sm:w-auto">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={
            "flex-1 rounded-xl px-3 py-2.5 text-sm transition sm:flex-none sm:px-4 sm:py-2 " +
            (value === o.id
              ? "bg-[#D4AF37]/15 text-[#F6E27A] shadow-sm"
              : "text-white/70 hover:text-white")
          }
        >
          <span className="inline-flex items-center justify-center gap-2">
            <span>{o.label}</span>
            {o.badge ? (
              <span className="hidden rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] font-semibold text-[#F6E27A] sm:inline">
                {o.badge}
              </span>
            ) : null}
          </span>
        </button>
      ))}
    </div>
  );
}

function StarRow() {
  return (
    <div className="inline-flex items-center gap-1 text-[#F6E27A]">
      <span aria-hidden="true">★</span>
      <span aria-hidden="true">★</span>
      <span aria-hidden="true">★</span>
      <span aria-hidden="true">★</span>
      <span aria-hidden="true">★</span>
      <span className="sr-only">5 out of 5 stars</span>
    </div>
  );
}

/** Subtle brand watermark helper */
function BrandWatermark({
  opacityClass = "opacity-[0.02] sm:opacity-[0.035]",
  sizeClass = "w-[420px] sm:w-[680px] md:w-[760px]",
  positionClass = "inset-0 items-center justify-center",
  blurClass = "",
}: {
  opacityClass?: string;
  sizeClass?: string;
  positionClass?: string;
  blurClass?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute ${positionClass} flex ${opacityClass} ${blurClass}`}
      aria-hidden="true"
    >
      <Image
        src="/logo.png"
        alt=""
        width={900}
        height={320}
        className={`${sizeClass} object-contain`}
      />
    </div>
  );
}

/** Monogram watermark */
function MonogramWatermark() {
  return (
    <div
      className="pointer-events-none absolute -top-10 right-0 opacity-[0.05] sm:opacity-[0.07] blur-[0.2px]"
      aria-hidden="true"
    >
      <div className="text-[120px] sm:text-[220px] font-semibold tracking-[-0.08em] text-white/10">
        EH
      </div>
    </div>
  );
}

function LuxeDivider() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6" aria-hidden="true">
      <div className="relative my-10 sm:my-14">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-6 w-56 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37]/10 blur-2xl" />
      </div>
    </div>
  );
}

function MicroLogoPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.035] sm:opacity-[0.05]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(212,175,55,0.12) 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(75% 55% at 50% 35%, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(75% 55% at 50% 35%, black 30%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(212,175,55,0.10),transparent_60%)]" />
    </div>
  );
}

/**
 * Redesigned EPG:
 * - Mobile = compact preview, horizontal swipe inside, fixed max height
 * - Desktop = premium marquee
 */
function EpgMock() {
  const timeline = [
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  const rows = [
    { ch: "101", abbr: "MOV", name: "Cinema", blocks: ["Blockbusters", "New Releases", "Award Winners", "4K Premieres"] },
    { ch: "102", abbr: "SPT", name: "Sports", blocks: ["LIVE Match", "Highlights", "Studio", "Championships"] },
    { ch: "103", abbr: "ENT", name: "Entertainment", blocks: ["Trending", "Reality", "Late Night", "Top Picks"] },
    { ch: "104", abbr: "DOC", name: "Documentary", blocks: ["Nature", "History", "True Stories", "Discovery"] },
    { ch: "105", abbr: "KID", name: "Kids", blocks: ["Family Time", "Cartoons", "Education", "Classics"] },
  ];

  const slotWDesktop = 118;
  const slotWMobile = 92;

  const programWidthDesktop = timeline.length * slotWDesktop;
  const desktopTrackWidth = programWidthDesktop * 2;

  return (
    <div className="relative rounded-2xl border border-white/10 bg-black/55 overflow-hidden">
      {/* Premium subtle lighting */}
      <div className="pointer-events-none absolute inset-0 opacity-75">
        <div className="absolute inset-0 bg-[radial-gradient(85%_60%_at_50%_0%,rgba(212,175,55,0.16),rgba(0,0,0,0)_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05),rgba(255,255,255,0.00),rgba(255,255,255,0.05))]" />
      </div>

      {/* MOBILE COMPACT WRAP */}
      <div className="sm:hidden relative">
        <div className="px-3 pt-3 pb-2 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.26em] text-white/45">
              Programme Guide Preview
            </div>
            <div className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-2 py-1 text-[10px] font-semibold text-[#F6E27A]">
              Swipe →
            </div>
          </div>

          {/* timeline swipe */}
          <div
            className="mt-2 overflow-x-auto overscroll-x-contain touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          >
            <div className="flex min-w-max whitespace-nowrap pr-6">
              {timeline.map((t) => (
                <div
                  key={t}
                  className="shrink-0 text-[10px] text-white/45"
                  style={{ width: slotWMobile }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* rows compact (fixed height so it never “takes over”) */}
        <div className="px-3 py-3 max-h-[280px] overflow-y-auto">
          <div className="grid gap-3">
            {rows.slice(0, 4).map((row, idx) => (
              <div key={row.ch} className="flex min-w-0 gap-2">
                <div className="w-[104px] shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#D4AF37]/14 to-black/30 text-[10px] font-extrabold text-[#F6E27A]">
                      {row.abbr}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-white/90 leading-tight">
                        {row.name}
                      </div>
                      <div className="text-[10px] text-white/45">CH {row.ch}</div>
                    </div>
                  </div>
                </div>

                <div
                  className="flex-1 overflow-x-auto overscroll-x-contain touch-pan-x"
                  style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
                >
                  <div className="flex min-w-max gap-2 pr-6">
                    {row.blocks.map((b, i) => {
                      const isLive = b.toUpperCase().includes("LIVE");
                      const isNow = idx === 1 && i === 0;
                      const w = 3 * slotWMobile;

                      return (
                        <div
                          key={`${row.ch}-${i}`}
                          className={
                            "shrink-0 rounded-2xl border border-white/10 " +
                            "bg-gradient-to-b from-white/[0.06] to-white/[0.03] px-3 py-2 " +
                            (isNow ? "ring-1 ring-[#D4AF37]/25" : "")
                          }
                          style={{ width: w }}
                        >
                          <div className="flex items-start gap-2">
                            <div className="text-[11px] font-semibold text-white/90 leading-tight">
                              {b}
                            </div>
                            {isLive ? (
                              <span className="mt-0.5 shrink-0 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/12 px-1.5 py-0.5 text-[9px] font-bold text-[#F6E27A]">
                                LIVE
                              </span>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-[10px] text-white/45 flex items-center justify-between">
            <span>Accurate listings</span>
            <span>Smooth browsing</span>
          </div>
        </div>
      </div>

      {/* DESKTOP (marquee premium) */}
      <div className="hidden sm:block relative">
        <div className="border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="w-[180px] text-[10px] uppercase tracking-[0.26em] text-white/45">
              Programme guide
            </div>

            <div className="relative flex-1 overflow-hidden">
              <div className="relative whitespace-nowrap">
                <div
                  className="flex motion-reduce:animate-none animate-[marquee_34s_linear_infinite]"
                  style={{ width: desktopTrackWidth }}
                >
                  {[0, 1].map((dup) => (
                    <div key={dup} className="flex" style={{ width: programWidthDesktop }}>
                      {timeline.map((t) => (
                        <div
                          key={`${dup}-${t}`}
                          className="shrink-0 text-[10px] text-white/45"
                          style={{ width: slotWDesktop }}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3">
          <div className="grid gap-3">
            {rows.map((row, idx) => (
              <div key={row.ch} className="flex min-w-0 items-stretch gap-2">
                <div className="flex w-[180px] items-center gap-3">
                  <div className="relative grid h-10 w-10 place-items-center rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#D4AF37]/14 to-black/30 text-[10px] font-extrabold text-[#F6E27A]">
                    <span className="relative z-10">{row.abbr}</span>
                    <span className="pointer-events-none absolute inset-0 rounded-2xl [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
                  </div>
                  <div className="min-w-0 pr-1">
                    <div className="text-[11px] font-semibold leading-tight text-white/90">
                      {row.name}
                    </div>
                    <div className="text-[10px] text-white/45">CH {row.ch}</div>
                  </div>
                </div>

                <div className="relative flex-1 overflow-hidden">
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/55 to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/55 to-transparent" />

                  <div
                    className="flex motion-reduce:animate-none animate-[marquee_38s_linear_infinite]"
                    style={{ width: desktopTrackWidth }}
                  >
                    {[0, 1].map((dup) => (
                      <div
                        key={dup}
                        className="flex gap-2 pr-2"
                        style={{ width: programWidthDesktop }}
                      >
                        {row.blocks.map((b, i) => {
                          const isLive = b.toUpperCase().includes("LIVE");
                          const isNow = idx === 1 && i === 0;
                          const w = 3 * slotWDesktop;

                          return (
                            <div
                              key={`${dup}-${row.ch}-${i}`}
                              className={
                                "relative shrink-0 overflow-hidden rounded-2xl border border-white/10 " +
                                "bg-gradient-to-b from-white/[0.06] to-white/[0.03] px-3 py-2 " +
                                (isNow ? "ring-1 ring-[#D4AF37]/25" : "")
                              }
                              style={{ width: w }}
                              title={b}
                            >
                              <div className="flex items-start gap-2">
                                <div className="flex-1 break-words text-[11px] font-semibold leading-tight text-white/90">
                                  {b}
                                </div>
                                {isLive ? (
                                  <span className="mt-0.5 shrink-0 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/12 px-1.5 py-0.5 text-[9px] font-bold text-[#F6E27A]">
                                    LIVE
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          );
                        })}
                        <div className="shrink-0" style={{ width: slotWDesktop }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] text-white/45">
            <span>Accurate listings</span>
            <span>Fast navigation</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none h-10 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}

export default function EliteHouseLandingPage() {
  const trialMessage =
    "Hi Elite House. I'd like to start the 24-hour free trial. Please share the next steps.";

  const [billing, setBilling] = useState<"monthly" | "sixmonth" | "annual">(
    "sixmonth"
  );

  const pricing = useMemo(() => {
    const base: Record<
      "monthly" | "sixmonth" | "annual",
      { price: string; note: string; savings?: string; subnote?: string }
    > = {
      monthly: { price: "£14.99", note: "per month", subnote: "Cancel anytime" },
      sixmonth: { price: "£60", note: "every 6 months", savings: "Save £29.94" },
      annual: { price: "£100", note: "per year", savings: "Save £79.88" },
    };

    const plan = base[billing];
    return {
      ...plan,
      label:
        billing === "sixmonth"
          ? "6 Months"
          : billing === "annual"
          ? "1 Year"
          : "Monthly",
    };
  }, [billing]);

  const testimonials = [
    {
      quote:
        "Setup was genuinely fast. Everything looks clean and works smoothly across devices.",
      name: "Jordan",
      meta: "UK",
    },
    {
      quote:
        "The interface feels premium — no clutter, just easy browsing and solid playback.",
      name: "Aisha",
      meta: "London",
    },
    {
      quote:
        "Support replies quickly and actually solves things. Best experience I’ve had.",
      name: "Marcus",
      meta: "Manchester",
    },
    {
      quote: "Reliable streams, great library, and it just feels… polished.",
      name: "Sophie",
      meta: "Birmingham",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-black via-[#07070A] to-black text-white">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(212,175,55,0.26),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(80,120,255,0.16),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(170,90,255,0.10),transparent_62%)]" />
      </div>

      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-9 pb-12 sm:px-6 sm:pt-14 sm:pb-16 overflow-hidden">
          <div className="relative grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
            <MonogramWatermark />

            {/* Copy FIRST on mobile (fixes “covers headline” feel) */}
            <div className="order-1 lg:order-1">
              <div className="mb-4 flex justify-center lg:justify-start">
                <Image
                  src="/logo.png"
                  alt="Elite House Logo"
                  width={620}
                  height={220}
                  priority
                  className="h-24 w-auto object-contain sm:h-28 md:h-32 drop-shadow-[0_22px_55px_rgba(212,175,55,0.38)]"
                />
              </div>

              <h1 className="text-[34px] leading-[1.05] sm:text-5xl font-semibold tracking-tight text-center lg:text-left relative z-10">
                Elite Access.
                <span className="mt-2 block bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                  Superior EPG. Smooth Streaming.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-white/65 text-[15px] sm:text-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
                A premium experience built around accurate programme listings and seamless playback.
                Clean, consistent, effortless across your devices.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <CTAButton href={waLink(trialMessage)}>Start Trial on WhatsApp</CTAButton>

                <a
                  href="#pricing"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl border border-white/15 px-6 py-3.5 sm:px-7 sm:py-3 text-sm font-semibold text-white/80 hover:bg-white/5 transition"
                >
                  View membership <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mt-5 flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2 text-sm text-white/70 backdrop-blur">
                  <span className="font-semibold text-white/85">1,200+ Members</span>
                  <span className="h-4 w-px bg-white/15" />
                  <StarRow />
                  <span className="h-4 w-px bg-white/15" />
                  <span>Activated in minutes</span>
                </div>
              </div>
            </div>

            {/* EPG card SECOND on mobile */}
            <div className="order-2 lg:order-2 rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-xl shadow-2xl shadow-black/50">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white/90">
                    Superior programme guide
                  </p>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">
                    Accurate listings, smooth browsing, premium presentation.
                  </p>
                </div>

                <div className="shrink-0 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-2 text-xs font-semibold text-[#F6E27A]">
                  EPG+
                </div>
              </div>

              <div className="mt-5">
                <EpgMock />
              </div>

              <div className="mt-6">
                <CTAButton className="w-full" href={waLink(trialMessage)}>
                  Start Trial on WhatsApp
                </CTAButton>
                <p className="mt-3 text-xs text-white/45">
                  Priority replies • Setup handled personally
                </p>
              </div>
            </div>
          </div>
        </section>

        <LuxeDivider />

        {/* FEATURES */}
        <section
          id="features"
          className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 relative"
        >
          <BrandWatermark />

          <div className="relative">
            <SectionTitle
              kicker="Elite Features"
              title="Everything included."
              subtitle="Superior EPG, smooth streaming, and direct support all in one private membership."
            />

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {[
                {
                  title: "Superior EPG",
                  desc: "Accurate programme listings with a clean layout that’s easy to browse.",
                },
                {
                  title: "Smooth Streaming",
                  desc: "Seamless playback with a premium feel built for daily reliability.",
                },
                {
                  title: "Direct WhatsApp Support",
                  desc: "Fast setup, upgrades, and personal help whenever needed.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-7 backdrop-blur hover:bg-white/[0.07] transition"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-2.5">{f.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <LuxeDivider />

        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 relative"
        >
          <BrandWatermark
            opacityClass="opacity-[0.018] sm:opacity-[0.03]"
            sizeClass="w-[380px] sm:w-[620px] md:w-[700px]"
            positionClass="inset-0 items-start justify-center"
            blurClass="blur-[0.2px]"
          />

          <div className="relative">
            <SectionTitle
              kicker="Trusted"
              title="What members say."
              subtitle="Short feedback from members who value reliability and a clean experience."
            />

            <div className="md:hidden -mx-4 px-4 overflow-x-auto">
              <div className="flex gap-4 snap-x snap-mandatory pb-2">
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="snap-start min-w-[85%] rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
                  >
                    <div className="flex items-center justify-between">
                      <StarRow />
                      <span className="text-xs text-white/45">{t.meta}</span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      “{t.quote}”
                    </p>
                    <div className="mt-4 text-sm font-semibold text-white/85">
                      {t.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:grid gap-4 md:grid-cols-2">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
                >
                  <div className="flex items-center justify-between">
                    <StarRow />
                    <span className="text-xs text-white/45">{t.meta}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    “{t.quote}”
                  </p>
                  <div className="mt-4 text-sm font-semibold text-white/85">
                    {t.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex justify-center">
              <CTAButton href={waLink(trialMessage)}>Start Trial on WhatsApp</CTAButton>
            </div>
          </div>
        </section>

        <LuxeDivider />

        {/* PRICING */}
        <section
          id="pricing"
          className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 relative overflow-hidden"
        >
          <MicroLogoPattern />
          <BrandWatermark
            opacityClass="opacity-[0.014] sm:opacity-[0.022]"
            sizeClass="w-[360px] sm:w-[520px] md:w-[600px]"
            positionClass="right-0 top-0 items-start justify-end"
            blurClass="blur-[0.2px]"
          />

          <div className="relative">
            <SectionTitle
              kicker="Membership"
              title="Choose your billing."
              subtitle="Simple pricing. Everything included. Confirmed privately via WhatsApp."
            />

            <div className="flex justify-center">
              <PricingToggle value={billing} onChange={setBilling} />
            </div>

            <div className="mt-7 sm:mt-8 flex justify-center">
              <div className="relative w-full max-w-2xl overflow-hidden rounded-[28px] sm:rounded-[32px] border border-[#D4AF37]/25 bg-white/[0.05] p-8 sm:p-10 text-center shadow-xl backdrop-blur">
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[#D4AF37]/12 blur-3xl" />
                  <div className="absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-[#B8860B]/10 blur-3xl" />
                </div>

                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-semibold text-[#F6E27A]">
                    Elite Access Membership
                  </div>

                  <div className="mt-5 text-xs tracking-widest uppercase text-white/50">
                    {pricing.label}
                  </div>

                  <div className="mt-4 text-5xl sm:text-6xl font-semibold tracking-tight">
                    <span className="bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                      {pricing.price}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-white/60">{pricing.note}</div>

                  {pricing.subnote ? (
                    <div className="mt-2 text-xs text-white/45">{pricing.subnote}</div>
                  ) : null}

                  {pricing.savings ? (
                    <div className="mt-4 inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-semibold text-[#F6E27A]">
                      {pricing.savings}
                    </div>
                  ) : null}

                  <div className="mt-7">
                    <CTAButton className="w-full" href={waLink(trialMessage)}>
                      Start Trial on WhatsApp
                    </CTAButton>
                    <div className="mt-3 text-[11px] text-white/55">
                      Private access • Confirmed individually
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 flex justify-center">
              <div className="grid w-full max-w-2xl gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur sm:grid-cols-3">
                {["Message us on WhatsApp", "Trial activated", "Start watching"].map(
                  (t, i) => (
                    <div key={t} className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-xs font-semibold text-[#F6E27A]">
                        {i + 1}
                      </div>
                      <div className="text-sm font-semibold text-white/85">{t}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <LuxeDivider />

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 relative">
          <BrandWatermark
            opacityClass="opacity-[0.014] sm:opacity-[0.026]"
            sizeClass="w-[360px] sm:w-[560px] md:w-[640px]"
            positionClass="left-0 bottom-0 items-end justify-start"
            blurClass="blur-[0.25px]"
          />

          <div className="relative">
            <SectionTitle
              kicker="Support"
              title="Private access, handled properly."
              subtitle="Everything is set up personally through WhatsApp. Fast, discreet, simple."
            />

            <div className="grid gap-4 lg:grid-cols-2">
              {[
                {
                  q: "How does the free trial work?",
                  a: "Tap the WhatsApp button and we’ll activate your trial. Setup is handled step by step.",
                },
                { q: "Is it instant?", a: "Most trials are activated within minutes. Replies are fast because support is direct." },
                { q: "What’s included?", a: "Full access to live channels, the on-demand library, and ongoing support." },
                { q: "Can I upgrade later?", a: "Yes. Upgrades and renewals are handled with a quick message." },
              ].map((item) => (
                <div key={item.q} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 backdrop-blur">
                  <h3 className="text-base font-semibold text-white">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 sm:mt-8 flex justify-center">
              <CTAButton href={waLink(trialMessage)}>Start Trial on WhatsApp</CTAButton>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mx-auto max-w-6xl px-4 pb-28 sm:pb-10 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur">
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="Elite House"
                width={420}
                height={140}
                className="h-14 w-auto object-contain opacity-95"
              />
            </div>
            <p className="mt-3 text-xs text-white/50">
              Premium viewing • Private membership • WhatsApp support
            </p>
          </div>
        </footer>

        {/* Mobile sticky CTA */}
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50">
          <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md p-2 shadow-2xl shadow-black/50">
            <CTAButton className="w-full" href={waLink(trialMessage)}>
              Start Trial on WhatsApp
            </CTAButton>
            <div className="mt-1 text-center text-[10px] text-white/55">
              Priority replies within minutes
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
