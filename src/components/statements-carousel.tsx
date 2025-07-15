"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { API_BASE } from "@/constants/api"

interface Statement {
  id: number;
  text: string;
  date: string;
}

interface StatementRow {
  id: number;
  title: string;
  date: string;
}

export function StatementsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const [statements, setStatements] = useState<Statement[]>([]);

  useEffect(() => {
  
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = await res.json();
        const parsedTestimonials =
        typeof data.statement_testimonial === "string"
          ? JSON.parse(data.statement_testimonial)
          : data.statement_testimonial;

      // Map backend data to Statement[]
      const formattedStatements: Statement[] = (parsedTestimonials as StatementRow[]).map(
        (item, index) => ({
          id: index + 1,
          text: item.title || '',
          date: item.date || ''
        })
      );

      setStatements(formattedStatements);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSettings();
  },[]);

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
        {statements.length > 0 && statements[currentIndex] ? (
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
                      &quot;{statements[currentIndex].text}&quot;
                    </blockquote>
                    <div className="space-y-1">
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
            No statements available.
          </div>
        )}
    </div>
  )
}
