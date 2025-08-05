"use client"


import React, { JSX,useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, UserCircle,LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { DarkMode } from "../dark-mode";
import { useRouter } from "next/navigation";



const ProfileTopbar = () => {
  const pathname = usePathname() ?? "/";

  const router =  useRouter();
  
  const currentPage = useMemo(() => {

  const pageTitles: Record<string, JSX.Element> = {
    "/admin/home" :(
      <span className="text-[#000] dark:text-white text-[22px] font-inter-semibold">Home
      </span>
      
    ),
    "/admin/about" :(
      <span className="text-[#000] dark:text-white text-[22px] font-inter-semibold">About
      </span>
      
    ),
    "/admin/projects" :(
      <span className="text-[#000] dark:text-white text-[22px] font-inter-semibold">Project
      </span>
      
    ),
    "/admin/insights" :(
      <span className="text-[#000] dark:text-white text-[22px] font-inter-semibold">Insights
      </span>
      
    ),
    "/admin/statements" :(
      <span className="text-[#000] dark:text-white text-[22px] font-inter-semibold">Statements
      </span>
      
    ),
    "/admin/contact" :(
      <span className="text-[#000] dark:text-white text-[22px] font-inter-semibold">Contact
      </span>
      
    ),
    "/admin/social" :(
      <span className="text-[#000] dark:text-white text-[22px] font-inter-semibold">Social Media
      </span>
      
    ),
    "/admin/meta" :(
      <span className="text-[#000] dark:text-white text-[22px] font-inter-semibold">Meta
      </span>
      
    ),
    "/admin/messages" :(
      <span className="text-[#000] dark:text-white text-[22px] font-inter-semibold">Messages
      </span>  
    ),
    "/admin/uploads" :(
      <span className="text-[#000] dark:text-white text-[22px] font-inter-semibold">Images
      </span>
      
    ),
  };
  return pageTitles[pathname] || "Dashboard";

}, [pathname]);

const handleLogout = ()=>{
  localStorage.removeItem("adminToken");
  router.push('/login')
}





return (
  <div className="absolute top-5 left-0 w-full transition-all z-50 pr-8 pl-3 flex items-center justify-between" style={{ width: `calc(100% - 260px)`, marginLeft: '260px' }}>
      <Button variant="ghost" size="icon" className="sm:hidden">
        <Menu className="w-6 h-6" />
      </Button>
      <div>{currentPage}</div>
      <div className="flex justify-end items-end gap-2">
        <div className=" dark:bg-[#111] bg-white mr-2 rounded-lg">
          <DarkMode />
        </div>  
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-8 h-8">
                <UserCircle className="cursor-pointer" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-[#111]">
            <DropdownMenuItem className="cursor-pointer dark:hover:bg-[#2C2D2F] dark:active:bg-[#2C2D2F] dark:focus:bg-[#2C2D2F]" onClick={handleLogout}>
              <LogOut className="w-4 h-4 text-black dark:text-white stroke-3" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    
  </div>
);

};

export default ProfileTopbar;
