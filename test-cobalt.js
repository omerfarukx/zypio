async function testAll() {
  try {
    const res = await fetch('https://instances.cobalt.best/api/instances.json');
    const data = await res.json();
    const instances = data.filter(i => i.score > 0);
    console.log('Total instances:', instances.length);

    for (let inst of instances) {
      try {
        const r = await fetch('https://' + inst.api, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw' })
        });
        const t = await r.text();
        if (t.includes('"url"')) {
          console.log('✅ WORKING:', inst.api);
          break; // Stop after finding the first working one
        }
      } catch (e) {
      }
    }
  } catch (e) {
    console.error(e);
  }
}
testAll();