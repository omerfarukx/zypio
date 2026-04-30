const axios = require('axios');
async function test() {
    try {
        const params = new URLSearchParams();
        params.append('url', 'https://www.instagram.com/p/C-X-oJ_NJ1m/');
        params.append('action', 'post');

        const res = await axios.post('https://snapinsta.app/action2.php', params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': 'Mozilla/5.0'
            }
        });

        console.log(res.data);
    } catch (e) {
        console.error(e.message);
    }
}
test();