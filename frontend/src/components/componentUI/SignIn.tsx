// SignIn.tsx
import React, { useState } from 'react';
import { auth } from '../../store/firebase/firbaseConfig'; // Import your Firebase auth instance
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button, Box } from '@chakra-ui/react';
import { doc, setDoc, getFirestore } from 'firebase/firestore'; // Import Firestore functions
import { useNavigate } from 'react-router-dom';

const SignInWithGoogleButton: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
const navigate = useNavigate();
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider); // Use signInWithPopup correctly
      const user = result.user;

      // Get Firestore instance
      const db = getFirestore();

      // Create a new user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        provider_id: user.providerId,
        provider: 'google',
        first_name: user.displayName ? user.displayName.split(' ')[0] : '',
        last_name: user.displayName ? user.displayName.split(' ')[1] : '',
        email: user.email || '',
        avatar_url: user.photoURL || '',
        created_at: new Date(),
      });

      // Handle successful sign-in (e.g., redirect to a different page)
      console.log('User signed in successfully:', user);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Box>
      {error && <p>{error}</p>}
      <Button
        variant="outline"
        className="h-12 rounded-full border-2 text-[#EA4335] hover:bg-[#EA4335] hover:text-white"
        onClick={signInWithGoogle}
      >
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#4285F4"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        GOOGLE
      </Button>
    </Box>
  );
};

export default SignInWithGoogleButton;
