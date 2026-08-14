"use client"
import { useState } from "react"
import styles from "./Hamburger.module.css"
import headerStyles from "../header.module.css"
import Image from "next/image"
import Link from "next/link";

export default function HamburgerButton() {
    const [isOpen, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(prev => !prev);
    }

    return (
        <>
            <button className={styles.menu} onClick={toggleOpen}>
                <Image src={"/menu.png"} alt="menu" width={30} height={30} />
            </button>
            {isOpen && (
                <nav className={headerStyles.mobileMenu} onClick={() => setOpen(false)}>
                    <Link href="/">Home</Link>
                    <Link href="/play">Play</Link>
                    <Link href="/ranking">Ranking</Link>
                </nav>
            )}
        </>
    )
}