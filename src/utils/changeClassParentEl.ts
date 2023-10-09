import { DragEvent, ChangeEvent, MouseEvent } from "react";

export const changeClassParentEl = (
  e: DragEvent | ChangeEvent | MouseEvent,
  action: "add" | "remove",
  classEl: string,
  containsClass?: string,
) => {
  if (!(e.target instanceof HTMLElement)) return;

  if (e.target.parentNode) {
    const parentElement = e.target.parentElement;

    if (!containsClass) {
      return parentElement?.classList[action](classEl);
    }

    if (parentElement?.classList.contains(containsClass)) {
      parentElement?.classList[action](classEl);
    }
  }
};
