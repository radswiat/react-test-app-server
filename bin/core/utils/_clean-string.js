/**
 * Clean string from any special characters
 * - eg. dots, comas, pound signs
 * - make everything lowercase
 */
export default function cleanString(string) {
  return string.replace(/[^a-zA-Z ]/g, '').toLowerCase();
}
