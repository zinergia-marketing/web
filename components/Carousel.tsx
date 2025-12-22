'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CarouselProps {
  children: React.ReactNode[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
  className?: string
}

export default function Carousel({
  children,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  className = '',
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalItems = children.length

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    // Reset auto-play after manual navigation
    if (autoPlay && totalItems > 1 && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1))
      }, autoPlayInterval)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1))
  }

  // Auto-play
  useEffect(() => {
    if (autoPlay && totalItems > 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1))
      }, autoPlayInterval)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [autoPlay, autoPlayInterval, totalItems])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    // Pause auto-play on touch
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setTouchStart(0)
      setTouchEnd(0)
      // Restart auto-play
      if (autoPlay && totalItems > 1) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1))
        }, autoPlayInterval)
      }
      return
    }

    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      // Swipe left - next
      nextSlide()
    } else if (distance < -minSwipeDistance) {
      // Swipe right - previous
      prevSlide()
    }

    // Reset and restart auto-play after a delay
    setTouchStart(0)
    setTouchEnd(0)
    if (autoPlay && totalItems > 1) {
      setTimeout(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1))
        }, autoPlayInterval)
      }, 1000) // Restart after 1 second
    }
  }

  // Pause auto-play on hover/touch
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleMouseLeave = () => {
    if (autoPlay && totalItems > 1) {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, autoPlayInterval)
    }
  }

  if (totalItems === 0) return null

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Container */}
      <div
        className="w-full pt-2 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: `-${currentIndex * 100}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.6,
            }}
            style={{
              display: 'flex',
            }}
          >
            {children.map((child, index) => (
              <div
                key={index}
                className="min-w-full flex-shrink-0 w-full"
                style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
              >
                {child}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Indicators */}
      {showIndicators && totalItems > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-primary-purple'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

