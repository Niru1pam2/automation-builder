"use client";

import { CustomModal } from "@/components/global/custom-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import { Plus } from "lucide-react";
import WorkflowForm from "./WorkflowForm";

type Props = {};
export default function WorkflowButton({}: Props) {
  const { setClose, setOpen } = useModal();
  const handleClick = () => {
    setOpen(
      <CustomModal
        title={"Create a workflow automation"}
        subHeading={
          "Workflows are a powerful tool that helps you automate tasks"
        }
      >
        <WorkflowForm />
      </CustomModal>
    );
  };
  return (
    <Button size={"icon"} onClick={handleClick}>
      <Plus />
    </Button>
  );
}
