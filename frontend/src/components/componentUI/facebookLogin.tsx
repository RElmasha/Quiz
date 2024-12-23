// components/FacebookLoginButton.tsx

import React from "react";
import { auth, db } from "../../store/firebase/firbaseConfig"; // Import Firestore
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

function FacebookLoginButton() {
  const navigate = useNavigate();

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extraire les informations nécessaires
      const userData = {
        provider_id: user.uid,
        provider: "facebook",
        first_name: user.displayName?.split(" ")[0] || "Prénom",
        last_name: user.displayName?.split(" ")[1] || "Nom",
        email: user.email || "",
        avatar_url: user.photoURL || "",
        created_at: serverTimestamp(),
      };

      // Référence du document utilisateur
      const userRef = doc(db, "users", user.uid);

      // Vérifier si l'utilisateur existe déjà dans Firestore
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        // Si l'utilisateur n'existe pas, créer un nouveau document
        await setDoc(userRef, userData);
        console.log("Nouveau document utilisateur créé.");
      } else {
        console.log("L'utilisateur existe déjà.");
      }

      // Rediriger après connexion
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion Facebook :", error);
    }
  };

  return (
    <Button
      variant="outline"
      className="h-12 rounded-full border-2 text-[#1877F2] hover:bg-[#1877F2] hover:text-white"
      onClick={handleFacebookLogin}
    >
      <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
        <path
          fill="#1877F2"
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        />
      </svg>
      FACEBOOK
    </Button>
  );
}

export default FacebookLoginButton;
