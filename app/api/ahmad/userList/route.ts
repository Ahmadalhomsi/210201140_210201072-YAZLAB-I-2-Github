// Assuming the necessary imports and setup
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized (Unlogged user)", { status: 401 });
    }

    // Check if the user has admin role
    const user = await db.kullanci.findUnique({
      where: {
        userId,
      },
    });

    // Retrieve all users from the database
    const allUsers = await db.kullanci.findMany();

    return NextResponse.json(allUsers);
  } catch (error) {
    console.log("[kullanci]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
