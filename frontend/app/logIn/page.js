"use client";
import { useState } from "react";
import LandingNav from "@/components/LandingNav";

export default function AuthPage() {
  const [company, setCompany] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      username,
      password,
      company,
    };

    try {
      const res = await fetch("http://localhost:5000/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();
      console.log("Inloggad företag:", data);
      // Aquí puedes guardar token, redirigir, etc.
    } catch (err) {
      console.error("Fel vid inloggning:", err);
    }

    setUsername("");
    setPassword("");
    setCompany("");
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
          className="flex flex-col max-w-md gap-4 mt-6 w-full"
        >
          <input
            type="text"
            placeholder="Företagsnamn"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="input"
          />
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
          <button type="submit" className="btn btn-primary btn-lg">
            Logga in
          </button>
        </form>
      </section>
    </>
  );
}
