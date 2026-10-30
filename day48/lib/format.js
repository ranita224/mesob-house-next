const LOCALE = "en-ET";
const TIME_ZONE = "Africa/Addis_Ababa"; 

export const etb = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export const when = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: TIME_ZONE,
});

export const shortDay = new Intl.DateTimeFormat(LOCALE, {
  day: "numeric",
  month: "short",
  timeZone: TIME_ZONE,
});

export const yearOf = new Intl.DateTimeFormat(LOCALE, { year: "numeric", timeZone: TIME_ZONE });

const dayKeyFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
export const dayKey = (date) => dayKeyFormat.format(new Date(date));

export const km = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 });

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

export function relative(date, now = Date.now()) {
  const diff = Math.round((new Date(date).getTime() - now) / 1000); 
  for (const [unit, seconds] of UNITS) {
    if (Math.abs(diff) >= seconds || unit === "second") {
      return rtf.format(Math.round(diff / seconds), unit);
    }
  }
}
