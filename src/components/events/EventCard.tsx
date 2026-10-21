import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <h2>{event.title}</h2>
      <p>
        {event.category} &middot; {formatDate(event.date)}
      </p>
      <a
        href={`#detail-${event.id}`}
        className="detay-link"
        onClick={(e) => {
          e.preventDefault();
          onShowDetail(event.id);
        }}
      >
        Detayları gör &rarr;
      </a>
    </article>
  );
}

export default EventCard;
