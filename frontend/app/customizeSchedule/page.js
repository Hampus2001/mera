"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
import LogInSingInBar from "@/components/LoginSignInNavBar";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();

  const [company, setCompany] = useState("");
  const [roles, setRoles] = useState("");
  const [meraTheme, setMeraTheme] = useState("");
  const [monthView, setMonthView] = useState("");

  const { setContextId, setActiveUser } = useContext(HandleWorkspaceContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      company,
      roles,
      meraTheme,
      monthView,
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

 

    setRoles("");
    setMeraTheme("");
    setMonthView("");
  }

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-50">
        <LogInSingInBar></LogInSingInBar>
      </div>

      <section className="bg-white flex flex-col justify-center items-center min-h-screen mt-16 mb-16">
        <ul className="steps steps-vertical lg:steps-horizontal w-[800px] mb-10">
          <li className="step step-neutral">Account Details</li>
          <li className="step step-neutral">Create Schedule</li>
          <li className="step">Add Users</li>
        </ul>

        <div className="bg-base-100 border-2 border-black rounded-3xl shadow-md w-[1176px] h-[588px] p-8">
          <h2 className="text-left m-12 mb-5 text-[40px]">
            Customize your schedule
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-12">
            <div className="col-span-1 flex flex-col space-y-6 ml-12 ">
              <div className="flex gap-8 ">
                <div className="flex flex-col">
                  <label
                    htmlFor="monthView"
                    className="text-sm font-medium mt-4 mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Company's name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="input w-[230px] h-[48px] rounded-lg border-black"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="monthView"
                    className="text-sm font-medium mt-4 mb-2"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Role name"
                    value={roles}
                    onChange={(e) => setRoles(e.target.value)}
                    className="input w-[230px] h-[48px] rounded-lg  border-black"
                  />
                </div>
              </div>

              <textarea
                placeholder="My Bio description"
                className="textarea w-[492px] h-[244px] rounded-lg resize-none mb-20  border-black"
              />
            </div>

            <div className="mt-4 mb-2 ml-12">
              <div className="flex flex-col ">
                <label htmlFor="theme" className="text-sm font-medium mb-2">
                  Theme default
                </label>
                <input
                  id="theme"
                  type="text"
                  value={meraTheme}
                  required
                  placeholder="Mera Themes"
                  onChange={(e) => setMeraTheme(e.target.value)}
                  className="input validator w-[400px] h-12 rounded-lg  border-black"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="monthView"
                  className="text-sm font-medium mt-6 mb-2"
                >
                  Month view default
                </label>
                <input
                  id="monthView"
                  type="text"
                  value={monthView}
                  required
                  placeholder="Month View"
                  onChange={(e) => setMonthView(e.target.value)}
                  className="input validator w-[400px] h-12 rounded-lg border-black"
                />
              </div>
              <Link href="/createWorkspace">
              <button
                type="submit"
                className="btn btn-primary w-[400px] gap-2 h-12 mr-12 mt-[120px]"
              >
                Next
              </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
