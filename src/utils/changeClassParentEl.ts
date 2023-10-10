import { DragEvent, ChangeEvent, MouseEvent, TouchEvent } from "react";

export const changeClassParentEl = (
  e: DragEvent | ChangeEvent | MouseEvent | TouchEvent,
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
