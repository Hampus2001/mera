"use client";

import Link from "next/link";

export default function CreateUsersForm() {
  return (
    <div>
      <h2 className="text-3xl mb-4">Invite your team</h2>
      <Link href="/schedulePage">
        <button className="btn btn-primary w-full">Finish</button>
      </Link>
    </div>
  );
}
