"use client";
import { useState } from "react";
import LandingNav from "@/components/LandingNav";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import * as motion from "motion/react-client";

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
            <h1 className="  text-6xl text-center font-instrument  dark:text-primary">
              Their Business Was Saved By <span className="italic">Mera</span>
            </h1>
            <h3 className=" text-2xl px-4 lg:px-32 font-diatype-regular text-center leading-snug lg:leading-tight ">
              And we would like to help you too! Create your Management system
              for your business today — so you can stay focused doing what you
              do best!
            </h3>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-0 lg:mt-4">
              <Link href="./auth">
                <button className="btn btn-primary ui-app btn-lg dark:btn-secondary">
                  Get Started
                </button>
              </Link>
              <Link href="./auth">
                <button className="btn ui-app btn-lg">Log In</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
