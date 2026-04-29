const fs = require('fs');

async function testApi() {
  console.log("🚀 Zypio Convert API Testi Başlıyor...");
  try {
    const response = await fetch('http://localhost:3000/api/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', // "Me at the zoo" (Dünyanın ilk youtube videosu, 18 saniye)
        format: 'mp3'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Patladı: ${response.status} - ${errorText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Test için dosyayı diskte saklayalım
    fs.writeFileSync('test-sonuc.mp3', buffer);
    console.log("✅ Dosya başarıyla indirildi ve dönüştürüldü: test-sonuc.mp3");
    console.log("Boyut:", (buffer.length / 1024 / 1024).toFixed(2), "MB");

  } catch (error) {
    console.error("❌ HATA:", error.message);
  }
}

testApi();
