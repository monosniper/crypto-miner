import { ServerStatuses } from "@/types";

export const getServerStatus = (status: ServerStatuses) => {
  switch (status) {
    case ServerStatuses.WORK_STATUS:
      return "server in work";
    // case ServerStatuses.ACTIVE_STATUS:
    //   return "server active";
    case ServerStatuses.NOT_ACTIVE_STATUS:
      return "server not active";
    // case ServerStatuses.RELOAD_STATUS:
    //   return "server reload";
  }
};
