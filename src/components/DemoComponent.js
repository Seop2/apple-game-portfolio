"use client"
import { useRef, useCallback } from "react";
import GameBoard from "./play/GameBoard";
import styles from "../app/play/page.module.css"
import { decompressFromEncodedURIComponent } from "lz-string";
const DEMO_REPLAY = "N4IgNg9g5gziBcBtUAHCMCMDEDYA0AnALp4howBM2+AHCSAC4CWAtgKYICsAzBjQL55U6LEk546pclTGF6zdggDsFThkHDM2cRgAM9adTx75rDvBo8KGsiOwVj+qehmIALI9OL4BGgQI25KKIunLOlNihJqQK5hgYKm6BdkgYeEoGLthpkoxmCBjcFDRJQrZaSA65hpVhed4YbjjcpZrBHjiZEUgeGTH58AmcJckViGmd4a4Ok-XmFHxuuqPBobM1IRJe87wtK5F4TuWuoRTbCBRKusP7qXhnU-b35-DFBKq3iA7cXa7ceD9+t4KP4Ep98EcNvgMC9uCpdAIygAnNgAMxRMAAFggGEiAK5sIHmbg0CgUVrlYJpSFZWpHWIIbj+XyfNIPY7ZAEvJYENyItqc9a08bpbkLThKVmeR61aJzBBuNyNAJlILYDzEGXuaXy+BuTg4Q2fXq-dV1Bl6gi6FmqlKIf5C7ra2YWzjWpafb6m2puF6ccm6SW2sb-dkbDzs12KpTcT3PLXiSMDTgG0ng+McpD4JPeThWiix4PBfCAzO4DMWnC6MnqItGMPC-C+okIKukwsCpBKQ7exDdmEt+A4EG8T7-Ztl-6cF5XNxMz6harCtYzplW-j0ABGEAAhkiACbBUN4RN4DUngH3PBNs-XwjpB--GgX8Qef4EO9pDy9K-dm9sy8HVvHQrw8Z8SwkO8QPA28n0Ai9-jg59n3EG8PHEU98BAkC0g-WhL3Ed9HwvfDZm3Pd91cDw0jSbtuw-Y9xH7eCqgffAPxo4xL27U9WJyC86IfZ8HHPbsgI-D9UNvPDLwY28Oi4j9u1Yj9qIfcQ5LU5SCJ0uT8G05CuK0i9DLOfggA"
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