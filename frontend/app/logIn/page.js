"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
import LogInSingInBar from "@/components/LoginSignInNavBar";
import MobilAppNavBar from "@/components/MobilAppNavBar";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setContextId, setActiveUser } = useContext(HandleWorkspaceContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      email,
      password,
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

    setEmail("");
    setPassword("");
  }

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-50">
        <LogInSingInBar></LogInSingInBar>
        {/* <MobilAppNavBar></MobilAppNavBar>  */}
        {/* <Sidebar></Sidebar> */}
      </div>
      <section className="flex justify-center items-center min-h-screen overflow-hidden pt-0 lg:pt-12">
        <div className="card bg-base-100 flex flex-col gap-y-8 lg:gap-y-6 border-none lg:border-[0.025rem] shadow-none lg:shadow-lg p-8 lg:p-12 w-full lg:max-w-md">
          <h2 className="text-3xl leading-loose">Welcome back to Mera!</h2>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4 pb-12 border-b-[0.025rem]"
          >
            <input
              type="text"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <div className="w-full flex justify-start items-center gap-8 lg:gap-6 ">
              <button
                type="submit"
                className="btn btn-primary ui-app gap-2 w-1/3"
              >
                Log in
              </button>
              <p className="link-hover pr-4 "> Forgot your password?</p>
            </div>

            <button type="button" className="btn ui-app gap-2 w-full">
              Log in with Google
            </button>
          </form>
          <div className="flex flex-row lg:flex-col items-center justify-center">
            <p>Don't have an account yet? </p>
            <Link href="/signUp">
              <p className="ml-2">Sign up now!</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
