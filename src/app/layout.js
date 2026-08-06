import "./globals.css";
import Link from "next/link";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/">Home</Link>
          <Link href="/play">Play</Link>
          <Link href="/ranking">Ranking</Link>
        </header>
        {children}</body>
    </html>
  );
}
