"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react";
const RankingContext = createContext(null);

export function RankingProvider({ children }) {
    const [ranks, setRanks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const addRecord = useCallback((record) => {
        setRanks(prev => ([record, ...prev].sort((a, b) => {
            const ds = b.score - a.score; //내림차순
            if (ds !== 0) return ds;
            return new Date(a.date) - new Date(b.date);
            //score , date 
        }).slice(0, 10))) // 10등까지
    }, []);

    useEffect(() => {
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