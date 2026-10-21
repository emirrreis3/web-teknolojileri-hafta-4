import "./App.css";
import { useState, useEffect } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

export default function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    if (id && (next === "detail" || next === "update")) {
      window.location.hash = `${next}-${id}`;
    } else {
      window.location.hash = next;
    }
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    function handleHash() {
      const h = window.location.hash.replace("#", "");
      if (h.startsWith("detail-")) {
        setSelectedId(h.replace("detail-", ""));
        setPage("detail");
      } else if (h.startsWith("update-")) {
        setSelectedId(h.replace("update-", ""));
        setPage("update");
      } else if (["home", "events", "add"].includes(h)) {
        setSelectedId(null);
        setPage(h as PageName);
      }
    }
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const headerInfo: Record<PageName, { title: string; text?: string; tab: string }> = {
    home: { title: "Kampüs Etkinlikleri", text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.", tab: "Ana Sayfa" },
    events: { title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler.", tab: "Tüm Etkinlikler" },
    detail: { title: selected?.title || "Kampüs Etkinlikleri", tab: selected?.title || "Etkinlik Bulunamadı" },
    add: { title: "Etkinlik Ekle", tab: "Etkinlik Ekle" },
    update: { title: "Etkinlik Güncelle", tab: "Etkinlik Güncelle" }
  };

  const currentInfo = headerInfo[page];

  useEffect(() => {
    if (page === "detail" && selected) {
      document.title = `${selected.title} — Kampüs Etkinlikleri`;
    } else {
      document.title = `Kampüs Etkinlikleri — ${currentInfo.tab}`;
    }
  }, [page, selected, currentInfo.tab]);

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <div className="uygulama-cercevesi">
      <div className="ust-alan">
        <Header title={currentInfo.title} text={currentInfo.text} />
        <Navigation current={page} onNavigate={go} />
      </div>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} className="grid-2" />
            <a href="#events" className="sayfa-link" onClick={(e) => { e.preventDefault(); go("events"); }}>
              Tümünü gör &rarr;
            </a>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              onSearchChange={setSearchText}
              category={category}
              onCategoryChange={setCategory}
              categories={categories}
            />
            <p id="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
              className="grid-3"
            />
          </>
        )}

        {page === "detail" && (
          selected ? (
            <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
          ) : (
            <div className="hata-kutusu">
              <h3>Etkinlik bulunamadı!</h3>
              <p>Aradığınız etkinlik mevcut değil veya silinmiş olabilir.</p>
              <a href="#events" className="sayfa-link" onClick={(e) => { e.preventDefault(); go("events"); }}>
                &larr; Listeye dön
              </a>
            </div>
          )
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </div>
  );
}
