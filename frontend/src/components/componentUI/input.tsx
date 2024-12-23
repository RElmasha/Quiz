import React, { forwardRef } from "react";
import { Input, Box } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group"; // Ton composant InputGroup
import { LucideIcon } from "lucide-react";

export interface InputProps {
  placeholder: string;
  type?: string;
  icon?: React.ReactElement<LucideIcon>;
  className?: string;
}

// Utilisation de forwardRef pour accepter une ref
const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text", icon, className }, ref) => {
    return (
      <Box className={className}>
        <InputGroup startElement={icon}>
          <Input ref={ref} placeholder={placeholder} type={type} />
        </InputGroup>
      </Box>
    );
  }
);

export default InputComponent;
