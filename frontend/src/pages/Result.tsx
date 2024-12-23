import React from "react";
import { Box, Text, VStack, HStack, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import DataResult from "../components/componentUI/DataResult";
import Mascotte from "../components/componentUI/Mascotte";
import TravelDialog from "../components/componentUI/TravelDialog";

interface Question {
  text: string;
  options: string[];
  correct: string;
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, answers, questions, course, subject } = location.state || {
    score: 0,
    total: 0,
    answers: [],
    questions: [],
    course: "Inconnu",
    subject: "Inconnu",
  };

  const handleRetry = () => {
    navigate("/", { state: { course, subject } });
  };

  return (
    <Box className="flex flex-row">
      <Box className="flex flex-col items-start p-32 justify-center h-screen">
        <DataResult score={score} total={total} course={course} subject={subject} />
        <VStack align="start" gap={4} mt={8}>
          <Text fontSize="2xl" fontWeight="bold">Détails des réponses:</Text>
          {questions.map((question: Question, index: number) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="md">
              <Text fontWeight="bold">{question.text}</Text>
              <Text color={answers[index] === question.correct ? "green.500" : "red.500"}>
                Votre réponse: {answers[index]}
              </Text>
              <Text color="green.500">Réponse correcte: {question.correct}</Text>
            </Box>
          ))}
        </VStack>
        <Button onClick={handleRetry} mt={8} colorScheme="blue">
          Recommencer le quiz
        </Button>
      </Box>
{/* Section Droite avec la Mascotte et le Message */}
      <Box className="flex flex-col items-center justify-center w-full h-full gap-10">
        <TravelDialog description="Choisissez un cours et une matière, puis cliquez sur Commencer." imageSrc={"IMAGES/Whiskers_gentel.png"} alt="Whiskers" imagePosition="right" />
      </Box>
    </Box>
  );
}

