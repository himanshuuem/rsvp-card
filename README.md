# ✨ Stargazer Night: RSVP Card

> A glassmorphism birthday invitation with a live countdown, event timeline, embedded map and a working RSVP flow that exports to your calendar.

**🔗 Live demo:** https://himanshuuem.github.io/rsvp-card/

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **Live countdown** to the event. It updates every second and stops cleanly at zero.
- **Semantic event details** using `<dl>`, `<time datetime>` and an ordered timeline.
- **RSVP form** with client-side validation, inline error messages (`role="alert"`) and a guest limit.
- **Persistent RSVP.** Your answer is saved in `localStorage`, so returning guests see their confirmation and can change it.
- **"Add to calendar"** builds a standards-compliant `.ics` file in the browser, with no server needed.
- **Night-sky design** with a twinkling CSS-only star field, frosted-glass card and a dark-tinted map embed.
- Respects `prefers-reduced-motion`, has visible focus states and adapts to small screens.

## 🛠 Tech Stack

HTML5 · CSS3 (custom properties, `:has()`, `backdrop-filter`, Grid) · Vanilla JS (`FormData`, `Blob`, `Intl`-free date math) · Google Fonts (Instrument Serif, Space Grotesk)

## 📁 Structure

```
rsvp-card/
├── index.html   # Invitation content and RSVP form
├── styles.css   # Night-sky theme, glass card, timeline
├── app.js       # Countdown, validation, persistence, .ics export
└── README.md
```

## 🚀 Run Locally

```bash
git clone https://github.com/himanshuuem/rsvp-card.git
cd rsvp-card
npx serve .   # or open index.html directly
```

To reuse it for your own event, edit the `EVENT` object at the top of `app.js` and the details in `index.html`.

## 📚 Origin

This is a reimagined version of the *Birthday Invite* exercise from [The Complete Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/). I extended a static HTML page into an interactive invitation.

---

Made by [Himanshu](https://github.com/himanshuuem)
