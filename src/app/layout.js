import { Hi_Melody } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { RankingProvider } from "./store";
import OrientationGuide from "@/components/OrientationGuide";

/* 폰트 적용 */
const hi_melody = Hi_Melody({
  variable: "--font-hi-melody",
  subsets: ["latin"], weight: "400"
});

export const metadata = {
  manifest: "./manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default"
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={hi_melody.variable}>
        <Header />
        <RankingProvider>
          {children}
        </RankingProvider>
        <OrientationGuide />
      </body>
    </html>
  );
}
