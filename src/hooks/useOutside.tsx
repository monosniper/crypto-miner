import { RefObject, useEffect } from "react";

export const useOutside = (
  ref: RefObject<HTMLElement>,
  callback: (event: MouseEvent | TouchEvent) => void,
  btnRef?: RefObject<HTMLElement>,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (
        !(event.target instanceof Node) ||
        ref.current?.contains(event.target) ||
        btnRef?.current?.contains(event.target)
      ) {
        return;
      }

      callback(event);
    };

    const mouseListener = listener as (event: MouseEvent) => void;
    const touchListener = listener as (event: TouchEvent) => void;

    document.addEventListener("mousedown", mouseListener);
    document.addEventListener("touchstart", touchListener);

    return () => {
      document.removeEventListener("mousedown", mouseListener);
      document.removeEventListener("touchstart", touchListener);
    };
  }, [ref, callback, btnRef]);
};
