import "./globals.css";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "./providers";
import { getSession } from "../lib/session";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "Mesob House",
  description: "Ethiopian food, delivered.",
};

export default async function RootLayout({ children }) {
  const user = await getSession();

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <Providers>
          <Header user={user} />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}