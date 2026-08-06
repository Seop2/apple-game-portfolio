import styles from "./page.module.css"

const RANKS = [{ rank: 1, score: 10000, dragCount: 56, date: new Date().toLocaleDateString(), replay: true }, { rank: 2, score: 5000, dragCount: 36, date: new Date().toLocaleDateString(), replay: true }, { rank: 3, score: 4000, dragCount: 20, date: new Date().toLocaleDateString(), replay: true }, { rank: 4, score: 3000, dragCount: 20, date: new Date().toLocaleDateString(), replay: true }, { rank: 5, score: 2000, dragCount: 36, date: new Date().toLocaleDateString(), replay: false }]

export default function RankingPage() {
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
                    {RANKS.map(({ rank, score, dragCount, date, replay }) => (<tr key={rank}>
                        <td>{rank}</td>
                        <td>{score}</td>
                        <td>{dragCount}</td>
                        <td>{date}</td>
                        <td>{replay ? <button>재생</button> : ""}</td>
                    </tr>))}
                </tbody>
            </table>
        </main>
    );
}