import { CONNECTIONS } from "@/lib/constants";
import ConnectionCard from "./_components/ConnectionCard";

type Props = {};
export default function page({}: Props) {
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
            />
          ))}
        </section>
      </div>
    </div>
  );
}
