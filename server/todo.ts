"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTodo(title: string) {
  try {
    await prisma.todo.create({
      data: {
        title,
      },
    });
    revalidatePath("/");
  } catch (error) {
    return { error: "Failed to create todo" };
  }
}
