import "./App.css";
import { useState, useEffect } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById
} from "./utils/filter-events";

interface FormData {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

interface FormErrors {
  title?: string;
  category?: string;
  date?: string;
  time?: string;
  location?: string;
  capacity?: string;
}

const emptyForm: FormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: ""
};

type PageName = "home" | "events" | "detail" | "add" | "update";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      // YYYY-MM-DD
      const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });
      }
    } else {
      // DD-MM-YYYY
      const dateObj = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });
      }
    }
  }
  return dateStr;
}

export default function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successData, setSuccessData] = useState<object | null>(null);

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    setFormErrors({});
    setSuccessData(null);
    window.scrollTo(0, 0);
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Güncelleme sayfasına geçince formu mevcut verilerle doldur
  useEffect(() => {
    if (page === "update" && selected) {
      setFormData({
        title: selected.title,
        category: selected.category,
        date: selected.date,
        time: selected.time,
        location: selected.location,
        capacity: String(selected.capacity),
        description: selected.description
      });
    } else if (page === "add") {
      setFormData(emptyForm);
    }
    setFormErrors({});
    setSuccessData(null);
  }, [page, selectedId]);

  function handleFieldChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors: FormErrors = {};
    if (formData.title.trim().length < 3)
      errors.title = "Etkinlik adı en az 3 karakter olmalıdır.";
    if (!formData.category)
      errors.category = "Lütfen bir kategori seçiniz.";
    if (!formData.date.trim())
      errors.date = "Tarih alanı boş bırakılamaz.";
    if (!formData.time.trim())
      errors.time = "Saat alanı boş bırakılamaz.";
    if (!formData.location.trim())
      errors.location = "Yer alanı boş bırakılamaz.";
    if (formData.capacity !== "") {
      const cap = Number(formData.capacity);
      if (isNaN(cap) || cap < 1 || cap > 1000)
        errors.capacity = "Kontenjan 1 ile 1000 arasında olmalıdır.";
    }
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) { setSuccessData(null); return; }

    const result: Record<string, unknown> = {
      title: formData.title.trim(),
      category: formData.category,
      date: formData.date.trim(),
      time: formData.time.trim(),
      location: formData.location.trim(),
      description: formData.description.trim()
    };
    if (formData.capacity !== "") result.capacity = Number(formData.capacity);
    if (page === "update" && selectedId) result.id = selectedId;
    setSuccessData(result);
  }

  // Başlık belirleme (H1 ve Document Title)
  let headerTitle = "Kampüs Etkinlikleri";
  let tabTitle = "Ana Sayfa";

  if (page === "events") {
    headerTitle = "Tüm Etkinlikler";
    tabTitle = "Tüm Etkinlikler";
  } else if (page === "detail") {
    headerTitle = selected ? selected.title : "Kampüs Etkinlikleri";
    tabTitle = selected ? selected.title : "Etkinlik Bulunamadı";
  } else if (page === "add") {
    headerTitle = "Etkinlik Ekle";
    tabTitle = "Etkinlik Ekle";
  } else if (page === "update") {
    headerTitle = "Etkinlik Güncelle";
    tabTitle = "Etkinlik Güncelle";
  }

  // ADIM 11: Sekme başlığı side-effect
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${tabTitle}`;
  }, [tabTitle]);

  // ADIM 9: Yaklaşan en yakın 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // ADIM 10: Dinamik kategoriler ve filtreleme
  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  // ADIM 9: Yeniden kullanılabilir kart bileşeni
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p>
          {event.category} &middot; {formatDate(event.date)}
        </p>
        <a
          href={`#detail-${event.id}`}
          className="detay-link"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör &rarr;
        </a>
      </article>
    );
  }

  const navItems: { id: PageName; label: string }[] = [
    { id: "home", label: "Ana Sayfa" },
    { id: "events", label: "Etkinlikler" },
    { id: "add", label: "Ekle" }
  ];

  return (
    <div className="uygulama-cercevesi">
      <header>
        <h1>{headerTitle}</h1>
        <nav className="nav-menu">
          {navItems.map((item, index) => (
            <span key={item.id}>
              {index > 0 && <span className="ayrac">&middot;</span>}
              <a
                href={`#${item.id}`}
                aria-current={
                  page === item.id ||
                  (item.id === "events" && page === "detail") ||
                  (item.id === "add" && page === "update")
                    ? "page"
                    : undefined
                }
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                {item.label}
              </a>
            </span>
          ))}
        </nav>
      </header>

      <main>
        {/* === ADIM 9: ANA SAYFA === */}
        {page === "home" && (
          <>
            <p className="aciklama">
              Fakültedeki etkinlikleri tek yerden takip edin.
            </p>
            <h2>Yaklaşan Etkinlikler</h2>
            <section className="etkinlik-listesi grid-2">
              {upcoming.map(renderCard)}
            </section>
            <a
              href="#events"
              className="sayfa-link"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              Tümünü gör &rarr;
            </a>
          </>
        )}

        {/* === ADIM 10: ETKİNLİKLER SAYFASI === */}
        {page === "events" && (
          <>
            <form
              id="filtre-formu"
              className="filtre"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="arama">
                Etkinlik ara
                <input
                  type="search"
                  id="arama"
                  placeholder="atölye, seminer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </label>

              <label htmlFor="kategori-filtre">
                Kategori
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
            </form>

            <p id="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi grid-3">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {/* === ADIM 12: DETAY SAYFASI === */}
        {page === "detail" && (
          <>
            {!selected ? (
              <>
                <div className="hata-kutusu">
                  <h3>Etkinlik bulunamadı!</h3>
                  <p>
                    Aradığınız etkinlik mevcut değil veya geçersiz bir bağlantı
                    kullandınız.
                  </p>
                </div>
                <a
                  href="#events"
                  className="sayfa-link"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  &larr; Listeye dön
                </a>
              </>
            ) : (
              <article className="detay">
                <div className="detay-konteyner">
                  {selected.image && (
                    <figure className="afis-kutusu">
                      <img src={selected.image} alt={selected.title} />
                    </figure>
                  )}

                  <div>
                    <dl className="detay-bilgi">
                      <dt>Kategori</dt>
                      <dd>{selected.category}</dd>

                      <dt>Tarih ve Saat</dt>
                      <dd>
                        {formatDate(selected.date)}, {selected.time}
                      </dd>

                      <dt>Yer</dt>
                      <dd>{selected.location}</dd>

                      <dt>Kontenjan</dt>
                      <dd>{selected.capacity} kişi</dd>

                      <dt>Açıklama</dt>
                      <dd>{selected.description}</dd>
                    </dl>

                    <a
                      href={`#update-${selected.id}`}
                      className="buton-guncelle"
                      onClick={(e) => {
                        e.preventDefault();
                        go("update", selected.id);
                      }}
                    >
                      Bu etkinliği güncelle &rarr;
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <a
                    href="#events"
                    className="sayfa-link"
                    onClick={(e) => {
                      e.preventDefault();
                      go("events");
                    }}
                  >
                    &larr; Listeye dön
                  </a>
                </div>
              </article>
            )}
          </>
        )}

        {/* === ADIM 13: EKLE VE GÜNCELLE SAYFALARI === */}
        {(page === "add" || page === "update") && (
          <>
            <form
              id="etkinlik-formu"
              className="form"
              noValidate
              onSubmit={handleSubmit}
            >
              <label htmlFor="title">
                Etkinlik adı *
                <input
                  id="title"
                  name="title"
                  maxLength={80}
                  placeholder="Örn: Kariyer Günleri"
                  value={formData.title}
                  aria-invalid={formErrors.title ? "true" : undefined}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                />
                <span className="alan-hata" id="ad-hata">
                  {formErrors.title}
                </span>
              </label>

              <label htmlFor="kategori">
                Kategori *
                <select
                  id="kategori"
                  name="kategori"
                  value={formData.category}
                  aria-invalid={formErrors.category ? "true" : undefined}
                  onChange={(e) => handleFieldChange("category", e.target.value)}
                >
                  <option value="" disabled>
                    Seçiniz &boxv;
                  </option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
                <span className="alan-hata" id="kategori-hata">
                  {formErrors.category}
                </span>
              </label>

              <label htmlFor="tarih">
                Tarih (GG-AA-YYYY) *
                <input
                  id="tarih"
                  name="tarih"
                  placeholder="Örn: 15-11-2026"
                  value={formData.date}
                  aria-invalid={formErrors.date ? "true" : undefined}
                  onChange={(e) => handleFieldChange("date", e.target.value)}
                />
                <span className="alan-hata" id="tarih-hata">
                  {formErrors.date}
                </span>
              </label>

              <label htmlFor="saat">
                Saat (SS:DD) *
                <input
                  id="saat"
                  name="saat"
                  placeholder="Örn: 14:00"
                  value={formData.time}
                  aria-invalid={formErrors.time ? "true" : undefined}
                  onChange={(e) => handleFieldChange("time", e.target.value)}
                />
                <span className="alan-hata" id="saat-hata">
                  {formErrors.time}
                </span>
              </label>

              <label htmlFor="yer">
                Yer *
                <input
                  id="yer"
                  name="yer"
                  placeholder="Örn: A Blok Konferans Salonu"
                  value={formData.location}
                  aria-invalid={formErrors.location ? "true" : undefined}
                  onChange={(e) => handleFieldChange("location", e.target.value)}
                />
                <span className="alan-hata" id="yer-hata">
                  {formErrors.location}
                </span>
              </label>

              <label htmlFor="kontenjan">
                Kontenjan (1 - 1000)
                <input
                  type="number"
                  id="kontenjan"
                  name="kontenjan"
                  placeholder="Örn: 100"
                  value={formData.capacity}
                  aria-invalid={formErrors.capacity ? "true" : undefined}
                  onChange={(e) => handleFieldChange("capacity", e.target.value)}
                />
                <span className="alan-hata" id="kontenjan-hata">
                  {formErrors.capacity}
                </span>
              </label>

              <label htmlFor="description">
                Açıklama
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Etkinlik detayları..."
                  value={formData.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                />
                <span className="alan-hata" id="aciklama-hata"></span>
              </label>

              <button type="submit" className="form-buton">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>

            {/* Hata özeti */}
            {Object.keys(formErrors).length > 0 && !successData && (
              <div className="hata-kutusu" style={{ marginTop: "1rem" }}>
                <strong>Formda hatalı alanlar var!</strong> Lütfen yukarıdaki kırmızı uyarıları düzeltin.
              </div>
            )}

            {/* Başarı kutusu */}
            {successData && (
              <div className="basari-kutusu" style={{ marginTop: "1rem" }}>
                <strong>
                  {page === "update"
                    ? "Etkinlik başarıyla güncellendi!"
                    : "Etkinlik başarıyla oluşturuldu!"}
                </strong>
                <pre>{JSON.stringify(successData, null, 2)}</pre>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
