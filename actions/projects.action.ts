"use server"

import { db } from "@/db";
import { feedbacks, projects, subscription } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const createProject = async (formData: FormData) => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User is not authenticated.");
    }

    const name = formData.get('name')?.toString().trim();
    const url = formData.get('url')?.toString().trim();
    const description = formData.get('description')?.toString().trim() || null;

    if (!name || !url) {
      throw new Error("Name and URL are required fields.");
    }

    const project = {
      name,
      description,
      url,
      userId,
    };

    const [ newProjectId ] = await db.insert(projects).values(project).$returningId();

    return { newProjectId, redirectTo: `/projects/${newProjectId.id}/instructions` };
  } catch (error: any) {
    console.log("Error creating project:", error.message || error);
    throw new Error(error.message || "An error occurred while creating the project.");
  }
}

export const getUserProjects = async (userId: string) => {
  try {
    const allProjects = await db.select().from(projects).where(eq(projects.userId, userId));
    return allProjects;
  } catch (error: any) {
    console.log("Error fetching user projects:", error.message || error);
    throw new Error(error.message || "An error occurred while fetching the user's projects.");
  }
}

export const getProject = async (projectId: string) => {
  try {
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, parseInt(projectId)),
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const projectFeedbacks = await db.query.feedbacks.findMany({
      where: eq(feedbacks.projectId, parseInt(projectId)),
    });

    return { ...project, projectFeedbacks };
  } catch (error: any) {
    console.log("Error fetching single project:", error.message || error);
    throw new Error(error.message || "An error occurred while fetching the single project.");
  }
}

export const getUserSubscription = async (userId: string) => {
  try {
    const userSubscription = await db.query.subscription.findFirst({ where: eq(subscription.userId, userId) })
    return userSubscription;
  } catch (error: any) {
    console.log("Error fetching user subscription:", error.message || error);
    throw new Error(error.message || "An error occurred while fetching the user's subscription.");
  }
}
