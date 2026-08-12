"use client";

import { Suspense, useCallback, useRef, useState } from "react";
import styles from "./page.module.css"
import GameBoard from "@/components/play/GameBoard";
import { useRanking } from "../store";

export default function Play() {
    const { addRecord } = useRanking();
    const [playing, setPlaying] = useState(false);
    const ref = useRef(null);

    const gamestart = useCallback(() => {
        if (!playing) {
            ref.current.start();
        } else {
            ref.current.stop();
        }
        setPlaying((v) => !v);
    }, [playing])


    const attachRef = useCallback((el) => {
        ref.current = el;
        if (!el) return;

        const onGameOver = (e) => {
            addRecord(e.detail);
            setPlaying(false);
        }
        el.addEventListener("gameover", onGameOver);
        return () => el.removeEventListener("gameover", onGameOver);
    }, [addRecord])

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