export type CountryStatus = "open" | "narrowed" | "obstructed" | "repressed" | "closed" | "unknown"

export interface Country {
  code: string
  name: string
  status: CountryStatus
}

export const countries: Country[] = [
  { code: "dz", name: "Algeria", status: "unknown" },
  { code: "ao", name: "Angola", status: "unknown" },
  { code: "bj", name: "Benin", status: "unknown" },
  { code: "bw", name: "Botswana", status: "unknown" },
  { code: "bf", name: "Burkina Faso", status: "unknown" },
  { code: "bi", name: "Burundi", status: "unknown" },
  { code: "cv", name: "Cabo Verde", status: "unknown" },
  { code: "cm", name: "Cameroon", status: "unknown" },
  { code: "cf", name: "Central African Republic", status: "unknown" },
  { code: "td", name: "Chad", status: "unknown" },
  { code: "km", name: "Comoros", status: "unknown" },
  { code: "cg", name: "Congo", status: "unknown" },
  { code: "cd", name: "DR Congo", status: "unknown" },
  { code: "ci", name: "Côte d'Ivoire", status: "unknown" },
  { code: "dj", name: "Djibouti", status: "unknown" },
  { code: "eg", name: "Egypt", status: "unknown" },
  { code: "gq", name: "Equatorial Guinea", status: "unknown" },
  { code: "er", name: "Eritrea", status: "unknown" },
  { code: "sz", name: "Eswatini", status: "unknown" },
  { code: "et", name: "Ethiopia", status: "unknown" },
  { code: "ga", name: "Gabon", status: "unknown" },
  { code: "gm", name: "Gambia", status: "unknown" },
  { code: "gh", name: "Ghana", status: "unknown" },
  { code: "gn", name: "Guinea", status: "unknown" },
  { code: "gw", name: "Guinea-Bissau", status: "unknown" },
  { code: "ke", name: "Kenya", status: "unknown" },
  { code: "ls", name: "Lesotho", status: "unknown" },
  { code: "lr", name: "Liberia", status: "unknown" },
  { code: "ly", name: "Libya", status: "unknown" },
  { code: "mg", name: "Madagascar", status: "unknown" },
  { code: "mw", name: "Malawi", status: "unknown" },
  { code: "ml", name: "Mali", status: "unknown" },
  { code: "mr", name: "Mauritania", status: "unknown" },
  { code: "mu", name: "Mauritius", status: "unknown" },
  { code: "ma", name: "Morocco", status: "unknown" },
  { code: "mz", name: "Mozambique", status: "unknown" },
  { code: "na", name: "Namibia", status: "unknown" },
  { code: "ne", name: "Niger", status: "unknown" },
  { code: "ng", name: "Nigeria", status: "unknown" },
  { code: "rw", name: "Rwanda", status: "unknown" },
  { code: "st", name: "Sao Tome and Principe", status: "unknown" },
  { code: "sn", name: "Senegal", status: "unknown" },
  { code: "sc", name: "Seychelles", status: "unknown" },
  { code: "sl", name: "Sierra Leone", status: "unknown" },
  { code: "so", name: "Somalia", status: "unknown" },
  { code: "za", name: "South Africa", status: "unknown" },
  { code: "ss", name: "South Sudan", status: "unknown" },
  { code: "sd", name: "Sudan", status: "unknown" },
  { code: "tz", name: "Tanzania", status: "unknown" },
  { code: "tg", name: "Togo", status: "unknown" },
  { code: "tn", name: "Tunisia", status: "unknown" },
  { code: "ug", name: "Uganda", status: "unknown" },
  { code: "zm", name: "Zambia", status: "unknown" },
  { code: "zw", name: "Zimbabwe", status: "unknown" },
]

export const countryMap = new Map(countries.map((c) => [c.code, c]))

export function getCountryByCode(code: string): Country | undefined {
  return countryMap.get(code.toLowerCase())
}

export const statusLabels: Record<CountryStatus, string> = {
  open: "Open / Free / Secure",
  narrowed: "Narrowed",
  obstructed: "Obstructed",
  repressed: "Repressed / Threatened",
  closed: "Closed",
  unknown: "Unknown / Unevaluated",
}

export const statusDescriptions: Record<CountryStatus, string> = {
  open: "Civic space is fully respected and protected",
  narrowed: "Civic space is experiencing some restrictions",
  obstructed: "Civic space faces significant obstacles",
  repressed: "Civic space is severely limited with active threats",
  closed: "Civic space is completely closed or non-existent",
  unknown: "Status has not yet been evaluated",
}
