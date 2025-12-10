'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  endDate: Date
  className?: string
}

export default function CountdownTimer({ endDate, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const end = endDate.getTime()
      const difference = end - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return { days, hours, minutes, seconds }
    }

    // Calcular inmediatamente
    setTimeLeft(calculateTimeLeft())

    // Actualizar cada segundo
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  if (isExpired) {
    return null
  }

  const isWhiteTheme = className.includes('text-white')
  
  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}>
      <div className="flex flex-col items-center">
        <span className={`text-2xl sm:text-3xl lg:text-2xl font-bold ${isWhiteTheme ? 'text-white' : 'text-primary-purple'}`}>
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        <span className={`text-xs sm:text-sm lg:text-xs ${isWhiteTheme ? 'text-white/90' : 'text-gray-600'}`}>días</span>
      </div>
      <span className={`text-xl sm:text-2xl lg:text-xl font-bold ${isWhiteTheme ? 'text-white' : 'text-primary-purple'}`}>:</span>
      <div className="flex flex-col items-center">
        <span className={`text-2xl sm:text-3xl lg:text-2xl font-bold ${isWhiteTheme ? 'text-white' : 'text-primary-purple'}`}>
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className={`text-xs sm:text-sm lg:text-xs ${isWhiteTheme ? 'text-white/90' : 'text-gray-600'}`}>horas</span>
      </div>
      <span className={`text-xl sm:text-2xl lg:text-xl font-bold ${isWhiteTheme ? 'text-white' : 'text-primary-purple'}`}>:</span>
      <div className="flex flex-col items-center">
        <span className={`text-2xl sm:text-3xl lg:text-2xl font-bold ${isWhiteTheme ? 'text-white' : 'text-primary-purple'}`}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className={`text-xs sm:text-sm lg:text-xs ${isWhiteTheme ? 'text-white/90' : 'text-gray-600'}`}>min</span>
      </div>
      <span className={`text-xl sm:text-2xl lg:text-xl font-bold ${isWhiteTheme ? 'text-white' : 'text-primary-purple'}`}>:</span>
      <div className="flex flex-col items-center">
        <span className={`text-2xl sm:text-3xl lg:text-2xl font-bold ${isWhiteTheme ? 'text-white' : 'text-primary-purple'}`}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className={`text-xs sm:text-sm lg:text-xs ${isWhiteTheme ? 'text-white/90' : 'text-gray-600'}`}>seg</span>
      </div>
    </div>
  )
}

