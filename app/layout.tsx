import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://faeriehouse.onrender.com/";
const metadataBase = new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`);
const socialImage = new URL("og.png", metadataBase).toString();

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase,
  title: "Faerie House - One House. Many Stories.",
  description: "Faerie - Một mảnh ghép của dự án Brothers & Sisters (Brosis) tại Đại học FPT TP.HCM, nơi những sinh viên đi trước đồng hành và kết nối cùng các tân sinh viên. Tại đây, bạn có thể gặp gỡ những thành viên của Nhà, khám phá các hoạt động và đọc những câu chuyện mới nhất của Faerie.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Faerie House - One House. Many Stories.",
    description: "Gặp những người đồng hành, khám phá hoạt động và câu chuyện của Faerie tại Đại học FPT TP.HCM.",
    url: metadataBase.toString(),
    siteName: "Faerie House",
    type: "website",
    locale: "vi_VN",
    images: [{ url: socialImage, width: 1734, height: 907, alt: "Faerie Brothers & Sisters FPTU" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faerie House - One House. Many Stories.",
    description: "Nhà Brothers & Sisters tại Đại học FPT TP.HCM.",
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
