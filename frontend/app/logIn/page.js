"use client";
import { useState } from "react";
import LandingNav from "@/components/LandingNav";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { username, password };
    console.log("Logga in:", payload);

    setUsername("");
    setPassword("");
  }

  return (
    <>
      <LandingNav variant="appMode" />
      <section className="flex flex-col items-center justify-center min-h-screen px-6 lg:px-40 gap-y-6 pt-24">
        <h1 className="font-instrument text-5xl lg:text-7xl text-center">
          Logga in
        </h1>
        <p className="font-absans text-md lg:text-lg text-center max-w-xl leading-snug">
          Välkommen tillbaka! Logga in med dina uppgifter.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-md gap-4 mt-6"
        >
          <input
            type="text"
            placeholder="Företagsnamn eller email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn">
            Logga in
          </button>
        </form>
      </section>
    </>
  );
}
