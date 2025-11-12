import { ConnectionsProvider } from "@/providers/connections-provider";
import EditorProvider from "@/providers/editor-provider";
import EditorCanvas from "./_components/editor-canvas";

export default function Page() {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas />
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  );
}
