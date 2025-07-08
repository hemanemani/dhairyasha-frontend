"use client"

import { useEffect } from "react"

export function useScrollToHash() {

  const scrollToHash = (hash: string) => {
    // Remove the leading # if it exists
    const targetId = hash.replace(/^#/, "")
    const element = document.getElementById(targetId)

    if (element) {
      // Scroll to the element
      element.scrollIntoView({
        behavior: "smooth",
      })
    }
  }

  // Handle initial hash on page load
  useEffect(() => {
    if (window.location.hash) {
      // Wait a bit for the page to fully render
      setTimeout(() => {
        scrollToHash(window.location.hash)
      }, 100)
    }
  }, [])

  return { scrollToHash }
}

