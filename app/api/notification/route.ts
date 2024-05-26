import { NextRequest, NextResponse } from "next/server";
import { sendNotificationHandler } from "@/app/actions/actions";
import { getAllUsers } from "@/functions/getAllUsers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body?.validator === "validRequest") {
    const users = await getAllUsers();
    users.forEach((user) => sendNotificationHandler(user));
  }
  return NextResponse.json({ status: "success" });
}
