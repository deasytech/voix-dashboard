import { db } from "@/db";
import { feedbacks } from "@/db/schema";
import { NextResponse } from "next/server";

export const POST = async (req: Request): Promise<NextResponse> => {
  try {
    // Handle CORS
    if (req.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,OPTIONS,POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    const body = await req.json();
    const { projectId, message, userName, userEmail, rating } = body;

    const [ newProjectId ] = await db.insert(feedbacks).values([
      { projectId, userName, userEmail, message, rating },
    ]).$returningId();

    return new NextResponse(
      JSON.stringify({
        message: "Success",
        data: newProjectId,
      }),
      {
        status: 201,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error: any) {
    return new NextResponse("Error in posting feedback: " + error.message, {
      status: 500,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};

export const OPTIONS = async () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
