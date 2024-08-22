import './App.css';
import { useState, useEffect } from 'react';
import Home from './StickyHeader';
import MyProjectsAnimation from './Components/MyProjectsAnimation/MyProjects';
import MyProjects from './Components/MyProjects/MyProjects';
import Experience from './Components/Experience/Experience';
import Contact from './Components/Contact/Contact';
import { AnimatePresence } from 'framer-motion';
import PreLoader from './Components/PreLoader/PreLoader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        const locomotiveScroll = new LocomotiveScroll();

        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default';
          window.scrollTo(0, 0);
        }, 2000);
      }
    )()
  }, []);

  return (
    <div className="App">
      <AnimatePresence mode='wait'>
        {isLoading && <PreLoader />}
      </AnimatePresence>
      {!isLoading && (
        <>
          <Home />
          <MyProjectsAnimation />
          <MyProjects />
          <Experience />
          <Contact />
        </>
      )}
    </div>
  );
}

export default App;
