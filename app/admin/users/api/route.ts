import prisma from "@/utils/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        Order: {
          select: {
            id: true,
            price: true,
            status: true,
            intent_Id: true,
            createdAt: true,
          },
        },
        accounts: {
          select: {
            provider: true,
            type: true,
            providerAccountId: true,
            createdAt: true,
          },
        },
        sessions: {
          select: {
            sessionToken: true,
            expires: true,
          },
        },
        Authenticator: {
          select: {
            credentialID: true,
            credentialDeviceType: true,
            credentialBackedUp: true,
          },
        },
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch users:", err); 
    return NextResponse.json(
      { message: "Failed to retrieve users." },
      { status: 500 }
    );
  }
};
