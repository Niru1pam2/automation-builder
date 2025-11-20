"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onPaymentDetails = async () => {
  const user = await currentUser();

  if (!user) {
    return {
      status: 404,
      messsage: "User not found",
    };
  }

  const connection = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      tier: true,
      credits: true,
    },
  });

  if (!connection) {
    return {
      status: 404,
      message: "Create a user first",
    };
  }

  return connection;
};
