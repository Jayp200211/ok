'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import './Experience.css'; 
import styles from './Cards.module.css'; 
export const projects = [
  {
    title: "Exquitech-Frontend developer intern",
    description: [
      "Gained a solid foundation in Angular, including components, services, directives, routing, and forms.",
      "Developed hands-on skills with Angular CLI, data binding, dependency injection, and state management.",
      "Designed and implemented a dynamic recipe management application using Angular.",
      "Created reusable components, managed application state, and integrated API services for fetching and displaying recipe data.",
      "Worked on responsive design to ensure compatibility across different devices and screen sizes."
    ],
    src: "exquitech.jpg",
    color: "white",
    textColor: "black"
  },
  {
    title: "InMobiles-Frontend developer intern",
    description: [
      "Contributed to the development of an Employee Management and Attendance System using ASP.NET and C#.",
      "Utilized jQuery and AJAX to handle API calls, ensuring smooth data retrieval and user interaction within an MVC pattern.",
      "Designed and implemented responsive UI components, optimizing the user interface for various devices.",
      "Collaborated with the backend team to integrate RESTful APIs, facilitating efficient data exchange and enhancing overall functionality.",
      "Participated in the testing and debugging process, improving system performance and user experience."
    ], 
    src: "inmobiles.png",
    color: "black",
    textColor: "whitesmoke"  
  }
];

const Card = ({i, title, description, src, url, color, textColor, progress, range, targetScale}) => {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
 
  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div 
        style={{ backgroundColor: color, scale, top:`calc(-5vh + ${i * 25}px)`}} 
        className={styles.card}
      >
        <h2 style={{ color: textColor }}>{title}</h2>  {/* Apply textColor to title */}
        <div className={styles.body}>
          <div className={styles.description} style={{ color: textColor }}> {/* Apply textColor to description */}
            <ul>
              {description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.imageContainer}>
            <motion.div
              className={styles.inner}
              style={{ scale: imageScale }}
            >
              <img
                fill
                src={`/ImagesExp/${src}`}
                alt="image" 
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="overflow">
    <main className="overflow-hidden">
      < div ref={container} className="slide-wrapper">
        <Slide direction={'left'} left={"-40%"} progress={scrollYProgress} />
        <Slide direction={'right'} left={"-25%"} progress={scrollYProgress} />
        <Slide direction={'left'} left={"-30%"} progress={scrollYProgress} />
      </div>
      </main>
      <main ref={container} className={styles.main}>
      {
        projects.map( (project, i) => {
          const targetScale = 1 - ( (projects.length - i) * 0.05);
          return <Card key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale}/>
        })
      }
      </main>
    </div>
  );
}

// Slide Component
const Slide = (props) => {
  const direction = props.direction === 'left' ? -1 : 1;
  const translateX = useTransform(props.progress, [0, 1], [150 * direction, -150 * direction]);

  return (
    <motion.div style={{ x: translateX, left: props.left }} className="slide-container">
      <Phrase />
      <Phrase />
      <Phrase />
    </motion.div>
  );
}

// Phrase Component
const Phrase = () => {
  return (
    <div className='phrase-container'>
      <p className='phrase-text'>Experience</p>
    </div>
  );
}
