const cloud = require("cloud-ytdl");

async function test() {
    const info = await cloud.getInfo("https://www.instagram.com/p/C-X-oJ_NJ1m/");
    console.log(info);
}
test();