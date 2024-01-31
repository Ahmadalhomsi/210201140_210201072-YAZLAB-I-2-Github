import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(req: Request) {
  try {

    const { userId, name, surname, dob, gender, email, pnumber, isEnabled } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized (Unlogged user)", { status: 401 });
    }

    // Check if the record exists
    const existingRecord = await db.kullanci.findFirst({
      where: {
        userId,
      },
    });

    if (existingRecord) {
      // If the record exists, update it
      const updatedkullanci = await db.kullanci.update({
        where: {
          userId,
        },
        data: {
          name,
          surname,
          dob,
          gender,
          email,
          pnumber,
          isEnabled
        },
      });

      return NextResponse.json(updatedkullanci);
    } else {
      // If the record doesn't exist, create a new one
      const newkullanci = await db.kullanci.create({
        data: {
          userId,
          name,
          surname,
          dob,
          gender,
          email,
          pnumber,
          isEnabled
        },
      });

      return NextResponse.json(newkullanci);
    }
  } catch (error) {
    console.log("[kullanci]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
