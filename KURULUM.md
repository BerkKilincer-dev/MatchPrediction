# 🚀 MatchMind.AI - Kurulum Kılavuzu

## 📋 Gereksinimler

- **Node.js**: v18.0.0 veya üzeri
- **npm**: v9.0.0 veya üzeri (Node.js ile birlikte gelir)
- **Gemini API Key**: Ücretsiz hesap oluşturun

## 🔑 Gemini API Key Alma

1. https://aistudio.google.com/app/apikey adresine gidin
2. Google hesabınızla giriş yapın
3. "Create API Key" butonuna tıklayın
4. API anahtarınızı kopyalayın ve güvenli bir yere kaydedin

## 📥 Kurulum Adımları

### 1. Projeyi İndirin

```bash
# Git ile klonlama
git clone <repository-url>
cd matchmind-ai

# veya ZIP dosyasını indirip açın
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

Bu komut aşağıdaki paketleri yükleyecektir:
- React 18.3.1
- TensorFlow.js 4.20.0
- Google Generative AI 0.21.0
- Recharts 2.12.7
- TypeScript 5.8.2
- Vite 6.2.0

### 3. API Anahtarını Yapılandırın

Proje dizininde `.env.local` dosyası oluşturun:

```bash
# Windows (PowerShell)
New-Item -Path . -Name ".env.local" -ItemType "file"

# macOS/Linux
touch .env.local
```

`.env.local` dosyasını açın ve API anahtarınızı ekleyin:

```env
VITE_GEMINI_API_KEY=AIzaSy...your_actual_api_key_here
```

⚠️ **ÖNEMLİ**: 
- API anahtarınızı kimseyle paylaşmayın
- `.env.local` dosyası Git'e commit edilmemelidir (.gitignore'da var)
- `your_api_key_here` yerine gerçek API anahtarınızı yazın

### 4. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Terminal çıktısı:

```
VITE v6.4.1  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### 5. Tarayıcıda Açın

Tarayıcınızda `http://localhost:5173` adresine gidin.

## 🎯 İlk Kullanım

### Gemini AI ile Test

1. Ana sayfada **"Gemini 2.5 AI"** seçeneğini seçin
2. **League** alanına: `Premier League`
3. **Home Team** alanına: `Arsenal`
4. **Away Team** alanına: `Liverpool`
5. **"Run Gemini Analysis"** butonuna tıklayın
6. 5-10 saniye içinde sonuçları göreceksiniz

### TensorFlow.js ile Test

1. Ana sayfada **"TensorFlow.js"** seçeneğini seçin
2. **League** alanına: `La Liga`
3. **Home Team** alanına: `Barcelona`
4. **Away Team** alanına: `Real Madrid`
5. **"Train & Predict"** butonuna tıklayın
6. Model eğitimi başlayacak ve sonuçları göreceksiniz

## 🏗️ Production Build

### Build Oluşturma

```bash
npm run build
```

Bu komut `dist/` klasöründe production-ready dosyaları oluşturacaktır.

### Build'i Test Etme

```bash
npm run preview
```

Build'i `http://localhost:4173` adresinde test edebilirsiniz.

## 🐛 Sorun Giderme

### Hata: "Cannot find module @google/generative-ai"

**Çözüm:**
```bash
npm install
# veya
npm install --force
```

### Hata: "Failed to initialize TensorFlow.js"

**Çözüm:**
1. Tarayıcınızı güncelleyin (Chrome 90+, Firefox 88+, Safari 14+)
2. Sayfayı yenileyin (F5)
3. Tarayıcı önbelleğini temizleyin

### Hata: "API key not valid"

**Çözüm:**
1. `.env.local` dosyasında API anahtarını kontrol edin
2. API anahtarının başında/sonunda boşluk olmadığından emin olun
3. Gemini API konsolunda API anahtarının aktif olduğunu kontrol edin
4. Geliştirme sunucusunu yeniden başlatın (`Ctrl+C` sonra `npm run dev`)

### Hata: "CORS policy"

**Çözüm:**
Bu hata normal ve beklenen bir durumdur. Web scraping özellikleri backend gerektirir.
Şu anda uygulama sentetik veri kullanarak çalışmaktadır.

### Build Uyarısı: "Chunks larger than 500 kB"

Bu normal bir uyarıdır. TensorFlow.js kütüphanesi büyüktür.
Performans sorunları yaşamıyorsanız göz ardı edebilirsiniz.

## 📦 Paket Yönetimi

### Tüm Paketleri Güncelleme

```bash
npm update
```

### Belirli Bir Paketi Güncelleme

```bash
npm update @google/generative-ai
```

### Paket Bilgilerini Görüntüleme

```bash
npm list
```

## 🌐 Deployment

### Vercel'e Deploy

1. Vercel hesabı oluşturun: https://vercel.com
2. GitHub repository'sini bağlayın
3. Environment Variables'a `VITE_GEMINI_API_KEY` ekleyin
4. Deploy edin

### Netlify'a Deploy

1. Netlify hesabı oluşturun: https://netlify.com
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment Variables'a `VITE_GEMINI_API_KEY` ekleyin
5. Deploy edin

## 📝 Geliştirme İpuçları

### Hot Reload

Geliştirme sırasında dosyaları kaydettiğinizde sayfa otomatik yenilenir.

### TypeScript Hata Kontrolü

```bash
npx tsc --noEmit
```

### Linting

```bash
# ESLint eklemek için
npm install --save-dev eslint
npx eslint --init
```

## 🎓 Daha Fazla Bilgi

- [Vite Dokümantasyonu](https://vitejs.dev/)
- [React Dokümantasyonu](https://react.dev/)
- [TensorFlow.js Guide](https://www.tensorflow.org/js/guide)
- [Gemini API Docs](https://ai.google.dev/docs)

## 💬 Destek

Sorun yaşıyorsanız:
1. Bu dosyayı tekrar okuyun
2. README.md dosyasını kontrol edin
3. GitHub Issues'da sorun açın
4. Stack Overflow'da soru sorun (tag: `matchmind-ai`)

## ✅ Başarılı Kurulum Kontrol Listesi

- [ ] Node.js ve npm kurulu
- [ ] Gemini API key alındı
- [ ] Proje indirildi
- [ ] `npm install` çalıştırıldı
- [ ] `.env.local` dosyası oluşturuldu ve API key eklendi
- [ ] `npm run dev` çalıştırıldı
- [ ] Tarayıcıda `http://localhost:5173` açıldı
- [ ] Gemini AI test edildi
- [ ] TensorFlow.js test edildi
- [ ] Sonuçlar başarıyla gösterildi

Tüm adımlar tamamlandıysa kurulum başarılı! 🎉

---

**Son Güncelleme**: 2025
**Versiyon**: 1.0.0

