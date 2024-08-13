import FeatureCard from "@/components/feature-card"

const features = [
  {
    title: "Seamless integration",
    description: "Easily integrate with your existing tools and services.",
  },
  {
    title: "Analytics",
    description: "Track and analyze feedback to make informed decisions.",
  },
  {
    title: "Customizable",
    description: "Customize Voix to fit your needs and preferences.",
  },
  {
    title: "Scalable",
    description: "Voix is designed to handle a large number of users and projects.",
  },
  {
    title: "Fast Support",
    description: "Get help when you need it with our dedicated support team.",
  },
  {
    title: "Secure",
    description: "Your data is safe and secure with Voix",
  }
]

const FeatureSection = () => {
  return (
    <section className="container mx-auto max-w-screen-xl px-4 my-24">
      <h2 className="mb-6 text-2xl font-bold text-center">Features</h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map(feature => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection