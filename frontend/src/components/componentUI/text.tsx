import React from "react";
import { TextProps } from "../../Types/TextProps";

const TextComponent: React.FC<TextProps> = ({ text, size = "md", color = "text-gray-500" }) => {
  const sizeClass =
    size === "sm" ? "text-sm" : size === "lg" ? "text-lg font-bold" : "text-md";

  return <p className={`${sizeClass} ${color}`}>{text}</p>;
};

export default TextComponent;
