import { Element } from "react-scroll"
import Navbar from "./Component/Navbar.jsx"
import HeroSection from "./Pages/Hero"
import AboutSection from "./Pages/About"
import ProjectSection from "./Pages/Project.jsx"
import ExperienceSection from "./Pages/ExperienceSection.jsx"
import SkillSection from "./Pages/Skill.jsx"
import CredentialsSection from "./Pages/Credential.jsx"
import ContactSection from "./Pages/contact.jsx"
import Footer from "./Component/Footer.jsx"

function App() {

  return (
    <>
      <Navbar />
      <Element name="home">
        <HeroSection />
      </Element>
      <Element name="about">
        <AboutSection />
      </Element>
      <Element name="project">
        <ProjectSection />
      </Element>
      <Element name="experience">
        <ExperienceSection />
      </Element>
      <Element name="stack">
        <SkillSection />
      </Element>
      <Element name="credential">
        <CredentialsSection />
      </Element>
      <Element name="contact">
        <ContactSection/>
      </Element>
      <Footer/>
    </>
  )
}

export default App
