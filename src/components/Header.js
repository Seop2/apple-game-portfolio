import styles from "./header.module.css"
import Link from "next/link";
export default function Header() {
    return (
        <header className={styles.header}>
            <h1>APPLE GAME</h1>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/play">Play</Link>
                <Link href="/ranking">Ranking</Link>
            </nav>
        </header>
    )
}