"use client";

export default function AdBanner() {
    return (
        <div className="flex justify-center items-center w-full my-4 min-h-[50px]">
            <iframe
                srcDoc={`
                    <html>
                        <head>
                            <style>body{margin:0;padding:0;overflow:hidden;background:transparent;}</style>
                        </head>
                        <body>
                            <script type="text/javascript">
                                atOptions = {
                                    'key' : 'b7ab3af266ec740bb5b28494805cfb6d',
                                    'format' : 'iframe',
                                    'height' : 50,
                                    'width' : 320,
                                    'params' : {}
                                };
                            </script>
                            <script type="text/javascript" src="https://www.highperformanceformat.com/b7ab3af266ec740bb5b28494805cfb6d/invoke.js"></script>
                        </body>
                    </html>
                `}
                width="320"
                height="50"
                frameBorder="0"
                scrolling="no"
                className="w-[320px] h-[50px] bg-[#0A0A0C] border border-white/5 rounded"
                title="Advertisement"
            />
        </div>
    );
}
