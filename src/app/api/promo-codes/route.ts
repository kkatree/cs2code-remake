import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const promoCodes = await prisma.promoCode.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(promoCodes);
  } catch (error) {
    console.error("Promo kodları getirilirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Promo kodları getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { code, description, link, active } = data;

    if (!code || !description || !link) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      );
    }

    const promoCode = await prisma.promoCode.create({
      data: {
        code,
        description,
        link,
        active: active ?? true
      }
    });

    return NextResponse.json(promoCode, { status: 201 });
  } catch (error) {
    console.error("Promo kodu eklenirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Promo kodu eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, code, description, link, active } = data;

    if (!id || !code || !description || !link) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      );
    }

    const promoCode = await prisma.promoCode.update({
      where: { id },
      data: {
        code,
        description,
        link,
        active: active ?? true
      }
    });

    return NextResponse.json(promoCode);
  } catch (error) {
    console.error("Promo kodu güncellenirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Promo kodu güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "ID parametresi gerekli" },
        { status: 400 }
      );
    }

    await prisma.promoCode.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Promo kodu başarıyla silindi" });
  } catch (error) {
    console.error("Promo kodu silinirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Promo kodu silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 