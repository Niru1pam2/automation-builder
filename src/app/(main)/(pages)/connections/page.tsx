/* eslint-disable @typescript-eslint/no-explicit-any */
import { CONNECTIONS } from "@/lib/constants";
import ConnectionCard from "./_components/ConnectionCard";
import { currentUser } from "@clerk/nextjs/server";
import { onDiscordConnect } from "../../../../../actions/discord-connections";
import { onNotionConnect } from "../../../../../actions/notion-connections";
import { onSlackConnect } from "../../../../../actions/slack-connections";
import { getUserData } from "../../../../../actions/user";

// Define the expected structure for search parameters
type SearchParams = {
  [key: string]: string | undefined;
  webhook_id?: string;
  webhook_name?: string;
  webhook_url?: string;
  guild_id?: string;
  guild_name?: string;
  channel_id?: string;
  access_token?: string;
  workspace_name?: string;
  workspace_icon?: string;
  workspace_id?: string;
  database_id?: string;
  app_id?: string;
  authed_user_id?: string;
  authed_user_token?: string;
  slack_access_token?: string;
  bot_user_id?: string;
  team_id?: string;
  team_name?: string;
};

type Props = {
  // Use the type defined above
  searchParams: SearchParams;
};

export default async function Connections(props: Props) {
  // --- FIX: AWAIT the searchParams prop before access ---
  // Next.js requires awaiting dynamic props in async Server Components
  // to ensure they are fully resolved and non-blocking.
  const resolvedSearchParams = (await props.searchParams) || {};

  const {
    webhook_id = "",
    webhook_name = "",
    webhook_url = "",
    guild_id = "",
    guild_name = "",
    channel_id = "",
    access_token = "",
    workspace_name = "",
    workspace_icon = "",
    workspace_id = "",
    database_id = "",
    app_id = "",
    authed_user_id = "",
    authed_user_token = "",
    slack_access_token = "",
    bot_user_id = "",
    team_id = "",
    team_name = "",
  } = resolvedSearchParams;

  // --------------------------------------------------------

  const user = await currentUser();
  if (!user) return null;

  const onUserConnections = async () => {
    console.log(database_id);
    await onDiscordConnect(
      channel_id!,
      webhook_id!,
      webhook_name!,
      webhook_url!,
      user.id,
      guild_name!,
      guild_id!
    );
    await onNotionConnect(
      access_token!,
      workspace_id!,
      workspace_icon!,
      workspace_name!,
      database_id!,
      user.id
    );

    await onSlackConnect(
      app_id!,
      authed_user_id!,
      authed_user_token!,
      slack_access_token!,
      bot_user_id!,
      team_id!,
      team_name!,
      user.id
    );

    const connections: any = {};

    const user_info = await getUserData(user.id);

    user_info?.connections.map((connection) => {
      connections[connection.type] = true;
      return (connections[connection.type] = true);
    });

    return { ...connections, "Google Drive": true };
  };

  const connections = await onUserConnections();

  return (
    <div className="relative flex flex-col gap-6">
      <h1 className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        Connections
      </h1>
      <div className="flex flex-col gap-4">
        <section className="flex flex-col gap-4 p-6 text-muted-foreground">
          Connect all your apps and services in one place.
          {CONNECTIONS.map((connection) => (
            <ConnectionCard
              key={connection.title}
              title={connection.title}
              description={connection.description}
              icon={connection.image}
              type={connection.title}
              connected={connections}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
