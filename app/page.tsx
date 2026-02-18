"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";

/* WhatsApp Helper */
const WA_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447922309925";

function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* UI Components */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1 text-xs font-medium tracking-wide text-[#F6E27A]">
      {children}
    </span>
  );
}

function CTA({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={waLink("Hi Elite House. I'd like to start the 24-hour free trial.")}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] px-8 py-4 text-base font-semibold text-black transition hover:brightness-105"
    >
      {children}
    </a>
  );
}

/* ✅ DEFAULT EXPORT REQUIRED */
export default function Page() {
  const [billing, setBilling] = useState("sixmonth");

  const pricing = useMemo(() => {
    const plans: Record<string, { price: string; note: string }> = {
      monthly: { price: "£14.99", note: "per month" },
      sixmonth: { price: "£60", note: "every 6 months" },
      annual: { price: "£100", note: "per year" },
    };
    return plans[billing];
  }, [billing]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 py-10 text-center">
        <Image
          src="/logo.png"
          alt="Elite House"
          width={300}
          height={100}
          priority
        />
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <Badge>Private 24-Hour Access</Badge>

        <h1 className="mt-6 text-5xl font-semibold">
          Luxury Streaming.
          <span className="block bg-gradient-to-r from-[#F6E27A] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
            Without Compromise.
          </span>
        </h1>

        <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
          Elite House delivers premium live access and a vast private library —
          with reliability, stability, and direct WhatsApp support.
        </p>

        <div className="mt-10">
          <CTA>Request Private Trial</CTA>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-8">
          Membership Pricing
        </h2>

        <div className="flex justify-center gap-3 mb-10">
          {["monthly", "sixmonth", "annual"].map((opt) => (
            <button
              key={opt}
              onClick={() => setBilling(opt)}
              className={`px-5 py-2 rounded-xl text-sm ${
                billing === opt
                  ? "bg-[#D4AF37] text-black"
                  : "bg-white/10 text-white/70"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/30 bg-white/[0.05] p-12">
          <div className="text-6xl font-semibold text-[#F6E27A]">
            {pricing.price}
          </div>
          <div className="mt-3 text-white/60">{pricing.note}</div>

          <div className="mt-10">
            <CTA>Activate Membership</CTA>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/50">
        Elite House — Discreet. Premium. Reliable.
      </footer>
    </div>
  );
}
