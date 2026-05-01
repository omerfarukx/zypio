"use client";
import { useEffect, useRef } from "react";

export default function Ad160x600() {
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bannerRef.current) return;
        if (bannerRef.current.innerHTML.trim() !== '') return;

        const confScript = document.createElement('script');
        confScript.type = 'text/javascript';
        confScript.innerHTML = `
            atOptions = {
                'key' : '442b0b8841ab79a7f194980584b5d534',
                'format' : 'iframe',
                'height' : 600,
                'width' : 160,
                'params' : {}
            };
        `;

        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = 'https://www.highperformanceformat.com/442b0b8841ab79a7f194980584b5d534/invoke.js';
        invokeScript.async = true;

        bannerRef.current.appendChild(confScript);
        bannerRef.current.appendChild(invokeScript);
    }, []);

    return (
        <div className="flex justify-center items-center w-full overflow-hidden min-h-[600px] sticky top-24">
            <div
                ref={bannerRef}
                className="w-[160px] h-[600px] bg-[#1C1C1E] border border-dashed border-white/10 rounded-xl flex items-center justify-center overflow-hidden"
                aria-label="Advertisement 160x600"
            >
            </div>
        </div>
    );
}
