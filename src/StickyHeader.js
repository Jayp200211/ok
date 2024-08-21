'use client'
import Introduction from './Components/Introduction/Introduction'; 
import AboutMe from './Components/AboutMe/AboutMe';

// import Footer from "@/components/Footer2";
import { useEffect } from "react";
import Lenis from 'lenis';

export default function Home() {

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main>
      <Introduction />
      <AboutMe />
    </main>
  );
}