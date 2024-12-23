import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

interface CircularTimerProps {
  time: string; // Temps à afficher au centre (format "MM:SS")
  value: number; // Progression en pourcentage (0 à 100)
  size?: number; // Taille du cercle (diamètre en pixels)
  strokeWidth?: number; // Épaisseur de l'anneau
  color?: string; // Couleur de progression
  trackColor?: string; // Couleur de fond du cercle
  label?: string; // Texte à afficher à gauche
}

const CircularTimer: React.FC<CircularTimerProps> = ({
  time,
  value,
  size = 120, // Taille par défaut
  strokeWidth = 8, // Épaisseur par défaut
  color = "#0078FF", // Couleur de progression (bleu)
  trackColor = "#E6E6E6", // Couleur de fond (gris)
  label = "Timer", // Texte par défaut à gauche
}) => {
  // Dimensions du cercle et calcul des valeurs
  const radius = (size - strokeWidth) / 2; // Rayon (tenant compte de l'épaisseur)
  const circumference = 2 * Math.PI * radius; // Circonférence complète
  const offset = circumference - (value / 100) * circumference; // Offset pour la progression

  return (
    <HStack gap={6} align="center" flexDirection="row-reverse">
      {/* Cercle et texte */}
      <Box position="relative" width={`${size}px`} height={`${size}px`}>
        <svg width={size} height={size}>
          {/* Cercle de fond */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Cercle de progression */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotation pour commencer en haut à gauche
          />
        </svg>

        {/* Texte au centre */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Text fontSize="xl" fontWeight="bold" color={color}>
            {time}
          </Text>
        </Box>
      </Box>

      {/* Texte à gauche */}
      <Box textAlign="right">
        <Text fontSize="lg" fontWeight="bold" color="black">
          {label}
        </Text>
      </Box>
    </HStack>
  );
};

export default CircularTimer;
