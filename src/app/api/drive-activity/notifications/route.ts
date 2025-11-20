/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/prisma";
import axios from "axios";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { postContentToWebhook } from "../../../../../actions/discord-connections";
import { onCreateNewPageInDatabase } from "../../../../../actions/notion-connections";
import { postMessageToSlack } from "../../../../../actions/slack-connections";

export async function POST(req: NextRequest) {
  console.log("🔴 Webhook received");

  const headersList = await headers();

  // Get the resource ID and state
  const channelResourceId = headersList.get("x-goog-resource-id");
  const resourceState = headersList.get("x-goog-resource-state");

  console.log("Resource ID:", channelResourceId);
  console.log("Resource State:", resourceState);

  // Google sends 'sync' on initial connection, ignore it
  if (resourceState === "sync") {
    console.log("⚪ Sync notification - ignoring");
    return Response.json({ message: "sync acknowledged" }, { status: 200 });
  }

  // Only process actual changes
  if (!channelResourceId || resourceState !== "change") {
    console.log("⚪ Not a change notification - ignoring");
    return Response.json({ message: "not a change" }, { status: 200 });
  }

  console.log("✅ Processing change notification");

  const user = await prisma.user.findFirst({
    where: {
      googleResourceId: channelResourceId,
    },
    select: { clerkId: true, credits: true },
  });

  if (!user) {
    console.log("❌ User not found for resource ID:", channelResourceId);
    return Response.json({ message: "user not found" }, { status: 404 });
  }

  if (user.credits !== "Unlimited" && parseInt(user.credits!) <= 0) {
    console.log("❌ User out of credits");
    return Response.json({ message: "no credits" }, { status: 403 });
  }

  const workflows = await prisma.workflows.findMany({
    where: {
      userId: user.clerkId,
    },
  });

  if (!workflows || workflows.length === 0) {
    console.log("⚠️ No workflows found for user");
    return Response.json({ message: "no workflows" }, { status: 200 });
  }

  // Process all workflows sequentially with proper async/await
  for (const flow of workflows) {
    console.log(`🔄 Processing workflow: ${flow.id}`);

    try {
      const flowPath = JSON.parse(flow.flowPath!);
      let current = 0;

      while (current < flowPath.length) {
        const currentStep = flowPath[current];
        console.log(`  Step ${current}: ${currentStep}`);

        if (currentStep === "Discord") {
          const discordMessage = await prisma.discordWebhook.findFirst({
            where: {
              userId: flow.userId,
            },
            select: {
              url: true,
            },
          });

          if (discordMessage) {
            await postContentToWebhook(
              flow.discordTemplate!,
              discordMessage.url
            );
            console.log("  ✅ Discord message sent");
          }
          current++; // Move to next step
        } else if (currentStep === "Slack") {
          const channels = flow.slackChannels.map((channel: any) => ({
            label: "",
            value: channel,
          }));

          await postMessageToSlack(
            flow.slackAccessToken!,
            channels,
            flow.slackTemplate!
          );
          console.log("  ✅ Slack message sent");
          current++; // Move to next step
        } else if (currentStep === "Notion") {
          await onCreateNewPageInDatabase(
            flow.notionDbId!,
            flow.notionAccessToken!,
            JSON.parse(flow.notionTemplate!)
          );
          console.log("  ✅ Notion page created");
          current++; // Move to next step
        } else if (currentStep === "Wait") {
          console.log("  ⏸️ Wait step - setting up cron job");

          const res = await axios.put(
            "https://api.cron-job.org/jobs",
            {
              job: {
                url: `https://chief-doe-model.ngrok-free.app?flow_id=${flow.id}`,
                enabled: "true",
                schedule: {
                  timezone: "Europe/Istanbul",
                  expiresAt: 0,
                  hours: [-1],
                  mdays: [-1],
                  minutes: ["*****"],
                  months: [-1],
                  wdays: [-1],
                },
              },
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.CRON_JOB_KEY!}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (res.status === 200) {
            // Save remaining steps to cronPath for later execution
            const remainingSteps = flowPath.slice(current + 1);
            await prisma.workflows.update({
              where: {
                id: flow.id,
              },
              data: {
                cronPath: JSON.stringify(remainingSteps),
              },
            });
            console.log("  ✅ Cron job scheduled");
          }

          // Break after Wait - remaining steps will be executed by cron
          break;
        } else {
          // Unknown step type, skip it
          console.log(`  ⚠️ Unknown step: ${currentStep}`);
          current++;
        }

        await prisma.user.update({
          where: {
            clerkId: user.clerkId,
          },
          data: {
            credits: `${parseInt(user.credits!) - 1}`,
          },
        });
      }

      console.log(`✅ Workflow ${flow.id} completed`);
    } catch (error) {
      console.error(`❌ Error processing workflow ${flow.id}:`, error);
      // Continue with next workflow even if one fails
    }
  }

  // Deduct credits AFTER all workflows complete
  if (user.credits !== "Unlimited") {
    await prisma.user.update({
      where: {
        clerkId: user.clerkId,
      },
      data: {
        credits: `${parseInt(user.credits!) - 1}`,
      },
    });
    console.log("💳 Credit deducted");
  }

  return Response.json(
    {
      message: "workflows completed",
      processedCount: workflows.length,
    },
    {
      status: 200,
    }
  );
}
