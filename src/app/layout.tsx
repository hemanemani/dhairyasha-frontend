import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next";
import "./globals.css";
import axiosInstance from "@/lib/axios";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let theme = "system"; // default fallback

  
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme={theme}
          enableSystem={false}
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
