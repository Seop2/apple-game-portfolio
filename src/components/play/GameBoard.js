"use client";

import dynamic from "next/dynamic";

const AppleGame = dynamic(() =>
    import("./game.js").then(() => ({

        default({ ref, className }) {
            return <apple-game-board ref={ref} class={className} />
        }
    })), { ssr: false }
);

export default function GameBoard({ ref, className }) {
    return <AppleGame ref={ref} className={className} />;
}