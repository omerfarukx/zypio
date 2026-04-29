export function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Arka Plan Gradyanı */}
            <defs>
                <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" /> {/* Mavi */}
                    <stop offset="100%" stopColor="#9333EA" /> {/* Mor */}
                </linearGradient>
                <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Dış Çerçeve (Kare ve Köşeleri Yuvarlatılmış) */}
            <rect
                x="10"
                y="10"
                width="180"
                height="180"
                rx="45"
                fill="url(#bg-gradient)"
            />

            {/* İç İkon - Z ve Play İkonu Karışımı Soyut Bir Şekil */}
            <g filter="url(#glow)">
                <path
                    d="M 65 60 
             L 135 60 
             L 80 100 
             L 145 100 
             L 65 150 
             L 85 110 
             L 50 110 
             Z"
                    fill="url(#icon-gradient)"
                />
            </g>

            {/* Dönüşüm (Convert) Okları - Sağ Alt Köşeye Şık Bir Detay */}
            <path
                d="M 140 135 A 15 15 0 0 1 125 150 M 140 135 L 135 125 M 140 135 L 145 125"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
            />
        </svg>
    );
}
