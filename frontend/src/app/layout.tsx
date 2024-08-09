import type { Metadata } from "next";
import { Montserrat as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientProvider from "@/components/ClientProvider/ClientProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dhillon fitness",
  description:
    "Dhillon Fitness Admin Dashboard is a robust and intuitive web application designed to streamline the management of gym operations for Dhillon Fitness. Built with Next.js, Hono, and PostgreSQL, this dashboard empowers gym administrators with the tools they need to efficiently manage memberships, track sales, and oversee daily operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
