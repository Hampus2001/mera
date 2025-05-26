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
      <section className="flex justify-center items-center min-h-screen overflow-hidden pt-8 lg:pt-12">
        <div className="card bg-base-100 flex flex-col gap-y-8 lg:gap-y-6 border-none lg:border-[0.025rem] shadow-none lg:shadow-lg p-8 lg:p-12 w-full lg:max-w-md">
          <h2 className="text-3xl leading-loose">
            We've been expecting you...
          </h2>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 ">
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input validator w-full"
            />

            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input validator w-full"
            />
            <input
              type="text"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input validator w-full"
            />
          </form>
          <div className="w-full flex flex-col gap-y-4">
            <label className="w-full flex justify-start items-center gap-4 lg:gap-4 ">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checked:bg-neutral checked:text-neutral-content"
                defaultChecked
              />
              <span className="select-none">
                I agree to the terms and conditions
              </span>
            </label>
            <label className="w-full flex justify-start items-center gap-4 lg:gap-4   ">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checked:bg-neutral checked:text-neutral-content"
                defaultChecked
              />
              <span className="select-none">
                I have read the privacy policy
              </span>
            </label>
            <label className="w-full flex justify-start items-center gap-4 lg:gap-4  ">
              <input
                type="checkbox"
                className="checkbox checkbox-sm checked:bg-neutral checked:text-neutral-content"
                defaultChecked
              />
              <span className="select-none">
                Send me occasional tips and updates
              </span>
            </label>
          </div>

          <div className="flex border-b-[0.025rem] w-full items-center justify-start pb-8 lg:pb-12">
            <Link className="w-full" href="/createWorkspace">
              <button className="btn ui-app btn-primary w-full">Next</button>
            </Link>
          </div>

          <div className="flex flex-row lg:flex-col items-center justify-center ">
            <p>Already have an account? </p>
            <Link href="/logIn">
              <p className="ml-2">Yes, go to log in</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
