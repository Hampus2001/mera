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

      <section className="flex flex-col justify-center items-center w-full min-h-screen overflow-hidden pt-8 lg:pt-12 gap-y-6">
        <ul className=" pt-16 steps steps-xs lg:steps-sm w-md lg:w-4xl steps-horizontal">
          <li className="step steps-xs lg:steps-sm steps-vertical step-neutral text-sm"></li>
          <li className="step steps-xs lg:steps-sm step-neutral text-sm"></li>
          <li className="step steps-xs lg:steps-sm step-neutral-content"></li>
        </ul>

        <div className=" border-none card bg-base-100 flex flex-col gap-y-8 lg:gap-y-6 lg:border-[0.025rem] shadow-none lg:shadow-lg p-8 lg:p-12 w-full lg:max-w-4xl">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 items-start justify-start gap-6 w-full"
          >
            <h2 className="col-span-1 text-3xl leading-loose w-full ">
              Customize your schedule
            </h2>

            <div className="col-start-1 col-span-1 flex flex-col gap-y-8 lg:gap-y-6 w-full ">
              <div className="flex gap-x-8 lg:gap-x-6 w-full">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="monthView"
                    className="text-xs leading-relaxed ui-app pl-3"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Company's name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="input validator w-full  "
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="monthView"
                    className="text-xs leading-relaxed ui-app pl-3"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Role name"
                    value={roles}
                    onChange={(e) => setRoles(e.target.value)}
                    className="input validator "
                  />
                </div>
              </div>

              <textarea
                placeholder="My Bio description"
                className="textarea w-full  rounded-lg resize-none h-full "
              />
            </div>

            <div className="col-start-1 lg:col-start-2 flex flex-col gap-8 lg:gap-6 w-full items-start justify-start">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="theme"
                  className="text-xs leading-relaxed ui-app pl-3"
                >
                  Default Theme
                </label>
                <select
                  id="theme"
                  type="text"
                  value={meraTheme}
                  required
                  placeholder="Mera Themes"
                  onChange={(e) => setMeraTheme(e.target.value)}
                  className="select w-full"
                ></select>
              </div>

              <div className="flex flex-col w-full items-start justify-start">
                <label
                  htmlFor="monthView"
                  className="pl-3 text-xs leading-relaxed ui-app"
                >
                  Month view default
                </label>
                <select
                  id="monthView"
                  type="text"
                  value={monthView}
                  required
                  placeholder="Month View"
                  onChange={(e) => setMonthView(e.target.value)}
                  className="select w-full"
                ></select>
              </div>

              <Link className="w-full" href="/schedulePage">
                <button type="submit" className="btn btn-primary gap-2 w-full">
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
