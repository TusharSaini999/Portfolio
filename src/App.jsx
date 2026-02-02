import { Element } from "react-scroll"
import Navbar from "./Component/Navbar.jsx"
import HeroSection from "./Pages/Hero"
import AboutSection from "./Pages/About"
import ProjectSection from "./Pages/Project.jsx"
import ExperienceSection from "./Pages/ExperienceSection.jsx"
import SkillSection from "./Pages/Skill.jsx"

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
        <ExperienceSection/>
      </Element>
      <Element name="stack">
        <SkillSection/>
      </Element>
      <Element name="contact">
        <HeroSection />
      </Element>
    </>
  )
}

export default App
