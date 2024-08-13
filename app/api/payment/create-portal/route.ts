import { db } from '@/db';
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  // Your logic to handle the subscription goes here
  // For example, you could update the user's subscription status in your database
  try {
    // Update the user's subscription status in your database

    // await db.query.subscription.update({ where: { userId } }).set({ status: true });
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/payments`;
    console.log("URL ", url);
    return new Response(JSON.stringify({ url }), { status: 200 });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return new Response(JSON.stringify({ error: "Failed to modify subscription" }), { status: 500 });
  }

}
