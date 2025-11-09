import { ConnectionsProvider } from "@/providers/connections-provider";
import EditorProvider from "@/providers/editor-provider";

type Props = {};
export default function Page({}: Props) {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
          <></>
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  );
}
