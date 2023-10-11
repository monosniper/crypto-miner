import { useEffect, useState } from "react";

export const useLoading = (isLoading: boolean, isFetching?: boolean) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isFetching !== undefined) {
      if (isFetching || isLoading) setLoading(true);
      else timeout = setTimeout(() => setLoading(false), 200);
    } else {
      if (isLoading) setLoading(true);
      else timeout = setTimeout(() => setLoading(false), 200);
    }
    return () => clearTimeout(timeout);
  }, [isFetching, isLoading]);

  return loading;
};
