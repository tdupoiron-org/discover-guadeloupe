import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun weight="fill" className="w-5 h-5" />
      ) : (
        <Moon weight="fill" className="w-5 h-5" />
      )}
    </button>
  )
}
