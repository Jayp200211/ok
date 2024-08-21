import styles from './Contact.module.css';
import { useRef } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Magnetic from '../../Shared/Magnetic';
import Rounded from '../../Shared/RoundedButton';
export default function Contact() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["end end", "end end"]
    })
    const x = useTransform(scrollYProgress, [0, 1], [0, 100])
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])

    const handleLinkedInClick = () => {
        window.location.href = 'https://www.linkedin.com/in/jean-pierre-nakhoul-900541253';
    };

    return (
        <motion.div style={{y}} className={styles.contact}>
            <div className={styles.body}  ref={container} >
                <div className={styles.title} >
                    
                    <h2>Contact Info</h2>
                    <motion.div style={{x}}  className={styles.buttonContainer}>
                        <Rounded  backgroundColor={"#334BD3"} className={styles.button}>
                            <p>Get in touch</p>
                        </Rounded>
                    </motion.div>
                  
                </div>
                <div className={styles.nav}>
                        <Rounded>
                            <p>nakhouljp@gmail.com</p>
                        </Rounded>
                        <Rounded>
                            <p>79 187 672</p>
                        </Rounded>
                </div>
                <div className={styles.info}>
                    <div>
                        <span>
                            <p>Lebanon -</p>
                        </span>
                        <span>
                            <p>Jounieh</p>
                        </span>
                    </div>
                    <div>
                        <span>
                        </span>
                        <Magnetic onClick={handleLinkedInClick}>
                            <p>
                                <a onClick={handleLinkedInClick}>
                                Linkedin
                                </a>
                                </p>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}