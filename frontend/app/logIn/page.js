"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
// import LogInSingInBar from "@/components/LoginSignInNavBar";
import MobilAppNavBar from "@/components/MobilAppNavBar";

export default function AuthPage() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const { contextId, setContextId } = useContext(HandleWorkspaceContext);

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
      router.push("/createprojects");
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
        <MobilAppNavBar></MobilAppNavBar>
      </div>
      <section className="bg-base-100 flex flex-col items-center justify-center min-h-screen px-6 lg:px-40 gap-y-6 pt-24">
        <div className="border-2 border-black rounded-xl p-4 m-4 gap-4 w-full max-w-xl">
          <h2 className="text-center">Logga in</h2>
          <p className="text-center max-w-xl leading-snug mt-4">
            Welcome back! Log in with your credentials.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input validator"
              minLength="3"
              maxLength="30"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input validator"
              minLength="3"
              maxLength="30"
            />
            <input
              type="email"
              required
              placeholder="Email"
              className="input validator"
            />
            <input
              type="text"
              required
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="input validator"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
            />
            <select
              className="select validator col-span-1"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option disabled value="">
                Position
              </option>
              <option>Role 1</option>
              <option>Role 2</option>
            </select>
            <select
              className="select validator col-span-1"
              required
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
            >
              <option disabled value="">
                Admin
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>

            <button
              className="btn btn-secondary w-full col-span-2 mt-2"
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
