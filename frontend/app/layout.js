import "./globals.css";
import localFont from "next/font/local";

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
        className={`${fontAbsans.variable} ${fontMattoneBlack.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
