"use client";

import { useState } from "react";
import * as motion from "motion/react-client";

import ToolBarAdmin from "./ToolBarAdmin";

export default function DrawerBase({ isAdmin }) {
  const [activeDrawer, setActiveDrawer] = useState(false);

  function openDrawer() {
    setActiveDrawer((prev) => !prev);
  }
  return (
    <>
      <motion.div
        className={`absolute cursor-pointer ${
          activeDrawer ? "right-0" : "-right-[356px]"
        } top-0 z-30 w-[384px] h-full pt-16 pb-16 transition-all ${
          isAdmin ? "hidden lg:block" : "hidden"
        }`}
        whileHover={!activeDrawer ? { x: -64 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* -right-[356px] */}
        {/* <AdminDrawer></AdminDrawer> */}
        <div className=" cursor-pointer flex flex-row w-full h-full ">
          <div
            onClick={openDrawer}
            className="cursor-pointer flex flex-col h-full pt-16"
          >
            <div className="cursor-pointer flex items-center justify-center w-[28px] h-36 bg-secondary rounded-l-full py-6 pl-2 border-r-secondary">
              <div className="w-1 h-full bg-secondary-content rounded-l-full"></div>
            </div>
          </div>

          <div className="flex flex-col bg-secondary w-full h-full rounded-l-3xl border-l-secondary">
            <ToolBarAdmin></ToolBarAdmin>
          </div>
        </div>
      </motion.div>
    </>
  );
}
