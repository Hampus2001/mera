"use client";

// function ImageRotating() {
//   return (
//     <img src="/MeraBild1.png" alt="Imagen rotando" className="rotating-image" />
//   );
// }

// export default ImageRotating;
import { useState } from "react";

function ImageRotating() {
  const [girando, setGirando] = useState(true);

  const toggleRotacion = () => {
    setGirando(!girando);
  };

  return (
    <img
      src="/MeraBild1.png"
      alt="Imagen rotando"
      onClick={toggleRotacion}
      className={`w-48 cursor-pointer transition-all duration-300 ${
        girando ? 'medium-rotation' : ''
      }`}
    />
  );
}

export default ImageRotating;
