import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next";
import "./globals.css";
import axiosInstance from "@/lib/axios";


export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await axiosInstance.get("/home");
    const data = res.data;

    return {
      title: data.meta_title || "Dhairya Shah – Founder of Orgenik Bulk",
      description: data.meta_description || "Discover Dhairya Shah, CEO of Orgenik, leading India’s organic revolution through sustainable e-commerce. Explore his expertise, projects, and vision.",
      keywords: data.keywords || "Dhairya Shah, Orgenik, Orgenik Bulk, organic agriculture, e-commerce, ethical sourcing, B2B marketplace, Indian organic products, organic, natural",
    };
  } catch (error) {
    console.error("Error fetching meta data:", error);
    return {
      title: "Profile",
      description: "View your profile information.",
    };
  }
}



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = "system"; // default fallback

  
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
