import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Import de Link pour gérer les routes
import { FooterProps } from "@/Types/FooterProps";
import { Button } from "../ui/button";

const Footer: React.FC<FooterProps> = ({ links }) => {
  return (
    <Box as="footer" bg="gray.300" py={4} px={8}>
      <HStack justify="space-around" gap={4}>
        {links.map((link, index) => (
          <Link key={index} to={link.path} style={{ textDecoration: "none" }}>
            {/* Chakra UI Button intégré au Link */}
            <Button variant="ghost">{link.label}</Button>
          </Link>
        ))}
      </HStack>
    </Box>
  );
};

export default Footer;
