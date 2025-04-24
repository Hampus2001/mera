import LandingNav from "@/components/LandingNav";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <LandingNav />
      <section className="flex flex-col items-center justify-center h-screen px-20 lg:px-80 gap-y-4 ">
        <h1 className="font-instrument text-6xl lg:text-8xl">Make more time</h1>
        <h2 className="font-absans text-xl text-center mb-4 leading-snug">
          Create Time Schedules and management systems for your business
          instantly — so you can stay focused doing what you do best!
        </h2>
        <span className="flex items-center gap-4">
          <Link href="signup">
            <button className="btn btn-lg btn-primary">Get Started</button>
          </Link>
        </span>
      </section>
      <div className="h-screen"></div>
    </>
  );
}
