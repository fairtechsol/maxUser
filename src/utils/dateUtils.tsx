/**
 * Format a date without using external libraries.
 * @param {Date} date - The date to be formatted.
 * @returns {string} - The formatted date string.
 */
export function formatDate(date: Date): string {
  date = new Date(date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0"); // Using template literal
  const year = date.getFullYear();
  const hours = (date.getHours() % 12 || 12).toString(); // Convert 24-hour to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}
