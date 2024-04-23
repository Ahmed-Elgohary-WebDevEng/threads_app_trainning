"use server";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import { UserType } from "@/types";
import { revalidatePath } from "next/cache";
import Thread from "@/lib/models/thread.model";
import { FilterQuery, QueryOptions, SortOrder } from "mongoose";

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

export async function fetchUserPosts(userId: string) {
  try {
    await connectToDB();

    // find all thread for this user
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name img id",
        },
      },
    });

    return threads;
  } catch (error: any) {
    throw new Error("Failed to fetch user: " + error.message);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString: string;
  pageNumber: number;
  pageSize: number;
  sortBy?: SortOrder;
}) {
  try {
    await connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error("Failed to fetch users: " + error.message);
  }
}
