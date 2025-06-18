"use client";

// External imports
import { useEffect, useState } from "react";

// Firebase & API imports
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAllCoins } from "@/lib/coingecko";

// Types
import type { Coin } from "../../types/coin";

// Main component
export default function AllCoins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  // Fetch all coins on mount
  useEffect(() => {
    async function fetchData() {
      const allCoins = await getAllCoins();
      setCoins(allCoins || []);
    }
    fetchData();
  }, []);

  // Listen for auth changes and fetch favorites
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) fetchFavorites(user.uid);
    });
    return () => unsub();
  }, []);

  // Fetch user's favorite coins from Firestore
  async function fetchFavorites(uid: string) {
    const ref = doc(db, "favorites", uid);
    const snap = await getDoc(ref);
    setFavorites(snap.exists() ? snap.data().coins || [] : []);
  }

  // Toggle favorite status for a coin
  async function toggleFavorite(coinId: string) {
    if (!user) return;
    const ref = doc(db, "favorites", user.uid);
    const isFav = favorites.includes(coinId);
    if (isFav) {
      await updateDoc(ref, { coins: arrayRemove(coinId) });
      setFavorites(favorites.filter((id) => id !== coinId));
    } else {
      await setDoc(ref, { coins: arrayUnion(coinId) }, { merge: true });
      setFavorites([...favorites, coinId]);
    }
  }

  // Filter coins based on search input
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="p-2 sm:p-4">
      <div className="text-xl sm:text-2xl font-bold mb-4">All Crypto Coins</div>
      <input
        type="text"
        placeholder="Search coins..."
        className="mb-6 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded w-full max-w-full sm:max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {coins.length === 0 ? (
          // Skeleton loading cards
          Array.from({ length: 8 }).map((_, i) => (
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
        ) : filteredCoins.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No coins found.
          </div>
        ) : (
          filteredCoins.map((coin) => (
            <div
              className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-lg shadow p-3 sm:p-4 gap-2 border border-gray-200 dark:border-gray-700 relative"
              key={coin.id}
            >
              {user && (
                <button
                  className="absolute top-2 right-2 text-yellow-400 cursor-pointer"
                  onClick={() => toggleFavorite(coin.id)}
                  aria-label="Toggle Favorite"
                >
                  {favorites.includes(coin.id) ? "★" : "☆"}
                </button>
              )}
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
