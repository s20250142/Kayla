# Curio — English through curiosity

A small, self-contained English-learning app with three stages, real progress tracking,
and no dependencies, accounts, or internet connection.

This repository also contains a **bilingual product website** (English / 繁體中文)
that introduces the project. Created by **陳大文, Class 3A**.

- Website: `index.html` (English and Traditional Chinese)
- App: `app/index.html`
- Live: <https://s20250142.github.io/Kayla/>

Everything is saved in the browser.

---

## The product website

The root website is a detailed, bilingual introduction to the project: the idea,
the three stages, the features, the learning record, the author and answers to
common questions. It uses the screenshots in `assets/` and links directly into the
app. The language switch changes every visible string between English and
Traditional Chinese, updates the document language for accessibility, and is
remembered for the next visit.

## The three stages

### 1. Little Curio · ages 3–6 (sensory, daily)
A three-minute daily sensory game. Six activities rotate by date:

| Game | Sense / skill | Example |
|---|---|---|
| Colours | Sight | “Which one is red?” |
| Animal sounds | Hearing | “Who says moo?” |
| Shapes | Sight & touch | “Which one is a circle?” |
| Textures | Touch | “Which one is soft?” |
| Feelings | Emotional vocabulary | “Who is happy?” |
| Counting | Number sense | “Which group has three stars?” |

Each activity has three large picture rounds. Tap the right card, hear the praise,
and finish with three stars and a sticker. One sticker can be earned per day,
and the sticker book fills up over twelve days of play.

A grown-up guide sits on the page: read the question aloud, let the child tap,
and say the new word together.

### 2. Curiosity Library · reading & vocabulary
Fourteen original true-story lessons in clear B1–B2 English — octopuses, Venus,
the Great Emu War, why onions make you cry, the word “set”, the gut microbiome,
why time speeds up, the first computer bug, underground tree networks, Iceland’s
missing mosquitoes, earworms, the marathon legend, the drifting Moon, and “OK”.

Each lesson has:
- a short reading passage with a “Did you know?” fact,
- five useful words with pronunciation, definition and example,
- three, four or five comprehension questions depending on the difficulty
  (options are shuffled on every attempt),
- a writing prompt whose answer is saved locally.

### 3. Future Worlds · advanced reading, argument and logic
Three interactive programmes:

**Chronicles: Kepler Station** — a five-chapter science-fiction survival story.
Read science logs about power, water, food, air and solar storms, then choose how
to keep forty colonists alive. Every choice changes oxygen, water, food, power or
morale. Vocabulary (photovoltaic, baseload, reclamation, hydroponics, bioreactor,
coronal mass ejection…) is explained in context. Finish with one of four endings,
then replay a different path.

**AI & Our Future World** — three briefings on recommendation algorithms, AI tutors
and deepfakes. Each includes an article, explained vocabulary, a simulated forum
with likes, an opinion poll with results, a sentence-builder challenge and a real
writing task. Save your reply and it appears in the thread.

**The Whodunit Mystery Club** — two cases: *The Midnight Manuscript* (England, 1934)
and *The Vanishing Violinist* (Vienna, 1897). Examine four clues, test three alibis,
answer three deduction questions, then read the full solution and a recap of your
reasoning.

---

## Three difficulty levels in every stage

Each stage has its own **Easy / Standard / Challenge** selector, saved with your
progress. Changing a level affects new activities immediately, without losing your
XP, streak or completed lessons.

### Little Curio
| Level | What changes |
|---|---|
| Easy | Two picture choices per round |
| Standard | Three picture choices |
| Challenge | Three picture choices, word labels hidden, picture order shuffled |

The adult still reads the prompt aloud; the audio button is always available.

### Curiosity Library
| Level | What changes |
|---|---|
| Easy | 3 quiz questions; vocabulary meanings are already open |
| Standard | 4 quiz questions; tap each word card to reveal it |
| Challenge | 5 questions — the four reading questions plus a word-recall task where a word is missing from an example sentence |

Lesson scores are recorded as percentages, so a 4/4 on Standard and a 5/5 on
Challenge are both 100%. Each lesson remembers its best percentage and the
difficulty of your latest attempt.

### Future Worlds
| Level | What changes |
|---|---|
| Easy | The colony starts with +10 of each supply; sentence-builder hints; a gentle hint for each mystery case |
| Standard | Balanced supplies and the normal experience |
| Challenge | The colony starts with −10 of each supply; choice costs are hidden until you commit; no sentence starters and a 40-word reply; no mystery hints and no deduction explanations until the solution |

A colony mission keeps the difficulty it started with; the selector affects the
next mission. AI briefings and mysteries use the current Future Worlds level
straight away.

## Companions — hatch a pet with your points

Every point you earn in every stage warms a mystery egg. Each egg is a **300-point
meter**: fill it to 300 and the next companion hatches. Six companions means six
eggs, eighteen hundred points, one at a time:

| Points on the egg | Total journey | Companion | Trait |
|---:|---:|---|---|
| 300 | 300 | 🐣 Pip — Hatchling | Curiosity |
| 300 | 600 | 🦊 Momo — Fox kit | Cleverness |
| 300 | 900 | 🦉 Nori — Night owl | Memory |
| 300 | 1200 | 🐉 Kiko — Baby dragon | Courage |
| 300 | 1500 | 🦄 Lumi — Story unicorn | Imagination |
| 300 | 1800 | 🐋 Astra — Sky whale | Depth |

The **Companion** page shows the active pet, a speech bubble, the next egg's
progress, and the whole collection. A large egg appears when one is ready —
tap it to watch the shell crack and meet the new pet. You can switch the active
companion at any time; every pet keeps its own trait and lines.

The companion also appears in the sidebar and on the Home screen, with a gentle
hint when an egg is ready. Pets do not expire, and hatching is a one-off reward
for points already earned.

## Progress tracking

Everything is stored in `localStorage` on the device. Nothing is sent anywhere.

- **XP and levels** (eight levels, from Curious Newcomer to Living Lexicon)
- **Daily goal** (20–100 XP) and a **daily streak**
- **Per-day history** powering a 14-day bar chart and a six-month consistency heatmap
- **Lesson records** with best score and attempts
- **Word bank** with a spaced-repetition schedule (Again / Good / Easy grading)
- **Little Curio** stars, days played, sticker collection and games played
- **Adventure progress**: colony resources and choices, briefing steps, votes,
  written replies, solved cases and scores
- **Companions**: hatched pets, active pet, hatch dates and collection progress
- **Seventeen badges**, including stage-specific and pet badges
- **Export / import** a JSON progress file, and a full reset — from *Settings & data*

Progress can be exported before switching computers. Import replaces the current
profile.

---

## Running it

### Option A — double-click
Open `index.html` to see the product website, then choose **Open the app**.
The app lives in `app/index.html`.

> Some browsers restrict `localStorage` for `file://` pages. Curio detects this and
> keeps progress in memory for the session, but it cannot persist across reloads.
> If you see a “private browsing” warning, use Option B.

### Option B — a tiny local server (recommended)
From this folder:

```bash
python3 -m http.server 8080
```

- Website: <http://127.0.0.1:8080/>
- App: <http://127.0.0.1:8080/app/>

Progress will persist in that browser profile.

No installation, build step, package manager, or network access is required.

### Website languages
The website has an **EN / 繁中** switch in the header. The choice is remembered in
`localStorage` under `curio.site.lang`; append `?lang=zh` or `?lang=en` to a link to
open a specific language. Old bookmarks such as `/#/home` are redirected to
`/app/#/home`, so the app is still one click away.

## Author

**陳大文** · **3A 班**

Curio is a student-built educational project. The website and app are free to use,
with no accounts or advertisements. Progress is stored only in the learner's browser.

---

## Files

```text
index.html          bilingual product website (English / 繁體中文)
site.css            website design system and responsive layout
site.js             language switch, mobile menu, scroll reveals, old-URL redirects
404.html            bilingual not-found page
robots.txt          search-engine rules
sitemap.xml         landing page and app URL

assets/             website screenshots and favicon
  home.jpg
  little.jpg
  library.jpg
  worlds.jpg
  pet.jpg
  mobile.jpg
  favicon.svg

app/index.html      the English-learning app shell
app/styles.css      app design system and responsive layout
app/content.js      14 library lessons (reading, vocabulary, quiz, writing prompt)
app/content2.js     Little Curio games and the three Future Worlds programmes
app/pets.js         the six companions, their milestones, traits and lines
app/app.js          state, routing, rendering, games, pets, progress, badges, import/export

.github/workflows/pages.yml   automatic GitHub Pages deployment
```

---

## Notes for parents and teachers

- **Stage 1 is not independent reading.** It is designed for an adult and child to
  use together for about three minutes a day. The pictures carry the meaning; the
  audio button reads the question aloud.
- The library and Future Worlds are for learners who can read short paragraphs.
  Vocabulary is glossed in plain English rather than translated.
- Speech uses the browser’s built-in English voice. If none is installed, the text
  still works.
- The simulated forum and poll in *AI & Our Future World* are written content, not
  a live social network. They are deliberately opinionated so learners have
  something to agree or disagree with.
- The mystery cases are self-contained logic puzzles. Every solution is supported by
  the clues on the page.

Curio is a learning aid, not a replacement for a teacher, and it does not assess
spoken English.

---

## Deploy to GitHub Pages

This repository includes `.github/workflows/pages.yml`. It runs on every push
(including merges) to `main`, builds `_site` from the website files plus `app/`,
and deploys that folder to GitHub Pages.

One-time setup after the first push:

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. The workflow runs automatically; you can also run it manually from the
   **Actions** tab.

Live site (once deployed): <https://s20250142.github.io/Kayla/>

Because all asset links are relative, the website and the app both work from the
`/Kayla/` project path without a build step. The app is available at
<https://s20250142.github.io/Kayla/app/>.
