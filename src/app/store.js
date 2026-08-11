"use client"

import { createContext, useContext, useState } from "react";
const RankingContext = createContext(null);

export function RankingProvider({ children }) {
    const [ranks, setRanks] = useState([]);

    function addRecord(record) {
        setRanks(prev => ([record, ...prev].sort((a, b) => {
            const ds = b.score - a.score; //내림차순
            if (ds !== 0) return ds;
            return a.date - b.date;
            //score , date 
        }).slice(0, 10))) // 10등까지
    }

    return <RankingContext.Provider value={{ ranks, addRecord }}>{
        children
    }</RankingContext.Provider>
}

export const useRanking = () => useContext(RankingContext);