"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface News {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  published: boolean;
  createdAt: string;
  views: number;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      const data = await response.json();
      setNews(data.filter((item: News) => item.published));
    } catch (error) {
      console.error("Haberler getirilirken hata oluştu:", error);
      toast.error("Haberler getirilirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Haberler</h1>
          <p className="text-gray-400">
            CS2 ve SkinClub ile ilgili en güncel haberler ve duyurular
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-300">Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link href={`/news/${item.slug}`} key={item.id}>
                <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500 transition-colors duration-200 h-full">
                  <div className="relative h-48">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white line-clamp-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 line-clamp-3 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(item.createdAt).toLocaleDateString("tr-TR")}</span>
                      <span>{item.views} görüntülenme</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
