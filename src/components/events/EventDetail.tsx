import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      <div className="detay-konteyner">
        {event.image && (
          <figure className="afis-kutusu">
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}

        <div>
          <h2>Etkinlik Künyesi</h2>
          <dl className="detay-bilgi">
            <dt>Tarih ve Saat</dt>
            <dd>
              {formatDate(event.date)}, {event.time}
            </dd>

            <dt>Yer</dt>
            <dd>{event.location}</dd>

            <dt>Kategori</dt>
            <dd>{event.category}</dd>

            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>

          <h2>Açıklama</h2>
          <p>{event.description}</p>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href="#events"
              className="sayfa-link"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
            >
              &larr; Listeye dön
            </a>

            <a
              href={`#update-${event.id}`}
              className="buton-guncelle"
              onClick={(e) => {
                e.preventDefault();
                onEdit(event.id);
              }}
            >
              Bu etkinliği güncelle &rarr;
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EventDetail;
