"use client"

import ReplayModal from "@/components/modal/ReplayModal";
import { useRanking } from "../store";
import styles from "./page.module.css"
import { useState } from "react";

const dateFmt = new Intl.DateTimeFormat("en-US", {
    month: "short", // Jan, Feb, …
    day: "numeric", // 5
    year: "numeric", // 2025
});

export default function RankingPage() {
    const { ranks } = useRanking();
    const [replayData, setReplayData] = useState(null);
    return (
        <main className={styles.page}>
            <h1>Ranking</h1>
            <table>
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>점수</th>
                        <th>드래그 갯수</th>
                        <th>날짜</th>
                        <th>리플레이</th>
                    </tr>
                </thead>
                <tbody>
                    {ranks.map(({ score, date, dragCount, replay }, i) => (<tr key={`rank ${i}`}>
                        <td>{i + 1}</td>
                        <td>{score}</td>
                        <td>{dragCount}</td>
                        <td>{dateFmt.format(new Date(date))}</td>
                        <td><button onClick={() => setReplayData(replay)}>show</button></td>
                    </tr>))}
                    {Array(10 - ranks.length).fill(null).map((_, i) => (
                        <tr key={`dummy-${i}`}>
                            <td>{i + ranks.length + 1}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {replayData && <ReplayModal replayData={replayData} onClose={() => setReplayData(null)} />}

        </main>
    );
}