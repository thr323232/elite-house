"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/** WhatsApp env reader (TypeScript-safe) */
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

export const waLink = (message: string) =>
  `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;

/* ---------------- UI Helpers ---------------- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
      {children}
    </span>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          {subtitle}
        </p>
      )}
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
          type="button"
          onClick={() => onChange(o.id)}
          className={
            "rounded-xl px-4 py-2 text-sm transition " +
            (value === o.id
              ? "bg-[#D4AF37]/15 text-[#F6E27A]"
              : "text-white/70 hover:text-white")
          }
        >
          <span className="inline-flex items-center gap-2">
            {o.label}
            {o.badge && (
              <span className="rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] font-semibold text-[#F6E27A]">
                {o.badge}
              </span>
            )}
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
        "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] px-6 py-3 text-sm font-bold text-black shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 " +
        className
      }
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        <span className="group-hover:translate-x-1 transition">→</span>
      </span>
    </a>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
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
        "transition-all duration-700 " +
        (visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3")
      }
    >
      {children}
    </div>
  );
}

/* ---------------- EPG Mock ---------------- */

function EpgMock() {
  const rows = [
    {
      abbr: "VC",
      name: "Velour Cinema",
      blocks: ["10,000+ Live Channels", "100,000+ Video On Demand"],
    },
    {
      abbr: "AS",
      name: "Apex Sports",
      blocks: ["LIVE Championship", "Reliable premium streaming"],
    },
    {
      abbr: "NV",
      name: "Nova Vista",
      blocks: ["Instant access", "Smooth browsing experience"],
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <div className="grid gap-4">
        {rows.map((r) => (
          <div key={r.abbr} className="flex gap-3 items-start">
            <div className="h-10 w-10 grid place-items-center rounded-xl bg-[#D4AF37]/15 text-[#F6E27A] font-bold">
              {r.abbr}
            </div>
            <div>
              <div className="font-semibold text-white">{r.name}</div>
              <div className="mt-1 text-sm text-white/70">
                {r.blocks.join(" • ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function EliteHouseLandingPage() {
  const [billing, setBilling] = useState("sixmonth");

  const pricing = {
    monthly: { price: "£14.99", note: "per month" },
    sixmonth: { price: "£60", note: "every 6 months" },
    annual: { price: "£100", note: "per year" },
  }[billing];

  const trialMessage =
    "Hi Elite House. I'd like to start the 24-hour free trial. Please share the next steps.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#07070A] to-black text-white">
      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pb-6 pt-12 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
                Elite Access.
                <span className="block bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                  For Viewers Who Expect More.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-white/70 sm:text-lg">
                Elite House delivers a polished subscription—clean, dependable,
                built to work across your favourite devices.
              </p>

              <div className="mt-7 flex gap-3 flex-col sm:flex-row">
                <ShimmerButton href={waLink(trialMessage)}>
                  Start Trial on WhatsApp
                </ShimmerButton>

                <a
                  href="#pricing"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.07]"
                >
                  View membership
                </a>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
              <EpgMock />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          className="mx-auto max-w-6xl px-4 pt-10 pb-24 sm:px-6"
        >
          <Reveal>
            <SectionTitle
              title="Elite Access, Made Simple."
              subtitle="Global live access. Vast on demand library. Seamless performance—delivered without compromise."
            />
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              ["Members-Only Live Access", "Worldwide live television, presented cleanly."],
              ["Private Film & Series Library", "100,000+ titles available instantly."],
              ["Direct Support", "WhatsApp setup and help handled personally."],
            ].map(([h, p]) => (
              <div
                key={h}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 hover:border-[#D4AF37]/40"
              >
                <h3 className="text-xl font-semibold mb-3">{h}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionTitle
            title="One Plan. Full Access."
            subtitle="Choose your billing. Everything is included."
          />

          <div className="flex justify-center">
            <PricingToggle value={billing} onChange={setBilling} />
          </div>

          <div className="mt-14 flex justify-center">
            <div className="max-w-xl w-full rounded-3xl border border-[#D4AF37]/25 bg-white/[0.05] p-10 text-center">
              <div className="text-6xl font-semibold text-[#F6E27A]">
                {pricing.price}
              </div>
              <div className="mt-2 text-sm text-white/60">{pricing.note}</div>

              <div className="mt-8">
                <ShimmerButton href={waLink(trialMessage)} className="w-full">
                  Start Trial on WhatsApp
                </ShimmerButton>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/60">
            Elite House • Premium viewing • Direct WhatsApp support
          </div>
        </footer>
      </main>
    </div>
  );
}
