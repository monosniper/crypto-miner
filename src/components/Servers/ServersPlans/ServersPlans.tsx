import { ServersPlansItem } from "./ServersPlansItem/ServersPlansItem";
import styles from "./ServersPlans.module.css";
import { useGetAllServersQuery } from "@/redux/api/serversApi";

export const ServersPlans = () => {
  const { data: serversList } = useGetAllServersQuery(null);

  return (
    <div className="flex flex-wrap -m-2">
      {serversList?.map((el) => {
        return (
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <ServersPlansItem
              className={el.isHot ? styles.beneficial : "h-full"}
              data={el}
            />
          </div>
        );
      })}
    </div>
  );
};
