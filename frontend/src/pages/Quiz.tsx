import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonComponent from "../components/componentUI/Button";
import CircularTimer from "../components/componentUI/CircularTime";
import ProgressBar from "../components/componentUI/progresseBar";
import Mascotte from "../components/componentUI/Mascotte";
import TravelDialog from "../components/componentUI/TravelDialog";
import ButtonPlay from "../components/componentUI/buttonPlay";
import axios from "axios";

interface Question {
  id: string;
  question: string;
  options?: string[];
  correct?: string;
}

const Quiz: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, subject } = location.state || {};

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(100); // 100 seconds

  useEffect(() => {
    if (course && subject) {
      fetchQuestions(course, subject);
    }
  }, [course, subject]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handlePlayButton();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchQuestions = async (course: string, subject: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/questions/?cours=${course}&matiere=${subject}&count=5`
      );
  
      if (response.data.questions && Array.isArray(response.data.questions)) {
        const promises = response.data.questions.map((question : Question) => {
          return fetchAnswersForQuestion(question.id);
        });
        await Promise.all(promises);
        setQuestions(response.data.questions);
      } else {
        setError("Format de données inattendu reçu pour les questions");
      }
    } catch (err) {
      setError("Échec du chargement des questions");
      console.error("Erreur lors du chargement des questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnswersForQuestion = async (questionId: string) => {
    try {
      console.log('fetchAnswersForQuestion appelée avec questionId:', questionId);
      const response = await axios.get(
        `http://localhost:8000/answers/${questionId}`
      );
      console.log('Réponse reçue:', response);
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId
            ? { ...q, options: response.data.options, correct: response.data.correct }
            : q
        )
      );
    } catch (err) {
      console.error('Erreur lors du chargement des réponses:', err);
    }
  };
  const handleAnswer = (questionId: string, selectedOption: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      fetchAnswersForQuestion(questions[currentQuestionIndex + 1].id);
    } else {
      handlePlayButton();
    }
  };

  const handlePlayButton = () => {
    navigate("/results", { 
      state: { 
        score, 
        total: questions.length, 
        answers, 
        questions,
        course, 
        subject 
      } 
    });
  };

  const currentQuestion = questions[currentQuestionIndex];

  console.log("Questions:", questions);
  console.log("Current Question:", currentQuestion);
  console.log("Answers:", answers);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box className="flex flex-row items-center justify-start mt-12 gap-8">
      <Box className="absolute top-36 left-0 right-0 z-50">
        <Box className="flex flex-col items-start justify-between w-full px-12 gap-2">
          <CircularTimer
            time={formatTime(timeRemaining)}
            value={(timeRemaining / 100) * 100}
            size={90}
            strokeWidth={5}
            color="#0078FF"
            trackColor="#E6E6E6"
            label="Remaining Time"
          />
          <ProgressBar 
            className="w-full" 
            value={(currentQuestionIndex + 1) / questions.length * 100} 
          />
          <ButtonPlay onClick={handlePlayButton} />
        </Box>
      </Box>

      <Box className="flex flex-col items-start justify-start px-10 gap-8">
        <Box className="flex flex-col items-center justify-center w-[600px] h-40 px-8">
          {loading && <Text>Chargement...</Text>}
          {error && <Text color="red.500">{error}</Text>}
          {currentQuestion ? (
            <Text fontSize="xl" fontWeight="bold">
              {currentQuestion.question}
            </Text>
          ) : (
            <Text fontSize="xl">Aucune question disponible.</Text>
          )}
        </Box>

        <Box className="grid grid-cols-2 gap-8">
  {currentQuestion && currentQuestion.options ? (
    currentQuestion.options.map((option, index) => (
      <button
        key={index}
        className="w-full h-18 text-left text-sm p-2 bg-sky-500 hover:bg-sky-700 text-white font-medium rounded-lg"
        onClick={() => handleAnswer(currentQuestion.id, option)}
      >
        {option}
      </button>
    ))
  ) : (
    <Text>Chargement des options...</Text>
  )}
</Box>
      </Box>

      {/* Section Droite avec la Mascotte et le Message */}
            <Box className="flex flex-col items-center justify-center w-full h-full gap-10">
              <TravelDialog description="Choisissez un cours et une matière, puis cliquez sur Commencer." imageSrc={"IMAGES/Whiskers_gentel.png"} alt="Whiskers" imagePosition="right" />
            </Box>
    </Box>
  );
};

export default Quiz;

