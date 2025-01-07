export function formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  export function formatDate(mongoDateString: string): string {
    const date = new Date(mongoDateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit", // Correct type: "2-digit" | "numeric"
      month: "long",  // Correct type: "long" | "short" | "narrow" | "numeric" | "2-digit"
      year: "numeric" // Correct type: "numeric" | "2-digit"
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }