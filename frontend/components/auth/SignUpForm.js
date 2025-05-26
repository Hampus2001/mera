"use client";

export default function SignupForm({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  setStep,
}) {
  return (
    <div>
      <h2 className="text-3xl leading-loose pb-8 lg:pb-6">
        We've been expecting you...
      </h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input w-full"
          required
        />
      </form>
      <div className="mt-4">
        <button
          className="btn btn-primary w-full"
          onClick={() => setStep("customize")}
        >
          Next
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <p>
          Already have an account?
          <span className="link ml-2" onClick={() => setStep("login")}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
