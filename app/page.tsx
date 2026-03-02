"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/**
 * Elite House — Minimal Luxury Landing Page (Telegram-first)
 * Updates:
 * - New pricing:
 *   - 1 month: £12.99
 *   - 6 months: £49.99 (Save £27.95 vs monthly)
 *   - 12 months: £79.99 (Save £75.89 vs monthly)
 * - Background upgraded: richer glow stack + subtle “aurora” sweep + refined grain + vignette
 *
 * Usage (Next.js App Router):
 * - Put this file at: app/page.tsx
 * - Ensure /public/logo.png exists
 */

// Telegram public link (change if needed)
const TELEGRAM_LINK = "https://t.me/EliteHouseTrialBot";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function SectionTitle({
  kicker,
  title,
  subtitle,
  center = true,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mx-auto mb-8 max-w-2xl ${center ? "text-center" : ""}`}>
      {kicker ? (
        <div className={`mb-3 flex ${center ? "justify-center" : ""}`}>
          <Badge>{kicker}</Badge>
        </div>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function PricingToggle({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const options = [
    { id: "monthly", label: "1 Month" },
    { id: "sixmonth", label: "6 Months" },
    { id: "annual", label: "12 Months", badge: "Best Value" },
  ];

  return (
    <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={
            "rounded-xl px-4 py-2 text-sm transition " +
            (value === o.id
              ? "bg-[#D4AF37]/15 text-[#F6E27A] shadow-sm"
              : "text-white/70 hover:text-white")
          }
          type="button"
        >
          <span className="inline-flex items-center gap-2">
            <span>{o.label}</span>
            {o.badge ? (
              <span className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] font-semibold text-[#F6E27A]">
                {o.badge}
              </span>
            ) : null}
          </span>
        </button>
      ))}
    </div>
  );
}

function ShimmerButton({
  href,
  children,
  className = "",
  variant = "gold",
  attention = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "dark";
  attention?: boolean;
}) {
  const base =
    "group relative isolate overflow-hidden inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-bold transition";

  const goldBase =
    "text-black shadow-lg shadow-[#D4AF37]/20 bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] hover:brightness-105";

  const gold = attention
    ? goldBase + " animate-[ctaPulse_3.2s_ease-in-out_infinite]"
    : goldBase;

  const dark =
    "text-[#F6E27A] bg-black/60 ring-1 ring-[#D4AF37]/25 hover:bg-black/70";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${base} ${variant === "gold" ? gold : dark} ${className}`}
    >
      {attention && variant === "gold" && (
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl border border-[#D4AF37]/40 animate-[ringPulse_2.9s_ease-out_infinite]"
          aria-hidden="true"
        />
      )}

      {/* Occasional luxury glint */}
      <span
        className={
          "pointer-events-none absolute -inset-y-12 -left-1/2 w-[200%] rotate-12 opacity-0 " +
          "[background:linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] " +
          "animate-[glint_8.2s_ease-in-out_infinite]"
        }
        aria-hidden="true"
      />

      {/* Hover shimmer */}
      <span
        className={
          "pointer-events-none absolute -inset-y-10 -left-1/2 w-[200%] rotate-12 opacity-0 " +
          "[background:linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)] " +
          "transition-opacity duration-200 group-hover:opacity-45 group-hover:animate-[shimmer_2.4s_ease-in-out_infinite]"
        }
        aria-hidden="true"
      />

      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <span className="transition-transform duration-300 group-hover:animate-[arrowSlide_0.6s_ease-in-out]">
          →
        </span>
      </span>
    </a>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={
        "transition-all duration-600 will-change-transform motion-reduce:transition-none " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2") +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}

function FloatingParticles() {
  const particles = useMemo(() => {
    const seeds: Array<[number, number, number, number]> = [
      [8, 18, 1.2, 18],
      [22, 62, 1.6, 22],
      [35, 28, 1.1, 20],
      [44, 78, 1.4, 28],
      [58, 14, 1.0, 24],
      [66, 52, 1.7, 34],
      [74, 32, 1.2, 28],
      [82, 70, 1.3, 32],
      [90, 24, 1.1, 22],
      [12, 84, 1.5, 36],
    ];

    return seeds.map((s, i) => {
      const [x, y, r, dur] = s;
      return { id: i, x, y, r, dur, delay: (i * 0.8) % 6 };
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-white/40 blur-[0.3px] motion-reduce:animate-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.r * 6}px`,
            height: `${p.r * 6}px`,
            animation: `floaty ${p.dur}s ease-in-out ${p.delay}s infinite`,
            opacity: 0.16,
          }}
        />
      ))}
    </div>
  );
}

// Telegram icon (kept simple)
function TelegramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.993 15.674l-.397 5.6c.57 0 .817-.245 1.112-.54l2.67-2.558 5.535 4.05c1.014.56 1.732.266 1.993-.938l3.61-16.91.001-.001c.317-1.48-.535-2.06-1.523-1.69L1.19 9.02c-1.45.56-1.43 1.37-.247 1.74l5.64 1.76L19.11 5.2c.59-.36 1.13-.16.69.2" />
    </svg>
  );
}

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
    {
      ch: "101",
      abbr: "VC",
      name: "Velour Cinema",
      blocks: ["Live access", "Private library", "4K-ready playback", "Clean browsing"],
    },
    {
      ch: "102",
      abbr: "AS",
      name: "Apex Sports",
      blocks: ["Live fixtures", "Smooth playback", "Quick setup", "Consistent quality"],
    },
    {
      ch: "103",
      abbr: "NV",
      name: "Nova Vista",
      blocks: ["Instant activation", "Clear listings", "Stable channels", "Polished experience"],
    },
    {
      ch: "104",
      abbr: "OR",
      name: "Orion Discovery",
      blocks: ["Fast Telegram setup", "Reliable streaming", "Simple navigation", "Support when needed"],
    },
  ];

  const nowLeft = "52.5%";
  const slotW = 120;
  const programWidth = timeline.length * slotW;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 bottom-0 w-px bg-[#F6E27A]/75 opacity-80 animate-[nowGlow_2.8s_ease-in-out_infinite] motion-reduce:animate-none"
          style={{ left: nowLeft }}
        />
        <div
          className="absolute top-0 bottom-0 w-[54px] bg-[#D4AF37]/10 blur-xl animate-[nowGlow_2.8s_ease-in-out_infinite] motion-reduce:animate-none"
          style={{ left: `calc(${nowLeft} - 27px)` }}
        />
      </div>

      <div className="border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-[180px] text-[10px] text-white/55">Channel</div>
          <div className="relative flex-1 overflow-hidden">
            <div className="relative whitespace-nowrap">
              <div
                className="flex motion-reduce:animate-none animate-[marquee_22s_linear_infinite]"
                style={{ width: programWidth * 2 }}
              >
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex" style={{ width: programWidth }}>
                    {timeline.map((t) => (
                      <div
                        key={`${dup}-${t}`}
                        className="shrink-0 text-[10px] text-white/55"
                        style={{ width: slotW }}
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
            <div key={row.ch} className="flex items-stretch gap-2">
              <div className="flex w-[180px] items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[11px] font-extrabold text-[#F6E27A]">
                  {row.abbr}
                </div>
                <div className="min-w-0 pr-1">
                  <div className="break-words text-[11px] font-semibold leading-tight text-white/90">
                    {row.name}
                  </div>
                  <div className="text-[10px] text-white/50">{row.ch}</div>
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden">
                <div
                  className="flex motion-reduce:animate-none animate-[marquee_24s_linear_infinite]"
                  style={{ width: programWidth * 2 }}
                >
                  {[0, 1].map((dup) => (
                    <div key={dup} className="flex gap-2 pr-2" style={{ width: programWidth }}>
                      {row.blocks.map((b, i) => {
                        const isNow = idx === 2 && i === 1;
                        const w = 3 * slotW;

                        return (
                          <div
                            key={`${dup}-${row.ch}-${i}`}
                            className={
                              "relative shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 " +
                              (isNow ? "ring-1 ring-white/20" : "")
                            }
                            style={{ width: w }}
                            title={b}
                          >
                            <div className="flex items-start gap-2">
                              <div className="flex-1 break-words text-[11px] font-semibold leading-tight text-white/90">
                                {b}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="shrink-0" style={{ width: slotW }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none h-10 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}

export default function EliteHouseLandingPage() {
  const [billing, setBilling] = useState("sixmonth");

  const pricing = useMemo(() => {
    // Monthly reference for savings math
    const monthly = 12.99;

    // Savings vs paying monthly for the same duration:
    // 6 months: (12.99 * 6) - 49.99 = 27.95
    // 12 months: (12.99 * 12) - 79.99 = 75.89
    const base: Record<string, { price: string; note: string; savings: string | null }> = {
      monthly: { price: "£12.99", note: "per month", savings: null },
      sixmonth: {
        price: "£49.99",
        note: "every 6 months",
        savings: `Save £${(monthly * 6 - 49.99).toFixed(2)}`,
      },
      annual: {
        price: "£79.99",
        note: "per year",
        savings: `Save £${(monthly * 12 - 79.99).toFixed(2)}`,
      },
    };

    return base[billing];
  }, [billing]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#07070A] to-[#000000] text-white">
      <style>{`
        @keyframes gradientMove {
          0%, 100% { transform: translate3d(0,0,0) scale(1); filter: saturate(1.08); }
          50% { transform: translate3d(-2.6%, -3.4%, 0) scale(1.07); filter: saturate(1.18); }
        }
        @keyframes auroraSweep {
          0% { transform: translateX(-18%) translateY(6%) rotate(-8deg); opacity: 0.35; }
          50% { transform: translateX(12%) translateY(-4%) rotate(8deg); opacity: 0.55; }
          100% { transform: translateX(-18%) translateY(6%) rotate(-8deg); opacity: 0.35; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-35%) rotate(12deg); opacity: 0.12; }
          55% { opacity: 0.55; }
          100% { transform: translateX(35%) rotate(12deg); opacity: 0.15; }
        }
        @keyframes glint {
          0%, 74% { opacity: 0; transform: translateX(-45%) rotate(12deg); }
          78% { opacity: 0.22; }
          84% { opacity: 0.65; }
          90% { opacity: 0.18; }
          100% { opacity: 0; transform: translateX(45%) rotate(12deg); }
        }
        @keyframes floaty {
          0%, 100% { transform: translate3d(0,0,0); opacity: 0.12; }
          50% { transform: translate3d(0,-14px,0); opacity: 0.22; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes nowGlow {
          0%, 100% { opacity: 0.55; filter: drop-shadow(0 0 0 rgba(212,175,55,0)); }
          50% { opacity: 0.95; filter: drop-shadow(0 0 14px rgba(212,175,55,0.28)); }
        }
        @keyframes borderBreath {
          0%, 100% { box-shadow: 0 0 0 1px rgba(212,175,55,0.18), 0 0 18px rgba(212,175,55,0.10); }
          50% { box-shadow: 0 0 0 1px rgba(212,175,55,0.42), 0 0 44px rgba(212,175,55,0.20); }
        }
        @keyframes ctaPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212,175,55,0.22); }
          50% { transform: scale(1.02); box-shadow: 0 0 28px 8px rgba(212,175,55,0.16); }
        }
        @keyframes ringPulse {
          0% { opacity: 0.45; transform: scale(0.92); }
          70% { opacity: 0; transform: scale(1.18); }
          100% { opacity: 0; transform: scale(1.18); }
        }
        @keyframes arrowSlide {
          0% { transform: translateX(0); }
          50% { transform: translateX(3px); }
          100% { transform: translateX(0); }
        }

        /* Subtle grain (no external asset) */
        .grain {
          background-image:
            radial-gradient(circle at 20% 10%, rgba(255,255,255,0.04), transparent 30%),
            radial-gradient(circle at 80% 40%, rgba(255,255,255,0.03), transparent 32%),
            radial-gradient(circle at 30% 80%, rgba(255,255,255,0.025), transparent 34%),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.015), rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px);
          mix-blend-mode: overlay;
        }
      `}</style>

      {/* Premium background (upgraded) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Deep moving glow */}
        <div className="absolute inset-0 animate-[gradientMove_18s_ease-in-out_infinite] bg-[radial-gradient(circle_at_22%_18%,rgba(212,175,55,0.22),transparent_55%),radial-gradient(circle_at_78%_28%,rgba(80,120,255,0.14),transparent_60%),radial-gradient(circle_at_50%_86%,rgba(170,90,255,0.12),transparent_65%)]" />

        {/* Aurora sweep layer */}
        <div className="absolute -inset-x-24 -inset-y-24 blur-2xl opacity-50 animate-[auroraSweep_14s_ease-in-out_infinite]"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(246,226,122,0.10), rgba(80,120,255,0.10), rgba(170,90,255,0.10), rgba(212,175,55,0.12), rgba(246,226,122,0.10))",
          }}
        />

        {/* Dark base */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#07070A] to-black" />

        {/* Luxury spotlights */}
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(212,175,55,0.16),rgba(0,0,0,0)_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_40%_at_12%_45%,rgba(184,134,11,0.12),rgba(0,0,0,0)_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_40%_at_88%_48%,rgba(246,226,122,0.09),rgba(0,0,0,0)_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_42%_at_50%_60%,rgba(80,120,255,0.08),rgba(0,0,0,0)_70%)]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />

        {/* Grain + vignette */}
        <div className="absolute inset-0 grain opacity-[0.22]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_30%,rgba(0,0,0,0),rgba(0,0,0,0.78))]" />

        <div className="hidden sm:block">
          <FloatingParticles />
        </div>
      </div>

      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <div className="mb-6">
                <Image
                  src="/logo.png"
                  alt="Elite House Logo"
                  width={360}
                  height={120}
                  priority
                  className="h-20 w-auto object-contain drop-shadow-[0_18px_40px_rgba(212,175,55,0.32)]"
                />
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <Badge>24-hour trial via Telegram</Badge>
                <Badge>Polished, consistent experience</Badge>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight leading-tight text-white sm:text-5xl">
                Elite Access.
                <span className="block bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent leading-tight pb-1">
                  For Viewers Who Expect More.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                A refined subscription experience designed to feel effortless across your favourite devices — clean,
                dependable, and private.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ShimmerButton href={TELEGRAM_LINK} variant="gold" attention>
                  Start Trial on Telegram
                </ShimmerButton>

                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/[0.06]"
                >
                  View membership
                </a>
              </div>

              {/* Trust pill (replaces member count) */}
              <div className="mt-5 inline-flex flex-wrap items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2 text-sm text-white/75 backdrop-blur">
                <span className="font-semibold text-white/90">Activated in minutes</span>
                <span className="h-4 w-px bg-white/15" />
                <span>Secure checkout via Stripe</span>
                <span className="h-4 w-px bg-white/15" />
                <span className="text-[#F6E27A]">Priority replies on Telegram</span>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/60 backdrop-blur">
              <div className="absolute inset-0 opacity-80">
                <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#D4AF37]/14 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#B8860B]/14 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5078FF]/10 blur-3xl" />
              </div>

              <div className="relative p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/90">
                    Live access with a private library
                  </div>
                </div>

                <EpgMock />

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-xs font-semibold text-[#F6E27A]">
                    24-hour trial
                  </div>
                  <div className="mt-1 text-sm text-white/80">
                    Tap below to open Telegram — we’ll confirm access and share setup steps.
                  </div>

                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={TELEGRAM_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-black/60 px-4 py-2 text-sm font-semibold text-[#F6E27A] ring-1 ring-[#D4AF37]/25 transition hover:bg-black/70"
                    >
                      <TelegramIcon className="shrink-0" />
                      <span>Open Telegram →</span>
                    </a>
                    <div className="text-xs text-white/55">
                      Replies usually within minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <Reveal>
            <SectionTitle
              kicker="Elite Access"
              title="Everything you need. Nothing you don’t."
              subtitle="Clean organisation. Smooth playback. A private library — delivered with a refined, consistent feel."
            />
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Reveal delay={80}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur transition hover:bg-white/[0.06]">
                <h3 className="text-xl font-semibold mb-2">Live Access</h3>
                <p className="text-white/70 leading-relaxed text-sm mb-3">
                  Global live access presented cleanly — easy to browse, easy to trust.
                </p>
                <div className="text-[#F6E27A] text-sm font-medium">
                  Consistent, dependable playback.
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur transition hover:bg-white/[0.06]">
                <h3 className="text-xl font-semibold mb-2">Private Library</h3>
                <p className="text-white/70 leading-relaxed text-sm mb-3">
                  A deep on-demand catalogue that loads smoothly and stays organised.
                </p>
                <div className="text-[#F6E27A] text-sm font-medium">
                  Browse confidently. Press play.
                </div>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur transition hover:bg-white/[0.06]">
                <h3 className="text-xl font-semibold mb-2">Direct Support</h3>
                <p className="text-white/70 leading-relaxed text-sm mb-3">
                  Fast Telegram assistance for setup, upgrades and troubleshooting.
                </p>
                <div className="text-[#F6E27A] text-sm font-medium">
                  Private, quick, and personal.
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={320} className="mt-8 text-center">
            <div className="text-white/70 mb-4 text-sm tracking-wide">
              Start with a private 24-hour trial.
            </div>
            <ShimmerButton href={TELEGRAM_LINK} variant="gold" attention>
              Start Trial on Telegram
            </ShimmerButton>
          </Reveal>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-3 flex justify-center">
                <Badge>Membership</Badge>
              </div>

              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                <span className="text-white">One plan.</span>{" "}
                <span className="bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                  Full access.
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
                Choose your billing schedule. Everything is included — live access, private library, and Telegram support.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-8 flex justify-center">
            <PricingToggle value={billing} onChange={setBilling} />
          </Reveal>

          <div className="mt-10 flex justify-center">
            <Reveal delay={140}>
              <div className="relative w-full max-w-3xl overflow-hidden rounded-[34px] border border-[#D4AF37]/25 bg-white/[0.06] p-9 sm:p-10 backdrop-blur-xl transition-all duration-700 hover:scale-[1.01] hover:border-[#D4AF37]/50 animate-[borderBreath_5.6s_ease-in-out_infinite]">
                {/* Spotlight glows */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#D4AF37]/16 blur-3xl" />
                  <div className="absolute -right-44 -bottom-44 h-[560px] w-[560px] rounded-full bg-[#B8860B]/14 blur-3xl" />
                  <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_20%,rgba(246,226,122,0.12),transparent_62%)]" />
                </div>

                <div className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-semibold text-[#F6E27A]">
                      Elite Access Membership
                    </div>

                    <div className="mt-5 text-xs tracking-widest uppercase text-white/55">
                      Billing
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white/85">
                      {billing === "sixmonth"
                        ? "6 Months"
                        : billing === "annual"
                        ? "12 Months"
                        : "1 Month"}
                    </div>

                    <div className="mt-5 text-6xl sm:text-7xl font-semibold tracking-tight">
                      <span className="bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                        {pricing.price}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-white/60">{pricing.note}</div>

                    {pricing.savings ? (
                      <div className="mt-4 inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-semibold text-[#F6E27A]">
                        {pricing.savings}
                      </div>
                    ) : null}

                    {/* Included list */}
                    <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
                      {[
                        "All supported devices",
                        "Live access included",
                        "Private library included",
                        "Smooth browsing & playback",
                        "Updates & notices available",
                        "Telegram support access",
                      ].map((t) => (
                        <div
                          key={t}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80"
                        >
                          <span className="h-2 w-2 rounded-full bg-[#F6E27A] shadow-[0_0_16px_rgba(212,175,55,0.35)]" />
                          <span className="font-semibold">{t}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 w-full">
                      <ShimmerButton href={TELEGRAM_LINK} className="w-full" variant="gold" attention>
                        Start Trial on Telegram
                      </ShimmerButton>
                      <div className="mt-3 text-[11px] text-white/55">
                        Private access is confirmed individually on Telegram.
                      </div>
                    </div>

                    {/* Sub-trust row */}
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      <Badge>Secure checkout</Badge>
                      <Badge>Fast setup</Badge>
                      <Badge>Polished experience</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <SectionTitle
            kicker="FAQ"
            title="Questions, answered"
            subtitle="If you don’t see what you need, message us on Telegram and we’ll help quickly."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {[
              {
                q: "How do I start the 24-hour trial?",
                a: "Tap any Telegram button and message us. We’ll confirm access and send setup steps.",
              },
              {
                q: "Which devices does it work on?",
                a: "Most popular streaming platforms are supported. If you’re unsure, ask us on Telegram.",
              },
              {
                q: "Can I change my plan later?",
                a: "Yes — upgrades and renewals are handled seamlessly. Message us anytime on Telegram.",
              },
              {
                q: "How quickly will you reply?",
                a: "Support is handled directly through Telegram, so replies are typically quick and personal.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
              >
                <div className="text-base font-semibold text-white">{item.q}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">{item.a}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <ShimmerButton href={TELEGRAM_LINK} className="px-7 py-3" variant="gold" attention>
              Start Trial on Telegram
            </ShimmerButton>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-semibold text-white/90">Elite House</div>
                <div className="mt-1 text-xs text-white/60">
                  Premium viewing. Seamless experience. Direct support via Telegram.
                </div>
              </div>
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-5 py-2 text-sm font-semibold text-[#F6E27A] transition hover:bg-black/55"
              >
                <TelegramIcon />
                Start Trial on Telegram
              </a>
            </div>
          </div>
        </footer>

        {/* Mobile sticky CTA */}
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50">
          <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md p-2 shadow-2xl shadow-black/50">
            <ShimmerButton href={TELEGRAM_LINK} className="w-full" variant="gold" attention>
              Start Trial on Telegram
            </ShimmerButton>
            <div className="mt-1 text-center text-[10px] text-white/55">
              24-hour trial • Priority replies within minutes
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}