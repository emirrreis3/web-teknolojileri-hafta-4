Canlı Link: https://web-teknolojileri-hafta-4.vercel.app (veya Vercel dağıtım bağlantınız)

# Web Teknolojileri — Hafta 4 (Sprint 4)
**Vite, TypeScript ve React ile Kampüs Etkinlikleri**

**Öğrenci Adı Soyadı:** Emir Demir  
**Öğrenci Numarası:** 2416501048  
**Özel Stil:** Font: `system-ui, sans-serif` | Renk Tonu (`--ton`): `328` (Fuşya / Pembe)

---

## Proje Dosyaları ve Görevleri (Adım 2)

* **`package.json`**: Proje adı, bağımlılıklar ve çalıştırma komutlarını (`dev`, `build`, `preview`) tanımlar.
* **`package-lock.json`**: Yüklenen tüm npm paketlerinin kesin sürümlerini ve bağımlılık ağacını kilitler.
* **`node_modules/`**: İndirilen harici kütüphaneleri ve paketleri içerir; `.gitignore` ile Git takibinden hariç tutulur.
* **`tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json`**: TypeScript derleyicisinin tip denetimi ve derleme kurallarını belirler.
* **`vite.config.ts`**: Vite geliştirme sunucusu ve React eklentisinin yapılandırma ayarlarını barındırır.
* **`index.html`**: Uygulamanın tek HTML giriş noktasıdır; içerisinde React'in bağlandığı `div#root` elemanı yer alır.
* **`src/main.tsx`**: React `createRoot` API'sini kullanarak uygulamayı başlatır ve `App` bileşenini DOM'a bağlar.
* **`src/App.tsx`**: Uygulamanın 5 sayfasını (Ana Sayfa, Etkinlikler, Detay, Ekle, Güncelle), sayfa geçiş durumunu (`state`) ve arayüzünü yöneten ana bileşendir.
* **`src/App.css`**: Sprint 3'ten taşınan öğrenciye özel renk ve tipografi kurallarını, kart, form ve responsive stilleri barındırır.
* **`src/index.css`**: Genel kök stillerini içerir; Vite'ın varsayılan koyu teması stilleri bozmasın diye sıfırlanmıştır.
* **`public/`**: Derleme işlemine girmeden doğrudan kök dizinden sunulan statik varlıkları (`afis.svg`) saklar.

---

## Mimari ve Geliştirilen Modüller

* **`src/types/campus-event.ts`**: `Category` union tipi ve `CampusEvent` veri arayüzünü tanımlar.
* **`src/data/events.ts`**: Tipli 6 adet örnek kampüs etkinliği verisini dışa aktarır.
* **`src/utils/filter-events.ts`**: DOM'a dokunmayan saf arama, filtreleme ve id ile bulma fonksiyonlarını (`searchEvents`, `filterByCategory`, `findEventById`) içerir.

---

## Çalıştırma Komutları

* **Geliştirme Sunucusu:** `npm run dev`
* **Üretim Derlemesi (Build):** `npm run build`
* **Önizleme:** `npm run preview`
