"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
import LogInSingInBar from "@/components/LoginSignInNavBar";
import MobilAppNavBar from "@/components/MobilAppNavBar";
import Sidebar from "@/components/Sidebar";
import AppNavBar from "@/components/AppNavBar";


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
      router.push("/schedulePage");
      setActiveUser(user);  

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
        {/* <LogInSingInBar></LogInSingInBar> */}
      {/* <MobilAppNavBar></MobilAppNavBar>  */}
      <Sidebar></Sidebar>
      <AppNavBar></AppNavBar>
      </div>
      <section className="bg-base-100 flex items-center justify-center min-h-screen px-6 lg:px-40 gap-y-6 pt-24">
        <div className="border-2 border-black rounded-xl p-[250px_75px] shadow-md w-full h-full max-w-xl">
          <h2 className="text-center p-[4-rem]">Welcome back to Mera!</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-4">
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input validator"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input validator"
            />
            <button className="btn btn-primary mt-2 w-fit" type="submit">
              Log in
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
