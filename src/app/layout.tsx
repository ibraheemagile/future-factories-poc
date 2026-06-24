import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ibmPlex = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "منصة مركز القدرات الصناعية | وزارة الصناعة",
  description:
    "بوابة موحدة لمبادرات التحول الصناعي — مصانع المستقبل، منح الابتكار، ومقدمي الحلول",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className={`${ibmPlex.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
