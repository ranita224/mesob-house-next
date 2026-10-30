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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-maroon focus:shadow-lg"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <div id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}