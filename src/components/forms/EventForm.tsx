interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="aciklama" style={{ fontStyle: "italic", marginBottom: "1rem" }}>
        Bu sprintte form sadece görünüm; kayıt yapılmaz.
      </p>

      <form
        id="etkinlik-formu"
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label htmlFor="title">
          Etkinlik Adı
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Örn. Kariyer Günleri 2026"
          />
        </label>

        <label htmlFor="kategori">
          Kategori
          <select id="kategori" name="kategori" defaultValue="">
            <option value="" disabled>
              Seçiniz ▾
            </option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </label>

        <label htmlFor="tarih">
          Tarih
          <input id="tarih" name="tarih" type="date" />
        </label>

        <label htmlFor="saat">
          Saat
          <input id="saat" name="saat" type="time" />
        </label>

        <label htmlFor="yer">
          Yer
          <input
            id="yer"
            name="yer"
            type="text"
            placeholder="Örn. A Blok Konferans Salonu"
          />
        </label>

        <label htmlFor="kontenjan">
          Kontenjan
          <input
            id="kontenjan"
            name="kontenjan"
            type="number"
            placeholder="Örn. 100"
          />
        </label>

        <label htmlFor="description">
          Açıklama
          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Etkinlik detayları..."
          />
        </label>

        <button type="submit" className="form-buton">
          Kaydet
        </button>
      </form>
    </>
  );
}

export default EventForm;
