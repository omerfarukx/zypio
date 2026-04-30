const ytdl = require('ytdl-core-enhanced');
const { HttpsProxyAgent } = require('https-proxy-agent');

async function test() {
    try {
        const res = await fetch('https://proxylist.geonode.com/api/proxy-list?limit=50&sort_by=lastChecked&sort_type=desc&protocols=http%2Chttps');
        const json = await res.json();
        const proxies = json.data;

        for (let p of proxies) {
            try {
                const proxyUrl = `http://${p.ip}:${p.port}`;
                console.log('Testing proxy:', proxyUrl);
                const agent = ytdl.createProxyAgent({ uri: proxyUrl });
                const info = await ytdl.getInfo('https://www.youtube.com/watch?v=jNQXAC9IVRw', { agent, requestOptions: { timeout: 5000 } });
                console.log('✅ WORKING PROXY:', proxyUrl, info.videoDetails.title);
                break;
            } catch (e) {
                // console.error(e.message);
            }
        }
    } catch (e) {
        console.error(e);
    }
}
test();