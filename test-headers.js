const ytdl = require('ytdl-core-enhanced');

async function test() {
    try {
        const randomIP = () => Math.floor(Math.random() * 255) + 1 + '.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255);
        const ip = randomIP();
        console.log('Testing with IP:', ip);
        const info = await ytdl.getInfo('https://www.youtube.com/watch?v=jNQXAC9IVRw', {
            requestOptions: {
                headers: {
                    'X-Forwarded-For': ip,
                    'Client-IP': ip,
                    'True-Client-IP': ip
                }
            }
        });
        console.log("Title:", info.videoDetails.title);
    } catch (e) {
        console.error("ERROR:", e.message);
    }
}
test();