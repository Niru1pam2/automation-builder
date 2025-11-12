import { ConnectionProviderProps } from "@/lib/types";
import { Option } from "@/store";

type Props = {
  currentService: string;
  nodeConnection: ConnectionProviderProps;
  channels?: Option[];
  setChannels?: (value: Option[]) => void;
};

export default function ActionButton({
  currentService,
  nodeConnection,
  channels,
  setChannels,
}: Props) {
  return <div>action-button</div>;
}
