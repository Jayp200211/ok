'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './MyProjects.module.css';  // Update with correct path for combined styles
// Define the animation variants
const anim = {
  initial: { width: 0 },
  open: { width: "auto", transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
  closed: { width: 0 }
};

// Define the Project component
const Project = ({ project }) => {
  const [isActive, setIsActive] = useState(false);

  const { title1, title2, src } = project;
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg');

  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={styles.project}
    >
      <p>{title1}</p>
      <motion.div
        variants={anim}
        animate={isActive ? "open" : "closed"}
        className={styles.imgContainer}
      >
{isVideo ? (
  <iframe 
    src={`https://www.youtube.com/embed/${src}`} 
    controls 
    autoPlay 
    loop 
    muted 
    className={styles.media}
  />
)
:(
  <img 
  src={`/ProjectVideos/${src}`} 
  alt={title1} 
  className={styles.media} 
/>
)
}
      </motion.div>
      <p>{title2}</p>
    </div>
  );
};

// Define the Home component
export default function Home() {
  const projects = [
    { title1: "Spotify ", title2: "App", src: "spotifyWeb.mp4" },
    { title1: "Recipe", title2: "Website", src: "_nR_3o4OWFw" },
    { title1: "Book", title2: "Store", src: "bookapp.mp4" },
    { title1: "Emp", title2: "Mngmt", src: "attendance.JPG" },
    { title1: "My", title2: "Portfolio", src: "porfolio.mp4" },
    { title1: "X", title2: "O", src: "notavail.jpeg" },
    { title1: "ATM", title2: "Machine", src: "notavail.jpeg" },
    { title1: "Game", title2: "Store", src: "notavail.jpeg" },

  ];

  return (
    <main className={styles.main}>
      <div className={styles.gallery}>
        <p>Featured Work</p>
        {projects.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </div>
    </main>
  );
}
