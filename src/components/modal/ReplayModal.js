"use client";

import { useEffect, useRef } from "react"
import GameBoard from "../play/GameBoard"
import styles from "./ReplayModal.module.css"
import { decompressFromEncodedURIComponent } from "lz-string";
export default function ReplayModal({ replayData, onClose }) {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current) return;
        const data = JSON.parse(decompressFromEncodedURIComponent(replayData));

        const timerId = setTimeout(() => {
            ref.current.replay(data);
        }, 1000)
        return () => clearTimeout(timerId);
    }, [replayData])
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <h1 className={styles.title}>리플레이</h1>
                <button className={styles.close} onClick={onClose}>닫기</button>
                <GameBoard className={styles.board} ref={ref} />
            </div>
        </div>
    )
}