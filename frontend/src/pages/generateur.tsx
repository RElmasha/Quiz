import React, { useState } from "react";
import axios from "axios";

const GenerateContent = () => {
    const [courseName, setCourseName] = useState("");
    const [response, setResponse] = useState("");

    const handleGenerate = async () => {
        try {
            const res = await axios.post("http://localhost:8000/generate", {
                course_name: courseName,
            });
            setResponse(res.data.generated_text || "Aucune donnée reçue.");
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API :", error);
            setResponse("Erreur lors de l'appel à l'API.");
        }
    };

    return (
        <div>
            <h1>Générateur de Contenu</h1>
            <input
                type="text"
                placeholder="Nom du cours"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
            />
            <button onClick={handleGenerate}>Générer</button>
            <p>Réponse : {response}</p>
        </div>
    );
};

export default GenerateContent;
