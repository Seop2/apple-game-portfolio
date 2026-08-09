"use client";

import dynamic from "next/dynamic";

const AppleGame = dynamic(() =>
    import("./game.js").then(() => ({
        default: () => <apple-game-board />
    })), { ssr: false }
);

export default function GameBoard() {
    return <AppleGame />;
}