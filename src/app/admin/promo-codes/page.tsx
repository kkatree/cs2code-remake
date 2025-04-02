"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { toast } from "sonner";

interface PromoCode {
  id: string;
  code: string;
  description: string;
  link: string;
  active: boolean;
  createdAt: string;
}

export default function PromoCodesPage() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCode, setEditingCode] = useState<PromoCode | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    link: "",
    active: true
  });

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    try {
      const response = await fetch("/api/promo-codes");
      const data = await response.json();
      setPromoCodes(data);
    } catch (error) {
      console.error("Promo kodları getirilirken hata oluştu:", error);
      toast.error("Promo kodları getirilirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingCode) {
        const response = await fetch("/api/promo-codes", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingCode.id,
            ...formData
          })
        });

        if (!response.ok) {
          throw new Error("Promo kodu güncellenirken bir hata oluştu");
        }

        toast.success("Promo kodu başarıyla güncellendi");
      } else {
        const response = await fetch("/api/promo-codes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error("Promo kodu eklenirken bir hata oluştu");
        }

        toast.success("Promo kodu başarıyla eklendi");
      }

      setFormData({
        code: "",
        description: "",
        link: "",
        active: true
      });
      setEditingCode(null);
      fetchPromoCodes();
    } catch (error) {
      console.error("Hata:", error);
      toast.error(error instanceof Error ? error.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (code: PromoCode) => {
    setEditingCode(code);
    setFormData({
      code: code.code,
      description: code.description,
      link: code.link,
      active: code.active
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu promo kodunu silmek istediğinizden emin misiniz?")) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/promo-codes?id=${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Promo kodu silinirken bir hata oluştu");
      }

      toast.success("Promo kodu başarıyla silindi");
      fetchPromoCodes();
    } catch (error) {
      console.error("Hata:", error);
      toast.error(error instanceof Error ? error.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Promo Kodları Yönetimi</h1>
        <Link href="/admin">
          <Button variant="outline">Geri Dön</Button>
        </Link>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">
            {editingCode ? "Promo Kodu Düzenle" : "Yeni Promo Kodu Ekle"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-gray-300">Kod</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                placeholder="Promo kodunu girin"
                className="bg-gray-700/50 border-gray-600 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">Açıklama</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Promo kodu açıklamasını girin"
                className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link" className="text-gray-300">Link</Label>
              <Input
                id="link"
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                placeholder="Promo kodu linkini girin"
                className="bg-gray-700/50 border-gray-600 text-white"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="active" 
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="active" className="text-gray-300">Aktif</Label>
            </div>

            <div className="flex justify-end space-x-4">
              {editingCode && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setEditingCode(null);
                    setFormData({
                      code: "",
                      description: "",
                      link: "",
                      active: true
                    });
                  }}
                >
                  İptal
                </Button>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? "Kaydediliyor..." : editingCode ? "Güncelle" : "Kaydet"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Promo Kodları Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-gray-300">Yükleniyor...</p>
          ) : (
            <div className="space-y-4">
              {promoCodes.map((code) => (
                <div 
                  key={code.id}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-white">{code.code}</h3>
                    <p className="text-gray-300">{code.description}</p>
                    <p className="text-sm text-gray-400">{code.link}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        code.active 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {code.active ? "Aktif" : "Pasif"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(code.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(code)}
                    >
                      Düzenle
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(code.id)}
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
