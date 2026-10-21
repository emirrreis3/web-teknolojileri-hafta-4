import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
  className?: string;
}

function EventList({ events, onShowDetail, emptyText, className = "" }: EventListProps) {
  if (events.length === 0) {
    return <p className="sonuc" id="sonuc">{emptyText || "Aramanıza uygun etkinlik bulunamadı."}</p>;
  }

  return (
    <section className={`etkinlik-listesi ${className}`.trim()}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onShowDetail={onShowDetail} />
      ))}
    </section>
  );
}

export default EventList;
