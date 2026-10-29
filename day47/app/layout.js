import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import { SITE_URL } from "../lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Mesob Eats",
    default: "Mesob Eats - Ethiopian Food Delivery in Addis Ababa",
  },
  description:
    "Order Doro Wat, Tibs, Kitfo and Shiro from kitchens in Bole and Kazanchis. Delivery across Addis Ababa, paid with TeleBirr.",
  openGraph: {
    title: "Mesob Eats - Ethiopian Food Delivery",
    description:
      "Authentic Ethiopian cuisine delivered hot to your door in Addis Ababa.",
    url: "/",
    siteName: "Mesob Eats",
    type: "website",
    locale: "en_ET",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="font-sans bg-amber-50/30 text-gray-900 antialiased min-h-screen flex flex-col">
        <Providers>
          <Header />
          <div className="flex-grow">{children}</div>
        </Providers>
      </body>
    </html>
  );
}