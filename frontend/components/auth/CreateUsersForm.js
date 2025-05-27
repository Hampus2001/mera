import { useEffect, useState, useContext } from "react";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
import { useRouter } from "next/navigation";

export default function CreateUsersForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [admin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);

  const [companyRoles, setCompanyRoles] = useState([]); // ideally should come from props/context
  const [companyObject, setCompanyObject] = useState([]);
  const [companyId] = useState(Date.now());

  const { setContextId, setActiveUser } = useContext(HandleWorkspaceContext);
  const router = useRouter();
  useEffect(() => {
    setContextId(companyId);
  }, [companyId]);

  useEffect(() => {
    createUsersTable();
  }, [users]);

  function createAccount() {
    const createAdmin = {
      company_id: companyId,
      username,
      password,
      role,
      email,
      admin: true,
      hours: 40,
    };
    const createCompany = {
      company_id: companyId,
      name: "My Company", // update this to come from props
    };
    setUsers([createAdmin]);
    setCompanyObject([createCompany]);
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("");
  }

  function addEmployee() {
    const createUser = {
      company_id: companyId,
      username,
      password,
      role,
      email,
      admin,
    };
    setUsers([...users, createUser]);
    setUsername("");
    setPassword("");
    setRole("");
    setEmail("");
    setAdmin(false);
  }

  function handleUserChange(index, field, value) {
    const updated = [...users];
    updated[index][field] = value;
    setUsers(updated);
  }

  function handleDeleteUser(index) {
    if (index === 0) {
      alert("Cannot delete admin");
      return;
    }
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
  }

  function createUsersTable() {
    const userElements = users.map((user, index) => (
      <tr key={index}>
        <td>
          <input
            value={user.username}
            onChange={(e) =>
              handleUserChange(index, "username", e.target.value)
            }
          />
        </td>
        <td>
          <input
            value={user.password}
            onChange={(e) =>
              handleUserChange(index, "password", e.target.value)
            }
          />
        </td>
        <td>
          <select
            value={user.role}
            onChange={(e) => handleUserChange(index, "role", e.target.value)}
          >
            <option value="">Choose role</option>
            {companyRoles.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>
        </td>
        <td>
          <input
            value={user.email}
            onChange={(e) => handleUserChange(index, "email", e.target.value)}
          />
        </td>
        <td>
          <input
            type="number"
            value={user.hours}
            onChange={(e) => handleUserChange(index, "hours", e.target.value)}
          />
        </td>
        <td>
          <select
            value={user.admin}
            onChange={(e) =>
              handleUserChange(index, "admin", e.target.value === "true")
            }
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </td>
        {index !== 0 && (
          <td>
            <button onClick={() => handleDeleteUser(index)}>Delete</button>
          </td>
        )}
      </tr>
    ));
    setDisplayUsers(userElements);
  }

  async function workspaceData() {
    setActiveUser(users[0]);
    const data = {
      users,
      companies: companyObject,
      roles: companyRoles,
    };
    await fetch("http://localhost:3001/createCompanyAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.push("/schedulePage");
  }
  return (
    <div className="flex flex-col gap-10 p-36 items-center min-h-screen">
      <h2 className="text-3xl">Add Users</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <select
            className="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            {companyRoles.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2">
            Admin?
            <input
              type="checkbox"
              checked={admin}
              onChange={() => setAdmin(!admin)}
            />
          </label>
          <button className="btn btn-secondary" onClick={addEmployee}>
            Add Employee
          </button>
        </div>

        <div>
          {displayUsers.length ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{displayUsers}</tbody>
            </table>
          ) : (
            <p>No users added</p>
          )}
        </div>
      </div>

      <button className="btn btn-primary w-full" onClick={workspaceData}>
        Finish
      </button>
    </div>
  );
}
