"use client"

import { compressToEncodedURIComponent } from "lz-string";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const CURRENT_VERSION = 6;

export const useRankingStore = create(
    persist(
        (set) => ({
            ranks: [],
            addRecord: (record) => {
                record.dragCount = record.replay.logs.filter((log) => !log.refresh).length;
                record.replay = compressToEncodedURIComponent(JSON.stringify(record.replay));
                set((state) => ({
                    ranks: [record, ...state.ranks].sort((a, b) => {
                        const ds = b.score - a.score; // 내림차순
                        if (ds !== 0) return ds;

                        const dragCnt = a.dragCount - b.dragCount;
                        if (dragCnt !== 0) return dragCnt;

                        return new Date(a.date) - new Date(b.date);
                    }).slice(0, 10), // 10등까지
                }));
            },
        }),
        {
            name: "ranking-storage",
            version: CURRENT_VERSION,
            storage: createJSONStorage(() => localStorage),
        }
    )
);
