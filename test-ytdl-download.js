const ytdl = require('ytdl-core-enhanced');
const fs = require('fs');

async function test() {
  try {
    const video = ytdl('https://www.youtube.com/watch?v=jNQXAC9IVRw', { quality: 'highest' });
    video.pipe(fs.createWriteStream('test.mp4'));
    video.on('end', () => console.log('Done!'));
  } catch(e) {
    console.error(e);
  }
}
test();