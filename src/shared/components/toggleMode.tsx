"use client"
import { Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

export function ModeToggle() {
    const [isDark, setIsDark] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check initial theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const initialIsDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark
        setIsDark(initialIsDark)

        if (initialIsDark) {
            document.documentElement.classList.add('dark')
        }
    }, [])

    const handleToggle = () => {
        const newIsDark = !isDark
        setIsDark(newIsDark)

        // Update DOM and localStorage
        if (newIsDark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    if (!mounted) return (
        <div className="h-12 w-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    )

    return (
        <button
            onClick={handleToggle}
            aria-label="Toggle theme"
            className="relative h-12 w-24 rounded-full px-1 flex items-center flex-row-reverse transition-all duration-700 ease-out bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden"
        >
            {/* Animated background glow */}
            <div
                className={`absolute inset-0 rounded-full transition-opacity duration-700 ${isDark ? 'opacity-0' : 'opacity-100'}`}
                style={{
                    background: 'radial-gradient(circle at 30% 50%, rgba(255, 220, 100, 0.4) 0%, transparent 60%)'
                }}
            />

            {/* Stars for dark mode */}
            <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
                <span className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                <span className="absolute top-4 left-8 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                <span className="absolute bottom-3 left-6 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>

            {/* Static background icons */}
            <div className="absolute inset-0 flex justify-between items-center flex-row-reverse px-2.5 pointer-events-none">
                <Sun
                    className={`h-5 w-5 transition-all duration-500 ease-out ${isDark
                            ? "opacity-60 text-amber-300 scale-100"
                            : "opacity-0 scale-50 -rotate-90"
                        }`}
                />
                <Moon
                    className={`h-5 w-5 transition-all duration-500 ease-out ${isDark
                            ? "opacity-0 scale-50 rotate-90"
                            : "opacity-60 text-slate-600 scale-100"
                        }`}
                />
            </div>

            {/* Moving thumb with spring animation */}
            <span
                className={`absolute h-10 w-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-all duration-500 ${isDark
                        ? "translate-x-full rotate-[360deg]"
                        : "translate-x-0 rotate-0"
                    }`}
                style={{
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
            >
                {/* Sun inside thumb */}
                <Sun
                    className={`absolute h-6 w-6 text-amber-500 transition-all duration-500 ${isDark
                            ? "opacity-0 scale-0 rotate-180"
                            : "opacity-100 scale-100 rotate-0"
                        }`}
                    style={{
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                />

                {/* Moon inside thumb */}
                <Moon
                    className={`absolute h-6 w-6 text-slate-200 transition-all duration-500 ${isDark
                            ? "opacity-100 scale-100 rotate-0"
                            : "opacity-0 scale-0 -rotate-180"
                        }`}
                    style={{
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                />
            </span>
        </button>
    )
}

export default ModeToggle