import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import AuthContext from '@/context/AuthContext';
import getCurrentUser from './actions/getCurrentUser';
import { User } from '@prisma/client';
import { EdgeStoreProvider } from '../lib/edgestore';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Xplore',
  description: 'Travel Blog',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <AuthContext>
        <body className={`${inter.className} overflow-x-hidden bg-light`}>
          <EdgeStoreProvider>
            <Navbar user={user as User} />
            {children}
            <Footer />
          </EdgeStoreProvider>
        </body>
      </AuthContext>
    </html>
  );
}
