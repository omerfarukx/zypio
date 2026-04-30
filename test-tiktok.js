async function test() {
    try {
        const res = await fetch('https://tikwm.com/api/?url=https://www.tiktok.com/@tiktok/video/7106594312292453675');
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.error(e);
    }
}
test();