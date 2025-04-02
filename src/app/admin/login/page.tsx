import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <Card className="w-full max-w-md bg-gray-800/50 border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-white">Admin Girişi</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@cs2code25.com"
                className="bg-gray-700/50 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Şifre</Label>
              <Input
                id="password"
                type="password"
                className="bg-gray-700/50 border-gray-600 text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700/50 text-purple-600 focus:ring-purple-600"
                />
                <Label htmlFor="remember" className="text-sm text-gray-300">
                  Beni Hatırla
                </Label>
              </div>
              <Link href="/admin/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                Şifremi Unuttum
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Giriş Yap
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
