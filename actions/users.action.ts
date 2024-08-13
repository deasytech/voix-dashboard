"use server";

import { db } from "@/db";
import { subscription } from "@/db/schema";
import { eq } from "drizzle-orm";

export const createSubscription = async ({ stripeCustomerId }: { stripeCustomerId: string }) => {
  try {
    await db.update(subscription).set({
      subscribed: true,
    }).where(eq(subscription.stripeCustomerId, stripeCustomerId));
  } catch (error: any) {
    console.log("Error creating subscription:", error.message || error);
    throw new Error(error.message || "An error occurred while creating the subscription.");
  }
}

export const cancelSubscription = async ({ stripeCustomerId }: { stripeCustomerId: string }) => {
  try {
    await db.update(subscription).set({
      subscribed: false,
    }).where(eq(subscription.stripeCustomerId, stripeCustomerId));
  } catch (error: any) {
    console.log("Error canceling subscription:", error.message || error);
    throw new Error(error.message || "An error occurred while canceling the subscription.");
  }
}

export const getSubscription = async (userId: string) => {
  try {
    const userSubscription = await db.query.subscription.findFirst({
      where: eq(subscription.userId, userId),
    });

    return userSubscription?.subscribed;
  } catch (error: any) {
    console.log("Error fetching user subscription:", error.message || error);
    throw new Error(error.message || "An error occurred while fetching the user's subscription.");
  }
}