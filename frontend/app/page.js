import { Button } from "@/components/ui/button";
import Calendar from "@/components/Calendar";
import ImageRotating from "@/components/ImageRotating";

export default function Home() {
  return (
    <div>
      <Button variant="secondary" className="font-absans">
        Button
      </Button>
      <Button size="lg" className="font-mattone-black">
        Button
      </Button>
      <h1 className="font-mattone-black text-6xl flex items-center justify-center ">MERA</h1>
      <h2 className="font-absans text-6xl">Make</h2>
      <div className="flex items-center justify-center bg-white"><ImageRotating/></div>
      <Calendar />
      
    </div>
  );
}
