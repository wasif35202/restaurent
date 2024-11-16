import { NextResponse } from "next/server";
import prisma from "@/utils/utils";

export async function PUT(
  req: Request,
  { params}: { params: Promise<{ id: string }> }
) {
  const  id  = (await params).id
  
  if (!id) {
    console.log(
      "Payment intent is required",
    )
    return NextResponse.json({ error: "Payment intent is required" }, { status: 400 });
  }

  try {
    // Find the order by payment_intent
    const order = await prisma.order.update({
      where: { intent_Id: id },
      data: { status: "Paid" },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order status updated to Paid", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}
