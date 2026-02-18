"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/**
 * Next.js-safe env read (no import.meta).
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER in Vercel env vars for production.
 */
const readWaEnv = (): string | null => {
  const env = typeof process !== "undefined" ? process.env : undefined;
  const fromProcess =
    env?.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    env?.REACT_APP_WHATSAPP_NUMBER ||
    env?.VITE_WHATSAPP_NUMBER;

  return fromProcess ? String(fromProcess) : null;
};

const __WA_ENV__ = readWaEnv();

// Fallback is lightly obfuscated to avoid plain-text exposure in source
const __WA_FALLBACK__ = ["44", "7922", "309925"].join("");

const getWhatsAppNumber = () => __WA_ENV__ || __WA_FALLBACK__;

// Telegram public link
const TELEGRAM_LINK = "https://t.me/EliteHouseTrialBot";

export function waLink(message: string) {
  // message kept for compatibility; Telegram link is used instead
  return TELEGRAM_LINK;
}

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
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
      {kicker ? (
        <div className="mb-3 flex justify-center">
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
    { id: "monthly", label: "Monthly" },
    { id: "sixmonth", label: "6 Months" },
    { id: "annual", label: "1 Year", badge: "Best Value" },
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
    ? goldBase + " animate-[ctaPulse_3s_ease-in-out_infinite]"
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
          className="pointer-events-none absolute inset-0 rounded-2xl border border-[#D4AF37]/40 animate-[ringPulse_2.8s_ease-out_infinite]"
          aria-hidden="true"
        />
      )}

      {/* Occasional luxury glint */}
      <span
        className={
          "pointer-events-none absolute -inset-y-12 -left-1/2 w-[200%] rotate-12 opacity-0 " +
          "[background:linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] " +
          "animate-[glint_7.5s_ease-in-out_infinite]"
        }
        aria-hidden="true"
      />

      {/* Hover shimmer */}
      <span
        className={
          "pointer-events-none absolute -inset-y-10 -left-1/2 w-[200%] rotate-12 opacity-0 " +
          "[background:linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)] " +
          "transition-opacity duration-200 group-hover:opacity-45 group-hover:animate-[shimmer_2.2s_ease-in-out_infinite]"
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
        "transition-all duration-700 will-change-transform motion-reduce:transition-none " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3") +
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
      [8, 18, 1.2, 16],
      [22, 62, 1.6, 20],
      [35, 28, 1.1, 18],
      [44, 78, 1.4, 26],
      [58, 14, 1.0, 22],
      [66, 52, 1.7, 30],
      [74, 32, 1.2, 24],
      [82, 70, 1.3, 28],
      [90, 24, 1.1, 19],
      [12, 84, 1.5, 32],
      [28, 8, 1.0, 21],
      [52, 88, 1.2, 34],
    ];

    return seeds.map((s, i) => {
      const [x, y, r, dur] = s;
      return { id: i, x, y, r, dur, delay: (i * 0.7) % 5 };
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
            opacity: 0.18,
          }}
        />
      ))}
    </div>
  );
}

// Kept component name to avoid changing anything else; icon is now Telegram
function WhatsAppIcon({ className = "" }: { className?: string }) {
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
      blocks: [
        "10,000+ Live Channels",
        "100,000+ Video On Demand",
        "4K Ultra HD Streaming",
        "Seamless channel playback",
      ],
    },
    {
      ch: "102",
      abbr: "AS",
      name: "Apex Sports",
      blocks: [
        "LIVE Championship",
        "All channels working perfectly",
        "Zero missing listings",
        "Reliable premium streaming",
      ],
    },
    {
      ch: "103",
      abbr: "NV",
      name: "Nova Vista",
      blocks: [
        "Instant access",
        "Precision programme guide data",
        "Smooth browsing experience",
        "Consistent presentation",
      ],
    },
    {
      ch: "104",
      abbr: "OR",
      name: "Orion Discovery",
      blocks: [
        "Fast Telegram setup",
        "Clean channel lineup",
        "Stable playback",
        "Support when you need it",
      ],
    },
    {
      ch: "105",
      abbr: "LX",
      name: "Luxe Kids",
      blocks: [
        "Family-ready experience",
        "Clear titles & logos",
        "No broken channels",
        "Premium reliability",
      ],
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
                  <div
                    key={dup}
                    className="flex"
                    style={{ width: programWidth }}
                  >
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
                    <div
                      key={dup}
                      className="flex gap-2 pr-2"
                      style={{ width: programWidth }}
                    >
                      {row.blocks.map((b, i) => {
                        const isLive = b.toUpperCase().includes("LIVE");
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
                              {isLive ? (
                                <span className="mt-0.5 shrink-0 rounded-full bg-[#D4AF37]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#F6E27A]">
                                  LIVE
                                </span>
                              ) : null}
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
    const base: Record<
      string,
      { price: string; note: string; savings: string | null }
    > = {
      monthly: { price: "£14.99", note: "per month", savings: null },
      sixmonth: { price: "£60", note: "every 6 months", savings: "Save £29.94" },
      annual: { price: "£100", note: "per year", savings: "Save £79.88" },
    };
    return base[billing];
  }, [billing]);

  const trialMessage =
    "Hi Elite House. I'd like to start the 24-hour free trial. Please share the next steps.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#07070A] to-[#000000] text-white">
      <style>{`
        @keyframes gradientMove {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(-2%, -3%, 0) scale(1.05); }
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
          50% { transform: translate3d(0,-16px,0); opacity: 0.22; }
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
          50% { box-shadow: 0 0 0 1px rgba(212,175,55,0.38), 0 0 32px rgba(212,175,55,0.22); }
        }
        @keyframes ctaPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212,175,55,0.25); }
          50% { transform: scale(1.02); box-shadow: 0 0 26px 6px rgba(212,175,55,0.18); }
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
      `}</style>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 animate-[gradientMove_14s_ease-in-out_infinite] bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.20),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(80,120,255,0.14),transparent_60%),radial-gradient(circle_at_50%_80%,rgba(170,90,255,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#07070A] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(212,175,55,0.18),rgba(0,0,0,0)_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_15%_40%,rgba(184,134,11,0.14),rgba(0,0,0,0)_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_85%_45%,rgba(246,226,122,0.10),rgba(0,0,0,0)_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_30%_at_20%_80%,rgba(80,120,255,0.10),rgba(0,0,0,0)_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_30%_at_85%_75%,rgba(170,90,255,0.08),rgba(0,0,0,0)_72%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:52px_52px]" />
        {/* calmer on mobile */}
        <div className="hidden sm:block">
          <FloatingParticles />
        </div>
      </div>

      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              {/* Logo moved into hero (header removed) */}
              <div className="mb-6">
                <Image
                  src="/logo.png"
                  alt="Elite House Logo"
                  width={360}
                  height={120}
                  priority
                  className="h-20 w-auto object-contain drop-shadow-[0_18px_40px_rgba(212,175,55,0.35)]"
                />
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <Badge>24-hour trial via Telegram</Badge>
                <Badge>Global live access and an on demand library</Badge>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight leading-tight text-white sm:text-5xl">
                Elite Access.
                <span className="block bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent leading-tight pb-1">
                  For Viewers Who Expect More.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                Elite House delivers a polished, dependable subscription—consistent, clean, and built to work across your favourite devices.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ShimmerButton
                  href={waLink(trialMessage)}
                  variant="gold"
                  attention
                >
                  Start Trial on Telegram
                </ShimmerButton>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/[0.06]"
                >
                  View membership
                </a>
              </div>

              {/* Trust pill */}
              <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2 text-sm text-white/75 backdrop-blur">
                <span className="font-semibold text-white/90">1,200+ Members</span>
                <span className="h-4 w-px bg-white/15" />
                <span className="text-[#F6E27A] text-base leading-none">★★★★★</span>
                <span className="h-4 w-px bg-white/15" />
                <span>Activated in Minutes</span>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/60 backdrop-blur">
              <div className="absolute inset-0 opacity-80">
                <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#D4AF37]/15 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#B8860B]/15 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5078FF]/10 blur-3xl" />
              </div>

              <div className="relative p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/90">
                    Global live access with a private library
                  </div>
                </div>

                <EpgMock />

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-xs font-semibold text-[#F6E27A]">
                    24-hour trial
                  </div>
                  <div className="mt-1 text-sm text-white/80">
                    Message us on Telegram and we&apos;ll set you up for a private 24-hour trial.
                  </div>

                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={waLink(trialMessage)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-black/60 px-4 py-2 text-sm font-semibold text-[#F6E27A] ring-1 ring-[#D4AF37]/25 transition hover:bg-black/70"
                    >
                      <WhatsAppIcon className="shrink-0" />
                      <span>Chat on Telegram →</span>
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
        <section
          id="features"
          className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16"
        >
          <Reveal>
            <SectionTitle
              kicker="Elite Access"
              title="Elite Access, Made Simple."
              subtitle="Global live access. A vast on demand library. Seamless performance—delivered without compromise."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Reveal delay={100}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur transition hover:bg-white/[0.06]">
                <h3 className="text-2xl font-semibold mb-3">Members-Only Live Access</h3>
                <p className="text-white/70 leading-relaxed text-sm mb-4">
                  Worldwide live television, organised clearly and presented cleanly.
                </p>
                <div className="text-[#F6E27A] text-sm font-medium">
                  Live access—delivered reliably.
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur transition hover:bg-white/[0.06]">
                <h3 className="text-2xl font-semibold mb-3">Private Film & Series Library</h3>
                <p className="text-white/70 leading-relaxed text-sm mb-4">
                  Over 100,000 films and series available instantly. Browse smoothly. Press play confidently.
                </p>
                <div className="text-[#F6E27A] text-sm font-medium">
                  A library for those who expect more.
                </div>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur transition hover:bg-white/[0.06]">
                <h3 className="text-2xl font-semibold mb-3">Direct Support</h3>
                <p className="text-white/70 leading-relaxed text-sm mb-4">
                  Telegram assistance handled quickly and personally. Setup, upgrades, support—streamlined.
                </p>
                <div className="text-[#F6E27A] text-sm font-medium">
                  Support reserved for active members.
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={400} className="mt-12 text-center">
            <div className="text-white/70 mb-5 text-sm tracking-wide">
              Limited access is available. Start with a private 24-hour trial while spaces remain.
            </div>
            <ShimmerButton href={waLink(trialMessage)} variant="gold" attention>
              Start Trial on Telegram
            </ShimmerButton>
          </Reveal>
        </section>

        {/* PRICING */}
        <section
          id="pricing"
          className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16"
        >
          <Reveal>
            <SectionTitle
              kicker="Membership"
              title="One Plan. Full Access."
              subtitle="Choose your billing. Everything is included. Request private trial access to begin."
            />
          </Reveal>

          <Reveal delay={70} className="mt-8">
            <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur sm:grid-cols-3">
              {["Message us on Telegram", "Trial activated", "Start watching"].map(
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
          </Reveal>

          <Reveal delay={80} className="mt-6 flex justify-center">
            <PricingToggle value={billing} onChange={setBilling} />
          </Reveal>

          <div className="mt-10 flex justify-center">
            <Reveal delay={140}>
              <div className="relative group w-full max-w-2xl overflow-hidden rounded-[32px] border border-[#D4AF37]/25 bg-white/[0.05] p-10 backdrop-blur-xl transition-all duration-700 hover:scale-[1.01] hover:border-[#D4AF37]/50 animate-[borderBreath_5.5s_ease-in-out_infinite]">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#D4AF37]/20 blur-3xl animate-[floaty_6s_ease-in-out_infinite]" />
                  <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[#B8860B]/20 blur-3xl animate-[floaty_8s_ease-in-out_infinite]" />
                </div>

                <div className="relative text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-semibold text-[#F6E27A]">
                    Elite Access Membership
                  </div>

                  <div className="mt-5 text-xs tracking-widest uppercase text-white/50">
                    Billing
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white/85">
                    {billing === "sixmonth"
                      ? "6 Months"
                      : billing === "annual"
                      ? "1 Year"
                      : "Monthly"}
                  </div>

                  <div className="mt-5 text-6xl font-semibold tracking-tight">
                    <span className="bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                      {pricing.price}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-white/60">{pricing.note}</div>

                  {pricing.savings ? (
                    <div className="mt-4 inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-semibold text-[#F6E27A] animate-pulse">
                      {pricing.savings}
                    </div>
                  ) : null}

                  <div className="mt-7">
                    <ShimmerButton
                      href={waLink(trialMessage)}
                      className="w-full"
                      variant="gold"
                      attention
                    >
                      Start Trial on Telegram
                    </ShimmerButton>
                    <div className="mt-3 text-[11px] text-white/55">
                      Private access. Confirmed individually via Telegram.
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14"
        >
          <SectionTitle
            kicker="FAQ"
            title="Questions, answered"
            subtitle="If you don&apos;t see what you need, message us on Telegram and we&apos;ll help quickly."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {[
              {
                q: "How do I start the 24-hour trial?",
                a: "Tap any Telegram button and send the pre-filled message. We&apos;ll reply with setup steps.",
              },
              {
                q: "Which devices does it work on?",
                a: "Most popular streaming platforms are supported. If you&apos;re unsure, ask us on Telegram.",
              },
              {
                q: "Can I upgrade my plan later?",
                a: "Yes. Message us anytime and we&apos;ll upgrade you seamlessly—quick, simple, and handled via Telegram.",
              },
              {
                q: "How quickly will you reply?",
                a: "Support is handled directly through Telegram, so responses are typically fast, personal, and effortless.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
              >
                <div className="text-base font-semibold text-white">{item.q}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.a}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <ShimmerButton
              href={waLink(trialMessage)}
              className="px-7 py-3"
              variant="gold"
              attention
            >
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
                href={waLink(trialMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-5 py-2 text-sm font-semibold text-[#F6E27A] transition hover:bg-black/55"
              >
                <WhatsAppIcon />
                Start Trial on Telegram
              </a>
            </div>
          </div>
        </footer>

        {/* Mobile sticky CTA */}
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50">
          <div className="rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md p-2 shadow-2xl shadow-black/50">
            <ShimmerButton
              href={waLink(trialMessage)}
              className="w-full"
              variant="gold"
              attention
            >
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
