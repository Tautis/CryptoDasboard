"use client";

// External imports
import { useEffect, useState } from "react";

// Firebase & API imports
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getAllCoins } from "@/lib/coingecko";

// Types
import type { Coin } from "../../types/coin";

export default function Favorites() {
  const [user, setUser] = useState<User | null>(null);
  const [favoriteCoins, setFavoriteCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Listen for auth changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) window.location.href = "/login";
    });
    return () => unsub();
  }, []);

  // Fetch favorites and coin data
  useEffect(() => {
    async function fetchFavoritesAndCoins(uid: string) {
      setLoading(true);
      const ref = doc(db, "favorites", uid);
      const snap = await getDoc(ref);
      const allCoins = await getAllCoins();
      if (snap.exists()) {
        const favIds: string[] = snap.data().coins || [];
        setFavoriteCoins(
          allCoins.filter((coin: Coin) => favIds.includes(coin.id))
        );
      } else {
        setFavoriteCoins([]);
      }
      setLoading(false);
    }
    if (user) fetchFavoritesAndCoins(user.uid);
  }, [user]);

  if (!user) return null;

  return (
    <main className="p-2 sm:p-4">
      <div className="text-xl sm:text-2xl font-bold mb-4">
        Your Favorite Coins
      </div>
      <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          // Skeleton loading cards
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-lg shadow p-4 gap-2 border border-gray-200 dark:border-gray-700 animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mb-2" />
              <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))
        ) : favoriteCoins.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          favoriteCoins.map((coin) => (
            <div
              className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-lg shadow p-3 sm:p-4 gap-2 border border-gray-200 dark:border-gray-700"
              key={coin.id}
            >
              <img
                src={coin.image}
                alt={coin.name}
                width={48}
                height={48}
                className="mb-2"
              />
              <div className="font-semibold text-lg">{coin.name}</div>
              <div className="text-gray-500 text-sm mb-1">
                {coin.symbol?.toUpperCase()}
              </div>
              <div className="flex flex-col items-center text-sm">
                <span>
                  <span className="font-medium">Current Price:</span> $
                  {coin.current_price.toLocaleString()}
                </span>
                <span>
                  <span className="font-medium">All-Time Low Year:</span>{" "}
                  {new Date(coin.atl_date).getFullYear()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
