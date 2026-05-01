"use client";
import { useEffect, useRef } from "react";

export default function Ad728x90() {
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bannerRef.current) return;
        // Zaten yüklüyse tekrar ekleme (React Strict Mode koruması)
        if (bannerRef.current.innerHTML.trim() !== '') return;

        const confScript = document.createElement('script');
        confScript.type = 'text/javascript';
        confScript.innerHTML = `
            atOptions = {
                'key' : '0cfa8a4c9e65338a797c8b33ac337db6',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
            };
        `;

        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = 'https://www.highperformanceformat.com/0cfa8a4c9e65338a797c8b33ac337db6/invoke.js';
        invokeScript.async = true;

        bannerRef.current.appendChild(confScript);
        bannerRef.current.appendChild(invokeScript);
    }, []);

    return (
        <div className="flex justify-center items-center w-full overflow-hidden my-4 min-h-[90px]">
            <div
                ref={bannerRef}
                className="w-full max-w-[728px] h-[90px] bg-[#1C1C1E] border border-dashed border-white/10 rounded-xl flex items-center justify-center overflow-hidden"
                aria-label="Advertisement 728x90"
            >
            </div>
        </div>
    );
}
