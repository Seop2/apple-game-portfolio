"use client"
import { useRef, useCallback } from "react";
import GameBoard from "./play/GameBoard";
import styles from "../app/play/page.module.css"
import { decompressFromEncodedURIComponent } from "lz-string";
const DEMO_REPLAY = "N4IgNg9g5gziBcBtUAHCMCMDEAYA0ALALp4howBM2+ArCSAC4CWAtgKYIYBsAHAMwBfPKnRYkFPAE565Kkj5T6zdggI0MNISMzYui0rOwB2fY1Yd4vLpK1lRuvFxno5iE09LKLRozRvC7HSQaQmdKbBC6T3MEHl8uW3IxRAI8HDDXVIolGPgMHAwKQQCk7FT0gxcyvAwclTyMRqNE+3kajOwFbOj6xskeDBagxAliSvDxPD46iww+DAIcAXoAIwgAQwAnABNkySnHPB48SKk8CT0TY70MM4kFW4kQvWOQrsIDkyeao4-b9w+elSwN+1wOxwk+wkFzwJn2enhv1u+yu51++2OqWRsJxqUxaOhaIUCJOP1SCjBIUxqw2OzkADsAK5gMACIA"
export default function DemoComponent() {
    const timerRef = useRef(null);
    const replayModalRef = useCallback((el) => {
        if (!el || !DEMO_REPLAY) return;
        try {
            const data = JSON.parse(decompressFromEncodedURIComponent(DEMO_REPLAY));
            timerRef.current = setTimeout(() => {
                el.replay(data);
            }, 1000)
        } catch (error) {
            console.error("Failed to parse demo replay data:", error);
        }
    }, [])
    return <GameBoard className={styles.board} ref={replayModalRef} />
}   