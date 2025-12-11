'use client'

export default function SkipToContent() {
  const handleSkip = () => {
    const main = document.querySelector('main')
    if (main) {
      main.focus()
      main.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault()
        handleSkip()
      }}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-purple focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-coral focus:ring-offset-2"
    >
      Saltar al contenido principal
    </a>
  )
}

