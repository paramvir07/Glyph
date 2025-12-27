import { prisma } from "@/lib/prisma";
import { UserJSON } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const data = evt.data as UserJSON;
    const { id, first_name, last_name, username, image_url, email_addresses } =
      data;
    const eventType = evt.type;

    if (evt.type === "user.created") {
      await prisma.user.create({
        data: {
          clerkId: id,
          firstName: first_name || "",
          lastName: last_name,
          username: username || "",
          email: email_addresses[0].email_address,
          profileUrl: image_url,
        },
      });
    }

    if (evt.type === "user.updated") {
      await prisma.user.update({
        where: {
          clerkId: id,
        },
        data: {
          firstName: first_name || "",
          lastName: last_name,
          username: username || "",
          email: email_addresses[0].email_address,
          profileUrl: image_url,
        },
      });
    }

    if (evt.type === "user.deleted") {
      await prisma.user.delete({
        where: {
          clerkId: id,
        },
      });
    }
    // console.log(
    //   `Received webhook with ID ${id}  and event type of ${eventType}`
    // );
    // console.log("Webhook payload:", evt.data);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
