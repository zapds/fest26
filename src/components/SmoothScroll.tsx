'use client';

import ReactLenis, { LenisRef } from "lenis/react";
import { useEffect, useRef, ReactNode } from "react";
import gsap from 'gsap'

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<LenisRef | null>(null);

    useEffect(() => {
        function update(time: number) {
          lenisRef.current?.lenis?.raf(time * 1000)
        }
      
        gsap.ticker.add(update)
      
        return () => gsap.ticker.remove(update)
      }, [])

    
      return (
        <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
          {children}
        </ReactLenis>
    )
}

