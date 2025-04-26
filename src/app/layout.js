import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wakia Travels : Book Air Ticket, Hotel, Visa, Umhar Package",
  description: "The travel agency that really cares",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body data-theme="light"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>

        {children}
      </body>
    </html>
  );
}
