import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Paneli</h1>
        <div className="flex space-x-4">
          <Link href="/admin/promo-codes/new">
            <Button>Yeni Promo Kod Ekle</Button>
          </Link>
          <Link href="/admin/news/new">
            <Button>Yeni Haber Ekle</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Promo Kodları</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">Toplam aktif promo kod sayısı: 6</p>
            <Link href="/admin/promo-codes">
              <Button variant="outline" className="w-full">Promo Kodları Yönet</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Haberler</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">Toplam haber sayısı: 0</p>
            <Link href="/admin/news">
              <Button variant="outline" className="w-full">Haberleri Yönet</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">İstatistikler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-gray-300">
              <p>Toplam ziyaretçi: 0</p>
              <p>Aktif kullanıcı: 0</p>
              <p>Promo kod kullanımı: 0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Son Aktiviteler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">Yeni promo kod eklendi</p>
                <p className="text-sm text-gray-400">RNWZYK4R7PGE</p>
              </div>
              <span className="text-sm text-gray-400">2 saat önce</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">Promo kod güncellendi</p>
                <p className="text-sm text-gray-400">DU4VZD5SQDEY</p>
              </div>
              <span className="text-sm text-gray-400">5 saat önce</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">Sistem güncellemesi</p>
                <p className="text-sm text-gray-400">Admin paneli yenilendi</p>
              </div>
              <span className="text-sm text-gray-400">1 gün önce</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
