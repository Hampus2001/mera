"use client";
import Navbar from "@/components/Navbar";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
import { useContext, useEffect, useState } from "react";

export default function CreateWorkspace() {
  //* States
  const [toggleSlide, setToggleSlide] = useState(1);
  const [slideTitle, setSlideTitle] = useState("Let's set up your account!");
  const [company, setCompany] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [hours, setHours] = useState("");
  const [admin, setAdmin] = useState(false);

  const [companyRoles, setCompanyRoles] = useState([]);
  const [companyObject, setCompanyObject] = useState([]);
  const [companyId, setCompanyId] = useState(Date.now());
  const [users, setUsers] = useState([]);

  //TODO - functions
  //* Create admin account and company account
  function createAccount() {
    if (username && password && email && adminRole && company) {
      const createAdmin = {
        company_id: companyId,
        username: username,
        password: password,
        role: adminRole,
        email: email,
        admin: true,
        hours: 40,
      };

      const createCompany = {
        company_id: companyId,
        name: company,
      };

      setUsers([createAdmin]);
      setCompanyObject([createCompany]);
      setUsername("");
      setPassword("");
      setAdminRole("");
      setEmail("");
    }
  }
  //* Add employees at slide two
  function addEmployee() {
    const createUser = {
      company_id: companyId,
      username: username,
      password: password,
      role: role,
      email: email,
      admin: admin,
      hours: hours,
    };

    const newEmployees = [...users, createUser];
    setUsers(newEmployees);

    setUsername("");
    setPassword("");
    setRole("");
    setEmail("");
    setHours("");
    setAdmin(false);
  }
  //* Update userdata in table
  function handleUserChange(index, field, value) {
    const updatedUsers = [...users]; // Create a copy of the users array
    updatedUsers[index][field] = value; // Update the specific field of the user
    setUsers(updatedUsers); // Update the state
  }
  //* Delete users
  function handleDeleteUser(index) {
    if (index == 0) {
      alert("Cannot delete company admin. Use edit input instead");
    } else {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
    }
  }

  //* Display all users in UI
  const [displayUsers, setDisplayUsers] = useState([]);

  //* Update the displayed users in UI everytime users is changed
  useEffect(() => {
    console.log(users);
    createUsersTable();
  }, [users]);

  //* Create table in UI to display all added users
  function createUsersTable() {
    const userElements = users.map((user, index) => (
      <tr key={index} className="border-b">
        <td className="p-2">
          <input
            type="text"
            value={user.username}
            onChange={(e) =>
              handleUserChange(index, "username", e.target.value)
            }
            className="p-2 bg-base-300 w-full"
          />
        </td>
        <td className="p-2">
          <input
            type="text"
            value={user.password}
            onChange={(e) =>
              handleUserChange(index, "password", e.target.value)
            }
            className="p-2 bg-base-300 w-full"
          />
        </td>
        <td className="p-2">
          <select
            value={user.role}
            onChange={(e) => handleUserChange(index, "role", e.target.value)}
            className="p-2 bg-base-300 w-full"
          >
            <option value="">Choose role</option>
            {companyRoles.map((role, i) => (
              <option key={i} value={role}>
                {role}
              </option>
            ))}
          </select>
        </td>
        <td className="p-2">
          <input
            type="email"
            value={user.email}
            onChange={(e) => handleUserChange(index, "email", e.target.value)}
            className="p-2 bg-base-300 w-full"
          />
        </td>
        <td className="p-2">
          <input
            type="number"
            value={user.hours}
            onChange={(e) => handleUserChange(index, "hours", e.target.value)}
            className="p-2 bg-base-300 w-full"
          />
        </td>
        <td className="p-2">
          <select
            value={user.admin}
            onChange={(e) =>
              handleUserChange(index, "admin", e.target.value === "true")
            }
            className="p-2 bg-base-300 w-full"
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </td>
        {index != 0 && (
          <td className="p-2">
            <button
              onClick={() => handleDeleteUser(index)}
              className="btn btn-sm btn-error"
            >
              Delete
            </button>
          </td>
        )}
      </tr>
    ));
    setDisplayUsers(userElements);
  }

  //* Send all data to backend - direct user to next page
  async function workspaceData() {
    const data = {
      users: users,
      companies: companyObject,
      roles: companyRoles,
    };

    await fetch("http://localhost:3001/createCompanyAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  //TODO - useEffect
  //* Toggle slide title
  useEffect(() => {
    if (toggleSlide == 1) {
      setSlideTitle("Let's set up your account!");
    } else if (toggleSlide == 2) {
      setSlideTitle("Now, lets add your employees..");
    }
  }, [toggleSlide]);

  //TODO - html
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen items-center p-36 gap-10 font-instrument">
        <h1 className="text-4xl tracking-widest text-center">{slideTitle}</h1>

        <div className="flex flex-col gap-10 w-full">
          <div className="flex w-full justify-start">
            <p>( {toggleSlide} / 2 )</p>
          </div>
          {toggleSlide == 2 && (
            <p className="text-center">
              (This data may be changed at any time)
            </p>
          )}

          <hr></hr>

          {toggleSlide == 1 && (
            <>
              <h2>Sign up</h2>
              <div className="flex gap-10">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  placeholder="Username"
                  className="p-2 bg-base-300 w-1/3"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  className="p-2 bg-base-300 w-1/3"
                />
              </div>

              <input
                onChange={(e) => setAdminRole(e.target.value)}
                value={adminRole}
                type="text"
                placeholder="Professional role"
                className="p-2 bg-base-300"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="p-2 bg-base-300"
              />
              <hr></hr>
              <h2>Business information</h2>
              <input
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                type="text"
                placeholder="Company name"
                className="p-2 bg-base-300"
              />

              <div className="flex">
                <input
                  value={role} // Bind the input value to the `role` state
                  onChange={(e) => setRole(e.target.value)}
                  type="text"
                  placeholder="Add Roles within your company"
                  className="p-2 bg-base-300 w-3/4"
                />
                <button
                  onClick={() => {
                    if (role) {
                      setCompanyRoles([...companyRoles, role]); // Add the role to the list
                      setRole(""); // Clear the input field
                    } else {
                      alert("Please enter a role before adding.");
                    }
                  }}
                  className="btn btn-lg btn-secondary w-1/4"
                >
                  Add role
                </button>
              </div>
              <ul className="flex flex-wrap justify-center gap-5">
                {companyRoles.length > 0 &&
                  companyRoles.map((role, index) => {
                    return (
                      <li
                        onClick={() => {
                          const updatedRoles = companyRoles.filter(
                            (_, i) => i !== index
                          );
                          setCompanyRoles(updatedRoles);
                        }}
                        className="cursor-pointer p-3 w-1/6 bg-base-300 rounded-lg text-center font-bold tracking-widest"
                        key={index}
                      >
                        {" "}
                        {role}
                      </li>
                    );
                  })}
              </ul>

              <div className="flex">
                <button
                  onClick={() => {
                    if (
                      username &&
                      password &&
                      email &&
                      adminRole &&
                      company &&
                      companyRoles.length > 0
                    ) {
                      setToggleSlide(toggleSlide + 1);
                      createAccount();
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
              <div className="flex flex-col  gap-10 w-1/3">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="username"
                  className="p-2 bg-base-300 "
                />

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="p-2 bg-base-300"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="email"
                  className="p-2 bg-base-300"
                />
                <select
                  value={role}
                  placeholder="Choose role"
                  className="p-2 bg-base-300"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Choose role</option>
                  {companyRoles.map((role, index) => {
                    return (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    );
                  })}
                </select>

                <input
                  value={hours}
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
                  className="btn btn-lg btn-secondary tracking-widest"
                >
                  add employee
                </button>
              </div>
              <div className="flex flex-col w-2/3 ml-10">
                {displayUsers.length > 0 ? (
                  <table className="table-auto  w-full">
                    <thead>
                      <tr key="table" className="bg-base-300">
                        <th className="border border-gray-300 p-2">Username</th>
                        <th className="border border-gray-300 p-2">Password</th>
                        <th className="border border-gray-300 p-2">Role</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">hours</th>
                        <th className="border border-gray-300 p-2">Admin</th>
                        <th className="border border-gray-300 p-2">X</th>
                      </tr>
                    </thead>
                    <tbody>{displayUsers}</tbody>
                  </table>
                ) : (
                  <div className="flex w-full h-full items-center justify-center">
                    <p>No users to display</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <hr></hr>
          {toggleSlide == 2 && (
            <div className="flex">
              <button
                onClick={() => {
                  workspaceData();
                }}
                className="btn btn-lg btn-primary w-full tracking-widest"
              >
                {users.length != 1 ? "Finish" : "Finish - Add Employees Later"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
