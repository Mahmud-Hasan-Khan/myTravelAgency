// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "./components/shared/Navbar/Navbar";
// import NextAuthProvider from "@/Providers/NextAuthProvider";
// import { ToastContainer } from "react-toastify";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Wakia Travels : Book Air Ticket, Hotel, Visa, Umhar Package",
//   description: "The travel agency that really cares",
// };


// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body data-theme="light"
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <NextAuthProvider>
//           <Navbar />
//           {children}
//           <ToastContainer
//             position="top-right"
//             autoClose={3000}
//             hideProgressBar={false}
//             newestOnTop
//             closeOnClick
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//           />
//         </NextAuthProvider>
//       </body>
//     </html>
//   );
// }
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/Providers/NextAuthProvider";
import { ToastContainer } from "react-toastify";
import ClientLayout from "./ClientLayout"; // new wrapper component
import ProfileUpdatePromptModal from "./components/ProfileUpdatePromptModal/ProfileUpdatePromptModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wakia Travels : Book Air Ticket, Hotel Booking, Visa Processing, Umhar Package",
  description: "The travel agency that really cares",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        data-theme="light"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <ClientLayout>
            <ProfileUpdatePromptModal />
            {children}
          </ClientLayout>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </NextAuthProvider>
      </body>
    </html>
  );
}
