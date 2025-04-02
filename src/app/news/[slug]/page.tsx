"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, [params.slug]);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      const data = await response.json();
      const newsItem = data.find((item: News) => item.slug === params.slug);
      
      if (!newsItem) {
        throw new Error("Haber bulunamadı");
      }

      setNews(newsItem);
      
      // Görüntülenme sayısını artır
      const formData = new FormData();
      formData.append("views", (newsItem.views + 1).toString());
      
      await fetch(`/api/news?id=${newsItem.id}`, {
        method: "PUT",
        body: formData
      });
    } catch (error) {
      console.error("Haber getirilirken hata oluştu:", error);
      toast.error("Haber getirilirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-gray-300">Yükleniyor...</div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Haber Bulunamadı</h1>
          <Link href="/news">
            <Button>Haberler Sayfasına Dön</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/news" className="inline-block mb-8">
          <Button variant="outline">← Haberler Sayfasına Dön</Button>
        </Link>

        <article className="space-y-8">
          <div className="relative h-[400px] w-full">
            <Image
              src={news.coverImage}
              alt={news.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white">{news.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{new Date(news.createdAt).toLocaleDateString("tr-TR")}</span>
              <span>•</span>
              <span>{news.views} görüntülenme</span>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300">{news.description}</p>
              <div className="mt-8 text-gray-300 whitespace-pre-wrap">
                {news.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
