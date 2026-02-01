import { Element } from "react-scroll"
import Navbar from "./Component/navbar"
import HeroSection from "./Pages/Hero"
import AboutSection from "./Pages/About"

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
        <HeroSection />
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
