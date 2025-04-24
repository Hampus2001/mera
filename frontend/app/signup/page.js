"use client";
import Link from "next/link";
import { useState } from "react";

import LandingNav from "@/components/LandingNav";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function createAccount(e) {
    e.preventDefault();

    const newAccount = { username, password };
    console.log("Create account:", newAccount);

    //     // await fetch("/api/signup", {
    //     //   method: "POST",
    //     //   headers: { "Content-Type": "application/json" },
    //     //   body: JSON.stringify(newAccount),
    //     // });

    //     setUsername("");
    //     setPassword("");
  }

  return (
    <>
      <LandingNav variant="signUp" />
      <section className="flex flex-col items-center justify-center min-h-screen px-6 lg:px-40 gap-y-6 bg-gradient-to-b from-white to-slate-50">
        <h1 className="font-instrument text-5xl lg:text-7xl text-center">
          Skapa ett konto
        </h1>
        <p className="font-absans text-md lg:text-lg text-gray-600 text-center max-w-xl leading-snug">
          Kom igång med att effektivisera din verksamhet. Det tar bara några
          minuter!
        </p>

        <form
          onSubmit={createAccount}
          className="flex flex-col w-full max-w-md gap-4 mt-6"
        >
          <input
            type="text"
            placeholder="Företagsnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button type="submit" className="btn btn-lg btn-primary">
            Skapa konto
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          Har du redan ett konto?{" "}
          <Link href="/login" className="text-black underline">
            Logga in här
          </Link>
        </p>
      </section>
    </>
  );
}
