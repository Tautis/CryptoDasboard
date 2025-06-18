"use client";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../../lib/firebase";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <main className="p-4">
      {user ? (
        <div>
          <p>Signed in as {user.displayName}</p>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Sign in with Google</button>
      )}
    </main>
  );
}
