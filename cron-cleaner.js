const fs = require('fs');
const path = require('path');
const os = require('os');

// Temizlenecek geçici klasör yolu (API'deki ile aynı)
const TEMP_DIR = path.join(os.tmpdir(), 'zypio_downloads');
// Kaç dakikadan eski dosyalar silinecek? (Şu an 60 dakika = 1 saat)
const MAX_AGE_MINUTES = 60;

console.log(`🧹 Zypio Çöpçüsü Başladı...`);
console.log(`📁 Hedef Klasör: ${TEMP_DIR}`);

// Klasör yoksa zaten silinecek bir şey de yoktur
if (!fs.existsSync(TEMP_DIR)) {
    console.log(`✅ Geçici klasör zaten boş veya yok. Temizlik bitti.`);
    process.exit(0);
}

const now = Date.now();
let deletedCount = 0;

try {
    const files = fs.readdirSync(TEMP_DIR);

    for (const file of files) {
        const filePath = path.join(TEMP_DIR, file);
        const stats = fs.statSync(filePath);

        // Dosyanın son değiştirilme zamanı ile şu an arasındaki fark (dakika)
        const ageInMinutes = (now - stats.mtimeMs) / (1000 * 60);

        if (ageInMinutes > MAX_AGE_MINUTES) {
            fs.unlinkSync(filePath);
            deletedCount++;
            console.log(`🗑️ Silindi: ${file} (${Math.round(ageInMinutes)} dakika önce oluşturulmuş)`);
        }
    }

    console.log(`✨ Temizlik tamamlandı. Toplam ${deletedCount} adet eski dosya silindi.`);
} catch (error) {
    console.error(`❌ Temizlik sırasında hata patladı:`, error.message);
}
