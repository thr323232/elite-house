"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";

/* =========================================
   WhatsApp
========================================= */

const WA_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447922309925";

function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* =========================================
   UI Elements
========================================= */

function GoldDivider() {
  return (
    <div className="mx-auto my-16 h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1 text-xs font-medium tracking-wide text-[#F6E27A]">
      {children}
    </span>
  );
}

function CTA({
  children,
  large = false,
}: {
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <a
      href={waLink(
        "Hi Elite House. I'd like to start the 24-hour free trial."
      )}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] font-semibold text-black transition hover:brightness-105 ${
        large ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
      }`}
    >
      {children}
    </a>
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
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {kicker && (
        <div className="mb-4 flex justify-center">
          <Badge>{kicker}</Badge>
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-white/70 text-base">{subtitle}</p>
      )}
    </div>
  );
}

/* =========================================
   Page
========================================= */

export default function EliteHouseLandingPage() {
  const [billing, setBilling] = useState("sixmonth");

  const pricing = useMemo(() => {
    const plans: Record<
      string,
      { price: string; note: string; savings?: string }
    > = {
      monthly: { price: "£14.99", note: "per month" },
      sixmonth: {
        price: "£60",
        note: "every 6 months",
        savings: "Most Popular",
      },
      annual: {
        price: "£100",
        note: "per year",
        savings: "Best Value",
      },
    };
    return plans[billing];
  }, [billing]);

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="Elite House"
            width={300}
            height={100}
            priority
          />
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="mx-auto max-w-5xl px-6 py-28 text-center">
          <div className="flex justify-center mb-6">
            <Badge>Private 24-Hour Access</Badge>
          </div>

          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Refined Streaming.
            <span className="block bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
              Without Compromise.
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Elite House provides discreet access to global live channels
            and a vast private library — delivered with consistency,
            stability, and direct support.
          </p>

          <div className="mt-10">
            <CTA large>Request Private Trial</CTA>
          </div>

          <div className="mt-6 text-sm text-white/50">
            1,200+ active members • ★★★★★ rated • Activated in minutes
          </div>
        </section>

        <GoldDivider />

        {/* VALUE PROPOSITION */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <SectionTitle
            kicker="What Sets Us Apart"
            title="Premium, Reliable, Private."
          />

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Consistent Live Access",
                text: "Thousands of live channels presented clearly and maintained for reliability.",
              },
              {
                title: "Extensive Private Library",
                text: "Over 100,000 films and series — organised and instantly accessible.",
              },
              {
                title: "Direct Personal Support",
                text: "Handled privately via WhatsApp for quick, efficient assistance.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <CTA>Start 24-Hour Trial</CTA>
          </div>
        </section>

        <GoldDivider />

        {/* PRICING */}
        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <SectionTitle
            kicker="Membership"
            title="One Membership. Full Access."
            subtitle="Select your preferred billing cycle."
          />

          <div className="flex justify-center gap-3 mb-12">
            {[
              { id: "monthly", label: "Monthly" },
              { id: "sixmonth", label: "6 Months" },
              { id: "annual", label: "Annual" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setBilling(opt.id)}
                aria-pressed={billing === opt.id}
                className={`px-5 py-2 rounded-xl text-sm transition ${
                  billing === opt.id
                    ? "bg-[#D4AF37] text-black"
                    : "bg-white/10 text-white/70"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-[#D4AF37]/30 bg-white/[0.05] p-14">
            <div className="text-6xl font-semibold text-[#F6E27A]">
              {pricing.price}
            </div>
            <div className="mt-3 text-white/60">
              {pricing.note}
            </div>

            {pricing.savings && (
              <div className="mt-4 text-sm text-[#F6E27A]">
                {pricing.savings}
              </div>
            )}

            <div className="mt-10">
              <CTA large>Activate Membership</CTA>
            </div>

            <div className="mt-6 text-xs text-white/50">
              Private access confirmed individually via WhatsApp.
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-20">
          <SectionTitle title="Frequently Asked Questions" />

          <div className="space-y-4">
            {[
              {
                q: "How does the 24-hour trial work?",
                a: "Simply request access via WhatsApp. We’ll provide setup details and activate your private trial.",
              },
              {
                q: "Which devices are supported?",
                a: "Most major streaming platforms are compatible. Message us to confirm your device.",
              },
              {
                q: "Can I upgrade or extend later?",
                a: "Yes. Membership adjustments are handled directly and discreetly via WhatsApp.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <summary className="cursor-pointer font-semibold">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm text-white/70">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <CTA large>Request Trial Access</CTA>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/50">
        Elite House — Discreet. Premium. Reliable.
      </footer>
    </div>
  );
}
