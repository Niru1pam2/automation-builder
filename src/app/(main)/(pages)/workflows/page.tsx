import { onGetWorkflows } from "../../../../../actions/workflow-connections";
import WorkflowButton from "./_components/WorkflowButton";
import WorkflowCard from "./_components/WorkflowCard";

export default async function page() {
  const workflows = await onGetWorkflows();

  return (
    <div className="flex flex-col relative">
      <h1 className="text-4xl sticky top-0 z-10 p-6 bg-background/50 backdrop-blur-lg flex items-center border-b justify-between">
        Workflows
        <WorkflowButton />
      </h1>

      {workflows?.length ? (
        workflows.map((flow) => (
          <WorkflowCard
            key={flow.id}
            {...flow}
            publish={flow.publish as boolean}
          />
        ))
      ) : (
        <div className="h-full flex items-center justify-center mt-30 text-muted-foreground font-semibold">
          No Workflows
        </div>
      )}
    </div>
  );
}
