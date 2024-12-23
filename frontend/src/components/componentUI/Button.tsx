import { Button } from "../ui/button";
import { Box } from "@chakra-ui/react";
import { ButtonProps } from "../../Types/ButtonProps";


export default function ButtonComponent({text, color, onClick, size, icon, type, textSize}: ButtonProps) {
    
    return (
        <Box className={`flex w-full items-center  justify-center rounded-[45px]  py-[15px] pl-[89px] pr-24 drop-shadow-lg [box-shadow:_0px_4px_8px_3px_rgba(0,0,0,0.15) ${color}`} onClick={onClick} boxSize={size}>
            <Button className={`flex justify-center items-center font-inter text-center font-semibold leading-[normal] tracking-[0px] text-cyan-100 ${textSize}`} >
                  {icon && <span>{icon}</span>}
                  {text}
                </Button>
        </Box>
    )
}


