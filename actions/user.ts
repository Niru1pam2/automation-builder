"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403 };
    }

    const userExist = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });

    if (userExist) {
      return {
        status: 200,
        user: userExist,
      };
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.fullName || "",
        profileImage: user?.imageUrl || "",
      },
    });

    if (newUser) {
      return {
        status: 201,
        user: newUser,
      };
    }

    return {
      status: 400,
    };
  } catch (error) {
    console.log("ERROR", error);
    return { status: 500 };
  }
};

export const getUserData = async (id: string) => {
  const user_info = await prisma.user.findUnique({
    where: {
      clerkId: id,
    },
    include: {
      connections: true,
    },
  });

  return user_info;
};
