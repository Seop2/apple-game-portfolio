"use client"

import { compressToEncodedURIComponent } from "lz-string";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
const RankingContext = createContext(null);

const VERSION = "4";


export function RankingProvider({ children }) {
    const [ranks, setRanks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const addRecord = useCallback((record) => {
        record.dragCount = record.replay.logs.filter(log => !log.refresh).length;
        record.replay = compressToEncodedURIComponent(JSON.stringify(record.replay));
        setRanks(prev => ([record, ...prev].sort((a, b) => {
            const ds = b.score - a.score; //내림차순
            if (ds !== 0) return ds;

            const dragCnt = a.dragCount - b.dragCount;
            if (dragCnt !== 0) return dragCnt;

            return new Date(a.date) - new Date(b.date);
            //score , date 
        }).slice(0, 10))) // 10등까지
    }, []);

    useEffect(() => {
        const version = localStorage.getItem("version");
        if (version != VERSION) {
            localStorage.clear();
            localStorage.setItem("version", VERSION);
        }
        const rawRanks = localStorage.getItem("ranks");
        const initialRanks = rawRanks ? JSON.parse(rawRanks) : []
        setRanks(initialRanks);
        setIsLoaded(true);

    }, []);

    useEffect(() => {
        if (!isLoaded) {
            return;
        }
        // 순위 배열이 변경될 때마다 로컬스토리지 저장
        localStorage.setItem("ranks", JSON.stringify(ranks));
    }, [ranks, isLoaded]);

    return <RankingContext.Provider value={{ ranks, addRecord }}>{
        children
    }</RankingContext.Provider>
}

export const useRanking = () => useContext(RankingContext);