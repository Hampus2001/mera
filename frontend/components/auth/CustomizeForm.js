"use client";

export default function CustomizeForm({
  company,
  setCompany,
  roles,
  setRoles,
  meraTheme,
  setMeraTheme,
  monthView,
  setMonthView,
  setStep,
}) {
  return (
    <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <h2 className="text-3xl col-span-full pb-8 lg:pb-6">
        Customize your schedule
      </h2>

      <div className="col-span-1 flex flex-col gap-6">
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
          className="input"
          required
        />
        <input
          type="text"
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          placeholder="Role"
          className="input"
          required
        />
        <textarea
          placeholder="Bio description"
          className="textarea h-32"
        ></textarea>
      </div>

      <div className="col-span-1 flex flex-col gap-6">
        <select
          value={meraTheme}
          onChange={(e) => setMeraTheme(e.target.value)}
          className="select"
          required
        >
          <option value="">Choose theme</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <select
          value={monthView}
          onChange={(e) => setMonthView(e.target.value)}
          className="select"
          required
        >
          <option value="">Month View</option>
          <option value="calendar">Calendar</option>
          <option value="list">List</option>
        </select>

        <button
          type="button"
          className="btn btn-primary w-full"
          onClick={() => setStep("createUsers")}
        >
          Next
        </button>
      </div>
    </form>
  );
}
