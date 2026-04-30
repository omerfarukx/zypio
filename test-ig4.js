async function test() {
    const res = await fetch("https://vkrdownloader.vercel.app/server?vkr=https://www.instagram.com/p/C-X-oJ_NJ1m/");
    const data = await res.json();
    console.log(data);
}
test();