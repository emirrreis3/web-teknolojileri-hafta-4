export function formatDate(dateStr: string): string {
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
