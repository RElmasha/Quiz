export interface ButtonProps {
    text: string;
    icon?: React.ReactElement;
   color? : string
   onClick?:()=>void
   size? : string
   className?: string
   type? : 'submit' | 'reset' | 'button'
   textSize? : string
}