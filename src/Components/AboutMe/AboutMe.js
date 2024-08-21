'use client';

import styles from './AboutMe.module.css';
import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const phrase = "Jean-Pierre Nakhoul, a passionate Frontend Developer. With hands-on experience in web development, I thrive on building robust, scalable, and user-friendly applications. I hold a Bachelor of Science in Computer Science from USEK. My academic journey equipped me with a strong foundation in software development, network systems, and problem-solving skills. I further honed my technical skills through an internship at Exquitech and InMobiles. I am always eager to learn and grow, and I enjoy taking on new challenges that push the boundaries of my knowledge and skills. Whether it's developing a new feature, optimizing performance, or debugging complex issues, I am dedicated to providing efficient and effective solutions.";

const AboutMe = () => {
  const description = useRef(null);
  const refs = useRef([]);
  const container = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    createAnimation();
  }, []);

  const createAnimation = () => {
    gsap.to(refs.current, {
      scrollTrigger: {
        trigger: container.current,
        scrub: true,
        start: 'top bottom',
        end: 'bottom top',
      },
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
    });
  };

  const splitWords = (phrase) => {
    return phrase.split(" ").map((word, i) => {
      const letters = splitLetters(word);
      return <p key={word + "_" + i}>{letters}</p>;
    });
  };

  const splitLetters = (word) => {
    return word.split("").map((letter, i) => {
      return <span key={letter + "_" + i} ref={el => { if (el && !refs.current.includes(el)) refs.current.push(el); }}>{letter}</span>;
    });
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(description.current,
      {
        scale: 0.4,
        y: 100,
        x: 0,
      },
      {
        scale: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: description.current,
          scrub: 0.5,
          start: 'top bottom',
          end: 'bottom top',
        },
      }
    );
  }, []);

  return (
    <div className={styles.div1}>
      <div ref={description} style={{ position: 'sticky', top: '0' ,flex:'1'}}>
        <p className={styles.title}>About Me</p>
      </div>
      <div ref={container} className={styles.rightDiv}>
        {splitWords(phrase)}
      </div>
    </div>
  );
};

export default AboutMe;
