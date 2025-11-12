import { ConnectionProviderProps } from "@/lib/types";
import { EditorState } from "@/providers/editor-provider";
import { useChainlyStore } from "@/store";
import ContentBasedOnTitle from "./content-based-on-title";

export default function RenderOutputAccordion({
  nodeConnection,
  state,
}: {
  state: EditorState;
  nodeConnection: ConnectionProviderProps;
}) {
  const {
    googleFile,
    selectedSlackChannels,
    setGoogleFile,
    setSelectedSlackChannels,
    setSlackChannels,
    slackChannels,
  } = useChainlyStore();
  return (
    <ContentBasedOnTitle
      nodeConnection={nodeConnection}
      newState={state}
      file={googleFile}
      setFile={setGoogleFile}
      selectedSlackChannels={selectedSlackChannels}
      setSelectedSlackChannels={setSelectedSlackChannels}
    />
  );
}
