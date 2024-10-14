import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.scss";

import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Don Nápoli Pizzaria - A melhor pizzaria",
  description: "Don Nápoli Pizzaria, a paixão pela pizza se une à tradição italiana para proporcionar uma experiência gastronômica inesquecível. Inspirada nos sabores autênticos de Nápoles, nossa pizzaria oferece um cardápio repleto de opções que celebram a verdadeira essência da pizza italiana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style:{
              backgroundColor: "#f2f2f2",
              color: "#363636",
              borderColor: "rgba(255,255,255, 0.5)"
            }
          }}
        />
        {children}
      </body>
    </html>
  );
}
