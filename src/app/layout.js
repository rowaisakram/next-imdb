import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ThemeCom from "@/components/ThemeCom";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IMDB",
  description: "Movie Recommendation",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeCom>
            <Header />
            <Navbar />
            <SearchBox />
            {children}
          </ThemeCom>
        </body>
      </html>
    </ClerkProvider>
  );
}
