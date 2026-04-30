const ytdl = require('ytdl-core-enhanced');

async function test() {
  try {
    console.log('Testing Shorts URL...');
    const info = await ytdl.getInfo('https://www.youtube.com/shorts/VYzgEOPQbXY');
    console.log("Title:", info.videoDetails.title);
  } catch (e) {
    console.error("ERROR:", e.message);
  }
}
test();