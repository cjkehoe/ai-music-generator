import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Home, Headphones } from 'react-feather';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Music Generator",
  description: "Generate amazing music with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-spotify-black text-spotify-white min-h-screen flex`}>
        <aside className="w-60 bg-spotify-black flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-spotify-white mb-8">AI Music Generator</h1>
            <nav>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-center text-spotify-white hover:text-spotify-green">
                    <Home className="mr-4" size={24} />
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-spotify-white hover:text-spotify-green">
                    <Headphones className="mr-4" size={24} />
                    Your Library
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <main className="flex-grow bg-gradient-to-b from-spotify-lightBlack to-spotify-black overflow-y-auto">
          <div className="max-w-5xl mx-auto px-8 py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}