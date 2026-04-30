const { exec } = require('child_process');
exec('bin\\yt-dlp.exe "https://www.instagram.com/p/C-X-oJ_NJ1m/" --dump-json', (err, stdout, stderr) => {
    if (err) console.error(err);
    else console.log(JSON.parse(stdout).url);
});