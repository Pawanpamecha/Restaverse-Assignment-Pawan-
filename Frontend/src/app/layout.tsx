"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const fonts = `${inter.className}`;

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Google</title>
      </head>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <body className={fonts}>{children}</body>
        </QueryClientProvider>
      </SessionProvider>
    </html>
  );
}
