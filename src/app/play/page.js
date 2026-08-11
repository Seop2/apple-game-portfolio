"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./page.module.css"
import GameBoard from "@/components/play/GameBoard";

export default function Play() {
    const [playing, setPlaying] = useState(false);
    const ref = useRef(null);

    function gamestart() {
        if (!playing) {
            ref.current.start();
        } else {
            ref.current.stop();
        }
        setPlaying((v) => !v);
    }


    function attachRef(el) {
        ref.current = el;
        if (!el) return;

        const onGameOver = () => setPlaying(false);
        el.addEventListener("gameover", onGameOver);
        return () => el.removeEventListener("gameover", onGameOver);
    }

    return (
        <main className={styles.page}>
            <button
                className={styles.gameStartButton}
                onClick={gamestart}>{playing ? "게임종료" : "게임시작"}</button>

            <Suspense fallback={<div>로딩중....</div>}>
                <GameBoard ref={attachRef} />
            </Suspense>

        </main>
    );
}