export function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logo-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo */}
                    <stop offset="100%" stopColor="#DB2777" /> {/* Pink */}
                </linearGradient>
                <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Dış Çerçeve (Kare ve Köşeleri Yuvarlatılmış - Glassmorphism Efekti ile) */}
            <rect
                x="10"
                y="10"
                width="180"
                height="180"
                rx="40"
                fill="url(#logo-bg-gradient)"
            />
            
            {/* İç Çerçeve Parlaması */}
            <rect
                x="14"
                y="14"
                width="172"
                height="172"
                rx="36"
                fill="transparent"
                stroke="#FFFFFF"
                strokeOpacity="0.2"
                strokeWidth="2"
            />

            {/* İç İkon - Yeni Z ve Dönüşüm Ok Karışımı Soyut Şekil */}
            <g filter="url(#logo-glow)">
                <path
                    d="M 50 60 L 150 60 L 50 140 L 150 140"
                    stroke="#FFFFFF"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {/* Dönüşüm Oku */}
                <path
                    d="M 120 110 L 150 140 L 120 170"
                    stroke="#FFFFFF"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
}
