import LandingHero from "@/components/landing-hero"
import PricingSection from "@/components/pricing-section"
import FeatureSection from "./feature-section"

const LandingPage = () => {
  return (
    <div>
      <LandingHero />
      <FeatureSection />
      <PricingSection />
    </div>
  )
}

export default LandingPage