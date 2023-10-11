import { Servers, ServersPlans, Title } from "@/components";
import { ShowMoreBtn } from "@/components/ui";

export const WorkingServersPage = () => {
  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Доступные планы" />

      <ServersPlans />

      <div className="mt-16">
        <Title title="Задействованные сервера" />

        <Servers className="mt-6" />

        <ShowMoreBtn className="mt-6" onClick={() => console.log("click")} />
      </div>
    </div>
  );
};
