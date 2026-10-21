import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
  detailLabel?: string;
}

interface NavItem {
  name: PageName;
  label: string;
}

const navItems: NavItem[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" }
];

function Navigation({ current, onNavigate, detailLabel }: NavigationProps) {
  return (
    <nav className="nav-menu">
      {navItems.map((item, index) => {
        const isCurrent =
          current === item.name ||
          (item.name === "events" && current === "detail") ||
          (item.name === "add" && current === "update");

        return (
          <span key={item.name}>
            {index > 0 && <span className="ayrac">&middot;</span>}
            <a
              href={`#${item.name}`}
              aria-current={isCurrent && !detailLabel ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.name);
              }}
            >
              {item.label}
            </a>
          </span>
        );
      })}
      {current === "detail" && detailLabel && (
        <>
          <span className="ayrac">&middot;</span>
          <span className="nav-aktif">{detailLabel}</span>
        </>
      )}
    </nav>
  );
}

export default Navigation;
