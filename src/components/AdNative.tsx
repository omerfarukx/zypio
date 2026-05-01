"use client";
import { useEffect, useRef } from "react";

export default function AdNative() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Zaten yüklüyse tekrar yükleme
        if (containerRef.current.querySelector('script')) return;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.dataset.cfasync = "false";
        script.src = 'https://pl29312011.profitablecpmratenetwork.com/cf3e270da1eb605fb994858e8d9e1735/invoke.js';

        containerRef.current.appendChild(script);
    }, []);

    return (
        <div className="flex justify-center items-center w-full my-6 bg-[#1C1C1E] border border-white/5 rounded-2xl p-4 min-h-[100px]">
            <div
                ref={containerRef}
                id="container-cf3e270da1eb605fb994858e8d9e1735"
                className="w-full h-full flex items-center justify-center"
            >
            </div>
        </div>
    );
}
