export interface IButton {
  children: React.ReactNode;
  type?: "button" | "reset" | "submit" | undefined;
  onClick?: () => void;
  disabled?: boolean;
}
