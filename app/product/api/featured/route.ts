import prisma from "@/utils/utils";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isFeatured: true,
      }
    });

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch featured products:", err); 
    return NextResponse.json(
      { message: "Failed to retrieve featured products." },
      { status: 500 }
    );
  }
};
