"use client"
import  { useEffect, useState } from 'react'

const ScrollProgress = () => {

        const [scrolled, setScrolled] = useState(false);
        const [scrollProgress, setScrollProgress] = useState(0);

        useEffect(() => {
            const handleScroll = () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                setScrolled(scrollTop > 20);
                const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                setScrollProgress(Math.min(progress, 100));
            };
    
            window.addEventListener("scroll", handleScroll);
            handleScroll();
    
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

    return (
        <div className="h-1 w-full bg-accent">
            <div className="h-full bg-primary transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
        </div>
    )
}

export default ScrollProgress