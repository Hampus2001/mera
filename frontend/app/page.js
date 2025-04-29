import LandingNav from "@/components/LandingNav";
import Link from "next/link";
import BigCalendar from "@/components/BigCalendar";

export default function Home() {
  return (
    <>
      <LandingNav />
      <section className="flex flex-col items-center justify-center w-screen h-screen px-20 lg:px-80 gap-y-4 lg:gap-y-2 overflow-x-hidden  ">
        <h1 className="">Make More Time</h1>
        <h3 className="font-mattone-bold px-4 lg:px-8 text-center mb-4 leading-snug text-base lg:text-2xl ">
          Management system for your business — so you can stay focused doing
          what you do best!
        </h3>
        <div className="absolute bottom-24 lg:bottom-32 items-center gap-4 flex flex-row ">
          <Link href="./createWorkspace">
            <button className="btn btn-primary btn-lg lg:btn-xl ">
              Get Started
            </button>
          </Link>
          <Link href="/">
            <button className="btn btn-malachite-500 btn-lg lg:btn-xl ">
              Book a Demo
            </button>
          </Link>
        </div>
      </section>
      <section className="flex flex-col px-2 lg:px-4      w-screen aspect-square lg:aspect-video">
        <div className="w-full h-full flex items-center justify-start bg-secondary">
          <div className=" flex flex-col w-full lg:w-1/3   px-16 py-16 ">
            <h4 className="font-mattone-black text-xs mb-4">TIME MANAGEMENT</h4>
            <h2 className="font-instrument text-5xl leading-auto mb-4">
              Make More Time
            </h2>

            <p className="font-roboto leading-snug lg:mb-2">
              Through expert insights and in-depth research, we forecast 'what's
              next' and infuse it into our production studio. This not only
              keeps your brand ahead but deeply connects with your audience.
              With us, you don't just ride the wave; you direct the tide,
              transforming trends into lasting impact.
            </p>
          </div>
        </div>
      </section>
      <div className="h-screen w-full p-4">
        {" "}
        <BigCalendar />
      </div>
    </>
  );
}
