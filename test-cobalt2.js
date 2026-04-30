const instances = [
    'api.cobalt.tools',
    'cobalt.qewertyy.dev',
    'co.wuk.sh',
    'api.cobalt.best',
    'api.cobalt.wuk.sh'
];

async function testAll() {
    for (let api of instances) {
        try {
            const res = await fetch('https://' + api, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
                },
                body: JSON.stringify({ url: 'https://www.instagram.com/p/C-X-oJ_NJ1m/' })
            });
            const data = await res.text();
            console.log(api, res.status, data.substring(0, 100));
        } catch (e) {
            console.log(api, 'Failed');
        }
    }
}
testAll();