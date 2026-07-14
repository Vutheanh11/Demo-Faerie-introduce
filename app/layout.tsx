import type { Metadata } from "next";
import { headers } from "next/headers";
import { Be_Vietnam_Pro, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const sans = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

const display = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: "Faerie — Brothers & Sisters FPTU",
    description: "Tin tức, sự kiện và những gương mặt tạo nên đại gia đình Faerie tại Đại học FPT.",
    openGraph: {
      title: "Faerie — Grow together. Shine together.",
      description: "Khám phá câu chuyện, sự kiện và các thế hệ của nhà Faerie.",
      type: "website",
      locale: "vi_VN",
      images: [{ url: "/og.png", width: 1731, height: 909, alt: "Faerie Brothers & Sisters FPTU" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Faerie — Brothers & Sisters FPTU",
      description: "Grow together. Shine together.",
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
