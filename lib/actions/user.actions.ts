"use server";

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE USER
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();
    
    console.log("Creating new user:", user);

    const newUser = await User.create(user);

    console.log("User created successfully:", newUser);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// GET USER BY ID (Fixing the Issue)
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    console.log("Fetching user with Clerk ID:", userId);

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      console.error("User NOT found in MongoDB! Clerk ID:", userId);
      throw new Error("User not found");
    }

    console.log("User found in MongoDB:", user);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE USER
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    console.log("Updating user:", clerkId, user);

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) {
      console.error("User update failed for Clerk ID:", clerkId);
      throw new Error("User update failed");
    }

    console.log("User updated successfully:", updatedUser);
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE USER
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    console.log("Deleting user with Clerk ID:", clerkId);

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      console.error("User not found for deletion:", clerkId);
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    console.log("User deleted successfully:", deletedUser);
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS (Updating User Credit Balance)
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    console.log("Updating credits for user ID:", userId, "Deducting:", creditFee);

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updatedUserCredits) {
      console.error("User credits update failed for User ID:", userId);
      throw new Error("User credits update failed");
    }

    console.log(" Credits updated successfully:", updatedUserCredits);
    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}
