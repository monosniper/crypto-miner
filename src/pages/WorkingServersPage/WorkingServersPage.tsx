import { useRef } from "react";
import { Servers, ServersPlans, Title } from "@/components";

export const WorkingServersPage = () => {
  const plansRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Доступные планы" />

      <div>
        <Title title="Задействованные сервера" />

        <Servers className="mt-6" plansRef={plansRef} />
      </div>

      <div className="mt-16" ref={plansRef}>
        <ServersPlans />
      </div>
    </div>
  );
};
