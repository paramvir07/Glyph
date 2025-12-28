"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const addNote = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!user) throw new Error("Unauthorized");
  const title = formData.get("title") as string
  const content = formData.get("content") as string;


  const note = await prisma.note.create({
    data: {
      title,
      content,
      user: {
        connect: { id: user.id },
      },
    },
  });
  console.log("New Note created Successfully", note)
};
