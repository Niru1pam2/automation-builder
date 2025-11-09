import WorkflowCard from "./WorkflowCard";

type Props = {};
export default function Workflows({}: Props) {
  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col gap-4 p-4">
        <WorkflowCard
          id="1"
          description="Creating test workflow"
          name="Automation workflow"
          publish
        />
      </section>
    </div>
  );
}
