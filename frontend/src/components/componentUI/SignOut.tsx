// SignOut.tsx
import React from 'react';
import { auth } from '../../store/firebase/firbaseConfig';

const SignOut: React.FC = () => {
  const signOut = async () => {
    try {
      await auth.signOut();
      // Handle sign-out (e.g., redirect to a login page)
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <button onClick={signOut}>Sign Out</button>
  );
};

export default SignOut;
