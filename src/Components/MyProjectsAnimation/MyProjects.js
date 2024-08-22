'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './MyProjects.module.css';
import Lenis from '@studio-freight/lenis';
import { useTransform, useScroll, motion } from 'framer-motion';

const images = [
  "1.png",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.jpeg",
  "9.jpeg",
];

export default function MyProjects() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 6]);

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className={styles.main}>
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[6], images[5]]} y={y2} scale={scale} style={{ zIndex: '100' }} />
        <Column images={[images[4], images[7], images[8]]} y={y3} />
      </div>
    </main>
  );
}

const Column = ({ images, y, scale, style }) => {
  return (
    <motion.div 
      className={styles.column}
      style={{ y, ...style }} // Apply the passed style prop here
    >
      {
        images.map((src, i) => {
          // Apply scale to the second image in the second column
          const scaleStyle = i === 1 && scale ? { scale } : {};
          const imageClass = i === 1 ? styles.stickyImage : ''; // Apply sticky class to the 2nd image

          return (
            <motion.div
              key={i}
              className={`${styles.imageContainer} ${imageClass}`} // Apply class conditionally
              style={scaleStyle}
            >
              <img
        fill
                src={`/images/${src}`}
                alt="image"
              />
              <div style={{height: '100vh'}}></div>
            </motion.div>
          );
        })
      }
    </motion.div>
  );
};
