"use client";

import { useEffect, useRef } from "react"
import GameBoard from "../play/GameBoard"
import styles from "./ReplayModal.module.css"
import { decompressFromEncodedURIComponent } from "lz-string";
export default function ReplayModal({ replayData, onClose }) {
    const replayRef = useRef(null);
    const replayModalRef = useCallback((el) => {
        replayRef.current = el;
        if (!el || !replayData) return;
        const data = JSON.parse(decompressFromEncodedURIComponent(replayData));

        const timerId = setTimeout(() => {
            el.replay(data);
        }, 1000)

    }, [replayData])


    async function onShare() {
        const url = `${window.location.origin}?replay=${replayData}`;
        await navigator.clipboard.writeText(url);
        window.alert("링크가 복사되었습니다! ✅")
    }


    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <h1 className={styles.title}>리플레이</h1>
                <button className={styles.share} onClick={onShare}>공유하기</button>
                <button className={styles.close} onClick={onClose}>닫기</button>
                <GameBoard className={styles.board} ref={replayModalRef} />
            </div>
        </div>
    )
}