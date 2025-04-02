import { ReactNode } from "react";

export default function NewsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full z-10">
      <div className="rounded-full px-8 py-2 bg-gradient-to-tr from-purple-600/20 to-purple-500/20 mb-8 inline-block">
        <h1 className="text-2xl font-bold text-white">CS2 Promo And Skin News</h1>
      </div>
      {children}
    </main>
  );
}
