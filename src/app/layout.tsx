import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import { initStore, seedDatabase } from "@/lib/store";

export const metadata: Metadata = {
  title: "The Maze Match | Premium Matchmaking in Nigeria",
  description: "Connect with refined gentlemen and ladies in Nigeria. The Maze Match hosts exclusive events, charity work, and dating-matching for those seeking meaningful connections.",
};

async function initDatabase() {
  'use server';
  await seedDatabase();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  initDatabase();
  
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}