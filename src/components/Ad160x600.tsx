"use client";

export default function Ad160x600() {
    return (
        <div className="flex justify-center items-center w-full overflow-hidden min-h-[600px] sticky top-24">
            <iframe
                srcDoc={`
                    <html>
                        <head>
                            <style>body{margin:0;padding:0;overflow:hidden;background:transparent;}</style>
                        </head>
                        <body>
                            <script type="text/javascript">
                                atOptions = {
                                    'key' : '442b0b8841ab79a7f194980584b5d534',
                                    'format' : 'iframe',
                                    'height' : 600,
                                    'width' : 160,
                                    'params' : {}
                                };
                            </script>
                            <script type="text/javascript" src="https://www.highperformanceformat.com/442b0b8841ab79a7f194980584b5d534/invoke.js"></script>
                        </body>
                    </html>
                `}
                width="160"
                height="600"
                frameBorder="0"
                scrolling="no"
                className="w-[160px] h-[600px] bg-[#1C1C1E] border border-dashed border-white/10 rounded-xl"
                title="Advertisement 160x600"
            />
        </div>
    );
}
