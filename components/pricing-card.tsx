import { PricingPlan } from "@/components/pricing-section"
import { naira } from "@/lib/utils"
import { Check } from "lucide-react"
import Link from "next/link"

const PricingCard = ({ title, price, description, features, isPopular, url }: PricingPlan) => {
  return (
    <div className="border flex flex-col justify-between bg-white/20 rounded-lg h-full p-6 hover:shadow-md text-left relative">
      {
        isPopular && (
          <div className="absolute top-0 right-0 bg-gray-900 rounded-bl-lg rounded-tr-lg text-white px-2 py-1">
            Popular
          </div>
        )
      }
      <div>
        <div className="inline-flex items-end">
          <h1 className="font-extrabold text-3xl">{naira.format(price)}</h1>
        </div>
        <h2 className="font-bold text-xl my-2">{title}</h2>
        <p>{description}</p>
        <div className="flex-grow border-t border-gray-400 opacity-25 my-3" />
        <ul>
          {
            features.map((feature, i) => (
              <li key={i} className="flex items-center text-gray-700 gap-2 my-1">
                <div className="rounded-full flex items-center justify-center bg-gray-900 w-4 h-4 mr-2">
                  <Check className="text-white" width={10} height={10} />
                </div>
                {feature}
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <Link href={url}>
          <button className="w-full bg-gray-900 text-white font-bold py-2 mt-3 rounded-lg">
            Select Plan
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PricingCard