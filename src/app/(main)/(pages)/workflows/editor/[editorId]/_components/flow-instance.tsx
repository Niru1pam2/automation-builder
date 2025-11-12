/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useNodeConnections } from "@/providers/connections-provider";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import {
  onCreateNodeEdges,
  onFlowPublish,
} from "../../../../../../../../actions/workflow-connections";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  edges: any[];
  nodes: any[];
};
export default function FlowInstance({ children, edges, nodes }: Props) {
  const pathname = usePathname();
  const [isFlow, setIsFlow] = useState([]);
  const { nodeConnection } = useNodeConnections();

  const onFlowAutomation = async () => {
    const flow = await onCreateNodeEdges(
      pathname.split("/").pop()!,
      JSON.stringify(nodes),
      JSON.stringify(edges),
      JSON.stringify(isFlow)
    );

    if (flow)
      toast.success("Success", {
        description: flow.message,
      });
  };

  const onPublishWorkflow = async () => {
    const response = await onFlowPublish(pathname.split("/").pop()!, true);

    if (response) {
      toast.success("Success", {
        description: response,
      });
    }
  };

  const onAutomateFlow = async () => {
    const flows: any = [];
    const connectedEdges = edges.map((edge) => edge.target);
    connectedEdges.map((target) => {
      nodes.forEach((node) => {
        if (node.id === target) {
          flows.push(node.type);
        }
      });
    });

    setIsFlow(flows);
  };

  useEffect(() => {
    onAutomateFlow();
  }, [edges]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 p-4">
        <Button onClick={onFlowAutomation} disabled={isFlow.length < 1}>
          Save
        </Button>

        <Button onClick={onPublishWorkflow} disabled={isFlow.length < 1}>
          Publish
        </Button>
      </div>
      {children}
    </div>
  );
}
