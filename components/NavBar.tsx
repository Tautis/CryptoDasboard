"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Transition } from "@headlessui/react";
import type { User } from "firebase/auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Close mobile menu on route change
  const pathname = usePathname();
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function handleLogin() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function handleSignOut() {
    await signOut(auth);
    setDropdownOpen(false);
  }

  const navLinks = (
    <>
      <Link
        href="/favorites"
        className="px-2 sm:px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition text-sm sm:text-base"
      >
        Favorites
      </Link>
      <Link
        href="/topcoins"
        className="px-2 sm:px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition text-sm sm:text-base"
      >
        Top Coins
      </Link>
      <Link
        href="/allcoins"
        className="px-2 sm:px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition text-sm sm:text-base"
      >
        All Coins
      </Link>
    </>
  );

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 dark:text-blue-400 tracking-tight"
          >
            CryptoDash
          </Link>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 xs:gap-2 sm:gap-4 flex-wrap">
          {navLinks}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 cursor-pointer"
                  onClick={() => setDropdownOpen((v) => !v)}
                />
              )}
              {dropdownOpen && (
                <div
                  className="absolute left-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg border border-gray-200 dark:border-gray-700 z-50 py-2"
                  style={{ transform: "translateX(-50%)" }}
                >
                  <div className="px-4 py-2 text-gray-700 dark:text-gray-200 text-sm font-medium max-w-[180px] truncate">
                    {user.displayName || user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 rounded-b-md bg-red-500 text-white hover:bg-red-600 transition text-sm"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-2 sm:px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Login with Google
            </button>
          )}
        </div>
        {/* Hamburger for Mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded text-blue-600 dark:text-blue-400 focus:outline-none"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
        >
          {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>
      {/* Mobile Nav Drawer */}
      <Transition
        show={mobileOpen}
        enter="transition-all duration-300 ease-out"
        enterFrom="transform scale-y-95 opacity-0 max-h-0"
        enterTo="transform scale-y-100 opacity-100 max-h-[500px]"
        leave="transition-all duration-200 ease-in"
        leaveFrom="transform scale-y-100 opacity-100 max-h-[500px]"
        leaveTo="transform scale-y-95 opacity-0 max-h-0"
        unmount={true}
      >
        <div className="md:hidden bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-4 origin-top overflow-hidden">
          <div className="flex flex-col gap-2">
            {navLinks}
            {user ? (
              <div className="flex items-center gap-2 mt-2">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700"
                  />
                )}
                <span className="text-gray-700 dark:text-gray-200 text-sm font-medium max-w-[120px] truncate">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition text-sm"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition text-sm"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
}
