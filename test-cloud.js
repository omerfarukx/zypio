const ytdl = require('cloud-ytdl');

async function test() {
  try {
    const info = await ytdl.getInfo('https://www.youtube.com/watch?v=jNQXAC9IVRw');
    console.log(info.videoDetails.title);
  } catch(e) {
    console.error(e);
  }
}
test();