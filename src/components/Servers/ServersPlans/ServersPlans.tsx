import { ServersPlansItem } from "./ServersPlansItem/ServersPlansItem";

export const ServersPlans = () => {
  return (
    <div className="flex flex-wrap -m-2">
      <div className="lg:w-1/3">
        <ServersPlansItem />
      </div>
    </div>
  );
};
