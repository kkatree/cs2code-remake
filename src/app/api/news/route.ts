import { NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

const NEWS_FILE_PATH = path.join(process.cwd(), "data", "news.json");

// Haberleri dosyadan oku
async function readNews() {
  try {
    const data = await readFile(NEWS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Haberleri dosyaya kaydet
async function writeNews(news: any[]) {
  const dir = path.dirname(NEWS_FILE_PATH);
  await mkdir(dir, { recursive: true });
  await writeFile(NEWS_FILE_PATH, JSON.stringify(news, null, 2));
}

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const news = await readNews();
    return NextResponse.json(news);
  } catch (error) {
    console.error("Haberler getirilirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Haberler getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const coverImage = formData.get("coverImage") as File;
    const published = formData.get("published") === "on";

    if (!title || !slug || !description || !content || !coverImage) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      );
    }

    // Görsel yükleme işlemi
    const bytes = await coverImage.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Uploads klasörünü oluştur
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Benzersiz dosya adı oluştur
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${coverImage.name}`;
    const filepath = path.join(uploadsDir, filename);

    // Dosyayı kaydet
    await writeFile(filepath, buffer);

    // Yeni haberi oluştur
    const newNews = {
      id: Date.now().toString(),
      title,
      slug,
      description,
      content,
      coverImage: `/uploads/${filename}`,
      published,
      createdAt: new Date().toISOString(),
      views: 0,
    };

    // Haberi listeye ekle ve kaydet
    const news = await readNews();
    news.push(newNews);
    await writeNews(news);

    return NextResponse.json(newNews);
  } catch (error) {
    console.error("Haber eklenirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Haber eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Haber ID'si gerekli" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const coverImage = formData.get("coverImage") as File;
    const published = formData.get("published") === "on";
    const views = formData.get("views") ? parseInt(formData.get("views") as string) : undefined;

    // Haberleri oku
    const news = await readNews();
    const newsIndex = news.findIndex((item) => item.id === id);

    if (newsIndex === -1) {
      return NextResponse.json(
        { error: "Haber bulunamadı" },
        { status: 404 }
      );
    }

    // Görsel yükleme işlemi (eğer yeni görsel varsa)
    let coverImagePath = news[newsIndex].coverImage;
    if (coverImage) {
      const bytes = await coverImage.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Uploads klasörünü oluştur
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      await mkdir(uploadsDir, { recursive: true });

      // Benzersiz dosya adı oluştur
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${uniqueSuffix}-${coverImage.name}`;
      const filepath = path.join(uploadsDir, filename);

      // Dosyayı kaydet
      await writeFile(filepath, buffer);
      coverImagePath = `/uploads/${filename}`;
    }

    // Haberi güncelle
    news[newsIndex] = {
      ...news[newsIndex],
      title: title || news[newsIndex].title,
      slug: slug || news[newsIndex].slug,
      description: description || news[newsIndex].description,
      content: content || news[newsIndex].content,
      coverImage: coverImagePath,
      published: published !== undefined ? published : news[newsIndex].published,
      views: views !== undefined ? views : news[newsIndex].views,
    };

    // Haberleri kaydet
    await writeNews(news);

    return NextResponse.json(news[newsIndex]);
  } catch (error) {
    console.error("Haber güncellenirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Haber güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Haber ID'si gerekli" },
        { status: 400 }
      );
    }

    // Haberleri oku
    const news = await readNews();
    const newsIndex = news.findIndex((item) => item.id === id);

    if (newsIndex === -1) {
      return NextResponse.json(
        { error: "Haber bulunamadı" },
        { status: 404 }
      );
    }

    // Haberi sil ve kaydet
    const updatedNews = news.filter((item) => item.id !== id);
    await writeNews(updatedNews);

    return NextResponse.json({ message: "Haber başarıyla silindi" });
  } catch (error) {
    console.error("Haber silinirken hata oluştu:", error);
    return NextResponse.json(
      { error: "Haber silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 