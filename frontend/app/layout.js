import "./globals.css";
import localFont from "next/font/local";

import { Instrument_Serif } from "next/font/google";

const fontInstrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fontInstrument",
});

const fontAbsans = localFont({
  src: "./fonts/Absans-Regular.woff",
  display: "swap",
  variable: "--font-fontAbsans",
});

const fontMattoneBlack = localFont({
  src: "./fonts/Mattone-Black.woff",
  display: "swap",
  variable: "--font-fontMattoneBlack",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fontAbsans.variable} ${fontMattoneBlack.variable} ${fontInstrument.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
