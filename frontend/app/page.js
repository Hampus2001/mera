import { Button } from "@/components/ui/button";
import Calendar from "@/components/Calendar";
import ImageRotating from "@/components/ImageRotating";

export default function Home() {
  return (
    <div>
      <Button variant="secondary" className="font-absans bg-[var(--color-malachite)]">
        Button
      </Button>
      <Button variant="secondary" className="font-absans bg-[var(--color-amarillo)]">
        Button
      </Button>
      <Button variant="secondary" className="font-absans text-white bg-[var(--color-militar)]">
        Button
      </Button>
      <Button variant="secondary" className="font-absans bg-[var(--color-cenize)]">
        Button
      </Button>
      <Button size="lg" className="font-mattone-black bg-[var(--color-scarlett)]">
        Button
      </Button>
      <Button size="lg" className="font-mattone-black bg-[var(--color-aubergine)]">
        Button
      </Button>
      <Button size="lg" className="font-mattone-black bg-[var(--color-cobalt)]">
        Button
      </Button>
      <Button size="lg" className="font-mattone-black bg-[var(--color-coralred)]">
        Button
      </Button>
      <Button size="lg" className="font-mattone-black bg-[var(--color-ochre)]">
        Button
      </Button>
      <h1 className="font-mattone-black text-6xl flex items-center justify-center ">MERA</h1>
      <h2 className="font-absans text-6xl">Make</h2>
      <div className="flex items-center justify-center bg-white"><ImageRotating/></div>
      <Calendar />
      
    </div>
  );
}
