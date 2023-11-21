export interface IToast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface IToastProps {
  toast: IToast;
  onClose: (id: string) => void;
}
