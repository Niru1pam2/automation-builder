import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI
  );

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "User not found" });
  }

  const clerkResponse = await (
    await clerkClient()
  ).users.getUserOauthAccessToken(userId, "oauth_google");

  // Check if we actually got a token
  if (!clerkResponse || clerkResponse.data.length === 0) {
    return NextResponse.json({
      message: "No Google OAuth token found for this user.",
    });
  }

  const accessToken = clerkResponse.data[0].token;

  // 2b. Set the credentials on the oauth2Client
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
  });

  const channelId = uuidv4().toString();

  const startPageTokenRes = await drive.changes.getStartPageToken();

  const startPageToken = startPageTokenRes.data.startPageToken;

  if (startPageToken == null) {
    throw new Error("startPageToken is unexpectedly null");
  }

  //   WIP REPLACE NGROK WITH DEPLOYED URL
  const listener = await drive.changes.watch({
    pageToken: startPageToken,
    supportsAllDrives: true,
    supportsTeamDrives: true,
    requestBody: {
      id: channelId,
      type: "web_hook",
      address:
        "https://chief-doe-model.ngrok-free.app/api/drive-activity/notifications",
      kind: "api#channel",
    },
  });

  if (listener.status == 200) {
    const channelStored = await prisma.user.updateMany({
      where: {
        clerkId: userId,
      },
      data: {
        googleResourceId: listener.data.resourceId,
      },
    });

    if (channelStored) {
      return new NextResponse("Listening to changes...");
    }
  }

  return new NextResponse("OOps! Something went wrong, try again!");
}
