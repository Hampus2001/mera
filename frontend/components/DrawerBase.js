"use client";

import { useState } from "react";
import * as motion from "motion/react-client";

import ToolBarAdmin from "./ToolBarAdmin";
import AdminDrawer from "./AdminDrawer";

export default function DrawerBase({ isAdmin }) {
  const [activeDrawer, setActiveDrawer] = useState(false);

  const [eventMode, setEventMode] = useState(false);

  function openDrawer() {
    setActiveDrawer((prev) => !prev);
  }

  function openEventCreator() {
    setEventMode((prev) => !prev);
  }

  return (
    <>
      <motion.div
        className={`absolute cursor-pointer ${
          activeDrawer ? "right-0" : "-right-[356px]"
        } top-0 z-30 w-[384px] h-full pt-16 pb-16 transition-all ${
          isAdmin ? "hidden lg:block" : "hidden"
        }`}
        whileHover={!activeDrawer ? { x: -24 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className=" cursor-pointer flex flex-row w-full ">
          <div
            onClick={openDrawer}
            className="cursor-pointer flex flex-col  pt-16"
          >
            <div className="cursor-pointer flex items-center justify-center w-[28px] h-36 bg-secondary rounded-l-full py-6 pl-2 border-r-secondary">
              <div className="w-1 h-full bg-secondary-content rounded-l-full"></div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 bg-secondary w-full rounded-l-3xl border-l-secondary p-8">
            {eventMode ? (
              <>
                <AdminDrawer />
                <div className="grid grid-cols-2 w-full mt-4 gap-x-4">
                  <button
                    type="submit"
                    className="btn btn-primary ui-app col-span-1"
                  >
                    Add event
                  </button>

                  <button onClick={openEventCreator} className="btn ui-app">
                    Back
                  </button>
                </div>
              </>
            ) : (
              <>
                <ToolBarAdmin />
                <button
                  onClick={openEventCreator}
                  className="btn btn-secondary rounded-full border-secondary-content w-full"
                >
                  Create Event
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
