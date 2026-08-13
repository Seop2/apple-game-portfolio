"use client"

import { useEffect, useState } from "react";
import ReplayModal from "./ReplayModal";
import { useSearchParams } from "next/navigation";

export default function ReplayController() {
    const params = useSearchParams();
    const [replayData, setReplayData] = useState(null);

    useEffect(() => {
        const data = params.get("replay");
        if (!data) return;
        setReplayData(data);
    }, [params])
    if (!replayData) return null;
    return (
        <ReplayModal replayData={replayData} onClose={() => { setReplayData(null) }} />
    )
}