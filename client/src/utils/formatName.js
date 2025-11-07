// Utility to ensure doctor names display a single "Dr." prefix
export function formatDoctorDisplayName(name) {
  if (!name) return '';
  // Remove any leading "Dr", "Dr.", or variations (case-insensitive)
  const cleaned = name.replace(/^\s*(dr\.?\s*)/i, '').trim();
  return `Dr. ${cleaned}`;
}
