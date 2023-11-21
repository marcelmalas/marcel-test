import { IButton } from "../button/Button.types";

export interface IIconButtonProps extends Omit<IButton, "children"> {
  icon: JSX.Element;
  text: string;
}
