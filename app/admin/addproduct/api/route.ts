import { productSchema } from "@/types/zodtypes";
import prisma from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body: unknown = await request.json();
  const result = productSchema.safeParse(body);

  // Collect Zod validation errors if any
  let zodErrors: Record<string, string> = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = {
        ...zodErrors,
        [issue.path[0]]: issue.message,
      };
    });
    // If there are validation errors, return them
    return NextResponse.json({ errors: zodErrors });
  }

  try {
    // Use Prisma to create the product in the database, accessing result.data only if success is true
    const createdProduct = await prisma.product.create({
      data: {
        title: result.data.title,
        desc: result.data.desc,
        price: result.data.price,
        img: result.data.img || null,
        isFeatured: result.data.isFeatured || false,
        catSlug: result.data.catSlug,
        options: result.data.options,
      },
    });


    return NextResponse.json({ success: true, product: createdProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product. Please try again." },
      { status: 500 }
    );
  }
};
