import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const catergories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(catergories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong, try again!" }),
      { status: 500 },
    );
  }
};
