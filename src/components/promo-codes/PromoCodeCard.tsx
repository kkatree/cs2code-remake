"use client"

import Link from "next/link";
import Image from "next/image";

interface PromoCodeCardProps {
  code: string;
  description: string;
  link: string;
}

export default function PromoCodeCard({ code, description, link }: PromoCodeCardProps) {
  return (
    <div className="flex-col card p-8 min-w-full flex items-center justify-center">
      <div className="flex items-center mb-4">
        <Image
          src="/images/skinclub.png"
          alt="SkinClub Logo"
          width={150}
          height={60}
        />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center mt-4 px-4">
        <p className="text-2xl font-bold text-white">{code}</p>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="use-code-btn"
        >
          <span className="btn-highlight"></span>
          <span className="relative">USE CODE</span>
        </Link>
        <p className="text-xs mt-2 text-white/80 text-center">{description}</p>
      </div>
    </div>
  );
}
