"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
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
      setNews(data);
    } catch (error) {
      console.error("Haberler getirilirken hata oluştu:", error);
      toast.error("Haberler getirilirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu haberi silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/news?id=${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Haber silinirken bir hata oluştu");
      }

      toast.success("Haber başarıyla silindi");
      fetchNews();
    } catch (error) {
      console.error("Hata:", error);
      toast.error(error instanceof Error ? error.message : "Bir hata oluştu");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Haber Yönetimi</h1>
        <div className="flex gap-4">
          <Link href="/admin/news/new">
            <Button>Yeni Haber Ekle</Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline">Geri Dön</Button>
          </Link>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Haber Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-gray-300">Yükleniyor...</div>
          ) : (
            <div className="space-y-4">
              {news.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-start gap-4 p-4 bg-gray-700/30 rounded-lg"
                >
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">Slug: {item.slug}</p>
                    <p className="text-gray-300 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Görüntülenme: {item.views}</span>
                      <span>•</span>
                      <span>{new Date(item.createdAt).toLocaleDateString("tr-TR")}</span>
                      <span>•</span>
                      <span className={item.published ? "text-green-400" : "text-red-400"}>
                        {item.published ? "Yayında" : "Taslak"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/news/${item.id}`}>
                      <Button variant="outline" size="sm">
                        Düzenle
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Sil
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
