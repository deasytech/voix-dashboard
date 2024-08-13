import PricingCard from "@/components/pricing-card";

export type PricingPlan = {
  title: string;
  price: number;
  description: string;
  isPopular: boolean;
  features: string[];
  url: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    title: "Free",
    price: 0,
    description: "For small team just getting started",
    isPopular: false,
    url: "/dashboard",
    features: [
      "3 projects",
      "Unlimited users",
      "2GB storage",
      "Priority support"
    ],
  },
  {
    title: "Monthly",
    price: 9999,
    description: "For growing team",
    isPopular: true,
    url: "/payments/subscribe?plan=monthly",
    features: [
      "Unlimited projects",
      "Unlimited users",
      "10GB storage",
      "Priority support"
    ],
  },
  {
    title: "Yearly",
    price: 62999,
    description: "Upgrade to save more!",
    isPopular: false,
    url: "/payments/subscribe?plan=yearly",
    features: [
      "Unlimited projects",
      "Unlimited users",
      "50GB storage",
      "24/7 support"
    ],
  }
];

const PricingSection = () => {
  return (
    <div className="text-center">
      <h1 className="uppercase text-3xl">Pricing</h1>
      <p className="font-extrabold text-3xl mb-8 mt-3">Flexible Pricing to Fit Your Needs</p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 items-center max-w-screen-xl">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.title} {...plan} />
        ))}
      </div>
    </div>
  )
}

export default PricingSection