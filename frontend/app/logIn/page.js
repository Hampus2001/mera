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
  const [company, setCompany] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const { setContextId, setActiveUser } = useContext(HandleWorkspaceContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      username,
      password,
      company,
      role,
      isAdmin,
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
    setCompany("");
    setRole("");
    setIsAdmin("");
  }

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-50">
        <LogInSingInBar></LogInSingInBar> 
        {/* <MobilAppNavBar></MobilAppNavBar> 
        {/* <Sidebar></Sidebar> */}
      </div>
      <section className="bg-white flex justify-center items-center min-h-screen">
        <div className="bg-base-100 border-2 border-black rounded-xl shadow-md w-[500px] h-[604px] p-16">
          <h2 className="text-center mb-16 text-[42px]">
            Welcome back to Mera!
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
            <div className="flex items-baseline gap-4">
              <button
                type="submit"
                className="btn btn-primary mt-6 w-[185px] gap-2 h-12"
              >
                Log in
              </button>
              <p> Forgot your password?</p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="btn btn-lg ui-app mt-12 w-[372px] h-12 gap-2"
              >
                Log in with Google
              </button>
            </div>
            <div className="flex justify-between px-8 text-sm text-gray-700">
              <span>Don't have an account yet?</span>
              <Link href="/createWorkspace">
              <span>Sing Up Now</span></Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
