# 🎯 Model Doğruluğunu Artırma Rehberi

## 📊 Mevcut Durum

**Şu Anki Model:**
- Doğruluk: ~70-75%
- Özellik Sayısı: 6
- Eğitim Verisi: 600 sentetik örnek
- Model Derinliği: 3 katman (24→16→8→3)

**Hedef:**
- Doğruluk: %85-90+
- Profesyonel seviye tahminler

---

## 🚀 Hemen Yapılabilecek İyileştirmeler (Kolay)

### 1. ✅ Daha Fazla Özellik Eklemek

**Mevcut 6 Özellik:**
1. Home Strength
2. Away Strength
3. Home Form
4. Goal Differential
5. Head-to-Head
6. Home Advantage

**Eklenebilecek 14+ Yeni Özellik:**

```python
Takım Özellikleri (8):
7.  Recent Goals Scored (Son 5 maçta atılan gol ortalaması)
8.  Recent Goals Conceded (Son 5 maçta yenen gol ortalaması)
9.  Win Streak (Üst üste kazanma sayısı)
10. Clean Sheet Rate (Gol yememe oranı)
11. Possession Average (Top kontrolü %)
12. Shot Accuracy (Şut isabeti %)
13. Days Since Last Match (Dinlenme süresi)
14. Squad Depth (Kadro genişliği/kalitesi)

Lig/Sezon Özellikleri (4):
15. Home/Away Form Split (Ev/Deplasman ayrı formlar)
16. League Position Difference (Puan tablosu farkı)
17. Points Per Game (Maç başı puan ortalaması)
18. Goal Difference (Averaj)

Maç Özellikleri (2):
19. Derby/Rivalry Flag (Derbi maçı mı?)
20. Season Stage (Sezon başı/ortası/sonu)
```

### 2. ✅ Daha Fazla Eğitim Verisi

```python
Mevcut: 600 örnek → Hedef: 5000+ örnek

# Veri artırma yöntemleri:
- Sentetik veri üretimini artır
- Gerçek maç sonuçlarını ekle
- Data augmentation (veri çoğaltma)
- Transfer learning (başka liglerden öğren)
```

### 3. ✅ Model Mimarisini Derinleştirme

```python
# Mevcut Mimari:
Input(6) → Dense(24) → Dropout(0.2) → Dense(16) → Dense(8) → Output(3)

# İyileştirilmiş Mimari:
Input(20) → Dense(64, ReLU) 
          → BatchNorm 
          → Dropout(0.3)
          → Dense(48, ReLU)
          → BatchNorm
          → Dropout(0.25)
          → Dense(32, ReLU)
          → Dropout(0.2)
          → Dense(16, ReLU)
          → Output(3, Softmax)
```

### 4. ✅ Hiperparametre Optimizasyonu

```python
# Test edilecek parametreler:
Learning Rates: [0.001, 0.005, 0.01, 0.02]
Batch Sizes: [16, 32, 64, 128]
Epochs: [30, 50, 100, 200]
Dropout Rates: [0.2, 0.3, 0.4, 0.5]
Activation Functions: [ReLU, LeakyReLU, ELU]
Optimizers: [Adam, RMSprop, Adagrad]
```

---

## 🔬 Orta Seviye İyileştirmeler

### 5. 📊 Ensemble Learning (Toplu Öğrenme)

```python
# Birden fazla modeli birleştir:

Model 1: Neural Network (TensorFlow)
Model 2: Random Forest
Model 3: Gradient Boosting
Model 4: SVM (Support Vector Machine)
Model 5: Logistic Regression

Final Prediction = Weighted Average(Model1, Model2, Model3, Model4, Model5)

# Doğruluk artışı: +5-10%
```

### 6. 🎲 Advanced Feature Engineering

```python
# Türetilmiş özellikler:

- Form Momentum (son 10 maçtaki trend)
- Attack vs Defense Power (hücum/savunma dengesi)
- Home Advantage by Team (takıma özel ev avantajı)
- Time-weighted Stats (son maçlar daha önemli)
- Opponent Quality Adjusted (rakip kalitesine göre düzeltilmiş)
- Pressure Index (maçın önemi: derbi, play-off vb.)
```

### 7. 🧮 Feature Scaling ve Normalizasyon

```python
# Özellik ölçeklendirme:

StandardScaler: Mean=0, StdDev=1
MinMaxScaler: [0, 1] aralığına
RobustScaler: Outlier'lara dayanıklı
PowerTransformer: Gaussian dağılıma

# Doğruluk artışı: +2-5%
```

### 8. ⚖️ Class Imbalance Handling

```python
# Veri dengesizliği çözümü:

Home Win: 45% (fazla)
Draw: 25% (normal)
Away Win: 30% (az)

Çözümler:
- SMOTE (Synthetic Minority Oversampling)
- Class Weights (az olan sınıfa daha fazla ağırlık)
- Undersampling (fazla olanları azalt)
- Oversampling (az olanları çoğalt)
```

---

## 🏆 İleri Seviye İyileştirmeler

### 9. 🌐 Gerçek Veri Toplama (Web Scraping)

```python
# Güvenilir veri kaynakları:

API'ler:
- Football-Data.org API (ücretsiz)
- API-Football (rapid API)
- The Sports DB
- OpenLigaDB

Web Scraping:
- Mackolik.com
- Soccerway.com
- Transfermarkt.com
- FBref.com (statsbomb)
- Understat.com (xG stats)

# Doğruluk artışı: +10-15%
```

### 10. 📈 Time Series Analysis

```python
# Zaman serisi özellikleri:

- LSTM/GRU Networks (ardışık maçları öğren)
- Moving Averages (hareketli ortalamalar)
- Exponential Smoothing (üstel düzleştirme)
- Seasonal Decomposition (sezonsal etkiler)
- Trend Analysis (trend analizi)

# Özellikle form analizi için güçlü
```

### 11. 🎯 Expected Goals (xG) Entegrasyonu

```python
# xG (Beklenen Gol) metrikleri:

- xG For (takımın yaratması gereken gol)
- xG Against (rakibin yaratması gereken gol)
- xG Difference (xG farkı)
- xG Over/Underperformance (şans faktörü)

# Modern futbol analitiğinin kalbi
# Doğruluk artışı: +8-12%
```

### 12. 🧠 Transfer Learning

```python
# Pre-trained modeller:

1. Diğer liglerden öğren (Premier League → Süper Lig)
2. Farklı sporlardan öğren (basketbol → futbol)
3. Frozen layers + Fine-tuning

Model = load_pretrained('premier_league_model.h5')
Model.freeze_layers(1-5)  # İlk katmanları dondur
Model.fine_tune(turkish_league_data)  # Son katmanları eğit
```

### 13. 🔄 Online Learning (Canlı Öğrenme)

```python
# Model sürekli öğrensin:

Her maç bittiğinde:
1. Gerçek sonucu al
2. Tahminle karşılaştır
3. Model ağırlıklarını güncelle
4. Yeni tahminler daha iyi olsun

# Adaptif model: Sezon içi gelişir
```

### 14. 🎲 Contextual Features (Bağlamsal Özellikler)

```python
# Maç bağlamı:

Weather (Hava Durumu):
- Sıcaklık, yağmur, rüzgar
- Zemin durumu

Injury/Suspensions (Sakatlık/Cezalı):
- Eksik oyuncu sayısı
- Hangi pozisyonlar eksik
- Yıldız oyuncu eksik mi?

Manager (Teknik Direktör):
- TD'nin kazanma oranı
- Rakibe karşı başarısı
- Takımdaki süresi

Referee (Hakem):
- Hakem kartlarının ortalaması
- Ev sahibi/deplasman bias'ı
- Penaltı verme oranı

Motivation (Motivasyon):
- Küme düşme tehlikesi
- Şampiyonluk yarışı
- Kupa finali
- Sezon sonu fark etmez mi?

# Doğruluk artışı: +5-8%
```

---

## 💻 Pratik Implementasyon

### Adım 1: Daha Fazla Özellik Ekle

```typescript
// scrapingService.ts'e eklenecek

export interface EnhancedTeamStats extends TeamStats {
  // Yeni özellikler:
  recentGoalsScored: number;      // Son 5 maçta atılan gol ort.
  recentGoalsConceded: number;    // Son 5 maçta yenen gol ort.
  winStreak: number;              // Üst üste kazanma
  cleanSheetRate: number;         // Gol yememe oranı
  daysRest: number;               // Son maçtan bu yana gün
  leaguePosition: number;         // Lig sıralaması
  pointsPerGame: number;          // Maç başı puan
  homeAwayFormDiff: number;       // Ev/deplasman farkı
  injuredPlayers: number;         // Sakatlık sayısı
  suspendedPlayers: number;       // Cezalı oyuncu sayısı
}
```

### Adım 2: Model Mimarisini Geliştir

```typescript
// tfService.ts'te gelişmiş mimari

const model = tf.sequential();

// Input Layer (20 özellik)
model.add(tf.layers.dense({
  inputShape: [20],
  units: 64,
  activation: 'relu',
  kernelInitializer: 'heNormal',
  kernelRegularizer: tf.regularizers.l2({ l2: 0.001 })
}));

// Batch Normalization
model.add(tf.layers.batchNormalization());

// Dropout
model.add(tf.layers.dropout({ rate: 0.3 }));

// Hidden Layer 1
model.add(tf.layers.dense({
  units: 48,
  activation: 'relu',
  kernelRegularizer: tf.regularizers.l2({ l2: 0.001 })
}));

model.add(tf.layers.batchNormalization());
model.add(tf.layers.dropout({ rate: 0.25 }));

// Hidden Layer 2
model.add(tf.layers.dense({
  units: 32,
  activation: 'relu'
}));

model.add(tf.layers.dropout({ rate: 0.2 }));

// Hidden Layer 3
model.add(tf.layers.dense({
  units: 16,
  activation: 'relu'
}));

// Output Layer
model.add(tf.layers.dense({
  units: 3,
  activation: 'softmax'
}));

// Advanced Optimizer
model.compile({
  optimizer: tf.train.adam(0.001, 0.9, 0.999, 1e-7),
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy', 'categoricalAccuracy']
});
```

### Adım 3: Ensemble Model

```typescript
// ensembleService.ts (yeni dosya)

export const ensemblePredict = async (
  homeTeam: string,
  awayTeam: string,
  league: string
): Promise<PredictionData> => {
  
  // 3 farklı model çalıştır
  const tfPrediction = await trainAndPredictTF(homeTeam, awayTeam, league);
  const geminiPrediction = await predictMatch(homeTeam, awayTeam, league);
  
  // Basit bir ağırlıklı ortalama
  const ensemble = {
    home: (tfPrediction.probabilities.home * 0.6 + geminiPrediction.probabilities.home * 0.4),
    draw: (tfPrediction.probabilities.draw * 0.6 + geminiPrediction.probabilities.draw * 0.4),
    away: (tfPrediction.probabilities.away * 0.6 + geminiPrediction.probabilities.away * 0.4)
  };
  
  return {
    ...tfPrediction,
    probabilities: ensemble,
    modelUsed: 'Ensemble (TF + Gemini)'
  };
};
```

---

## 📊 Beklenen Doğruluk Artışları

| İyileştirme | Doğruluk Artışı | Zorluk | Süre |
|-------------|-----------------|--------|------|
| Daha fazla özellik (+14) | +5-8% | Kolay | 2 saat |
| Daha derin model | +3-5% | Kolay | 1 saat |
| Daha fazla eğitim verisi | +5-10% | Orta | 4 saat |
| Hiperparametre optimizasyonu | +2-4% | Orta | 3 saat |
| Gerçek veri scraping | +10-15% | Zor | 2 gün |
| Ensemble learning | +5-10% | Orta | 1 gün |
| xG entegrasyonu | +8-12% | Zor | 3 gün |
| Time series (LSTM) | +5-8% | Zor | 2 gün |
| Bağlamsal özellikler | +5-8% | Zor | 2 gün |

**Toplam Potansiyel Artış: +40-70%**
**Mevcut ~70% → Hedef ~85-95%**

---

## 🎯 Önerilen Uygulama Sırası

### Hafta 1: Hızlı Kazanımlar
1. ✅ Daha fazla özellik ekle (+14 özellik)
2. ✅ Model mimarisini derinleştir
3. ✅ Eğitim verisini 5000'e çıkar
4. ✅ Hiperparametre optimizasyonu

**Beklenen Sonuç: %70 → %80**

### Hafta 2: Orta Seviye
5. ✅ Ensemble learning (TF + Gemini)
6. ✅ Feature scaling ve normalizasyon
7. ✅ Class imbalance handling
8. ✅ Cross-validation implementasyonu

**Beklenen Sonuç: %80 → %85**

### Hafta 3-4: İleri Seviye
9. ✅ Gerçek veri scraping (Football-Data API)
10. ✅ xG (Expected Goals) entegrasyonu
11. ✅ LSTM time series modeli
12. ✅ Bağlamsal özellikler (hava, sakatlık vb.)

**Beklenen Sonuç: %85 → %90+**

---

## 📚 Kaynaklar

### API'ler:
- https://www.football-data.org/ (Ücretsiz, 10 call/min)
- https://rapidapi.com/api-sports/api/api-football
- https://www.thesportsdb.com/api.php

### Veri Setleri:
- Kaggle: European Soccer Database
- FBref: Advanced Stats
- Understat: xG Data

### Öğrenme Kaynakları:
- "The Numbers Game" (Chris Anderson)
- "Soccermatics" (David Sumpter)
- StatsBomb Blog
- Analytics FC YouTube

---

## 🚀 Şimdi Ne Yapmalı?

Size hemen uygulanabilir kodu hazırlayayım mı?

1. **Kolay Başlangıç**: Daha fazla özellik + derin model (2 saat)
2. **Orta Seviye**: Ensemble + 5000 veri (1 gün)
3. **Full Stack**: Gerçek API + xG + LSTM (1 hafta)

Hangi seviyeyi istersiniz? 🎯

