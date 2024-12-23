import  { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
  PopoverCloseTrigger,
} from "../components/ui/popover";
import ButtonComponent from "../components/componentUI/Button";
import Mascotte from "../components/componentUI/Mascotte";
import TravelDialog from "../components/componentUI/TravelDialog";
import { useNavigate } from "react-router-dom";
import { DialogProps } from "@/Types/DialogProps";
import { StartButton } from "../components/componentUI/StartQuizButton";
interface Category {
  name: string;
}

interface Course {
  name: string;
}

interface Subject {
  name: string;
}

export default function Courses({ onEasyPress, onDifficultPress }: DialogProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Charger les catégories au montage du composant
  useEffect(() => {
    loadCategories();
  }, []);

  // Fonction pour charger les catégories depuis l'API
  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/categories/");
      if (response.data.categories && Array.isArray(response.data.categories)) {
        setCategories(response.data.categories.map((name: string) => ({ name })));
      } else {
        setError("Unexpected data format received for categories");
      }
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  // Charger les cours en fonction de la catégorie sélectionnée
  const handleCategoryChange = async (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedCourse("");
    setSelectedSubject("");
    setSubjects([]);
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/cours/?category=${categoryName}`);
      if (response.data.cours && Array.isArray(response.data.cours)) {
        setCourses(response.data.cours.map((name: string) => ({ name })));
      } else {
        setError("Unexpected data format received for courses");
        setCourses([]);
      }
    } catch (err) {
      setError("Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };


  const handleCourseChange = async (courseName: string) => {
    setSelectedCourse(courseName);
    setSelectedSubject("");
    setSubjects([]);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8000/matieres/?cours=${courseName}`);
      if (response.data.matieres && Array.isArray(response.data.matieres)) {
        setSubjects(response.data.matieres.map((name: string) => ({ name })));
      } else {
        setError("Unexpected data format received for subjects");
      }
    } catch (err) {
      setError("Failed to load subjects");
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    if (selectedCategory && selectedCourse && selectedSubject) {
      navigate("/quiz", {
        state: {
          category: selectedCategory,
          course: selectedCourse,
          subject: selectedSubject,
        },
      });
    } else {
      alert("Veuillez sélectionner une catégorie, un cours et une matière avant de commencer.");
    }
  };

  return (
    <Box className="flex flex-row w-full h-full justify-center items-center gap- mt-10">
      <Box className="flex flex-row">
        <Box className="flex flex-col  items-start mt-24 m-12 gap-10">
        {/* Sélection de la Catégorie */}
        <PopoverRoot>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline">
              <ButtonComponent text="Choisir une Catégorie" color="bg-sky-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <PopoverCloseTrigger />
              <PopoverTitle fontWeight="medium">Sélectionnez une catégorie</PopoverTitle>
              <Box my="4">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  style={{ width: "100%", padding: "8px" }}
                >
                  <option value="">-- Sélectionnez une catégorie --</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>

        {/* Choix du Cours */}
        <PopoverRoot>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline">
              <ButtonComponent text="Choisir un Cours" color="bg-sky-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <PopoverCloseTrigger />
              <PopoverTitle fontWeight="medium">Sélectionnez un cours</PopoverTitle>
              <Box my="4">
                {selectedCategory ? (
                  <select
                    value={selectedCourse}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    style={{ width: "100%", padding: "8px" }}
                  >
                    <option value="">-- Sélectionnez un cours --</option>
                    {courses.map((course) => (
                      <option key={course.name} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Text>Veuillez d'abord sélectionner une catégorie</Text>
                )}
              </Box>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>

        {/* Choix de la Matière */}
        <PopoverRoot>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline">
              <ButtonComponent text="Choisir une Matière" color="bg-sky-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverCloseTrigger />
            <Box my="4">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              >
                <option value="">-- Sélectionnez une matière --</option>
                {subjects.map((subject) => (
                  <option key={subject.name} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </Box>
          </PopoverContent>
        </PopoverRoot>
        <Box>
        <Box>
          <PopoverRoot>
           <PopoverTrigger asChild>
             <Button>
         <ButtonComponent text="Niveau" color="bg-sky-500" />
         </Button>
           </PopoverTrigger>
           <PopoverContent>
             <PopoverArrow />
             <PopoverBody>
               <PopoverCloseTrigger/>
               <PopoverTitle fontWeight="medium">Choisissez un niveau</PopoverTitle>
               <Text my="4"> 
               Veuillez choisir entre les niveaux Facile ou Difficile."
               </Text>
               <Text my="4">
               <Button onClick={onEasyPress} variant="outline">
         Facil
         </Button>
         <Button onClick={onDifficultPress} colorScheme="blue">
           Difficil
          </Button>
               </Text>
             </PopoverBody>
           </PopoverContent>
         </PopoverRoot>
         </Box>
        </Box>
        </Box>
        
{/* Affichage des messages de chargement et d'erreur */}
<Box className="">

         <StartButton onClick={handleStartQuiz} colorScheme="blue"IsDisabled={!selectedCategory || !selectedCourse || !selectedSubject} />

      </Box>

      {/* Section Droite avec la Mascotte et le Message */}
      <Box className="flex flex-col items-center justify-center w-full h-full gap-10">
        <TravelDialog description="Choisissez un cours et une matière, puis cliquez sur Commencer." imageSrc={"IMAGES/Whiskers_gentel.png"} alt="Whiskers" imagePosition="right" />
      </Box>
      
      </Box>

      
    </Box>
  );
}

