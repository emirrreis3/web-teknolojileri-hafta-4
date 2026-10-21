import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  category: Category | "";
  onCategoryChange: (cat: Category | "") => void;
  categories: Category[];
}

function EventFilter({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  categories
}: EventFilterProps) {
  return (
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
          placeholder="Örn. atölye, kariyer"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>

      <label htmlFor="kategori-filtre">
        Kategori
        <select
          id="kategori-filtre"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
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
  );
}

export default EventFilter;
