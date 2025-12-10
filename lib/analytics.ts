// Google Analytics 4 helper functions

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date | object,
      config?: object
    ) => void
    dataLayer: any[]
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: {
    event_category?: string
    event_label?: string
    value?: number
    [key: string]: any
  }
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    })
  }
}

export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', {
    event_category: 'Conversion',
    event_label: conversionType,
    value,
  })
}

