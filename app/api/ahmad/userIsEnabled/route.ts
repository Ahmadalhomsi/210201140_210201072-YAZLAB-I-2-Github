
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request, res: Response) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized (Unlogged user)", { status: 401 });
    }

    // Retrieve the record based on userId
    const user = await db.kullanci.findFirst({
      where: {
        userId,
      },
    });

    if (!user) {
      return new NextResponse("Record not found", { status: 404 });
    }


    // Include user details in the response
    return NextResponse.json({ user });
  } catch (error) {
    console.log("[user]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
