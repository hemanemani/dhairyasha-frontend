"use client"

import React, { useState } from "react"
import { FileText, User } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"


export function MenuItems() {

  const pathname = usePathname() ?? "/";
  
  const [searchQuery, setSearchQuery] = useState("");



  const renderMenuHeader = () =>{
    return(
      <h2 className="mb-2 px-2 text-[0.8rem] font-inter-medium text-[#8e8081]">Menu</h2>
    )
  }


  const menuItems = [
   { label: "Profile", 
      icon: <User className="mr-2 h-4 w-4" />,
      href: "/admin/profile/create",
   },
   { label: "Messages", 
      icon: <FileText className="mr-2 h-4 w-4" />,
      href: "/admin/messages",
   },
  ];

  


  return (
    <>
      {/* Search Input */}
      <div className={`relative mt-10 mb-4 transition-opacity duration-300 `}>
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search"
          className="pl-8 bg-white dark:bg-[#2C2D2F] border-none font-inter-light"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Menu Header (e.g. "Menu", "Manage", etc.) */}
      <div className={`transition-opacity duration-300`}>
        {renderMenuHeader()}
      </div>


      {/* Sidebar Menu */}
      <nav className="space-y-2">
        <SidebarMenu className="text-[#817f81] text-[0.8rem] gap-3">
          {menuItems.map((item, index) =>
            
              // Non-Collapsible Menu Item
              <SidebarMenuItem key={index}>
                <Link href={item.href!}>
                  <SidebarMenuButton
                    className={`cursor-pointer ${
                      pathname === item.href ? "text-black bg-[#f3f4f6] dark:text-[#fff] dark:bg-[#2C2D2F] dark:hover:bg-[#2C2D2F] font-inter-semibold" : "font-normal text-[#817f81] dark:hover:bg-[#2C2D2F]"
                    }`}
                  >
                    {item.icon} {item.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            
          )}
        </SidebarMenu>
      </nav>


    
    </>
    
  )
}

