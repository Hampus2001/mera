import LandingNav from "@/components/LandingNav";

export default function Home() {
  return (
    <main className="">
      <LandingNav />
      <section className="flex flex-col items-center justify-center h-screen px-20 lg:px-80 gap-y-4 ">
        <h1 className="font-instrument text-6xl lg:text-8xl">Make more time</h1>
        <h2 className="font-absans text-xl text-center mb-4 leading-snug">
          Create Time Schedules and management systems for your business
          instantly — so you can stay focused doing what you do best!
        </h2>
        <span className="flex items-center gap-4">
          <button className="btn btn-lg btn-primary">Get Started</button>
          <button className="btn btn-lg">Book a demo</button>
        </span>
      </section>
      <div className="h-screen"></div>
    </main>
  );
}
