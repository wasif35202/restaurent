import prisma from "@/utils/utils";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch all products:", err); 
    return NextResponse.json(
      { message: "Failed to retrieve all products." },
      { status: 500 }
    );
  }
};
