"use client";
import { useState, useEffect } from "react";
import LandingNav from "@/components/LandingNav";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import * as motion from "motion/react-client";
import { ArrowBigDownDash, ArrowDown, ArrowDown10 } from "lucide-react";
import { CaretDownIcon } from "@radix-ui/react-icons";
import MyCalendar from "@/components/BigCalendar";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setScrolled(progress);
  });

  return (
    <>
      <LandingNav />

      <div className="w-screen overflow-x-hidden">
        <section className="z-0 bg-[url(./pexels-alexander-mass-748453803-31585192.jpg)]  dark:bg-[url(./pexels-rdne-10375865.jpg)] bg-center bg-auto text-base-100  lg:bg-cover dark:bg-top-left dark:bg-auto container-xl mx-auto">
          <div
            className={`w-full z-10 text-base-100 dark:text-secondary-content  h-screen flex flex-col items-center justify-center    gap-y-4 lg:gap-y-4  px-4 lg:px-32 transition-all duration-2600 ${
              scrolled ? "backdrop-blur-none " : "backdrop-blur-md"
            }`}
          >
            <h1 className="  text-6xl text-center font-instrument  ">
              Their Business Was Saved By <span className="italic">Mera</span>
            </h1>
            <h3 className=" text-2xl px-4 lg:px-32 font-diatype-regular text-center leading-snug lg:leading-tight ">
              And we would like to help you too! Create your Management system
              for your business today — so you can stay focused doing what you
              do best!
            </h3>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-0 lg:mt-4">
              <Link href="./createWorkspace">
                <button className="btn btn-primary ui-app btn-lg dark:btn-secondary">
                  Get Started
                </button>
              </Link>
              <Link href="./createWorkspace">
                <button className="btn ui-app btn-lg">Log In</button>
              </Link>
            </div>
          </div>
        </section>
        <section className=" container-xl mx-auto flex flex-col items-center justify-center w-full h-screen  px-8 lg:px-32 gap-y-4 lg:gap-y-2">
          <MyCalendar />
          <div className=" flex flex-row flex-wrap items-center justify-center gap-4 px-4 lg:px-32">
            <Link href="./createWorkspace">
              <button className="btn ui-landing btn-lg ">BUTTON</button>
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
          <div className=" w-full aspect-square lg:aspect-video flex flex-col lg:flex-row items-center justify-start bg-base-300  rounded-3xl">
            <div className="aspect-square flex flex-col items-start justify-center w-full lg:w-1/2  px-16 pb-8 pt-16 lg:px-32 gap-4">
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
          </div>
        </section>
      </div>
    </>
  );
}
