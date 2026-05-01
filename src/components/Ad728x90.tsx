"use client";

export default function Ad728x90() {
    return (
        <div className="flex justify-center items-center w-full overflow-hidden my-4 min-h-[90px]">
            <iframe
                srcDoc={`
                    <html>
                        <head>
                            <style>body{margin:0;padding:0;overflow:hidden;background:transparent;}</style>
                        </head>
                        <body>
                            <script type="text/javascript">
                                atOptions = {
                                    'key' : '0cfa8a4c9e65338a797c8b33ac337db6',
                                    'format' : 'iframe',
                                    'height' : 90,
                                    'width' : 728,
                                    'params' : {}
                                };
                            </script>
                            <script type="text/javascript" src="https://www.highperformanceformat.com/0cfa8a4c9e65338a797c8b33ac337db6/invoke.js"></script>
                        </body>
                    </html>
                `}
                width="728"
                height="90"
                frameBorder="0"
                scrolling="no"
                className="w-full max-w-[728px] h-[90px] bg-[#1C1C1E] border border-dashed border-white/10 rounded-xl"
                title="Advertisement 728x90"
            />
        </div>
    );
}
