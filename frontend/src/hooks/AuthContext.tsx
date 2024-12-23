// context/AuthContext.tsx

import { createContext, useState, useEffect, ReactNode } from "react";
import { auth, db } from "../store/firebase/firbaseConfig"; // Import Firebase config
import { doc, getDoc } from "firebase/firestore";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";

interface User {
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  provider: string;
  email?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUser({
              id: firebaseUser.uid,
              avatarUrl: userData.avatar_url,
              firstName: userData.first_name,
              lastName: userData.last_name,
              provider: userData.provider,
              email: userData.email || "",
              phoneNumber: userData.phone_number || "",
            });
          } else {
            console.error("User document does not exist.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
};
