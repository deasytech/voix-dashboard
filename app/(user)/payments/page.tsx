import { getUserSubscription } from "@/actions/projects.action";
import ManageSubscription from "@/components/manage-subscription";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const subscription = await getUserSubscription(userId);
  console.log("Subscription:", subscription);

  const plan = subscription && subscription.subscribed ? "premium" : "free";

  return (
    <div className="p-4 border rounded-md">
      <h1 className="text-4xl mb-3">Subscription Details</h1>
      <p className="text-lg mb-2">Your current plan is: {plan}</p>
      <ManageSubscription />
    </div>
  )
}

export default Page