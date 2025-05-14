import LandingNav from "@/components/LandingNav";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

import MyCalendar from "@/components/BigCalendar";

export default function Home() {
  return (
    <>
      <LandingNav />

      <div className="w-screen overflow-x-hidden">
        <section className=" container-xl mx-auto flex flex-col items-center justify-center w-full h-screen  px-4 lg:px-86 gap-y-4 lg:gap-y-4">
          <h1 className=" text-center uppercase text-base-content">
            Make More Time
          </h1>
          <h3 className=" text-base-content px-4 lg:px-16 text-center leading-snug lg:leading-tight ">
            Create your Management system for your business today — so you can
            stay focused doing what you do best!
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-0 lg:mt-4">
            <Link href="./createWorkspace">
              <button className="btn btn-primary btn-landing btn-xl">
                Get started
              </button>
            </Link>
          </div>
        </section>
        <section className=" container-xl mx-auto flex flex-col items-center justify-center w-full h-screen  px-8 lg:px-32 gap-y-4 lg:gap-y-2">
          <h3 className=" px-4 lg:px-16 text-center mb-16 leading-snug lg:leading-tight ">
            Create your Management system for your business today — so you can
            stay focused doing what you do best!
          </h3>
          <div className=" flex flex-row flex-wrap items-center justify-center gap-4 px-4 lg:px-32">
            <Link href="./createWorkspace">
              <button className="btn ui-landing btn-lg ">Primary</button>
            </Link>
            <Link href="./createWorkspace">
              <button className="btn btn-primary ui-landing btn-lg ">
                Primary
              </button>
            </Link>
            <Link href="/">
              <button className="btn btn-secondary ui-landing btn-lg">
                Secondary
              </button>
            </Link>
            <Link href="/">
              <button className="btn btn-accent ui-landing btn-lg">
                Accent
              </button>
            </Link>
            <Link href="/">
              <button className="btn btn-neutral ui-landing btn-lg  ">
                Neutral
              </button>
            </Link>
            <Link href="./createWorkspace">
              <button className="btn btn-info ui-landing btn-lg">Info</button>
            </Link>
            <Link href="/">
              <button className="btn btn-error ui-landing btn-lg">ERROR</button>
            </Link>
            <Link href="/">
              <button className="btn btn-warning ui-landing btn-lg ">
                Warning
              </button>
            </Link>
            <Link href="/">
              <button className="btn btn-success ui-landing btn-lg ">
                SUCCESS
              </button>
            </Link>
          </div>
        </section>
        <section className="card flex flex-col    p-4 ">
          <div className=" w-full aspect-square lg:aspect-video flex flex-col lg:flex-row items-center justify-start bg-secondary  rounded-3xl">
            <div className="aspect-square flex flex-col items-start justify-center w-full lg:w-1/2  px-16 pb-8 pt-16 lg:px-32 gap-4 ">
              <h4 className="font-mattone-black text-xs">TIME MANAGEMENT</h4>
              <h2 className=" leading-tight">Make More Time</h2>

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
              <span className="flex flex-row gap-4">
                <button className="btn ui-app btn-primary">Join</button>{" "}
                <button className="btn ui-app ">Share</button>
              </span>
            </div>
            <div className="aspect-square flex flex-col items-start justify-center  w-full lg:w-1/2 p-8 lg:px-32 gap-4 ">
              <div className=" card flex flex-col bg-base-100 p-8  w-full">
                <h4 className=" font-mattone-black text-2xl lg:text-4xl leading-loose">
                  Join the Club
                </h4>
                <div className="divider m-0"></div>
                <span className=" rounded-3xl grid grid-cols-4 bg-base-100 gap-x-4">
                  <fieldset className="fieldset ui-app col-span-4 lg:col-span-2">
                    <legend className="fieldset-legend indent-4">
                      Username
                    </legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Type here"
                    />
                  </fieldset>
                  <fieldset className="fieldset ui-app col-span-4  lg:col-span-2 mb-4">
                    <legend className="fieldset-legend indent-4">
                      Password
                    </legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Type here"
                    />
                  </fieldset>
                  <select
                    defaultValue="Pick a color"
                    className="select ui-app col-span-4 mb-4"
                  >
                    <option disabled={true}>Pick a color</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                  </select>
                  <button className="btn btn-primary ui-app col-span-2">
                    Get started
                  </button>{" "}
                  <button className="btn btn-secondary ui-app col-span-2">
                    Log in
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className=" px-0 lg:px-64 mt-4 aspect-square lg:aspect-video flex items-center justify-start   rounded-3xl gap-4">
            <div className="w-full aspect-video bg-base-100 rounded-3xl flex flex-row items-start justify-start">
              <div className="flex flex-col items-center justify-center text-neutral-content w-1/12 h-full aspect-square bg-neutral rounded-3xl">
                sidebar
              </div>
              <div className="h-1/4 w-full bg-base-200 rounded-3xl"></div>
              <div className="w-1/4 flex flex-col items-center justify-center h-full bg-base-200 rounded-3xl">
                toolbar
              </div>
            </div>
          </div>
        </section>

        <MyCalendar variant="grid" />
        <MyCalendar variant="flex" />
        <MyCalendar variant="admin" />
        <MyCalendar />

        {/* <div className=" w-full  grid grid-cols-6 p-16 bg-success ">
          <div className="col-span-5 h-32 bg-accent rounded-3xl mb-2"></div>
          <div className="col-span-1 h-32 bg-error rounded-3xl ml-2 mb-2"></div>
          <div className="col-span-1 bg-base-300 rounded-3xl"></div>
          <div className="col-span-5">
            <BigCalendar />
          </div>
        </div> */}
        <Sidebar></Sidebar>
      </div>
    </>
  );
}
