"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getMyNotes = async () => {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      throw new Error("Unauthorized");
    }
    const myNotes = await prisma.note.findMany({
      where: {
        userId: user.id,
      },
    });
    return myNotes;
  } catch (error) {
    throw new Error(`error while getting my notes: ${error}`);
  }
};

export const addNote = async (formData: FormData) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
      },
    });
    if (!user) throw new Error("Unauthorized");
    const title = formData.get("title") as string;
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
    
  } catch (error) {
    throw new Error(`error while adding note: ${error}`);
  }
  revalidatePath("/");
};

export const updateNotes = async (noteId: string, formData: FormData) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized")
    
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId
      },
      select: {
        id: true
      }
    })

    if (!user) throw new Error("Unauthorized")
    const title = formData.get("title") as string;
  const content = formData.get("content") as string;
    await prisma.note.update({
      where: {
        id_userId: {
          id: noteId,
          userId: user.id
        }
      },
      data: {
        title,
        content
      }
    })
  } catch (error) {
    throw new Error(`error while updating note: ${error}`);
  }
  revalidatePath("/");
};

export const deleteNote = async (noteId: string) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
      },
    });
    if (!noteId) throw new Error("Note id not found");
    if (!user) throw new Error("Unauthorized");
    await prisma.note.delete({
      where: {
        id_userId: {
          id: noteId,
          userId: user.id,
        },
      },
    });
  } catch (error) {
    throw new Error(`error while deleting note: ${error}`);
  }
  revalidatePath("/");
}