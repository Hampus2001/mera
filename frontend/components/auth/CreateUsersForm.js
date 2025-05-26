"use client";

import Link from "next/link";

export default function CreateUsersForm() {
  return (
    <div>
      <h2 className="text-3xl  pb-8 lg:pb-6">Invite your team</h2>
      {/* Placeholder for user invitations */}
      <Link href="/schedulePage">
        <button className="btn btn-primary w-full">Finish</button>
      </Link>
    </div>
  );
}
