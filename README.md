Canlı Link: https://web-teknolojileri-hafta-4.vercel.app (veya Vercel dağıtım bağlantınız)

# Web Teknolojileri — Sprint 5 (React Bileşenleri)
**Vite, TypeScript ve React ile Modüler Kampüs Etkinlikleri Mimarisi**

**Öğrenci Adı Soyadı:** Emir Demir  
**Öğrenci Numarası:** 2416501048  
**Özel Stil:** Font: `system-ui, sans-serif` | Renk Tonu (`--ton`): `328` (Fuşya / Pembe)

---

## Sprint 5'te Gerçekleştirilenler

Bu sprintte tek büyük `App.tsx` (~540 satır) modüler bileşenlere ayrıştırılmıştır:
* **`src/components/layout/Header.tsx`**: Dinamik başlık ve alt metin props'larını (`HeaderProps`) alır.
* **`src/components/layout/Navigation.tsx`**: Menü bağlantılarını barındırır, aktif bağlantıyı `aria-current="page"` ile beyaz kutuda gösterir ve tıklamayı `onNavigate` callback'i ile üst bileşene iletir.
* **`src/components/layout/Footer.tsx`**: Props almayan, sayfa altında öğrenci künyesini (`Emir Demir · 2416501048`) gösteren bileşendir.
* **`src/components/events/EventCard.tsx`**: Tekil etkinlik kartını ve "Detayları gör" (`onShowDetail`) callback'ini yönetir.
* **`src/components/events/EventList.tsx`**: Etkinlik dizisini map ederek `EventCard`'lar basar; boş durumda `emptyText` gösterir.
* **`src/components/events/EventFilter.tsx`**: Arama metni ve kategori seçim kutularını yönetir (`onSearchChange`, `onCategoryChange`).
* **`src/components/events/EventDetail.tsx`**: Etkinlik afişini, künyesini, açıklamasını ve "Listeye dön" (`onBack`) ile "Güncelle" (`onEdit`) butonlarını sunar.
* **`src/components/forms/EventForm.tsx`**: Ortak etkinlik formunu ve gönderim callback'ini (`onSubmit`) yönetir.
* **`src/types/page.ts`**: `PageName` union tipi (`"home" | "events" | "detail" | "add" | "update"`).
* **`src/utils/format-date.ts`**: Tarih formatlama fonksiyonu.

---

## Mimari ve State Yönetimi

* **Lifting State Up:** `page`, `selectedId`, `searchText`, `category` state'leri `App.tsx` seviyesinde tutulur.
* **EventDetail Ekranı:** EventDetail sayfasına girildiğinde hem üst navigasyon/başlık çubuğunda hem de tarayıcı sekmesinde (`document.title`) seçilen etkinliğin adı görünür.
* **Görünüm Birebirliği:** Ekran görünümü, renkler ve davranışlar Sprint 4 ile birebir aynıdır; `App.tsx` ~110 satıra indirilmiştir.

---

## Çalıştırma Komutları

* **Geliştirme Sunucusu:** `npm run dev`
* **Üretim Derlemesi (Build):** `npm run build`
* **Önizleme:** `npm run preview`
