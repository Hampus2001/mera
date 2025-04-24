"use client";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
import { useContext, useEffect, useState } from "react";
export default function CreateWorkspace() {
  const [toggleSlide, setToggleSlide] = useState(1);
  const [slideTitle, setSlideTitle] = useState("Let's set up your account!");

  //new company
  const [company, setCompany] = useState();

  //new employee
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [hours, setHours] = useState();
  const [admin, setAdmin] = useState(false);

  //functions

  const { companyId, setCompanyId } = useContext(HandleWorkspaceContext);
  const [users, setUsers] = useState([]);
  async function addEmployee() {
    //when admin creates account
    if (!companyId) {
      const newUser = {
        company: company,
        email: email,
        username: username,
        password: password,
        role: role,
        admin: admin,
      };

      console.log("Sending data to backend:", newUser);

      const response = await fetch("http://localhost:3001/addEmployee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      let adminAccount = await response.json();
      setCompanyId(adminAccount.company_id);
      console.log("Response from backend:", adminAccount);
    }
    //when admin adds employees
    else {
      const newUser = {
        company_id: companyId,
        email: email,
        username: username,
        password: password,
        role: role,
        admin: admin,
        time: hours,
      };

      console.log("Sending data to backend create user:", newUser);

      const response = await fetch("http://localhost:3001/addEmployee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const updatedUsers = await response.json();
      console.log("Response from backend:", updatedUsers);

      setUsers(updatedUsers.usersData);
    }

    setUsername();
    setPassword();
    setEmail();
    setRole();
    setHours();
    setAdmin(false);
  }

  //filter all users with the same company_id
  const [displayUsers, setDisplayUsers] = useState([]);

  useEffect(() => {
    filterUsers();
  }, [users]);

  function filterUsers() {
    const filtered = users.filter((user) => user.company_id == companyId);
    const userElements = filtered.map((user) => (
      <tr key={user.id} className="border-b">
        <td className="p-2">{user.username}</td>
        <td className="p-2">{user.password}</td>
        <td className="p-2">{user.role}</td>
        <td className="p-2">{user.email}</td>
        <td className="p-2">{user.admin ? "admin = yes" : "admin = no"}</td>
      </tr>
    ));
    setDisplayUsers(userElements);
  }

  //Toggle slide title
  useEffect(() => {
    if (toggleSlide == 1) {
      setSlideTitle("Let's set up your account!");
    } else if (toggleSlide == 2) {
      setSlideTitle("Now, lets add your employees..");
    }
  }, [toggleSlide]);

  //html
  return (
    <>
      <LandingNav variant="appMode" />
      <div className="flex flex-col min-h-screen items-center p-36 gap-10 font-instrument">
        <h1 className="text-4xl tracking-widest text-center">{slideTitle}</h1>

        <div className="flex flex-col gap-10 w-2/3">
          <div className="flex w-full justify-start">
            <p>( {toggleSlide} / 2 )</p>
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
                placeholder="Professional role"
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
                    if (username && password && email && role && company) {
                      setToggleSlide(toggleSlide + 1);
                      setAdmin(true);
                      addEmployee();
                    } else {
                      alert("Complete all fields to continue");
                    }
                  }}
                  className="btn btn-lg btn-primary w-full"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {toggleSlide == 2 && (
            <div className="flex">
              <div className="flex flex-col  gap-10 w-1/2">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="username"
                  className="p-2 bg-base-300 "
                />

                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="p-2 bg-base-300"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="email"
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
                <button
                  onClick={() => {
                    if (username && password && email && role && hours) {
                      addEmployee();
                    } else {
                      alert("Complete all fields to continue");
                    }
                  }}
                  className="btn btn-lg btn-secondary"
                >
                  add employee
                </button>
              </div>
              <div className="flex flex-col w-1/2 ml-10">
                {displayUsers.length > 0 ? (
                  <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                      <tr className="bg-base-300">
                        <th className="border border-gray-300 p-2">Username</th>
                        <th className="border border-gray-300 p-2">Password</th>
                        <th className="border border-gray-300 p-2">Role</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Admin</th>
                      </tr>
                    </thead>
                    <tbody>{displayUsers}</tbody>
                  </table>
                ) : (
                  <p>No users to display</p>
                )}
              </div>
            </div>
          )}
          <hr></hr>
        </div>
      </div>
    </>
  );
}
