"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Statement {
  id: number
  text: string
  context: string
  date: string
}

const statements: Statement[] = [
  {
    id: 1,
    text: "The future of e-commerce lies not just in technology, but in understanding the human connection behind every transaction.",
    context: "TechCrunch Interview",
    date: "December 2023",
  },
  {
    id: 2,
    text: "We're not just building a marketplace; we're creating an ecosystem where entrepreneurs can thrive and communities can flourish.",
    context: "Forbes Leadership Summit",
    date: "November 2023",
  },
  {
    id: 3,
    text: "Success in digital commerce isn't measured by transactions alone, but by the lasting relationships we build with our sellers and buyers.",
    context: "E-Commerce World Conference",
    date: "October 2023",
  },
  {
    id: 4,
    text: "Innovation without inclusion is just sophisticated exclusion. Our platform must serve everyone, everywhere.",
    context: "Diversity in Tech Panel",
    date: "September 2023",
  },
  {
    id: 5,
    text: "The most powerful algorithm is empathy. Understanding our users' needs drives every decision we make at MarketPlace.",
    context: "Stanford Business School Lecture",
    date: "August 2023",
  },
  {
    id: 6,
    text: "Sustainability isn't a feature we add later—it's the foundation upon which we build our entire business model.",
    context: "Green Business Initiative",
    date: "July 2023",
  },
]

export function StatementsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextStatement = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % statements.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const prevStatement = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + statements.length) % statements.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const goToStatement = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 300)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prevStatement}
          disabled={isAnimating}
          className="h-10 w-10 rounded-full bg-transparent"
          aria-label="Previous statement"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 mx-8">
          <div className="relative min-h-[200px] flex items-center justify-center">
            <div className={`transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
              <div className="text-center space-y-4">
                <Quote className="h-8 w-8 mx-auto text-muted-foreground" />
                <blockquote className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl">
                  &quot;{statements[currentIndex].text}&quot;
                </blockquote>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{statements[currentIndex].context}</p>
                  <p className="text-xs text-muted-foreground">{statements[currentIndex].date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextStatement}
          disabled={isAnimating}
          className="h-10 w-10 rounded-full bg-transparent"
          aria-label="Next statement"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2">
        {statements.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStatement(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to statement ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
