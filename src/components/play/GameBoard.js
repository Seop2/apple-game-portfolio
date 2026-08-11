"use client";

import dynamic from "next/dynamic";

const AppleGame = dynamic(() =>
    import("./game.js").then(() => ({

        default({ ref }) {
            return <apple-game-board ref={ref} />
        }
    })), { ssr: false }
);

export default function GameBoard({ ref }) {
    return <AppleGame ref={ref} />;
}