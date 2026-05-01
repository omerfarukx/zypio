"use client";

export default function AdNative() {
    return (
        <div className="flex justify-center items-center w-full my-6 bg-[#1C1C1E] border border-white/5 rounded-2xl p-4 min-h-[100px]">
            <iframe
                srcDoc={`
                    <html>
                        <head>
                            <style>body{margin:0;padding:0;overflow:hidden;background:transparent;}</style>
                        </head>
                        <body>
                            <script type="text/javascript" src="https://pl29312011.profitablecpmratenetwork.com/cf3e270da1eb605fb994858e8d9e1735/invoke.js"></script>
                            <div id="container-cf3e270da1eb605fb994858e8d9e1735"></div>
                        </body>
                    </html>
                `}
                width="100%"
                height="100%"
                style={{ minHeight: '100px' }}
                frameBorder="0"
                scrolling="no"
                className="w-full h-full flex items-center justify-center"
                title="Native Advertisement"
            />
        </div>
    );
}
