import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function NewPromoCodePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Yeni Promo Kod Ekle</h1>
        <Link href="/admin/promo-codes">
          <Button variant="outline">Geri Dön</Button>
        </Link>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Promo Kod Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-gray-300">Promo Kod</Label>
              <Input
                id="code"
                placeholder="Örn: DU4VZD5SQDEY"
                className="bg-gray-700/50 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">Açıklama</Label>
              <Textarea
                id="description"
                placeholder="Promo kodun açıklamasını girin"
                className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link" className="text-gray-300">Yönlendirme Linki</Label>
              <Input
                id="link"
                type="url"
                placeholder="https://skin.club"
                className="bg-gray-700/50 border-gray-600 text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="active" />
              <Label htmlFor="active" className="text-gray-300">Aktif</Label>
            </div>

            <div className="flex justify-end space-x-4">
              <Link href="/admin/promo-codes">
                <Button variant="outline">İptal</Button>
              </Link>
              <Button type="submit">Kaydet</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
