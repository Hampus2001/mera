"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
import LogInSingInBar from "@/components/LoginSignInNavBar";

import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setContextId, setActiveUser } = useContext(HandleWorkspaceContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      username,
      password,
      email,
    };

    try {
      const res = await fetch("http://localhost:3001/session", {
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
      console.log("Inloggad företag:", data.response.company_id);

      setContextId(data.response.company_id);
      setActiveUser(data.response);
      router.push("/schedulePage");
    } catch (err) {
      console.error("Fel vid inloggning:", err);
    }

    setUsername("");
    setPassword("");
    setEmail("");
  }

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-50">
        <LogInSingInBar></LogInSingInBar>
      </div>
      <section className="bg-white flex justify-center items-center min-h-screen">
        <div className="bg-base-100 border-2 border-black rounded-xl shadow-md w-[500px] h-[816px] p-16 mt-16">
          <h2 className="text-center mb-16 text-[40px]">
            We've been expecting you...
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input validator w-[372px] h-12 rounded-lg"
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input validator w-[372px] h-12 rounded-lg"
            />
            <input
              type="text"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input validator w-[372px] h-12 rounded-lg"
            />
            <div className="flex flex-col gap-6 mt-14">
              <label className="inline-flex items-center gap-6 ml-6">
                <input
                  type="checkbox"
                  className="checkbox checked:bg-black checked:text-white" 
                  defaultChecked 
                />
                <span className="select-none">I agree to the terms and conditions</span>{" "}
              </label>
              <label className="inline-flex items-center gap-6 ml-6">
                <input
                  type="checkbox"
                  className="checkbox checked:bg-black checked:text-white"
                  defaultChecked
                />
                <span className="select-none">
                    I have read the privacy policy
                </span>
              </label>
              <label className="inline-flex items-center gap-6 ml-6">
                <input
                  type="checkbox"
                  className="checkbox checked:bg-black checked:text-white"
                  defaultChecked
                />
                <span className="select-none">Send me ocasionally tips and updates</span>
              </label>
            </div>
            <div className="flex items-center">
            <Link href="/createWorkspace">
              <button
                type="button"
                className="btn btn-lg btn-primary mt-12 w-[372px] gap-2"
              >
                Sing Up
              </button>
              </Link>
            </div>
            <div className="flex justify-between px-12 text-sm text-gray-700">
              <span>Don't have an account yet?</span>
              <Link href="/createWorkspace">
                Sing Up Now!
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
