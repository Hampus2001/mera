import { useEffect, useState, useContext } from "react";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
import { useRouter } from "next/navigation";

export default function CreateUsersForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [admin, setAdmin] = useState(false);
  const { users, setUsers } = useContext(HandleWorkspaceContext);

  const [companyRoles, setCompanyRoles] = useState([]); // ideally from props/context
  const [companyObject, setCompanyObject] = useState([]);

  const { setContextId, setActiveUser, contextId } = useContext(
    HandleWorkspaceContext
  );
  const router = useRouter();

  function addEmployee() {
    const createUser = {
      company_id: contextId,
      user_id: users.length + 1,
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
    <div className="flex flex-col gap-6 w-full">
      <h2 className="text-3xl col-span-full pb-8 lg:pb-6">Add Users</h2>

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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
          />

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

        <div className="overflow-auto max-h-[400px] w-full border rounded-lg">
          {users.length ? (
            <table className="table-auto w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-3 text-left">Username</th>
                  <th className="px-3 py-3 text-left">Password</th>
                  <th className="px-3 py-3 text-left">Role</th>
                  <th className="px-3 py-3 text-left">Email</th>
                  <th className="px-3 py-3 text-left">Admin</th>
                  <th className="px-3 py-3 text-left">X</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-2 py-2">
                      <input
                        className="w-full border px-1 py-1 rounded"
                        value={user.username}
                        onChange={(e) =>
                          handleUserChange(index, "username", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        className="w-full border px-1 py-1 rounded"
                        type="text"
                        value={user.password}
                        onChange={(e) =>
                          handleUserChange(index, "password", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        className="w-full border px-1 py-1 rounded"
                        value={user.role}
                        onChange={(e) =>
                          handleUserChange(index, "role", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        className="w-full border px-1 py-1 rounded"
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                          handleUserChange(index, "email", e.target.value)
                        }
                      />
                    </td>
                    <td className="px-2 py-2">
                      <select
                        className="w-full border px-1 py-1 rounded"
                        value={user.admin}
                        onChange={(e) =>
                          handleUserChange(
                            index,
                            "admin",
                            e.target.value === "true"
                          )
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </td>
                    <td
                      className="px-2 py-2 text-red-500 cursor-pointer"
                      onClick={() => handleDeleteUser(index)}
                    >
                      X
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-4">No users added</p>
          )}
        </div>
      </div>

      <button
        className="btn btn-primary w-full"
        onClick={() => router.push("/schedulePage")}
      >
        Finish
      </button>
    </div>
  );
}
