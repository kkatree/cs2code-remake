import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Admin Panel - CS2CODE25",
  description: "CS2CODE25 Admin Panel",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-xl font-bold text-white">
                CS2CODE25 Admin
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin/promo-codes">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Promo Kodları
                </Button>
              </Link>
              <Link href="/admin/news">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Haberler
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" className="text-gray-300 hover:text-white">
                  Çıkış Yap
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
