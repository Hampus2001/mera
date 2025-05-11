import "./globals.css";
import localFont from "next/font/local";
import WorkspaceContext from "@/context/WorkspaceContext";
import CalendarContext from "@/context/CalendarContext";

import { Instrument_Serif } from "next/font/google";
import { Roboto } from "next/font/google";

const fontInstrument = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fontInstrument",
});

const fontRoboto = Roboto({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-fontRoboto",
});

const fontDiatypeRegular = localFont({
  src: "./fonts/ABCDiatypeEdu-Regular.woff",
  display: "swap",
  variable: "--font-fontDiatypeRegular",
});

const fontDiatypeMedium = localFont({
  src: "./fonts/ABCDiatypeEdu-Medium.woff",
  display: "swap",
  variable: "--font-fontDiatypeMedium",
});

const fontDiatypeBold = localFont({
  src: "./fonts/ABCDiatypeEdu-Bold.woff",
  display: "swap",
  variable: "--font-fontDiatypeBold",
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

const fontMattone = localFont({
  src: "./fonts/Mattone-Regular.woff",
  display: "swap",
  variable: "--font-fontMattone",
});

const fontMattoneBold = localFont({
  src: "./fonts/Mattone-Bold.woff",
  display: "swap",
  variable: "--font-fontMattoneBold",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <WorkspaceContext>
        <CalendarContext>
          <body
            className={`${fontAbsans.variable} ${fontMattone.variable} ${fontMattoneBold.variable} ${fontMattoneBlack.variable} ${fontInstrument.variable} ${fontRoboto.variable} ${fontDiatypeRegular.variable} ${fontDiatypeMedium.variable} ${fontDiatypeBold.variable}  antialiased`}
          >
            {children}
          </body>
        </CalendarContext>
      </WorkspaceContext>
    </html>
  );
}
