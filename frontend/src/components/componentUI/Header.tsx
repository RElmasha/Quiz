import { Heading, Text, Box, Image } from "@chakra-ui/react";
import { CloseButton } from "../ui/close-button";
import { BannerProps } from "@/Types/BannerProps";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "../../hooks/AuthContext"
import UserProfil from "./userProfil";

export default function Home({banner}: BannerProps) {
const location = useLocation();
const user = {
  avatarUrl: 'https://example.com/avatar.jpg',
  firstName: 'John',
  lastName: 'Doe',
};

if (location.pathname==="/"){ banner = "Bienvenue sur"; }
else if (location.pathname==="/courses"){ banner = " Selectionnez un cours"; }
else if (location.pathname==="/results"){ banner = "Mes resultats"; }
else if (location.pathname==="/acompte"){ banner = "Mon compte"; }
else if (location.pathname==="/quiz"){ banner = "Commencez le quiz"; }
else if (location.pathname==="/login"){ banner = "Connexion"; }
else if (location.pathname==="/register"){ banner = "Créew votre compte"}


  return (
    <Box className="relative">

      <CloseButton className="absolute top-0 right-0 h-[32px] w-[32px] flex-shrink-0 rounded-full object-cover object-center border-s-slate-400 border-solid border-2 hover:bg-slate-400 hover:cursor-pointer" />
      
      <Box className="flex flex-row items-end">
        <Box className="w-[136px] h-[139px] flex-col justify-center items-center inline-flex mb-2">
          <Image
            src="https://res.cloudinary.com/dcg4hzbbc/image/upload/v1734080675/nhlcll4vrippmbwzlgt5.jpg"
            alt="QuizWiz"
            className="w-[136px] h-[139px] rounded-tl-[34.75px] rounded-tr-[31.75px] rounded-bl-[29.50px] rounded-br-[29.50px]"
          />
        </Box>
        
        <Box>
          <Heading className="flex flex-col">
            <Text className="font-inter w-full text-[39px] font-semibold leading-[normal] tracking-[0px] text-sky-500">
             {banner}
            </Text>
            <Text className="flex gap-4 mb-4">
              <span className="font-inter  text-[62px] font-semibold leading-[normal] tracking-[0px] text-orange-600">uiz</span>
              <span className="font-inter  text-[62px] font-semibold leading-[normal] tracking-[0px] text-gray-600">Wiz</span>
            </Text>
          </Heading>
        </Box>
         <AuthProvider>
      <Box className="">
        <UserProfil />
        
      </Box>
    </AuthProvider>
      </Box>
     
      
    </Box>
  );
}
