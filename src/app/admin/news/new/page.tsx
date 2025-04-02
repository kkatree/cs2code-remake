"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/news", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Haber eklenirken bir hata oluştu");
      }

      toast.success("Haber başarıyla eklendi");
      router.push("/admin/news");
    } catch (error) {
      console.error("Hata:", error);
      toast.error(error instanceof Error ? error.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Yeni Haber Ekle</h1>
        <Link href="/admin/news">
          <Button variant="outline">Geri Dön</Button>
        </Link>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Haber Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Başlık</Label>
              <Input
                id="title"
                name="title"
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-white">Slug</Label>
              <Input
                id="slug"
                name="slug"
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Kısa Açıklama</Label>
              <Textarea
                id="description"
                name="description"
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-white">İçerik</Label>
              <Textarea
                id="content"
                name="content"
                required
                className="bg-gray-700 border-gray-600 text-white min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage" className="text-white">Kapak Görseli</Label>
              <Input
                id="coverImage"
                name="coverImage"
                type="file"
                accept="image/*"
                required
                onChange={handleImageChange}
                className="bg-gray-700 border-gray-600 text-white"
              />
              {imagePreview && (
                <div className="relative w-full h-48 mt-2">
                  <Image
                    src={imagePreview}
                    alt="Önizleme"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="published" name="published" defaultChecked />
              <Label htmlFor="published" className="text-white">Yayınla</Label>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
