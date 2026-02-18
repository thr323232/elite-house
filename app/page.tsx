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

/** Small UI */
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
    <div className="mx-auto mb-8 max-w-2xl text-center">
      {kicker ? (
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#F6E27A]">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
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
        "inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3 text-sm font-semibold text-black " +
        "bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] " +
        "shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 transition " +
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
    <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={
            "rounded-xl px-4 py-2 text-sm transition " +
            (value === o.id
              ? "bg-[#D4AF37]/15 text-[#F6E27A] shadow-sm"
              : "text-white/70 hover:text-white")
          }
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
      sixmonth: {
        price: "£60",
        note: "every 6 months",
        savings: "Save £29.94",
      },
      annual: {
        price: "£100",
        note: "per year",
        savings: "Save £79.88",
      },
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
    <div className="min-h-screen bg-gradient-to-b from-black via-[#07070A] to-black text-white">
      {/* Background glow (calm) */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(212,175,55,0.26),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(80,120,255,0.16),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(170,90,255,0.10),transparent_62%)]" />
      </div>

      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Image
                src="/logo.png"
                alt="Elite House Logo"
                width={340}
                height={120}
                priority
                className="h-20 w-auto object-contain drop-shadow-[0_18px_40px_rgba(212,175,55,0.35)] mb-6"
              />

              <h1 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">
                Elite Access.
                <span className="block bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                  For Viewers Who Expect More.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-white/65 text-base sm:text-lg leading-relaxed">
                Premium live entertainment and a private on-demand library —
                designed to feel seamless, discreet, and effortless across your
                devices.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-4">
                <CTAButton href={waLink(trialMessage)}>
                  Start Trial on WhatsApp
                </CTAButton>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-7 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 transition"
                >
                  View membership <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2 text-sm text-white/70 backdrop-blur">
                <span className="font-semibold text-white/85">1,200+ Members</span>
                <span className="h-4 w-px bg-white/15" />
                <StarRow />
                <span className="h-4 w-px bg-white/15" />
                <span>Activated in minutes</span>
              </div>
            </div>

            {/* Right card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl shadow-2xl shadow-black/50">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white/85">
                    Private 24-hour trial access
                  </p>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">
                    Message us directly on WhatsApp and we’ll activate your trial
                    quickly.
                  </p>
                </div>
                <div className="shrink-0 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-2 text-xs font-semibold text-[#F6E27A]">
                  VIP
                </div>
              </div>

              <div className="mt-5">
                <CTAButton className="w-full" href={waLink(trialMessage)}>
                  Request trial access
                </CTAButton>
              </div>

              <p className="mt-3 text-xs text-white/45">
                Priority replies • Setup handled personally
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionTitle
            kicker="Elite Features"
            title="Everything included."
            subtitle="Live access, premium on-demand, and direct support — all in one private membership."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Live Channels",
                desc: "Worldwide live access, organised cleanly and delivered reliably.",
              },
              {
                title: "On Demand Library",
                desc: "Thousands of films and series ready instantly — smooth browsing, no clutter.",
              },
              {
                title: "Direct WhatsApp Support",
                desc: "Fast setup, upgrades, and personal help whenever needed.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur hover:bg-white/[0.07] transition"
              >
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <SectionTitle
            kicker="Trusted"
            title="What members say."
            subtitle="Short, real feedback from private members who value reliability and a clean experience."
          />

          <div className="grid gap-4 md:grid-cols-2">
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

          <div className="mt-8 flex justify-center">
            <CTAButton href={waLink(trialMessage)}>Start Trial on WhatsApp</CTAButton>
          </div>
        </section>

        {/* PRICING (with toggle) */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionTitle
            kicker="Membership"
            title="Choose your billing."
            subtitle="Simple pricing. Everything included. Confirmed privately via WhatsApp."
          />

          <div className="flex justify-center">
            <PricingToggle value={billing} onChange={setBilling} />
          </div>

          <div className="mt-8 flex justify-center">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-[#D4AF37]/25 bg-white/[0.05] p-10 text-center shadow-xl backdrop-blur">
              {/* soft glow */}
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

                <div className="mt-4 text-6xl font-semibold tracking-tight">
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

          {/* small reassurance row */}
          <div className="mt-6 flex justify-center">
            <div className="grid w-full max-w-2xl gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:grid-cols-3">
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
        </section>

        {/* FAQ / Assurance (UPDATED) */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <SectionTitle
            kicker="Support"
            title="Private access, handled properly."
            subtitle="Everything is set up personally through WhatsApp — fast, discreet, and simple."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {[
              {
                q: "How does the free trial work?",
                a: "Just tap the WhatsApp button and we’ll activate your private 24-hour trial. Setup is handled for you step-by-step.",
              },
              {
                q: "Is this instant or do I need to wait?",
                a: "Most trials are activated within minutes. Replies are fast because support is handled directly, not through tickets.",
              },
              {
                q: "What’s included with membership?",
                a: "Full access — live channels, the complete on-demand library, and ongoing support. Everything is included in one plan.",
              },
              {
                q: "Can I upgrade or extend later?",
                a: "Yes. Members can upgrade or renew anytime with a quick message. Everything is managed privately through WhatsApp.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
              >
                <h3 className="text-base font-semibold text-white">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <CTAButton href={waLink(trialMessage)}>Start Trial on WhatsApp</CTAButton>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur">
            <p className="text-sm font-semibold text-white/90">Elite House</p>
            <p className="mt-1 text-xs text-white/50">
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
              Private trial • Priority replies within minutes
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
