import { useRef } from "react";
import { Servers, ServersPlans, Title } from "@/components";
import { useGetMyServersQuery } from "@/redux/api/userApi";

export const WorkingServersPage = () => {
  const plansRef = useRef<HTMLDivElement>(null);
  const { data: serversList } = useGetMyServersQuery(null);

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Доступные планы" />

      <div>
        <Title title="Задействованные сервера" />

        <Servers className="mt-6" plansRef={plansRef} servers={serversList} />
      </div>

      <div className="mt-16" ref={plansRef}>
        <ServersPlans />
      </div>
    </div>
  );
};
