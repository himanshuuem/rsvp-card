const EVENT = {
  title: "Stargazer Night",
  start: new Date("2026-11-21T19:30:00+05:30"),
  end: new Date("2026-11-21T23:30:00+05:30"),
  location: "Skyline Rooftop, Connaught Place, New Delhi",
  description: "Rooftop stargazing birthday night. Bring a blanket!",
};
const STORAGE_KEY = "stargazer-rsvp";

const form = document.querySelector(".rsvp-form");
const errorBox = document.querySelector(".form-error");
const doneBox = document.querySelector(".rsvp-done");
const doneTitle = document.querySelector(".done-title");
const countdownCells = Object.fromEntries(
  [...document.querySelectorAll("[data-unit]")].map((el) => [el.dataset.unit, el]),
);

function updateCountdown() {
  const remaining = Math.max(0, EVENT.start - Date.now());
  const seconds = Math.floor(remaining / 1000);
  const parts = {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
  for (const [unit, value] of Object.entries(parts)) {
    countdownCells[unit].textContent = String(value).padStart(2, "0");
  }
  return remaining > 0;
}

function readSavedRsvp() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function saveRsvp(rsvp) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rsvp));
  } catch {
    // Storage unavailable — the confirmation still shows for this visit.
  }
}

function showConfirmation({ name, attending, guests }) {
  const firstName = name.split(" ")[0];
  doneTitle.textContent = attending === "yes"
    ? `See you under the stars, ${firstName}! (${guests} ${guests === 1 ? "guest" : "guests"})`
    : `We'll miss you, ${firstName}. Thanks for letting us know.`;
  doneBox.querySelector('[data-action="calendar"]').hidden = attending !== "yes";
  form.hidden = true;
  doneBox.hidden = false;
}

function validate(data) {
  if (!data.name) return "Please tell us your name.";
  if (!data.attending) return "Let us know if you can make it.";
  if (!Number.isInteger(data.guests) || data.guests < 1 || data.guests > 4) return "Guests must be between 1 and 4.";
  return "";
}

const toIcsDate = (date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//himanshuuem//rsvp-card//EN",
    "BEGIN:VEVENT",
    `UID:stargazer-${EVENT.start.getTime()}@rsvp-card`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(EVENT.start)}`,
    `DTEND:${toIcsDate(EVENT.end)}`,
    `SUMMARY:${EVENT.title}`,
    `LOCATION:${EVENT.location.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${EVENT.description.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const link = Object.assign(document.createElement("a"), { href: url, download: "stargazer-night.ics" });
  link.click();
  URL.revokeObjectURL(url);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = new FormData(form);
  const rsvp = {
    name: String(fields.get("name") ?? "").trim(),
    attending: fields.get("attending"),
    guests: Number(fields.get("guests")),
    note: String(fields.get("note") ?? "").trim(),
  };
  const error = validate(rsvp);
  errorBox.textContent = error;
  if (error) return;
  saveRsvp(rsvp);
  showConfirmation(rsvp);
});

doneBox.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "calendar") downloadIcs();
  if (action === "edit") {
    doneBox.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  }
});

const saved = readSavedRsvp();
if (saved) {
  form.elements.name.value = saved.name;
  form.elements.guests.value = saved.guests;
  form.elements.note.value = saved.note ?? "";
  form.querySelector(`input[value="${saved.attending}"]`)?.click();
  showConfirmation(saved);
}

if (updateCountdown()) {
  const timer = setInterval(() => {
    if (!updateCountdown()) clearInterval(timer);
  }, 1000);
}
