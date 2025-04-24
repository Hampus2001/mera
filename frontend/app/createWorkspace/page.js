"use client";
import { useEffect, useState } from "react";
export default function CreateWorkspace() {
  const [toggleSlide, setToggleSlide] = useState(1);
  const [slideTitle, setSlideTitle] = useState("Let's set up your account!");

  //all added employees
  const [employees, setEmployees] = useState([]);

  //new company
  const [company, setCompany] = useState();

  //new employee
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [hours, setHours] = useState();
  const [admin, setAdmin] = useState();

  //functions

  function addEmployee() {
    let id = employees.length + 100;

    const newUser = {
      id: id,
      company_id: company,
      email: email,
      username: username,
      password: password,
      role: role,
      admin: admin,
    };

    const updatedEmployees = [...employees, newUser];

    setEmployees(updatedEmployees);

    setUsername();
    setPassword();
    setEmail();
    setRole();
    setHours();
    setAdmin();
  }

  useEffect(() => {
    if (toggleSlide == 1) {
      setSlideTitle("Let's set up your account!");
    } else if (toggleSlide == 2) {
      setSlideTitle("Now, lets add your employees..");
    }
  }, [toggleSlide]);

  return (
    <div className="flex flex-col min-h-screen items-center p-36 gap-10 font-instrument">
      <h1 className="text-4xl tracking-widest text-center">{slideTitle}</h1>

      <div className="flex flex-col gap-10 w-1/2">
        <div className="flex w-full justify-start">
          <p>( {toggleSlide} / 3 )</p>
        </div>
        {toggleSlide !== 1 && (
          <div>
            <button
              onClick={() => setToggleSlide(toggleSlide - 1)}
              className="underline "
            >
              Go back
            </button>
          </div>
        )}
        <hr></hr>
        {toggleSlide == 1 && (
          <>
            <input
              onChange={(e) => setCompany(e.target.value)}
              type="text"
              placeholder="Company name"
              className="p-2 bg-base-300"
            />

            <div className="flex gap-10">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="p-2 bg-base-300 w-1/3"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="p-2 bg-base-300 w-1/3"
              />
            </div>

            <input
              onChange={(e) => setRole(e.target.value)}
              type="text"
              placeholder="Your professional role"
              className="p-2 bg-base-300"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="p-2 bg-base-300"
            />
            <div className="flex">
              <button
                onClick={() => {
                  setToggleSlide(toggleSlide + 1);
                  addEmployee;
                }}
                className="btn btn-lg btn-primary w-full"
              >
                Next
              </button>
            </div>
          </>
        )}
        {toggleSlide == 2 && (
          <>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              className="p-2 bg-base-300 "
            />

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
              className="p-2 bg-base-300"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="p-2 bg-base-300"
            />
            <input
              onChange={(e) => setRole(e.target.value)}
              type="text"
              placeholder="Professional role"
              className="p-2 bg-base-300"
            />
            <input
              onChange={(e) => setHours(e.target.value)}
              type="number"
              placeholder="Hours per week"
              className="p-2 bg-base-300"
            />
            <div className="flex gap-5">
              <p>Admin ?</p>
              <div className="flex gap-2">
                <p>yes</p>
                <input
                  type="checkbox"
                  checked={admin === true}
                  onChange={() => setAdmin(true)}
                />
              </div>
              <div className="flex gap-2">
                <p>no</p>
                <input
                  type="checkbox"
                  checked={admin === false}
                  onChange={() => setAdmin(false)}
                />
              </div>
            </div>
            <button onClick={addEmployee} className="btn btn-lg btn-secondary">
              add employee
            </button>
          </>
        )}
        <hr></hr>
      </div>
    </div>
  );
}
