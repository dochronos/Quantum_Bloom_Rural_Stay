// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { UserProvider } from '@/context/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuantumBloom Space',
  description: 'Estancia rural relajante y consciente en armonía con la naturaleza.',
  themeColor: '#5c4a4a',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <UserProvider>
          <Header />
          <main className="min-h-screen px-4">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
