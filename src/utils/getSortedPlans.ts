import { ServerPlan, ServerTypes } from "@/types";

export const getSortedPlans = (list: ServerPlan[]) => {
  const servers = list
    .map((el) => el)
    .sort((a, b) => {
      if (a.type === ServerTypes.FREE) {
        return -1;
      }
      if (b.type === ServerTypes.FREE) {
        return 1;
      }
      return 0;
    });

  return servers;
};
