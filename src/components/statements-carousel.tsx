"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import axiosInstance from "@/lib/axios"
import { SkeletonCard } from "./SkeletonCart"


export function StatementsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [statements, setStatements] = useState<{ id: 0, title: string; date: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputLoading, setIsInputLoading] = useState(true);

  useEffect(() => {
  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get("/home");
      if (response && response.data) {
        setStatements(response.data.statement_testimonial);
      } else {
        console.error("Failed to fetch home data", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch home data", error);
    } finally {
      setIsLoading(false);
      setIsInputLoading(false);

    }
  };

  fetchSettings();
}, []);

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
        {statements[currentIndex] ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevStatement}
              disabled={isAnimating}
              className="h-10 w-10 rounded-full bg-transparent cursor-pointer"
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
                      &quot;{isInputLoading ? <SkeletonCard height="h-[36px]" /> : statements[currentIndex].title}&quot;
                    </blockquote>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{isInputLoading ? <SkeletonCard height="h-[36px]" /> : statements[currentIndex].date}</p>
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
              className="h-10 w-10 rounded-full bg-transparent cursor-pointer"
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
                className={`w-2 h-2 cursor-pointer rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to statement ${index + 1}`}
              />
            ))}
          </div>
        </>
          ) : (
          <div className="text-center py-8 text-muted-foreground">
            {isLoading && <SkeletonCard height="h-[64px]" />}
          </div>
        )}
    </div>
  )
}
