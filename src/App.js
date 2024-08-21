import './App.css';
import Home from './StickyHeader';
import MyProjectsAnimation from './Components/MyProjectsAnimation/MyProjects';
import MyProjects from './Components/MyProjects/MyProjects';
import Experience from './Components/Experience/Experience';
import Contact from './Components/Contact/Contact';
function App() {
  return (
    <div className="App">
     
      <Home />
      <MyProjectsAnimation />
<MyProjects />
<Experience />
<Contact />
    </div>
  );
}

export default App;
