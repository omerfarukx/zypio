async function testLoader() {
    const url = "https://www.instagram.com/p/C-X-oJ_NJ1m/";
    const format = "720";

    console.time("loader.to IG");
    const res = await fetch(`https://loader.to/ajax/download.php?format=${format}&url=${url}`);
    const data = await res.json();
    const progressUrl = data.progress_url;

    while (true) {
        const pRes = await fetch(progressUrl);
        const pData = await pRes.json();
        if (pData.success === 1 && pData.download_url) {
            console.timeEnd("loader.to IG");
            console.log(pData.download_url);
            break;
        }
        await new Promise(r => setTimeout(r, 1000));
    }
}
testLoader();