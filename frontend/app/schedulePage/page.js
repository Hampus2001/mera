"use client";

import MonthCalendar from "@/components/MonthCalendar";
import WeekCalendar from "@/components/WeekCalendar";
import DayCalendar from "@/components/DayCalendar";
import { useState, useContext } from "react";
import ScheduleNav from "@/components/ScheduleNav";
import { HandleCalendarContext } from "@/context/CalendarContext";
import * as motion from "motion/react-client";
import { PlusIcon } from "@radix-ui/react-icons";

import Sidebar from "@/components/Sidebar";

import DrawerBase from "@/components/DrawerBase";

export default function SchedulePage() {
  //Get "röda dagar"
  const [activeDrawer, setActiveDrawer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  const [eventMode, setEventMode] = useState(false);

  function openDrawer() {
    setActiveDrawer((prev) => !prev);
  }

  function openEventCreator() {
    setEventMode((prev) => !prev);
  }

  const { activeCalendar } = useContext(HandleCalendarContext);

  return (
    <>
      <Sidebar
        openDrawer={openDrawer}
        openEventCreator={openEventCreator}
        eventMode={eventMode}
        setEventMode={setEventMode}
        activeDrawer={setActiveDrawer}
      />

      <button
        onClick={openDrawer}
        id="+"
        className="fixed z-20 lg:hidden btn w-16 h-16 btn-base-300  btn-circle  right-10 bottom-16 shadow-lg "
      >
        <PlusIcon width={24} height={24} />
      </button>

      <div className="w-screen overflow-hidden">
        <ScheduleNav />
        {isAdmin && (
          <motion.div
            className={`absolute cursor-pointer ${
              activeDrawer ? "right-0" : "-right-[900px] lg:-right-[340px]"
            } top-0 z-30 w-full lg:w-[384px] h-full pt-0 pb-0 lg:pt-16  transition-all  `}
            whileHover={!activeDrawer ? { x: -16 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className=" h-full cursor-pointer flex flex-row w-full ">
              <div
                onClick={openDrawer}
                className="cursor-pointer lg:flex flex-col   pt-16 hidden   "
              >
                <div className="cursor-pointer flex items-center justify-center w-[28px] h-36 bg-secondary rounded-l-full py-6 pl-2 border-r-secondary shadow-xl ">
                  <div className="w-1 h-full bg-secondary-content rounded-l-full"></div>
                </div>
              </div>
              <DrawerBase
                activeDrawer={activeDrawer}
                setActiveDrawer={setActiveDrawer}
                eventMode={eventMode}
                setEventMode={setEventMode}
                openEventCreator={openEventCreator}
                openDrawer={openDrawer}
                isAdmin={true}
              />
            </div>
          </motion.div>
        )}
        <div className="lg:pl-16 w-full h-full">
          {activeCalendar == "Month" && <MonthCalendar />}
          {activeCalendar == "Week" && <WeekCalendar />}
          {activeCalendar == "Day" && <DayCalendar />}
        </div>
      </div>
      {/* <AdminDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} /> */}
    </>
  );
}
