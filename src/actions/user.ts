"use server";

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      console.error("No user found from Clerk");
      return { status: 404 };
    }

    console.log("Clerk user found:", user.id);

    // Check if user exists in database
    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (userExist) {
      console.log("Existing user found in database");
      return { status: 200, user: userExist };
    }

    console.log("Creating new user in database");
    // Create new user if doesn't exist
    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workspace: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    console.log("New user created:", newUser.id);
    return { status: 201, user: newUser };
  } catch (error) {
    console.error("Error in onAuthenticateUser:", error);
    return { status: 500, error: error };
  }
};
