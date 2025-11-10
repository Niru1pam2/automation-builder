/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { EditorCanvasCardType, EditorNodeType } from "@/lib/types";
import { useEditor } from "@/providers/editor-provider";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowInstance,
  NodeChange,
  EdgeChange,
  Edge,
  Connection,
  Controls,
  MiniMap,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import EditorCanvasCardSingle from "./editor-canvas-single-card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { v4 } from "uuid";
import { EditorCanvasDefaultCardTypes } from "@/lib/constants";
import { LoaderOne } from "@/components/ui/loader";
import FlowInstance from "./flow-instance";
import EditorCanvasSidebar from "./editor-canvas-sidebar";

const initialNodes: EditorNodeType[] = [];
const initialEdges: { id: string; source: string; target: string }[] = [];

export default function EditorCanvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isWorkflowLoading, setIsWorkflowLoading] = useState(false);
  const { dispatch, state } = useEditor();
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const pathname = usePathname();

  const nodeTypes = useMemo(
    () => ({
      Action: EditorCanvasCardSingle,
      Trigger: EditorCanvasCardSingle,
      Email: EditorCanvasCardSingle,
      Condition: EditorCanvasCardSingle,
      AI: EditorCanvasCardSingle,
      Slack: EditorCanvasCardSingle,
      "Google Drive": EditorCanvasCardSingle,
      Notion: EditorCanvasCardSingle,
      Discord: EditorCanvasCardSingle,
      "Custom Webhook": EditorCanvasCardSingle,
      "Google Calendar": EditorCanvasCardSingle,
      Wait: EditorCanvasCardSingle,
    }),
    []
  );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const type: EditorCanvasCardType["type"] = event.dataTransfer.getData(
        "application/reactflow"
      );

      if (typeof type === "undefined" || !type) return;

      const triggerAlreadyExists = state.editor.elements.find(
        (node) => node.type === "Trigger"
      );

      if (type === "Trigger" && triggerAlreadyExists) {
        toast.error("Error", {
          description:
            "Only one trigger can be added to automations at the moment",
        });
        return;
      }

      if (!reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: v4(),
        type,
        position,
        data: {
          title: type,
          description: EditorCanvasDefaultCardTypes[type].description,
          completed: false,
          current: false,
          metadata: {},
          type: type,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, state]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      //@ts-expect-error
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      //@ts-ignore
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const handleClickCanvas = () => {
    dispatch({
      type: "SELECTED_ELEMENT",
      payload: {
        element: {
          data: {
            completed: false,
            current: false,
            description: "",
            metadata: {},
            title: "",
            type: "Trigger",
          },
          id: "",
          position: { x: 0, y: 0 },
          type: "Trigger",
        },
      },
    });
  };

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  useEffect(() => {
    dispatch({ type: "LOAD_DATA", payload: { edges, elements: nodes } });
  }, [nodes, edges, dispatch]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen bg-background dark:bg-neutral-950"
    >
      <ResizablePanel defaultSize={100}>
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative h-full w-full overflow-hidden rounded-none">
            {isWorkflowLoading ? (
              <div className="flex h-full w-full items-center justify-center">
                <LoaderOne />
              </div>
            ) : (
              <ReactFlow
                className="h-full w-full rounded-none bg-neutral-50 dark:bg-neutral-900 transition-colors"
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodes={state.editor.elements}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={(instance) =>
                  setReactFlowInstance(instance as unknown as ReactFlowInstance)
                }
                fitView
                onClick={handleClickCanvas}
                nodeTypes={nodeTypes}
              >
                <Controls
                  position="top-left"
                  className="bg-white/70! dark:bg-neutral-800/60! backdrop-blur-sm border border-border rounded-md p-1 shadow-sm text-black"
                />
                <MiniMap
                  position="top-right"
                  zoomable
                  pannable
                  className=" dark:bg-neutral-800/70! backdrop-blur-sm border border-border rounded-md shadow-sm"
                />
                <Background
                  variant={"dots" as any}
                  gap={16}
                  size={1}
                  className="opacity-70 dark:opacity-40"
                />
              </ReactFlow>
            )}
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle className="bg-border dark:bg-neutral-800" />

      <ResizablePanel
        defaultSize={40}
        className="relative hidden sm:block border-l border-border dark:border-neutral-800"
      >
        {isWorkflowLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <LoaderOne />
          </div>
        ) : (
          <FlowInstance edges={edges} nodes={nodes}>
            <EditorCanvasSidebar nodes={nodes} />
          </FlowInstance>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
