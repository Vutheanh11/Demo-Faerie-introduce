import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://faerie-brosis-fptu.anhvtse190111.chatgpt.site/";
const metadataBase = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);
const socialImage = new URL("og.png", metadataBase).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase,
  title: "Faerie — Find Your People",
  description: "Khám phá nhà Faerie, những câu chuyện và các thế hệ Brothers & Sisters tại Đại học FPT campus TP.HCM.",
  openGraph: {
    title: "Faerie — Find Your People",
    description: "Một mái nhà để thuộc về, cùng trưởng thành và tỏa sáng tại FPTU campus TP.HCM.",
    type: "website",
    locale: "vi_VN",
    images: [{ url: socialImage, width: 1734, height: 907, alt: "Faerie Brothers & Sisters FPTU" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faerie — Find Your People",
    description: "Grow together. Shine together.",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
