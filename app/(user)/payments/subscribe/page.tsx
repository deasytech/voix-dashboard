import { Button } from "@/components/ui/button";

const Page = ({ searchParams }: { searchParams: { plan: string } }) => {
  const { plan } = searchParams;
  if (!plan) {
    return null;
  }
  console.log(`Subscribing to plan: ${plan}`);
  return (
    <div className="border flex flex-col p-4 rounded-md">
      <h1 className="text-2xl font-bold">Start your subscription now</h1>
      <div className="w-fit">
        <Button className="bg-indigo-700 mt-3">Subscribe</Button>
      </div>
    </div>
  )
}

export default Page