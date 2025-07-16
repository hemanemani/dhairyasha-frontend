import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next";
import "./globals.css";
import { API_BASE } from "@/constants/api";


export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${API_BASE}/profile`, {
    cache: "no-store",
  });

  const data = await res.json();

  return {
    title: data.meta_title || "Default Title",
    description: data.meta_description || "Default description",
    keywords: data.meta_keywords || "default,keywords",
    openGraph: {
      title: data.meta_title || "Default Title",
      description: data.meta_description || "Default description",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let theme = "system"; // default fallback

  try {
    const res = await fetch(`${API_BASE}/profile`, { cache: "no-store" });
    const data = await res.json();
    theme = data.theme || "system";
  } catch (error) {
    console.error("Error fetching theme:", error);
  }

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
