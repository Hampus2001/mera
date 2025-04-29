import LandingNav from "@/components/LandingNav";
import Link from "next/link";
import BigCalendar from "@/components/BigCalendar";
import { ArrowDown01 } from "lucide-react";
import { ArrowDownIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <>
      <LandingNav />
      <div className="w-screen overflow-x-hidden">
        <section className=" container-xl mx-auto flex flex-col items-center justify-center w-full h-screen  px-8 lg:px-32 gap-y-4 lg:gap-y-4 bg-base-100">
          <h1 className=" text-center uppercase text-base-content">
            Make More Time
          </h1>
          <h3 className=" text-base-content px-8 lg:px-16 text-center mb-4 leading-snug lg:leading-tight ">
            Create your Management system for your business today — so you can
            stay focused doing what you do best!
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-0 lg:mt-4">
            <Link href="./createWorkspace">
              <button className="btn btn-primary btn-landing   btn-lg lg:btn-xl   ">
                Get started
              </button>
            </Link>
          </div>
        </section>
        <section className=" container-xl mx-auto flex flex-col items-center justify-center w-full h-screen  px-8 lg:px-32 gap-y-4 lg:gap-y-2 ">
          <h3 className=" px-4 lg:px-16 text-center mb-16 leading-snug lg:leading-tight ">
            Create your Management system for your business today — so you can
            stay focused doing what you do best!
          </h3>
          <div className=" flex flex-row flex-wrap items-center justify-center gap-4 px-4 lg:px-32">
            <Link href="./createWorkspace">
              <button className="btn btn-primary font-absans tracking-wide  btn-lg  font-absans uppercase ">
                Primary
              </button>
            </Link>
            <Link href="/">
              <button className="btn btn-secondary font-absans uppercase tracking-wide btn-lg">
                Secondary
              </button>
            </Link>
            <Link href="/">
              <button className="btn btn-accent font-absans uppercase tracking-wide btn-lg ">
                Accent
              </button>
            </Link>
            <Link href="/">
              <button className="btn btn-neutral font-absans uppercase tracking-wide  btn-lg ">
                Neutral
              </button>
            </Link>
            <Link href="./createWorkspace">
              <button className="btn btn-info font-absans tracking-wide  btn-lg font-absans uppercase ">
                Info
              </button>
            </Link>
            <Link href="/">
              <button className="btn btn-error font-absans tracking-wide uppercase btn-lg ">
                ERROR
              </button>
            </Link>
            <Link href="/">
              <button className="btn btn-warning  font-absans uppercase tracking-wide btn-lg ">
                Warning
              </button>
            </Link>
            <Link href="/">
              <button className="btn btn-success  font-absans uppercase tracking-wide  btn-lg  ">
                SUCCESS
              </button>
            </Link>
          </div>
        </section>
        <section className="container-xl mx-auto flex flex-col    p-2">
          <div className="  aspect-square lg:aspect-video flex items-center justify-start bg-info rounded-3xl">
            <div className="aspect-square flex flex-col items-start justify-center  w-auto lg:w-1/2   p-8 lg:p-32 text-info-content">
              <h4 className="font-mattone-black text-xs mb-4">
                TIME MANAGEMENT
              </h4>
              <h2 className=" leading-tight mb-4">Make More Time</h2>

              <p className=" leading-snug lg:mb-2">
                Through expert insights and in-depth research, we forecast
                'what's next' and infuse it into our production studio. This not
                only keeps your brand ahead but deeply connects with your
                audience. With us, you don't just ride the wave; you direct the
                tide, transforming trends into lasting impact. This not only
                keeps your brand ahead but deeply connects with your audience.
                With us, you don't just ride the wave; you direct the tide,
                transforming trends into lasting impact.
              </p>
            </div>
          </div>
        </section>
        <div className="h-screen w-full">
          {" "}
          <BigCalendar />
        </div>
      </div>
    </>
  );
}
