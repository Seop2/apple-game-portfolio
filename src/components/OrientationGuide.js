import Image from "next/image"
import styles from "./OrientationGuide.module.css"
export default function OrientationGuide() {
    return (
        <div className={styles.guide}>
            <div className={styles.content}>
                <Image src="/logo.png" width={192} height={192} alt="orientation guide logo" className={styles.image} />
                <h2>Rotate your device to portrait to play</h2>
            </div>
        </div>
    )
}