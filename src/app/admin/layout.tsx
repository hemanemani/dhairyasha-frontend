"use client"

import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { usePathname, useRouter } from "next/navigation";
import ProfileTopbar from "@/components/admin/admin-topbar";
import { useEffect } from "react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname() ?? "/";
  const router = useRouter();
 
  
  const isLoginPage = pathname === '/'

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
      <>
        <div className={`${!isLoginPage ? 'min-h-screen bg-cover bg-center bg-no-repeat flex' : ''}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            { !isLoginPage && <ProfileTopbar /> }
              { !isLoginPage && <AdminSidebar /> }
              <main className={`flex-1 relative ${isLoginPage ? 'p-0' : 'mt-8 p-3'}`}>
                <div className= 'w-[100%] mt-12 pl-3 block ml-auto'>
                  {children}
                </div>
              </main>
          </ThemeProvider>
        </div>
      </>

  );
}
