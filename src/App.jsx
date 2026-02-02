import { Element } from "react-scroll"
import Navbar from "./Component/Navbar.jsx"
import HeroSection from "./Pages/Hero"
import AboutSection from "./Pages/About"
import ProjectSection from "./Pages/Project.jsx"

function App() {

  return (
    <>
      <Navbar />
      <Element name="home">
        <HeroSection />
      </Element>
      <Element name="about">
        <AboutSection/>
      </Element>
      <Element name="project">
        <ProjectSection/>
      </Element>
      <Element name="experience">
        <HeroSection />
      </Element>
      <Element name="stack">
        <HeroSection />
      </Element>
      <Element name="contact">
        <HeroSection />
      </Element>
    </>
  )
}

export default App
