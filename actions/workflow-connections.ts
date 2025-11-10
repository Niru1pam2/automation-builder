"use server";

import prisma from "@/lib/prisma";

export const onCreateNodeEdges = async (
  flowId: string,
  nodes: string,
  edges: string,
  flowPath: string
) => {
  const flow = await prisma.workflows.update({
    where: {
      id: flowId,
    },
    data: {
      nodes,
      edges,
      flowPath: flowPath,
    },
  });

  if (flow)
    return {
      status: 200,
      message: "Flow saved",
    };
};

export const onFlowPublish = async (workflowId: string, state: boolean) => {
  const published = await prisma.workflows.update({
    where: {
      id: workflowId,
    },
    data: {
      publish: state,
    },
  });

  if (published.publish) return "Workflow Published";
  return "Workflow Unpublished";
};
