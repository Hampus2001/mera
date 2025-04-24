"use client";
import Link from "next/link";
import { useState } from "react";
import LandingNav from "@/components/LandingNav";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { username, password };

    if (isLogin) {
      console.log("Logga in:", payload);
    } else {
      console.log("Skapa konto:", payload);
    }

    setUsername("");
    setPassword("");
  }

  return (
    <>
      <LandingNav variant={isLogin ? "login" : "signUp"} />
      <section className="flex flex-col items-center justify-center min-h-screen px-6 lg:px-40 gap-y-6 bg-gradient-to-b from-white to-slate-50 pt-24">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-full ${
              !isLogin ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Skapa konto
          </button>
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-full ${
              isLogin ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Logga in
          </button>
        </div>

        <h1 className="font-instrument text-5xl lg:text-7xl text-center">
          {isLogin ? "Logga in" : "Skapa ett konto"}
        </h1>
        <p className="font-absans text-md lg:text-lg text-gray-600 text-center max-w-xl leading-snug">
          {isLogin
            ? "Välkommen tillbaka! Logga in med dina uppgifter."
            : "Kom igång med att effektivisera din verksamhet. Det tar bara några minuter!"}
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md gap-4 mt-6"
        >
          <input
            type="text"
            placeholder="Företagsnamn eller email"
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
            {isLogin ? "Logga in" : "Skapa konto"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          {isLogin ? (
            <>
              Har du inget konto?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-black underline"
              >
                Skapa konto här
              </button>
            </>
          ) : (
            <>
              Har du redan ett konto?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-black underline"
              >
                Logga in här
              </button>
            </>
          )}
        </p>
      </section>
    </>
  );
}
