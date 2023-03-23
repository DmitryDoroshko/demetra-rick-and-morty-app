import React, {createContext, useContext, useEffect, useState} from "react";
import {auth} from "../firebase";
import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User} from "@firebase/auth";

interface AuthContextValue {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  signInWithGoogle: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

interface AuthProps {
  children: React.ReactNode | JSX.Element;
}

export const AuthProvider: React.FC<AuthProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signOutFromGoogle = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return <AuthContext.Provider value={{user, signInWithGoogle, signOut: signOutFromGoogle}}>
    {children}
  </AuthContext.Provider>;
};

export const UserAuth = () => useContext(AuthContext);

export default AuthContext;