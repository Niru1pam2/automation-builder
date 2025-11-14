/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const encoded = Buffer.from(
    `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_API_SECRET}`
  ).toString("base64");

  if (code) {
    // try...catch is good practice for API calls
    try {
      const response = await axios("https://api.notion.com/v1/oauth/token", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Basic ${encoded}`,
          "Notion-Version": "2022-06-28",
        },
        data: JSON.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: process.env.NOTION_REDIRECT_URI!,
        }),
      });

      if (response.data) {
        const notion = new Client({
          auth: response.data.access_token,
          notionVersion: "2022-06-28", // Explicitly set version
        });

        // --- THIS IS THE CORRECTED CODE ---
        // Use search API to find databases
        const databasesListResponse = await notion.search({
          // @ts-expect-error
          filter: { property: "object", value: "database" },
          sort: { direction: "descending", timestamp: "last_edited_time" },
        });

        const databaseId = databasesListResponse?.results?.length
          ? databasesListResponse.results[0].id
          : "";

        console.log(databaseId);
        // ------------------------------------

        return NextResponse.redirect(
          `http://localhost:3000/connections?access_token=${response.data.access_token}&workspace_name=${response.data.workspace_name}&workspace_icon=${response.data.workspace_icon}&workspace_id=${response.data.workspace_id}&database_id=${databaseId}`
        );
      }
    } catch (error) {
      console.error("Error in Notion callback:", error);
      // Handle the error (e.g., redirect to an error page)
    }
  }

  // This is the failure/error redirect
  return NextResponse.redirect("http://localhost:3000/connections?error=true");
}
