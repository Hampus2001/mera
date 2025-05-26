"use client";
import AdminDrawer from "./AdminDrawer";
import ToolBarAdmin from "./ToolBarAdmin";

export default function DrawerBase() {
  return (
    <>
      <div className="absolute right-0 card w-sm h-full bg-neutral ml-auto">
        {/* <AdminDrawer></AdminDrawer> */}
        <ToolBarAdmin></ToolBarAdmin>
        <div className="w-6 h-42 bg-neutral rounded-l-full absolute top-16 -left-4 shadow-md"></div>

        <div className="w-1 h-28 bg-base-200 rounded-l-full absolute top-24 left-0"></div>
      </div>
    </>
  );
}
