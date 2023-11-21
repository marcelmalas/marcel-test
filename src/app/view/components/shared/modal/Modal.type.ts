export interface IModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  headerText?: string;
}
