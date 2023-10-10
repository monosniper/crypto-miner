import { ServersPlans, Title } from "@/components";

export const WorkingServersPage = () => {
  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Доступные планы" />

      <ServersPlans />
    </div>
  );
};
