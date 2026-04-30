async function testLoader() {
    const url = "https://www.youtube.com/watch?v=jNQXAC9IVRw";
    const format = "720";

    console.log("Requesting download...");
    const res = await fetch(`https://loader.to/ajax/download.php?format=${format}&url=${url}`);
    const data = await res.json();

    const progressUrl = data.progress_url;
    console.log("Progress URL:", progressUrl);

    while (true) {
        const pRes = await fetch(progressUrl);
        const pData = await pRes.json();
        console.log("Progress:", pData.progress, pData.text);

        if (pData.success === 1 && pData.download_url) {
            console.log("✅ DOWNLOAD URL:", pData.download_url);
            break;
        }

        await new Promise(r => setTimeout(r, 2000));
    }
}
testLoader();