import { EditorCanvasCardType } from "@/lib/types";
import { useEditor } from "@/providers/editor-provider";
import { Position, useNodeId } from "@xyflow/react";
import { useMemo } from "react";
import EditorCanvasIconHelper from "./editor-canvas-card-icon-helper";
import CustomHandle from "./custom-handle";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";

export default function EditorCanvasCardSingle({
  data,
}: {
  data: EditorCanvasCardType;
}) {
  const { dispatch, state } = useEditor();
  const nodeId = useNodeId();

  const logo = useMemo(
    () => <EditorCanvasIconHelper type={data.type} />,
    [data]
  );

  return (
    <>
      {/* Top handle for connections */}
      {data.type !== "Trigger" && data.type !== "Google Drive" && (
        <CustomHandle
          type="target"
          position={Position.Top}
          style={{ zIndex: 100 }}
        />
      )}

      <Card
        onClick={(e) => {
          e.stopPropagation();
          const val = state.editor.elements.find((n) => n.id === nodeId);
          if (val) {
            dispatch({
              type: "SELECTED_ELEMENT",
              payload: { element: val },
            });
          }
        }}
        className={clsx(
          "relative w-[260px] cursor-pointer rounded-xl border border-border bg-background shadow-sm transition-all",
          "hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900"
        )}
      >
        <CardHeader className="flex items-start gap-3 p-4">
          <div className="flex-shrink-0">{logo}</div>
          <div className="flex flex-col">
            <CardTitle className="text-base font-semibold">
              {data.title}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              <span className="font-medium text-muted-foreground/70">ID:</span>{" "}
              {nodeId}
              <p className="mt-1 text-xs text-muted-foreground/60">
                {data.description}
              </p>
            </CardDescription>
          </div>
        </CardHeader>

        {/* Node type badge */}
        <Badge
          variant="secondary"
          className="absolute right-2 top-2 text-[10px] font-medium"
        >
          {data.type}
        </Badge>

        {/* Status indicator dot */}
        <div
          className={clsx(
            "absolute left-2 top-2 h-2.5 w-2.5 rounded-full shadow-sm",
            {
              "bg-green-500": Math.random() < 0.6,
              "bg-orange-500": Math.random() >= 0.6 && Math.random() < 0.8,
              "bg-red-500": Math.random() >= 0.8,
            }
          )}
        />
      </Card>

      {/* Bottom handle */}
      <CustomHandle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
