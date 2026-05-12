"use client";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@/shared/components/ui/carousel";
import { ReactNode } from "react";

export default function CarouselAutoplay({ children }: { children: ReactNode }) {
    const autoplay = Autoplay({ delay: 3000, stopOnInteraction: true });

    return (
        <Carousel className="relative w-full hidden flex-col  gap-4 rtl:[direction:ltr] mt-16 md:flex"
            plugins={[autoplay]} opts={{ align: "start", loop: true }}>
            {children}
        </Carousel>
    );
}


