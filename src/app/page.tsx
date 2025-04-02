"use client"

import { useEffect, useState } from "react";
import PromoCodeCard from "@/components/promo-codes/PromoCodeCard";
import { toast } from "sonner";

interface PromoCode {
  id: string;
  code: string;
  description: string;
  link: string;
  active: boolean;
  createdAt: string;
}

export default function Home() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    try {
      const response = await fetch("/api/promo-codes");
      const data = await response.json();
      setPromoCodes(data.filter((code: PromoCode) => code.active));
    } catch (error) {
      console.error("Promo kodları getirilirken hata oluştu:", error);
      toast.error("Promo kodları getirilirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full z-10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">CS2CODE25 Promo Codes</h1>
          <p className="text-xl text-gray-300">The most up-to-date and active Skin Club promo codes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {loading ? (
            <div className="col-span-full text-center text-gray-300">Loading...</div>
          ) : (
            promoCodes.map(promo => (
              <PromoCodeCard
                key={promo.id}
                code={promo.code}
                description={promo.description}
                link={promo.link}
              />
            ))
          )}
        </div>

        <div className="text-center mb-8">
          <p className="text-sm text-gray-400">
            Last Update: {new Date().toLocaleDateString("tr-TR")}
          </p>
        </div>

        <article className="article">
          <h2 className="text-center mb-8">Skin Club Promo Code 2025 | March Edition – CS2CODE25</h2>

          <p className="mb-6">
            Discover the ultimate way to save money at Skin Club with our exclusive March 2025 promo codes.
            At CS2CODE25, we work tirelessly to bring you the best deals and discount codes, ensuring you
            maximize your savings when purchasing CS2 and CS:GO skins.
          </p>

          <h3 className="mb-4">Top 20 Skin Club Promo Codes for 2025</h3>

          <p className="mb-6">
            Unlock incredible discounts with our carefully curated list of promo codes. Whether you're a
            seasoned collector or new to the game, these codes are verified and ready to use in March 2025.
          </p>

          <div className="bg-purple-900/30 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-2">Current Top Promo Code:</h3>
            <p className="text-lg text-purple-300">
              {promoCodes[0]?.code || "Yükleniyor..."} – Use this code now for an amazing discount!
            </p>
          </div>

          <h3 className="mb-4">Additional Verified Codes:</h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {loading ? (
              <li className="col-span-full text-center text-gray-300">Loading...</li>
            ) : (
              promoCodes.map(promo => (
                <li key={promo.id} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>{promo.code}</span>
                </li>
              ))
            )}
          </ul>

          <p className="text-center text-purple-300">
            Share these Skin Club promo codes with your friends and help them save too!
          </p>
        </article>
      </div>
    </main>
  );
}
