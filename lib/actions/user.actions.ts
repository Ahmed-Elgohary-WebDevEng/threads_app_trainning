"use server";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import { UserType } from "@/types";
import { revalidatePath } from "next/cache";

export async function updateUser({
  userData,
  path,
}: {
  userData: UserType;
  path: string;
}): Promise<void> {
  try {
    await connectToDB();

    await User.findOneAndUpdate(
      { id: userData.userId },
      {
        username: userData.username.toLowerCase(),
        name: userData.name,
        bio: userData.bio,
        image: userData.image,
        onboarded: true,
      },
      { upsert: true },
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error("Failed to create/update user: " + error.message);
  }
}

export async function fetchUser(userId: string) {
  try {
    await connectToDB();

    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error("Failed to fetch user: " + error.message);
  }
}
