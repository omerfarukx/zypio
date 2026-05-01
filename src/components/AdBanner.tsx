"use client";
import { useEffect, useRef } from "react";

export default function AdBanner() {
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bannerRef.current) return;

        // React strict mode veya hot-reload durumunda içeriği temizle
        bannerRef.current.innerHTML = '';

        // Adsterra'nın konfigürasyon değişkeni
        const confScript = document.createElement('script');
        confScript.type = 'text/javascript';
        confScript.innerHTML = `
            atOptions = {
                'key' : 'b7ab3af266ec740bb5b28494805cfb6d',
                'format' : 'iframe',
                'height' : 50,
                'width' : 320,
                'params' : {}
            };
        `;

        // Adsterra'nın asıl reklam çekme kodu
        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = 'https://www.highperformanceformat.com/b7ab3af266ec740bb5b28494805cfb6d/invoke.js';
        invokeScript.async = true;

        bannerRef.current.appendChild(confScript);
        bannerRef.current.appendChild(invokeScript);
    }, []);

    return (
        <div className="flex justify-center items-center w-full my-4">
            <div
                ref={bannerRef}
                className="w-[320px] h-[50px] bg-[#0A0A0C] border border-white/5 rounded flex items-center justify-center overflow-hidden"
                aria-label="Advertisement"
            >
            </div>
        </div>
    );
}
