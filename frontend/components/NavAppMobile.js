import { FaBars } from "react-icons/fa";
export default function NavAppMobile() {
  return (
    <div className="flex h-16 px-9 mt-4 mx-4 rounded-full items-center justify-between bg-base-100 text-neutral">
      <h1>MERA</h1>
      <h4 className="text-2xl">
        <FaBars />
      </h4>
    </div>
  );
}
