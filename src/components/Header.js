import styles from "./header.module.css"
import Link from "next/link";
export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">Home</Link>
            <Link href="/play">Play</Link>
            <Link href="/ranking">Ranking</Link>
        </header>
    )
}