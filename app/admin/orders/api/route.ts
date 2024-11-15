import prisma from "@/utils/utils";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {
    const orders = await prisma.order.findMany();

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch orders:", err); 
    return NextResponse.json(
      { message: "Failed to retrieve orders." },
      { status: 500 }
    );
  }
};
