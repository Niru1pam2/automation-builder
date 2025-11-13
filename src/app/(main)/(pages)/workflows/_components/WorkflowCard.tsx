/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Link from "next/link";
import { onFlowPublish } from "../../../../../../actions/workflow-connections";
import { toast } from "sonner";

type Props = {
  name: string;
  description: string;
  id: string;
  publish: boolean;
};

export default function WorkflowCard({
  description,
  id,
  name,
  publish,
}: Props) {
  const onPublishFlow = async (event: any) => {
    const response = await onFlowPublish(
      id,
      event.target.ariaChecked === "false"
    );
    if (response) toast.message(response);
  };
  return (
    <Card className="w-full">
      <div className="flex items-center justify-between">
        <CardHeader className="flex flex-col gap-4 space-y-4 flex-1">
          <Link href={`/workflows/editor/${id}`}>
            <div className="flex flex-row gap-2 items-center">
              <Image
                src={"/googleDrive.png"}
                alt="Google Drive"
                height={30}
                width={30}
                className="object-contain"
              />
              <Image
                src={"/notion.png"}
                alt="Notion"
                height={30}
                width={30}
                className="object-contain"
              />
              <Image
                src={"/discord.png"}
                alt="Discord"
                height={30}
                width={30}
                className="object-contain"
              />
            </div>

            <div className="flex flex-col w-full mt-4 space-y-1">
              <CardTitle className="text-lg">{name}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {description}
              </CardDescription>
            </div>
          </Link>
        </CardHeader>

        <div className="flex flex-col items-center gap-2 p-4 pr-6">
          <Label htmlFor="airplane-mode">{publish ? "On" : "Off"}</Label>
          <Switch
            id="airplane-mode"
            onClick={onPublishFlow}
            defaultChecked={publish}
          />
        </div>
      </div>
    </Card>
  );
}
