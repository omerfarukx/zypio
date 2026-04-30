const { instagramGetUrl } = require("instagram-url-direct");
async function test() {
    console.time("ig");
    let links = await instagramGetUrl("https://www.instagram.com/reel/C8q8q1mP3R4/");
    console.timeEnd("ig");
    console.log(links);
}
test();