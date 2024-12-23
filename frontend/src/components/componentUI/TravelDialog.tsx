
import { Box, Text, Image } from "@chakra-ui/react";
import { TalkProps } from "@/Types/TalkProps";

interface ExtendedTalkProps extends TalkProps {
    imageSrc: string; // Chemin ou URL de l'image
    imagePosition?: "left" | "right"; // Position de l'image (par défaut: gauche)
    alt : string; // Texte alternatif pour l'image
}

export default function TravelDialog({ description, imageSrc, imagePosition = "left", alt}: ExtendedTalkProps) {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" mb="64">
            {/* Image du personnage */}
            {imagePosition === "left" && (
                <Image
                    src={imageSrc}
                    alt={alt}
                    boxSize="150px"
                    objectFit="contain"
                    mr="4"
                />
            )}

            {/* Boîte de dialogue */}
            <Box position="relative" display="inline-block" textAlign="center">
                {/* Nuage principal */}
                <Box
                    bg="white"
                    borderRadius="full"
                    boxShadow="0px 4px 6px rgba(0, 0, 0, 0.3)"
                    width="300px"
                    height="200px"
                    position="relative"
                    mx="auto"
                    _before={{
                        content: '""',
                        position: "absolute",
                        top: "40%",
                        right: "-40px",
                        width: "40px",
                        height: "40px",
                        bg: "white",
                        borderRadius: "full",
                        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
                    }}
                    _after={{
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        right: "-70px",
                        width: "20px",
                        height: "20px",
                        bg: "white",
                        borderRadius: "full",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                ></Box>
                {/* Texte dans la boîte */}
                <Text
                    fontSize="20px"
                    fontWeight="semibold"
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    color="black"
                >
                    {description}
                </Text>
            </Box>

            {/* Image à droite */}
            {imagePosition === "right" && (
                <Image
                    src={imageSrc}
                    alt="Character"
                    // boxSize="150px"
                    objectFit="contain"
                    loading="lazy"
                    ml="4"
                    className="h-[500px] w-[500px] object-cover object-center"
                />
            )}
        </Box>
    );
}

