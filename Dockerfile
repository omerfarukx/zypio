FROM python:3.11-slim

# Çalışma dizinini ayarla
WORKDIR /app

# Gerekli sistem paketlerini kur (Node.js ve FFmpeg)
RUN apt-get update && apt-get install -y curl ffmpeg
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# yt-dlp'yi Python üzerinden kur (en garantili yöntem)
RUN pip install --no-cache-dir yt-dlp

# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# Proje dosyalarını kopyala ve build al
COPY . .
RUN npm run build

# Portu aç ve uygulamayı başlat
EXPOSE 3000
CMD ["npm", "start"]