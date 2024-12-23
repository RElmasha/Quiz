import { Box } from "@chakra-ui/react";
import {Link} from "react-router-dom"
import ButtonComponent from "../components/componentUI/Button";
import Mascotte from "../components/componentUI/Mascotte";
import TravelDialog from "../components/componentUI/TravelDialog";

export default function Home()  {
 
  return (
    <Box className="flex flex-row gap-56">
    <Box className="flex flex-col w-44 h-80 justify-center p-12 items-start mt-44 gap-8 ">
      <Link to="/courses">
     <ButtonComponent text="Commencer" color="bg-sky-500"/>
     </Link>
     <Link to="/results">
     <ButtonComponent text="Mes resultats" color="bg-sky-500" />
     </Link>
     <Link to="/acompte">
     <ButtonComponent text="Compte" color="bg-sky-500"/>
     </Link>
    </Box>
    {/* Section Droite avec la Mascotte et le Message */}
          <Box className="flex flex-col items-center justify-center w-full h-full gap-10">
            <TravelDialog description="Choisissez un cours et une matière, puis cliquez sur Commencer." imageSrc={"IMAGES/Whiskers_Ask.png"} alt="Whiskers" imagePosition="right" />
          </Box>
    </Box>
  );
}