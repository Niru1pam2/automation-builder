/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorCanvasCardType } from "./types";

export const ondragstart = (
  event: any,
  nodeType: EditorCanvasCardType["type"]
) => {
  event.dataTransfer.setData("application/reactFlow", nodeType);
  event.dataTransfer.effectAllowed = "move";
};
