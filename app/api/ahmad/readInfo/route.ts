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

    // Retrieve the record based on userId
    const kullanci = await db.kullanci.findFirst({
      where: {
        userId,
      },
    });

    if (!kullanci) {
      return new NextResponse("Record not found", { status: 404 });
    }

    return NextResponse.json(kullanci);
  } catch (error) {
    console.log("[kullanci]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
