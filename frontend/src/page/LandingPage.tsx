
import FeaturesSection from "../components/landingPage/FeaturesSection"
import HeroSection from "../components/landingPage/HeroSection"
import HowItWorksSection from "../components/landingPage/HowItWorksSection"
import LandingPageFooter from "../components/landingPage/LandingPageFooter"
import LandingPageNavBar from "../components/landingPage/LandingPageNavBar"
import ProblemSolSection from "../components/landingPage/ProblemSolSection"

const LandingPage = () => {

  return (
    <div >
      <LandingPageNavBar/>
      <HeroSection/>
      <ProblemSolSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <LandingPageFooter/>
    </div>
  )
}

export default LandingPage
