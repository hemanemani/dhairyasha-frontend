"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useScrollToHash } from "@/hooks/use-to-scroll-hash"



export function SiteHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const { scrollToHash } = useScrollToHash()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    // Only handle hash navigation on the home page
    if (isHomePage) {
      e.preventDefault()
      scrollToHash(hash)
      setIsSheetOpen(false)
    }
  }

  const getHref = (hash: string) => {
    return isHomePage ? `#${hash}` : `/#${hash}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="font-inter-bold text-xl">
          Dhairya Shah
        </Link>
        <nav className="ml-auto hidden gap-4 sm:gap-6 md:flex">
          <Link
            href={getHref("about")}
            className="text-sm font-inter-medium hover:underline underline-offset-4"
            onClick={(e) => handleNavClick(e, "about")}
          >
            About
          </Link>
          <Link
            href={getHref("projects")}
            className="text-sm font-inter-medium hover:underline underline-offset-4"
            onClick={(e) => handleNavClick(e, "projects")}
          >
            Projects
          </Link>
          <Link
            href={getHref("interests")}
            className="text-sm font-inter-medium hover:underline underline-offset-4"
            onClick={(e) => handleNavClick(e, "interests")}
          >
            Interests
          </Link>
          <Link
            href={getHref("statements")}
            className="text-sm font-inter-medium hover:underline underline-offset-4"
            onClick={(e) => handleNavClick(e, "statements")}
          >
            Statements
          </Link>
          <Link
            href={getHref("contact")}
            className="text-sm font-inter-medium hover:underline underline-offset-4"
            onClick={(e) => handleNavClick(e, "contact")}
          >
            Contact
          </Link>
        </nav>
        <ThemeToggle />
        <div className="flex md:hidden ml-auto">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-6 ml-2.5">
                <Link
                  href={getHref("about")}
                  className="text-sm font-inter-medium hover:underline underline-offset-4"
                  onClick={(e) => handleNavClick(e, "about")}
                >
                  About
                </Link>
                <Link
                  href={getHref("projects")}
                  className="text-sm font-inter-medium hover:underline underline-offset-4"
                  onClick={(e) => handleNavClick(e, "projects")}
                >
                  Projects
                </Link>
                <Link
                  href={getHref("interests")}
                  className="text-sm font-inter-medium hover:underline underline-offset-4"
                  onClick={(e) => handleNavClick(e, "interests")}
                >
                  Interests
                </Link>
                <Link
                  href={getHref("statements")}
                  className="text-sm font-inter-medium hover:underline underline-offset-4"
                  onClick={(e) => handleNavClick(e, "statements")}
                >
                  Statements
                </Link>
                <Link
                  href={getHref("contact")}
                  className="text-sm font-inter-medium hover:underline underline-offset-4"
                  onClick={(e) => handleNavClick(e, "contact")}
                >
                  Contact
                </Link>
               
                <div className="flex items-center mt-2">
                  <span className="text-sm font-inter-medium mr-2">Theme:</span>
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

