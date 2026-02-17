import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elite House — Premium Television Done Properly",
  description:
    "Elite House delivers a polished, dependable subscription with priority WhatsApp support.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
