import { Hi_Melody } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

/* 폰트 적용 */
const hi_melody = Hi_Melody({
  variable: "--font-hi-melody",
  subsets: ["latin"], weight: "400"
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={hi_melody.variable}>
        <Header />
        {children}</body>
    </html>
  );
}
