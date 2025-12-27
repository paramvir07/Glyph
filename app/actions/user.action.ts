"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

export const addNote = async () => {
    const { userId } = await auth();
    
    if (!userId) {
        throw new Error("Unauthorized")
    }
    const user = await prisma.user.findUnique({
        where: {
            clerkId: userId
        }
    })

    if(!user) throw new Error ("Unauthorized")

    const note = await prisma.note.create({
        data: {
            title: "",
            Content: "",
            user: {
                connect: {id: user.id}
            }
        }
    })
}