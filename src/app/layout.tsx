import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.className} bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-200 dark:to-dark-300 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <header className="bg-primary-700 dark:bg-dark-300 text-white py-4">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="text-2xl font-bold">AI Music Generator</h1>
          </div>
        </header>
        <main className="flex-grow container max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-primary-700 dark:bg-dark-300 text-white py-4">
          <div className="max-w-5xl mx-auto px-4 text-center">
            © 2024 AI Music Generator
          </div>
        </footer>
      </body>
    </html>
  );
}