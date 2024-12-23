export interface DialogProps {
  isOpen: boolean; 
  onClose: () => void; 
  title: string;
  body: string;
  onEasyPress: () => void;
  onDifficultPress: () => void;
}
