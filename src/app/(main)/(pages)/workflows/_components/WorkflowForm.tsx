"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkflowFormSchema } from "@/lib/types";
import { useRouter } from "next/navigation";

type Props = {
  title?: string;
  subTitle?: string;
};
export default function WorkflowForm({ subTitle, title }: Props) {
  const form = useForm<z.infer<typeof WorkflowFormSchema>>({
    resolver: zodResolver(WorkflowFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const isLoading = form.formState.isLoading;
  const router = useRouter();

  return <div>WorkflowForm</div>;
}
