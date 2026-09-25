/**
 * Fallback contact data — mirrors the backend `Contact` mongoose model exactly:
 *   { name, positions[], institution, address, phones[], emails[], displayOrder }
 * plus two OPTIONAL presentation fields the server may send later:
 *   phoneLabel ('Phone' | 'Mobile' | …), mapUrl + mapLabel (location row).
 *
 * Used when /get-contacts has not been deployed yet or fails — so the screen
 * renders identically to the previous static version (zero-regression rollout),
 * and live server data automatically takes precedence once available.
 */
export const DEFAULT_CONTACTS = [
  {
    name: 'Dr. Dilip Kumar Ghosh',
    positions: ['Director'],
    institution: 'ICAR-Central Citrus Research Institute',
    address: 'Amravati Road, Nagpur – 440033, Maharashtra',
    phones: ['0712-2500813', '0712-2500249'],
    emails: ['director.ccri@icar.gov.in'],
    phoneLabel: 'Phone',
    displayOrder: 1,
  },
  {
    name: 'Dr. Subhra Saikat Roy',
    positions: ['Principal Investigator, ABIC and', 'In-charge, CitriHub'],
    institution: 'ICAR-Central Citrus Research Institute',
    address: 'Amravati Road, Nagpur – 440033, Maharashtra',
    phones: ['+91 9436891040'],
    emails: ['ccrinaif@gmail.com'],
    phoneLabel: 'Mobile',
    mapUrl: 'https://maps.app.goo.gl/6hokaLhpYJnudcux6',
    mapLabel: 'ICAR-Central Citrus Institute Nagpur',
    displayOrder: 2,
  },
];

/** Normalizes an API payload into the card model (defensive: sorts, fills defaults). */
export function normalizeContacts(payload) {
  const list = Array.isArray(payload) ? payload : payload?.contacts;
  if (!Array.isArray(list) || list.length === 0) return null;
  return [...list].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}
