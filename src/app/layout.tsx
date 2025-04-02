import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lato = Lato({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-lato"
});

export const metadata: Metadata = {
  title: "CS2 New Skin Club Promo Code 2025 + March | CS2CODE25",
  description: "Looking for a 'skinclub promo code' or new skin club promo code in 2025? Discover exclusive discounts with the latest skin.club promo code offers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lato.variable} font-lato`}>
        <div className="bg-gradient-to-t from-purple-900/30 blur-xl to-transparent fixed inset-0"></div>
        <div className="relative flex flex-col items-center min-w-screen min-h-screen p-8 gap-16 z-10 px-8 md:px-12 lg:px-48">
          <div className="rounded-xl px-8 py-2 bg-gradient-to-tr from-purple-600/20 to-purple-500/20">
            <div className="flex flex-col gap-2 text-lg md:flex-row items-center md:text-2xl md:gap-8">
              <Link href="/" className="text-white">CS2 Promo Codes</Link>
              <Link href="/news" className="text-white">CS2 Promo And Skin News</Link>
              <Link 
                  href="https://discord.gg/2Ee8X33PEr" 
                  className="flex items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-xl transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>Join Discord for Skin Giveaways</span>
                </Link>
            </div>
            
          </div>
          <Link className="flex flex-col items-center justify-center" href="https://skin.club" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/skinclub.png"
                  alt="SkinClub Logo"
                  width={300}
                  height={100}
                  className="mr-2"
                />
            </Link>
          {children}
        </div>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
