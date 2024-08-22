'use client'
import styles from './style.module.css'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';
import Rounded from '../../Shared/RoundedButton';
import cv from './CV/resume.pdf';
export default function Introduction() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const description = useRef(null);  // Reference for the description text
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Existing animation for slider
    gsap.to(slider.current, {
      scale: 0.4,  // Zoom out slightly to 90% of the original size
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    });

    // New animation for moving the text down slowly and zooming out as you scroll
    gsap.to(description.current, {
      y: 100,  // Move down by 100px
      scale: 0.4,  // Zoom out slightly to 90% of the original size
      ease: 'none',
      scrollTrigger: {
        trigger: description.current,
        scrub: 0.5,  // Control how smoothly the text moves with the scroll
        start: 'top bottom',  // When the top of the element hits the bottom of the viewport
        end: 'bottom top',  // When the bottom of the element hits the top of the viewport
      },
    });

    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  // Handler function to download the CV
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = cv; // Use the imported CV file
    link.download = 'Jean-Pierre_Nakhoul_CV.pdf'; // The filename that will be used for the downloaded file
     link.click();
  };

  return (
    <div 
      style={{ 
        position: "relative", 
        height: "800px", 
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" 
      }}
    >
       <div>
              <Rounded 
                backgroundColor={"#334BD3"} 
                className={styles.button}
                onClick={handleDownload}
              >
              
                <p>Download CV</p>
              </Rounded>
            </div>
      <div 
        style={{ 
          position: "relative", 
          height: "calc(100vh + 800px)", 
        }}
      >
        <div 
          style={{ 
            height: "800px", 
            position: "sticky", 
            top: "0" 
          }}
        >
          <motion.main 
            variants={slideUp} 
            initial="initial" 
            animate="enter" 
            className={styles.landing}
          >
            <div ref={description} className={styles.sliderContainer}>
              <div ref={slider} className={styles.slider}>
                <p ref={firstText}>Frontend Developer -</p>
                <p ref={secondText}>Frontend Developer -</p>
              </div>
            </div>
            <div ref={description} className={styles.description}>  {/* Ref added here */}
              <p>Jean-Pierre Nakhoul</p>
            </div>
           
          </motion.main>
        </div>
      </div>
    </div>
  );
}
