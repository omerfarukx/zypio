const axios = require('axios');
async function test() {
    try {
        const res = await axios.post('https://v3.fdownloader.net/api/ajaxSearch',
            new URLSearchParams({ q: 'https://www.instagram.com/p/C-X-oJ_NJ1m/', vt: 'home' }).toString(),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        console.log(res.data);
    } catch (e) {
        console.error(e.message);
    }
}
test();