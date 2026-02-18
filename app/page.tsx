"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/* ---------------- WhatsApp link ---------------- */

const readWaEnv = (): string | null => {
  const env = typeof process !== "undefined" ? process.env : undefined;
  const v =
    env?.NEXT_PUBLIC_WHATSAPP_NUMBER ??
    env?.REACT_APP_WHATSAPP_NUMBER ??
    env?.VITE_WHATSAPP_NUMBER;
  return v ? String(v) : null;
};

const __WA_ENV__ = readWaEnv();
const __WA_FALLBACK__ = ["44", "7922", "309925"].join("");
const getWhatsAppNumber = () => __WA_ENV__ || __WA_FALLBACK__;

export function waLink(message: string) {
  const text = encodeURIComponent(message);
  const number = getWhatsAppNumber();
  return `https://wa.me/${number}?text=${text}`;
}

/* ---------------- Static data ---------------- */

type Billing = "monthly" | "sixmonth" | "annual";

const PRICING: Record<
  Billing,
  { price: string; note: string; savings: string | null }
> = {
  monthly: { price: "£14.99", note: "per month", savings: null },
  sixmonth: { price: "£60", note: "every 6 months", savings: "Save £29.94" },
  annual: { price: "£100", note: "per year", savings: "Save £79.88" },
};

const BILLING_OPTIONS: Array<{ id: Billing; label: string; badge?: string }> = [
  { id: "monthly", label: "Monthly" },
  { id: "sixmonth", label: "6 Months" },
  { id: "annual", label: "1 Year", badge: "Best Value" },
];

const PARTICLE_SEEDS: Array<[number, number, number, number]> = [
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

const EPG_TIMELINE = [
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

const EPG_ROWS = [
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
      "Fast WhatsApp setup",
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

const FAQ = [
  {
    q: "How do I start the 24-hour trial?",
    a: "Tap any WhatsApp button and send the pre-filled message. We&apos;ll reply with setup steps.",
  },
  {
    q: "Which devices does it work on?",
    a: "Most popular streaming platforms are supported. If you&apos;re unsure, ask us on WhatsApp.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes. Message us anytime and we&apos;ll upgrade you seamlessly—quick, simple, and handled via WhatsApp.",
  },
  {
    q: "How quickly will you reply?",
    a: "Support is handled directly through WhatsApp, so responses are typically fast, personal, and effortless.",
  },
];

const FEATURE_CARDS = [
  {
    h: "Members-Only Live Access",
    p: "Worldwide live television, organised clearly and presented cleanly.",
    f: "Live access—delivered reliably.",
    d: 100,
  },
  {
    h: "Private Film & Series Library",
    p: "Over 100,000 films and series available instantly. Browse smoothly. Press play confidently.",
    f: "A library for those who expect more.",
    d: 200,
  },
  {
    h: "Direct Support",
    p: "WhatsApp assistance handled quickly and personally. Setup, upgrades, support—streamlined.",
    f: "Support reserved for active members.",
    d: 300,
  },
];

/* ---------------- UI pieces ---------------- */

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
    <div className="mx-auto mb-10 max-w-2xl text-center">
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

function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-3xl border border-white/10 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

function PricingToggle({
  value,
  onChange,
}: {
  value: Billing;
  onChange: (v: Billing) => void;
}) {
  return (
    <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur">
      {BILLING_OPTIONS.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
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

      <span
        className={
          "pointer-events-none absolute -inset-y-12 -left-1/2 w-[200%] rotate-12 opacity-0 " +
          "[background:linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] " +
          "animate-[glint_7.5s_ease-in-out_infinite]"
        }
        aria-hidden="true"
      />
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
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          obs.disconnect();
        }
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
  const particles = useMemo(
    () =>
      PARTICLE_SEEDS.map(([x, y, r, dur], i) => ({
        id: i,
        x,
        y,
        r,
        dur,
        delay: (i * 0.7) % 5,
      })),
    []
  );

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
      <path d="M20.52 3.48A11.78 11.78 0 0012.05 0C5.5 0 .2 5.3.2 11.85c0 2.09.55 4.14 1.6 5.95L0 24l6.38-1.67a11.8 11.8 0 005.67 1.44h.01c6.55 0 11.85-5.3 11.85-11.85 0-3.17-1.23-6.15-3.39-8.31zM12.06 21.4h-.01a9.46 9.46 0 01-4.82-1.32l-.35-.21-3.79.99 1.01-3.7-.23-.38a9.44 9.44 0 01-1.45-5.03c0-5.23 4.25-9.48 9.48-9.48a9.41 9.41 0 016.7 2.78 9.41 9.41 0 012.78 6.7c0 5.23-4.25 9.48-9.48 9.48zm5.2-7.07c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.91 1.12-.17.19-.33.21-.62.07-.29-.15-1.23-.45-2.35-1.43-.87-.77-1.46-1.72-1.63-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.44s1.03 2.83 1.17 3.03c.14.19 2.02 3.09 4.9 4.33.69.3 1.22.48 1.63.61.69.22 1.31.19 1.8.11.55-.08 1.7-.69 1.94-1.35.24-.67.24-1.24.17-1.35-.07-.12-.26-.19-.55-.33z" />
    </svg>
  );
}

/* ---------------- EPG ---------------- */

function EpgMock() {
  const nowLeft = "52.5%";
  const slotW = 120;
  const programWidth = EPG_TIMELINE.length * slotW;

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
                className="flex animate-[marquee_22s_linear_infinite] motion-reduce:animate-none"
                style={{ width: programWidth * 2 }}
              >
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex" style={{ width: programWidth }}>
                    {EPG_TIMELINE.map((t) => (
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
          {EPG_ROWS.map((row, idx) => (
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
                  className="flex animate-[marquee_24s_linear_infinite] motion-reduce:animate-none"
                  style={{ width: programWidth * 2 }}
                >
                  {[0, 1].map((dup) => (
                    <div key={dup} className="flex gap-2 pr-2" style={{ width: programWidth }}>
                      {row.blocks.map((b, i) => {
                        const isLive = b.toUpperCase().includes("LIVE");
                        const isNow = idx === 2 && i === 1;

                        return (
                          <div
                            key={`${dup}-${row.ch}-${i}`}
                            className={
                              "relative shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 " +
                              (isNow ? "ring-1 ring-white/20" : "")
                            }
                            style={{ width: 3 * slotW }}
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

/* ---------------- PAGE ---------------- */

export default function EliteHouseLandingPage() {
  const [billing, setBilling] = useState<Billing>("sixmonth");
  const pricing = PRICING[billing];

  const trialMessage =
    "Hi Elite House. I'd like to start the 24-hour free trial. Please share the next steps.";

  // Consistent luxury spacing across sections:
  // mobile: py-14, desktop+: py-20
  const SECTION = "mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#07070A] to-[#000000] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 animate-[gradientMove_14s_ease-in-out_infinite] bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.20),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(80,120,255,0.14),transparent_60%),radial-gradient(circle_at_50%_80%,rgba(170,90,255,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#07070A] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(212,175,55,0.18),rgba(0,0,0,0)_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_15%_40%,rgba(184,134,11,0.14),rgba(0,0,0,0)_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_85%_45%,rgba(246,226,122,0.10),rgba(0,0,0,0)_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_30%_at_20%_80%,rgba(80,120,255,0.10),rgba(0,0,0,0)_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_30%_at_85%_75%,rgba(170,90,255,0.08),rgba(0,0,0,0)_72%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:52px_52px]" />
        <FloatingParticles />
      </div>

      {/* HEADER REMOVED */}

      <main className="relative z-10">
        {/* HERO (slightly tighter than the rest, so it leads into sections) */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-10 sm:px-6 sm:pt-14 sm:pb-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight leading-tight text-white sm:text-5xl">
                Elite Access.
                <span className="block bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent leading-tight pb-1">
                  For Viewers Who Expect More.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                Elite House delivers a polished, dependable subscription—consistent, clean, and built to work across your favourite devices.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ShimmerButton href={waLink(trialMessage)} variant="gold" attention>
                  Start Trial on WhatsApp
                </ShimmerButton>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/[0.06]"
                >
                  View membership
                </a>
              </div>

              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2 text-sm text-white/75 backdrop-blur">
                <span className="font-semibold text-white/90">1,200+ Members</span>
                <span className="h-4 w-px bg-white/15" />
                <span className="text-[#F6E27A] text-base leading-none">★★★★★</span>
                <span className="h-4 w-px bg-white/15" />
                <span>Activated in Minutes</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/60 backdrop-blur">
              <div className="absolute inset-0 opacity-80">
                <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#D4AF37]/15 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#B8860B]/15 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5078FF]/10 blur-3xl" />
              </div>

              <div className="relative p-6">
                <EpgMock />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className={SECTION}>
          <Reveal>
            <SectionTitle
              title="Elite Access, Made Simple."
              subtitle="Global live access. A vast on demand library. Seamless performance—delivered without compromise."
            />
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {FEATURE_CARDS.map((c) => (
              <Reveal key={c.h} delay={c.d}>
                <Card className="bg-white/[0.05] p-8 transition hover:border-[#D4AF37]/40 hover:bg-white/[0.08]">
                  <h3 className="text-2xl font-semibold mb-4">{c.h}</h3>
                  <p className="text-white/70 leading-relaxed text-sm mb-4">
                    {c.p}
                  </p>
                  <div className="text-[#F6E27A] text-sm font-medium">
                    {c.f}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-16 text-center">
            <div className="text-white/70 mb-6 text-sm tracking-wide">
              Limited access is available. Start with a private 24-hour trial while spaces remain.
            </div>
            <ShimmerButton href={waLink(trialMessage)} variant="gold" attention>
              Start Trial on WhatsApp
            </ShimmerButton>
          </Reveal>
        </section>

        {/* PRICING */}
        <section id="pricing" className={SECTION}>
          <Reveal>
            <SectionTitle
              kicker="Membership"
              title="One Plan. Full Access."
              subtitle="Choose your billing. Everything is included. Request private trial access to begin."
            />
          </Reveal>

          <Reveal delay={70} className="mt-10">
            <Card className="bg-white/[0.035] p-6">
              <div className="grid gap-3 sm:grid-cols-3">
                {["Message us on WhatsApp", "Trial activated", "Start watching"].map(
                  (t, i) => (
                    <div key={t} className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-xs font-semibold text-[#F6E27A]">
                        {i + 1}
                      </div>
                      <div className="text-sm font-semibold text-white/85">
                        {t}
                      </div>
                    </div>
                  )
                )}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={80} className="mt-8 flex justify-center">
            <PricingToggle value={billing} onChange={setBilling} />
          </Reveal>

          <div className="mt-14 flex justify-center">
            <Reveal delay={140}>
              <div className="relative group w-full max-w-2xl overflow-hidden rounded-[32px] border border-[#D4AF37]/25 bg-white/[0.05] p-10 backdrop-blur-xl transition-all duration-700 hover:scale-[1.02] hover:border-[#D4AF37]/50 animate-[borderBreath_5.5s_ease-in-out_infinite]">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#D4AF37]/20 blur-3xl animate-[floaty_6s_ease-in-out_infinite]" />
                  <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[#B8860B]/20 blur-3xl animate-[floaty_8s_ease-in-out_infinite]" />
                </div>

                <div className="relative text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1 text-xs font-semibold text-[#F6E27A]">
                    Elite Access Membership
                  </div>

                  <div className="mt-6 text-xs tracking-widest uppercase text-white/50">
                    Billing
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white/85">
                    {billing === "sixmonth"
                      ? "6 Months"
                      : billing === "annual"
                      ? "1 Year"
                      : "Monthly"}
                  </div>

                  <div className="mt-6 text-6xl font-semibold tracking-tight">
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

                  <div className="mt-8">
                    <ShimmerButton
                      href={waLink(trialMessage)}
                      className="w-full"
                      variant="gold"
                      attention
                    >
                      Start Trial on WhatsApp
                    </ShimmerButton>
                    <div className="mt-3 text-[11px] text-white/55">
                      Private access. Confirmed individually via WhatsApp.
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={SECTION}>
          <SectionTitle
            kicker="FAQ"
            title="Questions, answered"
            subtitle="If you don&apos;t see what you need, message us on WhatsApp and we&apos;ll help quickly."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {FAQ.map((item) => (
              <Card key={item.q} className="bg-white/[0.04] p-7">
                <div className="text-base font-semibold text-white">
                  {item.q}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.a}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <ShimmerButton
              href={waLink(trialMessage)}
              className="px-7 py-3"
              variant="gold"
              attention
            >
              Start Trial on WhatsApp
            </ShimmerButton>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-20">
          <Card className="bg-white/[0.03] p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-semibold text-white/90">
                  Elite House
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Premium viewing. Seamless experience. Direct support via
                  WhatsApp.
                </div>
              </div>
              <a
                href={waLink(trialMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-5 py-2 text-sm font-semibold text-[#F6E27A] transition hover:bg-black/55"
              >
                <WhatsAppIcon />
                Start Trial on WhatsApp
              </a>
            </div>
          </Card>
        </footer>

        {/* Mobile sticky CTA removed ✅ */}
      </main>
    </div>
  );
}
