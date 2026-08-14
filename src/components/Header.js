import styles from "./header.module.css"
import Link from "next/link";
import HamburgerButton from "./button/HamburgerButton";
export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.title}>
                <h1>APPLE GAME</h1>
            </Link>
            <nav className={styles.navLink}>
                <Link href="/">Home</Link>
                <Link href="/play">Play</Link>
                <Link href="/ranking">Ranking</Link>
            </nav>
            <HamburgerButton />
        </header>
    )
}