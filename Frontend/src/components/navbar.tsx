"use client";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-slate-100 border border-b-2 border-slate-200">
      <h1 className="flex-1 text-center text-xl">Restaverse</h1>
      <button
        className="text-lg"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </header>
  );
};

export default Navbar;
