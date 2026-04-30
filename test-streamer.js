const { YouTubeDL } = require('yt-streamer');

async function test() {
  try {
    const info = await YouTubeDL('https://www.youtube.com/watch?v=jNQXAC9IVRw');
    console.log(info);
  } catch (e) {
    console.error(e);
  }
}
test();