import { IToast } from "../toast/Toast.types";

export interface IToastContainerProps {
  toasts: IToast[];
  removeToast: (id: string) => void;
}
