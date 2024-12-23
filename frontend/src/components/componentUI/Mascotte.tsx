import {Image, Box} from "@chakra-ui/react"
import { CardProps } from "../../Types/CardProps";
export default function Mascotte({className, imageUrl, alt}: CardProps) {
    return (
      <Image
        className="h-[506px] w-full rounded-[42px] border border-solid border-neutral-100 object-cover object-center "
        src={imageUrl}
        alt={alt}
        loading="lazy"
       />
    );
  }

 