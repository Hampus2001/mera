"use client";

import { useState } from "react";
import * as motion from "motion/react-client";

import ToolBarAdmin from "./ToolBarAdmin";
import AdminDrawer from "./AdminDrawer";

export default function DrawerBase({
  isAdmin,
  eventMode,
  setEventMode,
  activeDrawer,
  setActiveDrawer,
  openEventCreator,
  openDrawer,
}) {
  return (
    <>
      <div className="flex flex-col gap-y-4 bg-secondary items-center justify-end lg:justify-start w-full h-screen lg:h-full rounded-none  border-l-secondary px-8 pb-16 lg:p-8 shadow-md ">
        {eventMode ? (
          <>
            <AdminDrawer />
            <div className="grid grid-cols-2 w-full mt-4 gap-x-4">
              <button onClick={openEventCreator} className="btn ui-app">
                Back
              </button>
              <button
                type="submit"
                className="btn btn-primary ui-app col-span-1"
              >
                Add event
              </button>
            </div>
          </>
        ) : (
          <>
            <ToolBarAdmin />
            <div className="grid grid-cols-2 w-full mt-4 gap-x-4 px-8 lg:px-0">
              <button
                onClick={openDrawer}
                className="btn ui-app block lg:hidden "
              >
                Back
              </button>
              <button
                onClick={openEventCreator}
                className="btn btn-primary ui-app col-span-1 lg:col-span-2 w-full"
              >
                Create Event
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
