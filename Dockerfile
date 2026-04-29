FROM node:18-bullseye

# Gerekli sistem paketlerini kur (FFmpeg ve yt-dlp için Python)
RUN apt-get update && apt-get install -y ffmpeg python3 curl

# yt-dlp'yi indir ve çalıştırılabilir yap
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
RUN chmod a+rx /usr/local/bin/yt-dlp

# Çalışma dizinini ayarla
WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# Proje dosyalarını kopyala ve build al
COPY . .
RUN npm run build

# Portu aç ve uygulamayı başlat
EXPOSE 3000
CMD ["npm", "start"]