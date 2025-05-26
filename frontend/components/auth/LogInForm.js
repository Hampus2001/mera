"use client";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  setStep,
  setContextId,
  setActiveUser,
  router,
}) {
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      setContextId(data.response.company_id);
      setActiveUser(data.response);
      router.push("/schedulePage");
    } catch (err) {
      console.error("Login error:", err);
    }

    setEmail("");
    setPassword("");
  }

  return (
    <div className="">
      <h2 className="text-3xl leading-loose pb-8 lg:pb-6">
        Welcome back to Mera!
      </h2>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 pb-12 border-b"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input w-full"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input w-full"
          required
        />
        <div className="flex gap-4">
          <button type="submit" className="btn btn-primary w-1/3">
            Log in
          </button>
          <p className="link-hover">Forgot your password?</p>
        </div>
        <button type="button" className="btn w-full">
          Log in with Google
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <p>
          Don't have an account?
          <span className="link ml-2" onClick={() => setStep("signup")}>
            Sign up now!
          </span>
        </p>
      </div>
    </div>
  );
}
