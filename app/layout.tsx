import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LPFácil2 - Crie Landing Pages que Convertem | Plataforma SaaS',
  description: 'Transforme visitantes em clientes com landing pages profissionais criadas em minutos. Aumente suas conversões com nossa plataforma intuitiva e poderosa.',
  keywords: 'landing page, conversão, marketing digital, SaaS, templates, A/B testing',
  authors: [{ name: 'LPFácil2 Team' }],
  openGraph: {
    title: 'LPFácil2 - Crie Landing Pages que Convertem',
    description: 'Transforme visitantes em clientes com landing pages profissionais criadas em minutos.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LPFácil2 - Crie Landing Pages que Convertem',
    description: 'Transforme visitantes em clientes com landing pages profissionais criadas em minutos.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
