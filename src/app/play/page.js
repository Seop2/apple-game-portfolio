import { Suspense } from "react";
import styles from "./page.module.css"
import GameBoard from "@/components/play/GameBoard";

export default function Play() {
    return (
        <main className={styles.page}>
            <h1>Play</h1>
            <Suspense fallback={<div>로딩중....</div>}>
                <GameBoard />
            </Suspense>

        </main>
    );
}