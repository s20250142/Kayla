/* Curio — English through curiosity.
   A tiny single-page app. No dependencies, no build step.
   All progress is stored in localStorage on this device. */
(function () {
  "use strict";

  var C = window.CURIO_CONTENT;
  var EXTRA = window.CURIO_EXTRA || { littleActivities: [], stickers: [], aiBriefings: [], cases: [] };
  var LITTLE = EXTRA.littleActivities || [];
  var AI_BRIEFS = EXTRA.aiBriefings || [];
  var CASES = EXTRA.cases || [];
  var PETS = window.CURIO_PETS || [];
  var STORE_KEY = "curio.state.v1";
  var ALL_LESSONS = C.lessons;
  var ALL_WORDS = C.allWords;

  /* ------------------------------------------------------------------ *
   *  Icons
   * ------------------------------------------------------------------ */
  var ICONS = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.6 12 3l9 7.6"/><path d="M5.5 9.4V21h13V9.4"/></svg>',
    library: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.2C10 4.7 7 4.1 4 4.1v13.6c3 0 6 .6 8 2.1 2-1.5 5-2.1 8-2.1V4.1c-3 0-6 .6-8 2.1Z"/><path d="M12 6.2v13.6"/></svg>',
    review: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1"/><path d="M20.5 4.5V11H14"/></svg>',
    stats: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V11"/><path d="M10 20V4"/><path d="M16 20v-6"/><path d="M22 20H2"/></svg>',
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h9"/><path d="M17 7h4"/><circle cx="14.5" cy="7" r="2.3"/><path d="M3 17h3"/><path d="M11 17h10"/><circle cx="8.5" cy="17" r="2.3"/></svg>',
    flame: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3s5 4.2 5 9a5 5 0 0 1-10 0c0-2 1-3.6 2-5 .3 1.5 1 2.5 2 3 .5-2.2.8-4.4 1-7Z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5"/><path d="m11 6-6 6 6 6"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12.5 5 5L20 6.5"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z"/><path d="M16 9a4.2 4.2 0 0 1 0 6"/><path d="M18.8 6.4a8 8 0 0 1 0 11.2"/></svg>',
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="M18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.2 10.5V7.7a3.8 3.8 0 0 1 7.6 0v2.8"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V4.5h6V7"/><path d="M6.5 7l1 13h9l1-13"/></svg>',
    download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11"/><path d="m7.5 10 4.5 4.5 4.5-4.5"/><path d="M4 19.5h16"/></svg>',
    upload: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4"/><path d="m7.5 8.5 4.5-4.5 4.5 4.5"/><path d="M4 19.5h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg>',
    sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4"/><path d="M12 19.1v2.4"/><path d="M2.5 12h2.4"/><path d="M19.1 12h2.4"/><path d="m5.2 5.2 1.7 1.7"/><path d="m17.1 17.1 1.7 1.7"/><path d="m18.8 5.2-1.7 1.7"/><path d="m6.9 17.1-1.7 1.7"/></svg>',
    compass: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5.5-5.5 2 2-5.5z"/></svg>'
  };

  function icon(name, cls) {
    return '<span class="icon ' + (cls || "") + '">' + (ICONS[name] || "") + "</span>";
  }

  /* ------------------------------------------------------------------ *
   *  Small helpers
   * ------------------------------------------------------------------ */
  var ESC_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) { return ESC_MAP[c]; });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function dateKey(d) {
    d = d || new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function parseKey(key) {
    var p = key.split("-").map(Number);
    return new Date(p[0], p[1] - 1, p[2], 12, 0, 0, 0);
  }
  function daysBetween(fromKey, toKey) {
    return Math.round((parseKey(toKey) - parseKey(fromKey)) / 86400000);
  }
  function todayKey() { return dateKey(new Date()); }

  function fmtDate(key) {
    var d = parseKey(key);
    var now = new Date();
    if (key === dateKey(now)) return "Today";
    var y = new Date(now.getTime() - 86400000);
    if (key === dateKey(y)) return "Yesterday";
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }

  function plural(n, one, many) { return n + " " + (n === 1 ? one : (many || one + "s")); }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ------------------------------------------------------------------ *
   *  Progress model
   * ------------------------------------------------------------------ */
  function defaultState() {
    return {
      version: 1,
      name: "",
      xp: 0,
      goal: 40,
      createdAt: new Date().toISOString(),
      lessons: {},
      words: {},
      notes: {},
      history: {},
      badges: [],
      streak: { count: 0, best: 0, last: null },
      stats: { correct: 0, total: 0, reviews: 0 },
      flags: { perfect: false },
      difficulty: { little: "standard", library: "standard", future: "standard" },
      little: { stars: 0, activities: {}, days: {}, stickers: [] },
      chronicles: {
        started: false, chapter: 0, resources: null, choices: [],
        pendingChoice: null, completed: false, ending: null, xpChapters: [],
        difficulty: "standard"
      },
      ai: { briefings: {} },
      whodunit: { cases: {} },
      pets: { hatched: {}, active: null }
    };
  }

  var memoryStore = null;
  var storageOK = true;

  function loadState() {
    var base = defaultState();
    var raw = null;
    try { raw = window.localStorage.getItem(STORE_KEY); }
    catch (e) { storageOK = false; raw = memoryStore; }
    if (!raw) return base;
    try {
      var data = JSON.parse(raw);
      return sanitizeState(data);
    } catch (e) {
      return base;
    }
  }

  function sanitizeState(data) {
    var s = defaultState();
    if (!data || typeof data !== "object") return s;
    if (typeof data.name === "string") s.name = data.name.slice(0, 40);
    if (isFinite(data.xp)) s.xp = Math.max(0, Math.floor(data.xp));
    if ([20, 40, 60, 80, 100, 120].indexOf(data.goal) !== -1) s.goal = data.goal;
    if (data.createdAt) s.createdAt = String(data.createdAt);

    if (data.lessons && typeof data.lessons === "object") {
      Object.keys(data.lessons).forEach(function (id) {
        var rec = data.lessons[id];
        if (!C.lessonById(id) || !rec || typeof rec !== "object") return;
        var recTotal = Math.max(1, Number(rec.total) || 4);
        var recBest = Math.max(0, Number(rec.best) || 0);
        var recPct = Math.max(0, Math.min(100, Number(rec.bestPct) || Math.round((recBest / recTotal) * 100)));
        var recDiff = DIFF_LEVELS.indexOf(rec.difficulty) !== -1 ? rec.difficulty : "standard";
        s.lessons[id] = {
          attempts: Math.max(0, Number(rec.attempts) || 0),
          best: recBest,
          bestPct: recPct,
          last: Math.max(0, Number(rec.last) || 0),
          total: recTotal,
          difficulty: recDiff,
          completedAt: rec.completedAt || new Date().toISOString(),
          minutes: Math.max(0, Number(rec.minutes) || 0)
        };
      });
    }
    if (data.words && typeof data.words === "object") {
      Object.keys(data.words).forEach(function (id) {
        var w = data.words[id];
        if (!ALL_WORDS.some(function (x) { return x.id === id; }) || !w || typeof w !== "object") return;
        s.words[id] = {
          id: id,
          lessonId: w.lessonId || id.split("::")[0],
          word: w.word || id.split("::")[1] || id,
          strength: Math.min(5, Math.max(0, Math.floor(Number(w.strength) || 0))),
          due: Number(w.due) || 0,
          seen: Math.max(0, Number(w.seen) || 0),
          correct: Math.max(0, Number(w.correct) || 0),
          wrong: Math.max(0, Number(w.wrong) || 0),
          added: Number(w.added) || Date.now(),
          lastSeen: Number(w.lastSeen) || 0
        };
      });
    }
    if (data.notes && typeof data.notes === "object") {
      Object.keys(data.notes).forEach(function (id) {
        var n = data.notes[id];
        if (!n || typeof n.text !== "string") return;
        s.notes[id] = { text: n.text.slice(0, 4000), updatedAt: n.updatedAt || new Date().toISOString() };
      });
    }
    if (data.history && typeof data.history === "object") {
      Object.keys(data.history).forEach(function (key) {
        var d = data.history[key];
        if (!/^\d{4}-\d{2}-\d{2}$/.test(key) || !d || typeof d !== "object") return;
        s.history[key] = {
          xp: Math.max(0, Number(d.xp) || 0),
          minutes: Math.max(0, Number(d.minutes) || 0),
          lessons: Math.max(0, Number(d.lessons) || 0),
          reviews: Math.max(0, Number(d.reviews) || 0),
          correct: Math.max(0, Number(d.correct) || 0),
          total: Math.max(0, Number(d.total) || 0)
        };
      });
    }
    if (Array.isArray(data.badges)) {
      s.badges = data.badges.filter(function (id) {
        return BADGES.some(function (b) { return b.id === id; });
      });
    }
    if (data.streak && typeof data.streak === "object") {
      s.streak = {
        count: Math.max(0, Number(data.streak.count) || 0),
        best: Math.max(0, Number(data.streak.best) || 0),
        last: typeof data.streak.last === "string" ? data.streak.last : null
      };
    }
    if (data.stats && typeof data.stats === "object") {
      s.stats = {
        correct: Math.max(0, Number(data.stats.correct) || 0),
        total: Math.max(0, Number(data.stats.total) || 0),
        reviews: Math.max(0, Number(data.stats.reviews) || 0)
      };
    }
    if (data.flags && typeof data.flags === "object") {
      s.flags = { perfect: !!data.flags.perfect };
    }

    if (data.difficulty && typeof data.difficulty === "object") {
      ["little", "library", "future"].forEach(function (area) {
        var v = data.difficulty[area];
        if (DIFF_LEVELS.indexOf(v) !== -1) s.difficulty[area] = v;
      });
    }

    if (data.little && typeof data.little === "object") {
      var lit = data.little;
      s.little.stars = Math.max(0, Math.floor(Number(lit.stars) || 0));
      if (lit.activities && typeof lit.activities === "object") {
        Object.keys(lit.activities).forEach(function (id) {
          if (!LITTLE.some(function (a) { return a.id === id; })) return;
          var a = lit.activities[id] || {};
          s.little.activities[id] = {
            plays: Math.max(0, Number(a.plays) || 0),
            best: Math.min(3, Math.max(0, Number(a.best) || 0))
          };
        });
      }
      if (lit.days && typeof lit.days === "object") {
        Object.keys(lit.days).forEach(function (key) {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return;
          var d = lit.days[key] || {};
          if (!LITTLE.some(function (a) { return a.id === d.activityId; })) return;
          s.little.days[key] = {
            activityId: d.activityId,
            stars: Math.min(3, Math.max(0, Number(d.stars) || 0)),
            sticker: Number.isInteger(d.sticker) ? d.sticker : null
          };
        });
      }
      if (Array.isArray(lit.stickers)) {
        s.little.stickers = lit.stickers.filter(function (n) {
          return Number.isInteger(n) && n >= 0 && n < EXTRA.stickers.length;
        });
      }
    }

    if (data.chronicles && typeof data.chronicles === "object" && EXTRA.chronicles) {
      var ch = data.chronicles;
      s.chronicles.started = !!ch.started;
      s.chronicles.chapter = Math.min(EXTRA.chronicles.chapters.length - 1, Math.max(0, Math.floor(Number(ch.chapter) || 0)));
      s.chronicles.completed = !!ch.completed;
      s.chronicles.difficulty = DIFF_LEVELS.indexOf(ch.difficulty) !== -1 ? ch.difficulty : "standard";
      s.chronicles.pendingChoice = Number.isInteger(ch.pendingChoice) ? ch.pendingChoice : null;
      if (Array.isArray(ch.choices)) {
        s.chronicles.choices = ch.choices.slice(0, 8).map(function (n) { return Math.max(0, Math.floor(Number(n) || 0)); });
      }
      if (Array.isArray(ch.xpChapters)) {
        s.chronicles.xpChapters = ch.xpChapters.filter(function (n) { return Number.isInteger(n); });
      }
      if (!ch.resources && ch.started) ch.resources = EXTRA.chronicles.startResources;
      if (ch.resources && typeof ch.resources === "object") {
        var base = EXTRA.chronicles.startResources;
        var res = {};
        Object.keys(base).forEach(function (k) {
          var v = Number(ch.resources[k]);
          res[k] = isFinite(v) ? Math.max(0, Math.min(100, Math.round(v))) : base[k];
        });
        s.chronicles.resources = res;
      }
      if (ch.ending && typeof ch.ending === "object") {
        s.chronicles.ending = {
          grade: String(ch.ending.grade || ""),
          tone: String(ch.ending.tone || ""),
          title: String(ch.ending.title || ""),
          text: String(ch.ending.text || "")
        };
      }
    }

    if (data.ai && data.ai.briefings && typeof data.ai.briefings === "object") {
      Object.keys(data.ai.briefings).forEach(function (id) {
        if (!AI_BRIEFS.some(function (b) { return b.id === id; })) return;
        var b = data.ai.briefings[id] || {};
        var brief = AI_BRIEFS.filter(function (x) { return x.id === id; })[0];
        var vote = Number.isInteger(b.vote) && b.vote >= 0 && b.vote < brief.poll.options.length ? b.vote : null;
        s.ai.briefings[id] = {
          read: !!b.read,
          vote: vote,
          challenge: !!b.challenge,
          reply: typeof b.reply === "string" ? b.reply.slice(0, 1200) : "",
          liked: Array.isArray(b.liked) ? b.liked.map(Number).filter(function (n) { return Number.isInteger(n); }) : []
        };
      });
    }

    if (data.pets && typeof data.pets === "object") {
      if (data.pets.hatched && typeof data.pets.hatched === "object") {
        Object.keys(data.pets.hatched).forEach(function (id) {
          if (!PETS.some(function (p) { return p.id === id; })) return;
          var rec = data.pets.hatched[id] || {};
          s.pets.hatched[id] = { at: rec.at || new Date().toISOString() };
        });
      }
      if (typeof data.pets.active === "string" && s.pets.hatched[data.pets.active]) {
        s.pets.active = data.pets.active;
      } else {
        var hatchedIds = Object.keys(s.pets.hatched);
        s.pets.active = hatchedIds.length ? hatchedIds[0] : null;
      }
    }

    if (data.whodunit && data.whodunit.cases && typeof data.whodunit.cases === "object") {
      Object.keys(data.whodunit.cases).forEach(function (id) {
        if (!CASES.some(function (c) { return c.id === id; })) return;
        var c = data.whodunit.cases[id] || {};
        var caseObj = CASES.filter(function (x) { return x.id === id; })[0];
        var maxQ = Math.max(0, caseObj.questions.length - 1);
        s.whodunit.cases[id] = {
          qIndex: Math.min(maxQ, Math.max(0, Number(c.qIndex) || 0)),
          answers: Array.isArray(c.answers) ? c.answers.map(Number).slice(0, 6) : [],
          solved: !!c.solved,
          score: Math.max(0, Number(c.score) || 0),
          hintShown: !!c.hintShown
        };
      });
    }

    return s;
  }

  var state; // assigned after BADGES is defined (sanitizeState reads the badge list)

  function saveState() {
    var json = JSON.stringify(state);
    if (storageOK) {
      try { window.localStorage.setItem(STORE_KEY, json); return; }
      catch (e) { storageOK = false; }
    }
    memoryStore = json;
  }

  function ensureDay() {
    var key = todayKey();
    if (!state.history[key]) {
      state.history[key] = { xp: 0, minutes: 0, lessons: 0, reviews: 0, correct: 0, total: 0 };
    }
    return state.history[key];
  }

  function addXP(amount) {
    if (!amount) return null;
    var beforeXP = state.xp;
    var before = levelFor(state.xp);
    state.xp += amount;
    ensureDay().xp += amount;
    var after = levelFor(state.xp);

    var pet = nextPet();
    if (pet && !state.pets.hatched[pet.id] && beforeXP < pet.hatchAt && state.xp >= pet.hatchAt) {
      setTimeout(function () {
        toast("🥚 An egg is ready to hatch — visit your companion.");
      }, 1100);
    }

    if (after.index > before.index) return { leveled: true, level: after };
    return { leveled: false };
  }

  function recordActivity() {
    var key = todayKey();
    var s = state.streak;
    if (s.last === key) {
      // already counted today
    } else if (s.last && daysBetween(s.last, key) === 1) {
      s.count += 1;
      s.last = key;
    } else {
      s.count = 1;
      s.last = key;
    }
    if (s.count > s.best) s.best = s.count;
  }

  function littleById(id) {
    for (var i = 0; i < LITTLE.length; i++) if (LITTLE[i].id === id) return LITTLE[i];
    return null;
  }
  function aiById(id) {
    for (var i = 0; i < AI_BRIEFS.length; i++) if (AI_BRIEFS[i].id === id) return AI_BRIEFS[i];
    return null;
  }
  function caseById(id) {
    for (var i = 0; i < CASES.length; i++) if (CASES[i].id === id) return CASES[i];
    return null;
  }
  function petById(id) {
    for (var i = 0; i < PETS.length; i++) if (PETS[i].id === id) return PETS[i];
    return null;
  }
  function activePet() {
    return petById(state.pets.active) || null;
  }
  function hatchedPetCount() {
    return Object.keys(state.pets.hatched).length;
  }
  function nextPet() {
    var best = null;
    PETS.forEach(function (p) {
      if (state.pets.hatched[p.id]) return;
      if (!best || p.hatchAt < best.hatchAt) best = p;
    });
    return best;
  }
  var EGG_POINTS = 300;
  function petEggPoints(pet) {
    if (!pet) return 0;
    var start = Math.max(0, pet.hatchAt - EGG_POINTS);
    return Math.max(0, Math.min(EGG_POINTS, state.xp - start));
  }
  function petReady(pet) {
    return !!pet && state.xp >= pet.hatchAt;
  }
  function hatchReady() {
    return petReady(nextPet());
  }
  function petDailyLine(pet) {
    return pet.lines[localDayIndex() % pet.lines.length];
  }
  function petMood() {
    var day = state.history[todayKey()];
    if (day && day.xp > 0) return { label: "Bright-eyed", detail: "You learned something today." };
    if (currentStreak() > 0) return { label: "Waiting for you", detail: "A few minutes today would make it happy." };
    return { label: "Sleepy", detail: "The nest is warm. Come back and learn something." };
  }
  var DIFF_LEVELS = ["easy", "standard", "hard"];
  var DIFF_LABELS = { easy: "Easy", standard: "Standard", hard: "Challenge" };

  function diffFor(area) {
    return state.difficulty && DIFF_LEVELS.indexOf(state.difficulty[area]) !== -1
      ? state.difficulty[area]
      : "standard";
  }
  function diffLabel(level) {
    return DIFF_LABELS[level] || "Standard";
  }
  function difficultyControl(area, note) {
    var current = diffFor(area);
    return '<div class="difficulty-bar reveal">' +
      '<div class="diff-control">' +
        '<span class="diff-label">' + icon("spark") + " Difficulty</span>" +
        '<span class="diff-options">' + DIFF_LEVELS.map(function (level) {
          return '<button class="diff-btn' + (level === current ? " active" : "") + '" ' +
            'data-action="set-difficulty" data-area="' + area + '" data-level="' + level + '" ' +
            'aria-pressed="' + (level === current ? "true" : "false") + '">' + diffLabel(level) + "</button>";
        }).join("") + "</span>" +
      "</div>" +
      '<span class="diff-note">' + esc(note) + "</span>" +
    "</div>";
  }
  function setDifficulty(area, level) {
    if (["little", "library", "future"].indexOf(area) === -1) return;
    if (DIFF_LEVELS.indexOf(level) === -1) return;
    state.difficulty[area] = level;
    if (area === "little" && littleRun) littleRun = newLittleRun(littleRun.activity, level);
    if (area === "library" && run) run = newRun(run.lesson);
    saveState();
    render();
    toast("Difficulty set to " + diffLabel(level) + ".");
  }

  function littlePlays() {
    return Object.keys(state.little.activities).reduce(function (n, id) {
      return n + (state.little.activities[id].plays || 0);
    }, 0);
  }
  function littleDays() { return Object.keys(state.little.days).length; }
  function localDayIndex() {
    var now = new Date();
    var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor(midnight.getTime() / 86400000);
  }
  function littleToday() {
    var day = localDayIndex();
    return LITTLE[day % LITTLE.length] || null;
  }
  function aiState(id) {
    if (!state.ai.briefings[id]) {
      state.ai.briefings[id] = { read: false, vote: null, challenge: false, reply: "", liked: [] };
    }
    return state.ai.briefings[id];
  }
  function aiCompleteCount() {
    return AI_BRIEFS.filter(function (b) {
      var st = state.ai.briefings[b.id];
      return st && st.read && st.vote !== null && st.challenge && (st.reply || "").trim().length > 10;
    }).length;
  }
  function caseState(id) {
    if (!state.whodunit.cases[id]) {
      state.whodunit.cases[id] = { qIndex: 0, answers: [], solved: false, score: 0, hintShown: false };
    }
    return state.whodunit.cases[id];
  }
  function solvedCaseCount() {
    return CASES.filter(function (c) {
      return state.whodunit.cases[c.id] && state.whodunit.cases[c.id].solved;
    }).length;
  }

  function currentStreak() {
    var s = state.streak;
    if (!s.last) return 0;
    var diff = daysBetween(s.last, todayKey());
    if (diff === 0 || diff === 1) return s.count;
    return 0;
  }

  function completedLessonIds() { return Object.keys(state.lessons); }
  function completedCount() { return Object.keys(state.lessons).length; }
  function learnedWords() { return Object.keys(state.words).map(function (id) { return state.words[id]; }); }
  function masteredCount() {
    return learnedWords().filter(function (w) { return w.strength >= 4; }).length;
  }
  function dueWords(now) {
    now = now || Date.now();
    return learnedWords().filter(function (w) { return w.strength < 5 && w.due <= now; })
      .sort(function (a, b) { return a.due - b.due; });
  }
  function totalMinutes() {
    return Object.keys(state.history).reduce(function (sum, k) { return sum + (state.history[k].minutes || 0); }, 0);
  }
  function quizAccuracy() {
    return state.stats.total ? Math.round((state.stats.correct / state.stats.total) * 100) : 0;
  }
  function reflectionCount() {
    return Object.keys(state.notes).filter(function (id) {
      return (state.notes[id].text || "").trim().length > 15;
    }).length;
  }

  /* ------------------------------------------------------------------ *
   *  Levels & badges
   * ------------------------------------------------------------------ */
  var LEVELS = [
    { min: 0,    title: "Curious Newcomer" },
    { min: 120,  title: "Word Explorer" },
    { min: 300,  title: "Sentence Smith" },
    { min: 560,  title: "Story Seeker" },
    { min: 900,  title: "Language Detective" },
    { min: 1350, title: "Fluent Thinker" },
    { min: 1900, title: "Curio Master" },
    { min: 2600, title: "Living Lexicon" }
  ];

  function levelFor(xp) {
    var idx = 0;
    for (var i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].min) idx = i;
    var cur = LEVELS[idx];
    var next = LEVELS[idx + 1] || null;
    var pct;
    if (!next) pct = 100;
    else pct = Math.max(0, Math.min(100, ((xp - cur.min) / (next.min - cur.min)) * 100));
    return {
      index: idx,
      number: idx + 1,
      title: cur.title,
      min: cur.min,
      next: next,
      toNext: next ? Math.max(0, next.min - xp) : 0,
      pct: pct
    };
  }

  var BADGES = [
    { id: "first", name: "First Light", icon: "🌅", desc: "Finish your first curiosity", check: function () { return completedCount() >= 1; } },
    { id: "five", name: "Curious Mind", icon: "🧭", desc: "Finish 5 curiosities", check: function () { return completedCount() >= 5; } },
    { id: "all", name: "Completionist", icon: "🏆", desc: "Finish all 14 curiosities", check: function () { return completedCount() >= ALL_LESSONS.length; } },
    { id: "streak3", name: "On a Roll", icon: "🔥", desc: "Learn 3 days in a row", check: function () { return state.streak.best >= 3; } },
    { id: "streak7", name: "Week Warrior", icon: "⚡", desc: "Learn 7 days in a row", check: function () { return state.streak.best >= 7; } },
    { id: "perfect", name: "Flawless", icon: "💎", desc: "Get every quiz answer right", check: function () { return !!state.flags && !!state.flags.perfect; } },
    { id: "words10", name: "Word Collector", icon: "📚", desc: "Collect 10 words", check: function () { return learnedWords().length >= 10; } },
    { id: "words30", name: "Lexicon Builder", icon: "🗂️", desc: "Master 30 words (strength 4+)", check: function () { return masteredCount() >= 30; } },
    { id: "level3", name: "Rising Voice", icon: "🎙️", desc: "Reach level 3", check: function () { return levelFor(state.xp).index >= 2; } },
    { id: "writer", name: "Reflective", icon: "✍️", desc: "Answer 3 writing prompts", check: function () { return reflectionCount() >= 3; } },
    { id: "little3", name: "Little Star", icon: "🌟", desc: "Play 3 Little Curio games", check: function () { return littlePlays() >= 3; } },
    { id: "colony", name: "Colony Keeper", icon: "🛰️", desc: "Survive the forty-day night", check: function () { return state.chronicles.completed; } },
    { id: "future", name: "Future Thinker", icon: "🤖", desc: "Finish all three AI briefings", check: function () { return aiCompleteCount() >= AI_BRIEFS.length; } },
    { id: "sleuth", name: "Sleuth", icon: "🕵️", desc: "Solve a mystery case", check: function () { return solvedCaseCount() >= 1; } },
    { id: "master_sleuth", name: "Master Detective", icon: "🔍", desc: "Solve both mystery cases", check: function () { return solvedCaseCount() >= CASES.length; } },
    { id: "first_pet", name: "Egg Cracker", icon: "🥚", desc: "Hatch your first companion", check: function () { return hatchedPetCount() >= 1; } },
    { id: "all_pets", name: "Menagerie", icon: "🐾", desc: "Hatch all six companions", check: function () { return hatchedPetCount() >= PETS.length; } }
  ];

  state = loadState();

  function checkBadges() {
    var unlocked = [];
    BADGES.forEach(function (badge) {
      if (state.badges.indexOf(badge.id) !== -1) return;
      if (badge.id === "perfect" && !(state.flags && state.flags.perfect)) return;
      if (badge.check()) {
        state.badges.push(badge.id);
        unlocked.push(badge);
      }
    });
    return unlocked;
  }

  /* ------------------------------------------------------------------ *
   *  Toasts
   * ------------------------------------------------------------------ */
  var toastCount = 0;
  function toast(message, kind) {
    var stack = $("#toast-stack");
    if (!stack) return;
    var el = document.createElement("div");
    el.className = "toast toast-" + (kind || "info");
    el.innerHTML = (kind === "badge" ? '<span class="toast-icon">🏅</span>' : "") + "<span>" + message + "</span>";
    stack.appendChild(el);
    toastCount++;
    requestAnimationFrame(function () { el.classList.add("in"); });
    setTimeout(function () {
      el.classList.remove("in");
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); toastCount--; }, 320);
    }, kind === "badge" ? 4200 : 3000);
  }

  function announceBadges(list) {
    list.forEach(function (badge, i) {
      setTimeout(function () {
        toast("<strong>" + esc(badge.name) + "</strong> unlocked — " + esc(badge.desc), "badge");
      }, i * 700);
    });
  }

  /* ------------------------------------------------------------------ *
   *  Speech
   * ------------------------------------------------------------------ */
  var canSpeak = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  function speak(text) {
    if (!canSpeak) { toast("Speech is not available in this browser."); return; }
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  /* ------------------------------------------------------------------ *
   *  Navigation shell
   * ------------------------------------------------------------------ */
  var NAV = [
    { id: "home", label: "Home", short: "Home", icon: "home", hash: "#/home" },
    { id: "little", label: "Little Curio", short: "Little", icon: "sun", hash: "#/little" },
    { id: "library", label: "Library", short: "Library", icon: "library", hash: "#/library" },
    { id: "adventures", label: "Future Worlds", short: "Worlds", icon: "compass", hash: "#/adventures" },
    { id: "review", label: "Review", short: "Review", icon: "review", hash: "#/review" },
    { id: "stats", label: "Progress", short: "Progress", icon: "stats", hash: "#/stats" }
  ];

  function activeNav(view) {
    if (view === "lesson") return "library";
    if (view === "chronicles" || view === "ai" || view === "whodunit") return "adventures";
    if (view === "pet") return "home";
    return view;
  }

  function renderShell(view) {
    var active = activeNav(view);
    var due = dueWords().length;
    var lvl = levelFor(state.xp);
    var streak = currentStreak();

    $("#nav").innerHTML = NAV.map(function (item) {
      var badge = item.id === "review" && due ? '<span class="nav-badge">' + due + "</span>" : "";
      return '<a class="nav-item' + (item.id === active ? " active" : "") + '" href="' + item.hash + '">' +
        icon(item.icon) + "<span>" + item.label + "</span>" + badge + "</a>";
    }).join("");

    $("#tabbar").innerHTML = NAV.map(function (item) {
      var badge = item.id === "review" && due ? '<span class="tab-badge">' + due + "</span>" : "";
      return '<a class="tab-item' + (item.id === active ? " active" : "") + '" href="' + item.hash + '">' +
        icon(item.icon) + "<span>" + (item.short || item.label) + "</span>" + badge + "</a>";
    }).join("");

    var pet = activePet();
    var upcoming = nextPet();
    var petReadyNow = petReady(upcoming);
    var petMiniText = pet
      ? pet.species
      : (upcoming ? petEggPoints(upcoming) + " / " + EGG_POINTS + " points" : "All hatched");
    var petMini =
      '<a class="pet-mini' + (petReadyNow ? " ready" : "") + '" href="#/pet">' +
        '<span class="pet-mini-emoji">' + (pet ? pet.emoji : "🥚") + "</span>" +
        '<span class="pet-mini-text"><strong>' + esc(pet ? pet.name : "Mystery egg") + "</strong><small>" + esc(petMiniText) + "</small></span>" +
        (petReadyNow ? '<span class="pet-mini-ready">Ready</span>' : "") +
      "</a>";

    var foot = $("#sidebar-foot");
    foot.innerHTML =
      petMini +
      '<div class="streak-box">' +
        '<span class="streak-flame">' + icon("flame") + "</span>" +
        "<div><strong>" + (streak ? plural(streak, "day") + " streak" : "No streak yet") + "</strong>" +
        "<span>Best: " + plural(state.streak.best, "day") + "</span></div>" +
      "</div>" +
      '<div class="mini-level">' +
        '<div class="mini-level-top"><span>Level ' + lvl.number + " · " + esc(lvl.title) + "</span><span>" + state.xp + " XP</span></div>" +
        '<div class="mini-bar"><i style="width:' + lvl.pct.toFixed(1) + '%"></i></div>' +
      "</div>" +
      '<button class="settings-link" data-action="open-settings">' + icon("settings") + "<span>Settings & data</span></button>";
  }

  /* ------------------------------------------------------------------ *
   *  Home
   * ------------------------------------------------------------------ */
  function greeting() {
    var h = new Date().getHours();
    if (h < 5) return "Still curious";
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }

  function nextLesson() {
    for (var i = 0; i < ALL_LESSONS.length; i++) {
      if (!state.lessons[ALL_LESSONS[i].id]) return ALL_LESSONS[i];
    }
    var done = completedLessonIds().sort(function (a, b) {
      return new Date(state.lessons[a].completedAt) - new Date(state.lessons[b].completedAt);
    });
    return C.lessonById(done[0]) || ALL_LESSONS[0];
  }

  function wordOfDay() {
    var origin = Math.floor(new Date(2024, 0, 1).getTime() / 86400000);
    var day = localDayIndex() - origin;
    var idx = ((day % ALL_WORDS.length) + ALL_WORDS.length) % ALL_WORDS.length;
    return ALL_WORDS[idx];
  }

  function heroPetChip() {
    var pet = activePet();
    var next = nextPet();
    var ready = petReady(next);

    if (pet) {
      return '<a class="hero-pet' + (ready ? " ready" : "") + '" href="#/pet">' +
        '<span class="hero-pet-art">' + pet.emoji + "</span>" +
        '<span class="hero-pet-text"><small>Your companion</small><strong>' + esc(pet.name) + "</strong></span>" +
        (ready ? '<span class="hero-pet-dot"></span>' : "") +
      "</a>";
    }
    if (!next) return "";
    return '<a class="hero-pet' + (ready ? " ready" : "") + '" href="#/pet">' +
      '<span class="hero-pet-art">🥚</span>' +
      '<span class="hero-pet-text"><small>' + (ready ? "Egg ready" : "Mystery egg") + "</small>" +
        "<strong>" + (ready ? "Hatch me!" : petEggPoints(next) + " / " + EGG_POINTS + " points") + "</strong></span>" +
      (ready ? '<span class="hero-pet-dot"></span>' : "") +
    "</a>";
  }

  function renderHome() {
    var lvl = levelFor(state.xp);
    var day = ensureDay();
    var next = nextLesson();
    var nextDone = !!state.lessons[next.id];
    var due = dueWords().length;
    var doneCount = completedCount();
    var acc = quizAccuracy();
    var minutes = totalMinutes();
    var goalPct = Math.min(100, (day.xp / state.goal) * 100);
    var streak = currentStreak();
    var wod = wordOfDay();
    var noteCount = reflectionCount();
    var stageAI = aiCompleteCount();
    var stageSolved = solvedCaseCount();
    var littleTodayDone = !!state.little.days[todayKey()];

    var stats = [
      { n: doneCount + "<small>/" + ALL_LESSONS.length + "</small>", label: "Curiosities finished" },
      { n: due, label: due === 1 ? "Word to review" : "Words to review" },
      { n: acc + "<small>%</small>", label: "Quiz accuracy" },
      { n: minutes, label: "Minutes learned" }
    ];

    $("#view").innerHTML =
      '<div class="page home">' +
        '<section class="hero reveal">' +
          '<div class="hero-main">' +
            '<span class="hero-kicker">' + (streak > 0 ? icon("flame") + " " + plural(streak, "day") + " streak" : "A little curiosity every day") + "</span>" +
            "<h1>" + greeting() + (state.name ? ", " + esc(state.name) : "") + ".</h1>" +
            '<p class="hero-sub">True stories, sensory play and interactive adventures — three minutes at a time.</p>' +
            '<div class="hero-actions">' +
              '<a class="btn btn-primary" href="#/lesson/' + next.id + '">' +
                (nextDone ? "Revisit" : "Continue") + ': <span class="btn-title">' + esc(next.title) + "</span>" +
                icon("arrow") +
              "</a>" +
              '<a class="btn btn-ghost-light" href="#/library">Browse library</a>' +
            "</div>" +
            heroPetChip() +
            '<div class="hero-meta">' +
              "<span>" + icon("clock") + next.minutes + " min</span>" +
              "<span>" + next.vocab.length + " words</span>" +
              "<span>" + next.quiz.length + " questions</span>" +
              '<span class="goal-inline">' + (goalPct >= 100 ? "Daily goal met ✓" : day.xp + " / " + state.goal + " XP today") + "</span>" +
            "</div>" +
          "</div>" +
          '<div class="goal-ring' + (goalPct >= 100 ? " done" : "") + '" role="img" aria-label="Daily goal: ' + day.xp + " of " + state.goal + ' XP">' +
            '<svg viewBox="0 0 128 128" aria-hidden="true">' +
              '<circle class="ring-track" cx="64" cy="64" r="54"></circle>' +
              '<circle class="ring-fill" cx="64" cy="64" r="54" style="stroke-dasharray:' + (2 * Math.PI * 54).toFixed(1) + ";" +
                "stroke-dashoffset:" + (2 * Math.PI * 54 * (1 - goalPct / 100)).toFixed(1) + '"></circle>' +
            "</svg>" +
            '<div class="ring-label">' +
              "<strong>" + day.xp + "</strong>" +
              "<span>" + (goalPct >= 100 ? "goal met ✓" : "of " + state.goal + " XP today") + "</span>" +
            "</div>" +
          "</div>" +
        "</section>" +

        (!state.name ?
          '<section class="name-prompt reveal">' +
            "<div><strong>What should we call you?</strong><span>Your name stays on this device.</span></div>" +
            '<form class="name-form" data-form="name">' +
              '<input id="name-input" maxlength="24" placeholder="Your name" autocomplete="off" aria-label="Your name">' +
              '<button class="btn btn-small btn-dark" type="submit">Save</button>' +
            "</form>" +
          "</section>" : "") +

        '<section class="stat-strip reveal">' +
          stats.map(function (s) {
            return '<div class="stat"><span class="stat-num">' + s.n + '</span><span class="stat-label">' + s.label + "</span></div>";
          }).join("") +
        "</section>" +

        '<section class="stage-band reveal">' +
          '<div class="section-head"><div><h2>Three stages, one habit</h2><p>Start where the learner is. Move up when it feels easy.</p></div></div>' +
          '<div class="stage-band-grid">' +
            '<a class="stage-tile tile-little" href="#/little">' +
              '<span class="stage-tile-emoji">🌞</span>' +
              '<span class="stage-tile-label">Stage 1 · Ages 3–6 · ' + diffLabel(diffFor("little")) + "</span>" +
              "<strong>Little Curio</strong>" +
              "<span class=\"stage-tile-desc\">Sensory play, first words, one sticker a day.</span>" +
              '<span class="stage-tile-meta">' + (littleTodayDone ? "Played today ✓" : "Ready to play") + " · ⭐ " + state.little.stars + "</span>" +
            "</a>" +
            '<a class="stage-tile tile-library" href="#/library">' +
              '<span class="stage-tile-emoji">📖</span>' +
              '<span class="stage-tile-label">Stage 2 · Reading · ' + diffLabel(diffFor("library")) + "</span>" +
              "<strong>Curiosity Library</strong>" +
              "<span class=\"stage-tile-desc\">Fourteen true stories with five words each.</span>" +
              '<span class="stage-tile-meta">' + doneCount + " of " + ALL_LESSONS.length + " curiosities finished</span>" +
            "</a>" +
            '<a class="stage-tile tile-worlds" href="#/adventures">' +
              '<span class="stage-tile-emoji">🚀</span>' +
              '<span class="stage-tile-label">Stage 3 · Adventures · ' + diffLabel(diffFor("future")) + "</span>" +
              "<strong>Future Worlds</strong>" +
              "<span class=\"stage-tile-desc\">Colony survival, AI debates, mystery cases.</span>" +
              '<span class="stage-tile-meta">' + ((state.chronicles.completed ? 1 : 0) + stageAI + stageSolved) + " of 6 adventures complete</span>" +
            "</a>" +
          "</div>" +
        "</section>" +

        '<div class="home-grid">' +
          "<div class=\"home-main\">" +
            homePetCard() +
            '<section class="section reveal">' +
              '<div class="section-head"><div><h2>Choose a curiosity</h2><p>Eight themes, ' + ALL_LESSONS.length + " short reads.</p></div>" +
                '<a class="link-arrow" href="#/library">All lessons ' + icon("arrow") + "</a></div>" +
              '<div class="cat-grid">' + C.categories.map(function (cat) {
                var lessons = ALL_LESSONS.filter(function (l) { return l.category === cat.id; });
                var done = lessons.filter(function (l) { return state.lessons[l.id]; }).length;
                return '<a class="cat-card" href="#/library/' + cat.id + '" style="--cat-pct:' + Math.round((done / lessons.length) * 100) + '%">' +
                  '<span class="cat-emoji" aria-hidden="true">' + cat.emoji + "</span>" +
                  '<span class="cat-name">' + esc(cat.name) + "</span>" +
                  '<span class="cat-meta">' + done + "/" + lessons.length + " finished</span>" +
                  '<span class="cat-track"><i></i></span>' +
                "</a>";
              }).join("") + "</div>" +
            "</section>" +

            '<section class="section reveal">' +
              '<div class="section-head"><div><h2>' + (doneCount ? "Recently learned" : "How Curio works") + "</h2></div></div>" +
              (doneCount ? recentlyLearned() : howItWorks()) +
            "</section>" +
          "</div>" +

          '<aside class="home-rail">' +
            '<section class="wod card reveal">' +
              '<div class="wod-top"><span class="eyebrow">' + icon("spark") + " Word of the day</span>" +
                '<button class="speak-btn" data-speak="' + esc(wod.word) + '" aria-label="Hear the word">' + icon("speaker") + "</button>" +
              "</div>" +
              '<div class="wod-word">' + esc(wod.word) + "</div>" +
              '<div class="wod-meta">' + esc(wod.pos) + " · " + esc(wod.ipa) + "</div>" +
              '<p class="wod-def">' + esc(wod.def) + "</p>" +
              '<p class="wod-ex">“' + esc(wod.example) + "”</p>" +
              '<div class="wod-foot">' +
                '<span class="wod-source">' + wod.emoji + " " + esc(wod.lessonTitle) + "</span>" +
                (state.words[wod.id]
                  ? '<span class="pill pill-done">' + icon("check") + " In your word bank</span>"
                  : '<button class="btn btn-small btn-dark" data-action="add-word" data-word="' + esc(wod.id) + '">Add to review</button>') +
              "</div>" +
            "</section>" +

            '<section class="card tip reveal">' +
              '<span class="eyebrow">' + icon("flame") + " Keep the streak</span>" +
              "<p>Ten minutes a day beats two hours on Sunday. Read, say the words out loud, then take the quiz.</p>" +
              '<div class="tip-row"><span>Reflections written</span><strong>' + noteCount + "</strong></div>" +
              '<div class="tip-row"><span>Words mastered</span><strong>' + masteredCount() + "</strong></div>" +
              '<div class="tip-row"><span>Level</span><strong>' + lvl.number + " · " + esc(lvl.title) + "</strong></div>" +
            "</section>" +
          "</aside>" +
        "</div>" +
      "</div>";

    var form = $('[data-form="name"]');
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = $("#name-input");
        var value = (input.value || "").trim().slice(0, 24);
        if (!value) { input.focus(); return; }
        state.name = value;
        saveState();
        render();
        toast("Nice to meet you, " + esc(value) + ".");
      });
    }
    updateDocumentTitle("Home");
  }

  function recentlyLearned() {
    var items = Object.keys(state.lessons).map(function (id) {
      return { lesson: C.lessonById(id), rec: state.lessons[id] };
    }).filter(function (x) { return x.lesson; }).sort(function (a, b) {
      return new Date(b.rec.completedAt) - new Date(a.rec.completedAt);
    }).slice(0, 3);

    return '<div class="recent-list">' + items.map(function (x) {
      var total = x.rec.total || x.lesson.quiz.length;
      var pct = x.rec.bestPct != null ? x.rec.bestPct : Math.round((x.rec.best / total) * 100);
      return '<a class="recent" href="#/lesson/' + x.lesson.id + '">' +
        '<span class="recent-emoji" aria-hidden="true">' + x.lesson.emoji + "</span>" +
        '<span class="recent-body"><strong>' + esc(x.lesson.title) + "</strong>" +
          "<small>" + esc(C.categoryById(x.lesson.category).name) + " · best " + pct + "% · " + fmtDate(dateKey(new Date(x.rec.completedAt))) + "</small></span>" +
        '<span class="recent-score">' + pct + "%</span>" +
      "</a>";
    }).join("") + "</div>";
  }

  function howItWorks() {
    return '<ol class="steps">' +
      '<li><span class="step-num">1</span><div><strong>Read something curious</strong><p>A 3–4 minute true story, written in clear B1–B2 English.</p></div></li>' +
      '<li><span class="step-num">2</span><div><strong>Collect five words</strong><p>Tap each card to reveal a simple definition and an example.</p></div></li>' +
      '<li><span class="step-num">3</span><div><strong>Quiz, review, repeat</strong><p>Four questions, then the words come back when they are about to fade.</p></div></li>' +
    "</ol>";
  }

  /* ------------------------------------------------------------------ *
   *  Library
   * ------------------------------------------------------------------ */
  var libFilter = "all";
  var libQuery = "";

  function renderLibrary(catArg) {
    if (catArg && C.categoryById(catArg).id === catArg) libFilter = catArg;
    var filtered = filteredLessons();

    $("#view").innerHTML =
      '<div class="page library">' +
        '<header class="page-head reveal">' +
          "<div>" +
            '<span class="eyebrow">' + icon("library") + " Library</span>" +
            "<h1>Pick a curiosity</h1>" +
            '<p class="sub">Short, true stories that make English stick. Every lesson gives you five useful words.</p>' +
          "</div>" +
          '<div class="progress-pill"><strong>' + completedCount() + "/" + ALL_LESSONS.length + "</strong><span>explored</span></div>" +
        "</header>" +

        difficultyControl("library", "Easy: 3 questions and words already open · Standard: 4 questions · Challenge: 5 questions with a word-recall task.") +

        '<div class="toolbar reveal">' +
          '<label class="search">' + icon("search") +
            '<input id="lib-search" type="search" placeholder="Search titles or words…" value="' + esc(libQuery) + '" aria-label="Search lessons">' +
          "</label>" +
          '<div class="chips" id="cat-chips">' +
            '<button class="chip' + (libFilter === "all" ? " active" : "") + '" data-action="filter" data-cat="all">All</button>' +
            C.categories.map(function (cat) {
              return '<button class="chip' + (libFilter === cat.id ? " active" : "") + '" data-action="filter" data-cat="' + cat.id + '">' +
                cat.emoji + " " + esc(cat.name) + "</button>";
            }).join("") +
          "</div>" +
        "</div>" +

        '<div class="list-meta" id="lib-count"></div>' +
        '<div class="lesson-grid" id="lesson-grid"></div>' +
      "</div>";

    var input = $("#lib-search");
    input.addEventListener("input", function () {
      libQuery = input.value;
      applyLibraryFilters();
    });

    applyLibraryFilters();
    updateDocumentTitle("Library");
  }

  function filteredLessons() {
    var q = libQuery.trim().toLowerCase();
    return ALL_LESSONS.filter(function (l) {
      if (libFilter !== "all" && l.category !== libFilter) return false;
      if (!q) return true;
      var hay = [l.title, l.hook, l.lessonTitle, C.categoryById(l.category).name].join(" ").toLowerCase();
      if (hay.indexOf(q) !== -1) return true;
      return l.vocab.some(function (v) { return v.w.toLowerCase().indexOf(q) !== -1; });
    });
  }

  function lessonCards(list) {
    return list.map(function (l) {
      var cat = C.categoryById(l.category);
      var rec = state.lessons[l.id];
      var bestPct = rec ? (rec.bestPct != null ? rec.bestPct : Math.round((rec.best / (rec.total || l.quiz.length)) * 100)) : 0;
      var status = rec
        ? '<span class="lesson-status done">' + icon("check") + " best " + bestPct + "%</span>"
        : '<span class="lesson-status new">New</span>';
      return '<a class="lesson-card" href="#/lesson/' + l.id + '">' +
        '<span class="lesson-thumb cat-' + l.category + '" aria-hidden="true">' + l.emoji + "</span>" +
        '<span class="lesson-body">' +
          '<span class="lesson-tags"><span class="tag">' + cat.emoji + " " + esc(cat.name) + "</span>" +
            '<span class="tag ghost">' + icon("clock") + l.minutes + " min</span></span>" +
          "<h3>" + esc(l.title) + "</h3>" +
          "<p>" + esc(l.hook) + "</p>" +
          '<span class="lesson-foot">' + status + '<span class="arrow">' + icon("arrow") + "</span></span>" +
        "</span>" +
      "</a>";
    }).join("");
  }

  function applyLibraryFilters() {
    var list = filteredLessons();
    var grid = $("#lesson-grid");
    var count = $("#lib-count");
    if (!grid) return;
    grid.innerHTML = list.length ? lessonCards(list) :
      '<div class="empty"><span aria-hidden="true">🔍</span><h3>No lessons match</h3><p>Try a different word, or clear the filters.</p>' +
        '<button class="btn btn-dark btn-small" data-action="clear-filters">Clear filters</button></div>';
    if (count) {
      count.textContent = list.length === ALL_LESSONS.length
        ? ALL_LESSONS.length + " curiosities"
        : list.length + " of " + ALL_LESSONS.length + " curiosities";
    }
    $$("#cat-chips .chip").forEach(function (chip) {
      chip.classList.toggle("active", chip.getAttribute("data-cat") === libFilter);
    });
  }

  /* ------------------------------------------------------------------ *
   *  Lesson
   * ------------------------------------------------------------------ */
  var run = null;

  function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function makeClozeQuestion(lesson) {
    for (var i = 0; i < lesson.vocab.length; i++) {
      var v = lesson.vocab[i];
      var re = new RegExp("\\b" + escapeRegExp(v.w) + "\\b", "i");
      if (!re.test(v.ex)) continue;
      var others = lesson.vocab.filter(function (x) { return x.w !== v.w; })
        .slice(0, 3).map(function (x) { return x.w; });
      return {
        q: "Which word completes this sentence? “" + v.ex.replace(re, "_____") + "”",
        options: [v.w].concat(others),
        answer: 0,
        explain: "This sentence comes from the reading: “" + v.ex + "”."
      };
    }
    return null;
  }

  function buildLessonQuestions(lesson, level) {
    var questions = lesson.quiz.map(function (q) {
      return {
        q: q.q,
        options: q.options.slice(),
        answer: q.answer,
        explain: q.explain || ("The correct answer is " + q.options[q.answer] + ".")
      };
    });
    if (level === "easy") return questions.slice(0, 3);
    if (level === "hard") {
      var cloze = makeClozeQuestion(lesson);
      if (cloze) questions.push(cloze);
    }
    return questions;
  }

  function newRun(lesson) {
    var level = diffFor("library");
    var questions = buildLessonQuestions(lesson, level);
    var revealed = {};
    if (level === "easy") {
      lesson.vocab.forEach(function (_, i) { revealed[i] = true; });
    }
    return {
      lesson: lesson,
      level: level,
      questions: questions,
      stage: 0,
      revealed: revealed,
      qIndex: 0,
      picked: null,
      answers: [],
      orders: questions.map(function (q) {
        return shuffle(q.options.map(function (_, i) { return i; }));
      }),
      score: 0,
      xp: 0,
      perfect: false,
      awarded: false
    };
  }

  function renderLesson(id) {
    var lesson = C.lessonById(id);
    if (!lesson) { location.hash = "#/library"; return; }
    if (!run || run.lesson.id !== id) run = newRun(lesson);

    var cat = C.categoryById(lesson.category);
    var stageNames = ["Read", "Words", "Quiz"];
    var stageIndex = Math.min(run.stage, 2);

    $("#view").innerHTML =
      '<div class="page lesson">' +
        '<a class="back-link" href="#/library">' + icon("back") + " Library</a>" +
        '<header class="lesson-head reveal">' +
          '<div class="lesson-emoji cat-' + lesson.category + '" aria-hidden="true">' + lesson.emoji + "</div>" +
          "<div>" +
            '<span class="eyebrow">' + cat.emoji + " " + esc(cat.name) + " · " + lesson.minutes + ' min · <span class="level-chip">' + diffLabel(run.level) + "</span></span>" +
            "<h1>" + esc(lesson.title) + "</h1>" +
            '<p class="sub">' + esc(lesson.hook) + "</p>" +
          "</div>" +
        "</header>" +

        '<div class="stagebar" role="list">' +
          stageNames.map(function (name, i) {
            var cls = "stage-chip";
            if (i < stageIndex || run.stage === 3) cls += " complete";
            if (i === stageIndex && run.stage < 3) cls += " current";
            return '<div class="' + cls + '" role="listitem"><span>' + (i < stageIndex || run.stage === 3 ? "✓" : i + 1) + "</span>" + name + "</div>";
          }).join("") +
        "</div>" +

        '<div id="lesson-stage"></div>' +
      "</div>";

    var holder = $("#lesson-stage");
    if (run.stage === 0) holder.innerHTML = readStage(lesson);
    else if (run.stage === 1) holder.innerHTML = wordsStage(lesson);
    else if (run.stage === 2) holder.innerHTML = quizStage(lesson);
    else holder.innerHTML = resultStage(lesson);

    if (run.stage === 0) bindNote(lesson);
    updateDocumentTitle(lesson.title);
  }

  function readStage(lesson) {
    var note = state.notes[lesson.id];
    var noteText = note ? note.text : "";
    var words = noteText.trim() ? noteText.trim().split(/\s+/).length : 0;
    return '<article class="reader reveal">' +
      '<div class="reader-body">' + lesson.paragraphs.map(function (p) {
        return "<p>" + esc(p) + "</p>";
      }).join("") + "</div>" +

      '<aside class="fact"><span class="fact-label">' + icon("spark") + " Did you know?</span><p>" + esc(lesson.didYouKnow) + "</p></aside>" +

      '<div class="prompt-box">' +
        '<div class="prompt-head"><span>' + icon("spark") + " Your turn</span><span class='muted'>Saved on this device</span></div>" +
        '<p class="prompt-q">' + esc(lesson.prompt) + "</p>" +
        '<textarea id="note" data-note="' + lesson.id + '" rows="3" placeholder="Write two or three sentences in English…">' + esc(noteText) + "</textarea>" +
        '<div class="note-meta"><span id="note-count">' + (words ? plural(words, "word") : "No words yet") + '</span><span id="note-status">' + (note ? "Saved" : "") + "</span></div>" +
      "</div>" +

      '<div class="stage-actions">' +
        '<button class="btn btn-primary" data-action="to-words">Meet the 5 words ' + icon("arrow") + "</button>" +
      "</div>" +
    "</article>";
  }

  function wordsStage(lesson) {
    var revealedCount = Object.keys(run.revealed).length;
    return '<section class="words-stage reveal">' +
      '<div class="stage-intro"><h2>Five words worth keeping</h2><p>' +
        (run.level === "easy"
          ? "The meanings are open on Easy. Say each word out loud — pronunciation is part of knowing it."
          : "Tap a card to reveal the meaning. Say each word out loud — pronunciation is part of knowing it.") +
      "</p></div>" +
      '<div class="word-grid">' + lesson.vocab.map(function (v, i) {
        var id = lesson.id + "::" + v.w;
        var inBank = !!state.words[id];
        return '<div class="word-card' + (run.revealed[i] ? " revealed" : "") + '" data-action="reveal" data-i="' + i + '" role="button" tabindex="0" aria-expanded="' + (run.revealed[i] ? "true" : "false") + '">' +
          '<div class="word-top"><span class="word-pos">' + esc(v.pos) + "</span>" +
            '<button class="speak-btn" data-speak="' + esc(v.w) + '" aria-label="Hear ' + esc(v.w) + '">' + icon("speaker") + "</button>" +
          "</div>" +
          '<div class="word-main">' + esc(v.w) + "</div>" +
          '<div class="word-ipa">' + esc(v.ipa) + "</div>" +
          '<div class="word-reveal"><p class="word-def">' + esc(v.def) + "</p>" +
            '<p class="word-ex">“' + esc(v.ex) + "”</p>" +
            (inBank ? '<span class="word-note">' + icon("check") + " Already in your review queue</span>" : "") +
          "</div>" +
          '<div class="word-hint">' + (run.revealed[i] ? "tap to hide" : "tap to reveal") + "</div>" +
        "</div>";
      }).join("") + "</div>" +
      '<div class="stage-actions">' +
        '<button class="btn btn-ghost" data-action="to-read">' + icon("back") + " Read again</button>" +
        '<span class="stage-note">' + revealedCount + " of " + lesson.vocab.length + " revealed</span>" +
        '<button class="btn btn-primary" data-action="start-quiz">Start the quiz ' + icon("arrow") + "</button>" +
      "</div>" +
    "</section>";
  }

  function quizStage(lesson) {
    var total = run.questions.length;
    var q = run.questions[run.qIndex];
    var answered = run.picked !== null;
    var order = run.orders[run.qIndex];
    var correctAt = order.indexOf(q.answer);
    var right = answered && run.picked === correctAt;
    var letters = ["A", "B", "C", "D"];
    var nextLabel = run.qIndex === total - 1 ? "See results" : "Next question";

    return '<section class="quiz reveal">' +
      '<div class="quiz-top"><span class="eyebrow">Question ' + (run.qIndex + 1) + " of " + total + "</span>" +
        '<span class="quiz-score">' + run.answers.reduce(function (n, a, i) {
          if (a === undefined) return n;
          return n + (a === run.orders[i].indexOf(run.questions[i].answer) ? 1 : 0);
        }, 0) + " correct</span></div>" +
      '<div class="quiz-bar"><i style="width:' + ((run.qIndex + (answered ? 1 : 0)) / total) * 100 + '%"></i></div>' +

      '<h2 class="quiz-q">' + esc(q.q) + "</h2>" +
      '<div class="options">' + order.map(function (orig, i) {
        var cls = "option";
        if (answered) {
          if (i === correctAt) cls += " correct";
          else if (i === run.picked) cls += " wrong";
          else cls += " dim";
        }
        return '<button class="' + cls + '" data-action="answer" data-i="' + i + '"' + (answered ? " disabled" : "") + ">" +
          '<span class="opt-letter">' + letters[i] + "</span><span>" + esc(q.options[orig]) + "</span>" +
          (answered && i === correctAt ? '<span class="opt-mark">' + icon("check") + "</span>" : "") +
        "</button>";
      }).join("") + "</div>" +

      (answered ?
        '<div class="feedback ' + (right ? "ok" : "no") + '">' +
          "<strong>" + (right ? "Exactly right." : "Not quite — here is why.") + "</strong>" +
          "<p>" + esc(q.explain || ("The correct answer is " + q.options[q.answer] + ".")) + "</p>" +
        "</div>" +
        '<div class="stage-actions"><button class="btn btn-primary" data-action="next-q">' + nextLabel + " " + icon("arrow") + "</button></div>"
        : '<p class="quiz-hint">Choose the best answer. You will see the explanation straight away.</p>') +
    "</section>";
  }

  function resultStage(lesson) {
    var questions = run.questions;
    var total = questions.length;
    var pct = Math.round((run.score / total) * 100);
    var message;
    if (pct === 100) message = "Flawless. This one is yours.";
    else if (pct >= 75) message = "Nicely done — a few words still need a second look.";
    else if (pct >= 50) message = "Good start. The tricky words are waiting in review.";
    else message = "Tough one. Read it once more and the quiz will feel different.";

    var hasQueue = Object.keys(state.words).length > 0;
    var next = nextAfter(lesson);

    return '<section class="result reveal">' +
      (pct === 100 ? '<div class="confetti" aria-hidden="true">' + confetti() + "</div>" : "") +
      '<div class="result-top">' +
        '<div class="score-ring" style="--p:' + pct + '"><div class="score-inner"><strong>' + run.score + "/" + total + "</strong><span>correct</span></div></div>" +
        "<div>" +
          '<span class="eyebrow">' + lesson.emoji + " " + esc(C.categoryById(lesson.category).name) + " · " + diffLabel(run.level) + " · complete</span>" +
          "<h2>" + message + "</h2>" +
          '<p class="sub">' + (run.perfect ? "Perfect score bonus included." : "Every attempt sharpens the memory.") + "</p>" +
        "</div>" +
      "</div>" +

      '<div class="result-stats">' +
        '<div><strong>+' + run.xp + "</strong><span>XP earned</span></div>" +
        '<div><strong>' + lesson.vocab.length + "</strong><span>words added</span></div>" +
        '<div><strong>' + totalMinutes() + "</strong><span>minutes learned</span></div>" +
        '<div><strong>' + currentStreak() + "</strong><span>day streak</span></div>" +
      "</div>" +

      '<ul class="result-list">' + questions.map(function (q, i) {
        var ok = run.answers[i] === run.orders[i].indexOf(q.answer);
        return "<li class=\"" + (ok ? "ok" : "no") + '"><span class="result-mark">' + (ok ? "✓" : "✗") + "</span>" +
          "<div><strong>" + esc(q.q) + "</strong>" +
          (ok ? "" : "<p>Correct answer: " + esc(q.options[q.answer]) + "</p>") + "</div></li>";
      }).join("") + "</ul>" +

      '<div class="stage-actions">' +
        '<a class="btn btn-ghost" href="#/library">Back to library</a>' +
        (hasQueue ? '<button class="btn btn-ghost" data-action="review-now" data-lesson="' + lesson.id + '">Review these words</button>' : "") +
        '<a class="btn btn-primary" href="#/lesson/' + next.id + '">Next: ' + esc(shortTitle(next.title)) + " " + icon("arrow") + "</a>" +
      "</div>" +
    "</section>";
  }

  function confetti() {
    var colors = ["#e3562f", "#e9a83b", "#2c7a70", "#4a7fb5", "#d94f8a"];
    var bits = "";
    for (var i = 0; i < 26; i++) {
      var left = Math.random() * 100;
      var delay = Math.random() * 0.5;
      var dur = 1.6 + Math.random() * 1.2;
      var color = colors[i % colors.length];
      var rot = Math.random() * 360;
      bits += '<i style="left:' + left.toFixed(1) + "%;background:" + color + ";" +
        "animation-delay:" + delay.toFixed(2) + "s;animation-duration:" + dur.toFixed(2) + "s;" +
        "transform:rotate(" + rot.toFixed(0) + "deg)" + '"></i>';
    }
    return bits;
  }

  function shortTitle(title) {
    return title.length > 34 ? title.slice(0, 32).trim() + "…" : title;
  }

  function nextAfter(lesson) {
    var idx = ALL_LESSONS.indexOf(lesson);
    for (var k = 1; k <= ALL_LESSONS.length; k++) {
      var cand = ALL_LESSONS[(idx + k) % ALL_LESSONS.length];
      if (!state.lessons[cand.id] || cand.id === lesson.id) return cand;
    }
    return ALL_LESSONS[0];
  }

  function bindNote(lesson) {
    var area = $("#note");
    if (!area) return;
    var timer = null;
    area.addEventListener("input", function () {
      var text = area.value;
      var words = text.trim() ? text.trim().split(/\s+/).length : 0;
      $("#note-count").textContent = words ? plural(words, "word") : "No words yet";
      $("#note-status").textContent = "Saving…";
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (text.trim()) {
          state.notes[lesson.id] = { text: text, updatedAt: new Date().toISOString() };
        } else {
          delete state.notes[lesson.id];
        }
        saveState();
        var badges = checkBadges();
        saveState();
        announceBadges(badges);
        var status = $("#note-status");
        if (status) status.textContent = "Saved";
      }, 600);
    });
  }

  /* ------------------------------------------------------------------ *
   *  Lesson completion — the core progress write
   * ------------------------------------------------------------------ */
  function completeLesson(run) {
    var lesson = run.lesson;
    var questions = run.questions;
    var answers = run.answers;
    var orders = run.orders;
    var total = questions.length;
    var score = 0;
    for (var i = 0; i < total; i++) {
      var correctAt = orders && orders[i] ? orders[i].indexOf(questions[i].answer) : questions[i].answer;
      if (answers[i] === correctAt) score++;
    }

    var perfect = score === total;
    var xp = 20 + score * 5 + (perfect ? 10 : 0);
    var ratio = score / total;
    var now = Date.now();

    var rec = state.lessons[lesson.id] || { attempts: 0, best: 0, bestPct: 0, last: 0, total: total, completedAt: null, minutes: 0 };
    var prevBest = rec.best || 0;
    var prevTotal = rec.total || total;
    var prevPct = rec.bestPct != null ? rec.bestPct : Math.round((prevBest / Math.max(1, prevTotal)) * 100);
    rec.attempts += 1;
    rec.best = Math.max(prevBest, score);
    rec.bestPct = Math.max(prevPct, Math.round((score / total) * 100));
    rec.last = score;
    rec.total = total;
    rec.difficulty = run.level;
    rec.completedAt = new Date().toISOString();
    rec.minutes = lesson.minutes;
    state.lessons[lesson.id] = rec;

    var schedule = [0, 1, 2, 4, 7, 14];
    lesson.vocab.forEach(function (v) {
      var id = lesson.id + "::" + v.w;
      var w = state.words[id];
      if (!w) {
        w = {
          id: id,
          lessonId: lesson.id,
          word: v.w,
          strength: 1,
          due: 0,
          seen: 0,
          correct: 0,
          wrong: 0,
          added: now,
          lastSeen: 0
        };
        state.words[id] = w;
      }
      w.seen += 1;
      w.lastSeen = now;
      if (ratio >= 0.75) {
        w.strength = Math.min(5, w.strength + 1);
        w.correct += 1;
      } else {
        w.strength = Math.max(0, w.strength - 1);
        w.wrong += 1;
      }
      if (w.strength < 3) w.due = now;
      else w.due = now + schedule[w.strength] * 86400000;
    });

    state.stats.correct += score;
    state.stats.total += total;
    if (perfect) {
      state.flags = state.flags || {};
      state.flags.perfect = true;
    }

    var day = ensureDay();
    day.lessons += 1;
    day.minutes += lesson.minutes;
    day.correct += score;
    day.total += total;

    recordActivity();
    var levelEvent = addXP(xp);
    var badges = checkBadges();
    saveState();

    run.score = score;
    run.xp = xp;
    run.perfect = perfect;
    run.awarded = true;

    if (levelEvent && levelEvent.leveled) {
      setTimeout(function () {
        toast("🎉 Level up — you are now <strong>" + esc(levelEvent.level.title) + "</strong>!", "badge");
      }, 260);
    }
    announceBadges(badges);
  }

  /* ------------------------------------------------------------------ *
   *  Review
   * ------------------------------------------------------------------ */
  var reviewRun = null;
  var pendingReview = null;

  function wordById(id) {
    for (var i = 0; i < ALL_WORDS.length; i++) if (ALL_WORDS[i].id === id) return ALL_WORDS[i];
    return null;
  }

  function startReview(ids, practice) {
    reviewRun = {
      queue: ids.slice(),
      i: 0,
      revealed: false,
      grades: { again: 0, good: 0, easy: 0 },
      xp: 0,
      practice: !!practice,
      startTotal: ids.length,
      done: false
    };
  }

  function renderReview() {
    if (pendingReview) {
      var pending = pendingReview;
      pendingReview = null;
      startReview(pending.ids, pending.practice);
    }
    if (!reviewRun) {
      var due = dueWords();
      if (due.length) startReview(due.map(function (w) { return w.id; }), false);
    }

    var holder = $("#view");

    if (reviewRun && reviewRun.done) {
      holder.innerHTML = reviewSummary();
      updateDocumentTitle("Review");
      return;
    }

    if (!reviewRun || !reviewRun.queue.length) {
      var nextDue = learnedWords().filter(function (w) { return w.strength < 5; })
        .sort(function (a, b) { return a.due - b.due; })[0];
      holder.innerHTML =
        '<div class="page review">' +
          '<header class="page-head reveal"><div><span class="eyebrow">' + icon("review") + " Review</span>" +
            "<h1>Nothing due right now</h1>" +
            '<p class="sub">Words come back when they are about to fade — spaced repetition, without the homework feeling.</p></div></header>' +
          '<div class="empty big">' +
            '<span aria-hidden="true">🌱</span>' +
            "<h3>" + (learnedWords().length ? "Your word bank is resting" : "Your word bank is empty") + "</h3>" +
            "<p>" + (learnedWords().length
              ? (nextDue ? "Next word due " + fmtDate(dateKey(new Date(nextDue.due))) + "." : "Everything is mastered. Impressive.")
              : "Finish a lesson to collect your first five words.") + "</p>" +
            (learnedWords().length
              ? '<button class="btn btn-dark" data-action="practice">Practice anyway</button>'
              : '<a class="btn btn-dark" href="#/library">Choose a lesson</a>') +
          "</div>" +
          wordBankPreview() +
        "</div>";
      updateDocumentTitle("Review");
      return;
    }

    var item = wordById(reviewRun.queue[reviewRun.i]);
    if (!item) { reviewRun.i += 1; render(); return; }
    var store = state.words[item.id] || { strength: 0, seen: 0, correct: 0, wrong: 0 };
    var progress = (reviewRun.i / reviewRun.queue.length) * 100;

    holder.innerHTML =
      '<div class="page review">' +
        '<header class="review-head reveal">' +
          "<div><span class=\"eyebrow\">" + icon("review") + " " + (reviewRun.practice ? "Practice" : "Review") + "</span>" +
            "<h1>" + (reviewRun.practice ? "A little extra practice" : "Words to review") + "</h1></div>" +
          '<div class="review-count">' + (reviewRun.i + 1) + " / " + reviewRun.queue.length + "</div>" +
        "</header>" +
        '<div class="review-bar"><i style="width:' + progress + '%"></i></div>' +

        '<div class="flashcard' + (reviewRun.revealed ? " flipped" : "") + '">' +
          '<div class="flash-top">' +
            '<span class="tag">' + item.emoji + " " + esc(item.lessonTitle) + "</span>" +
            '<button class="speak-btn" data-speak="' + esc(item.word + ". " + item.example) + '" aria-label="Hear the word">' + icon("speaker") + "</button>" +
          "</div>" +
          '<div class="flash-word">' + esc(item.word) + "</div>" +
          '<div class="flash-meta">' + esc(item.pos) + " · " + esc(item.ipa) + "</div>" +

          (reviewRun.revealed
            ? '<div class="flash-back">' +
                '<p class="flash-def">' + esc(item.def) + "</p>" +
                '<p class="flash-ex">“' + esc(item.example) + "”</p>" +
              "</div>"
            : '<button class="btn btn-dark show-answer" data-action="show-answer">Show the meaning</button>') +
        "</div>" +

        (reviewRun.revealed
          ? '<div class="grade-row">' +
              '<button class="grade grade-again" data-action="grade" data-g="again"><strong>Again</strong><span>see it today</span></button>' +
              '<button class="grade grade-good" data-action="grade" data-g="good"><strong>Good</strong><span>' + nextInterval(store.strength + 1) + "</span></button>" +
              '<button class="grade grade-easy" data-action="grade" data-g="easy"><strong>Easy</strong><span>' + nextInterval(store.strength + 2) + "</span></button>" +
            "</div>" +
            '<p class="grade-hint">Be honest: “Good” means you remembered it without help.</p>'
          : '<p class="flash-tip">Say the meaning out loud before you turn the card over.</p>') +
      "</div>";

    updateDocumentTitle("Review");
  }

  function nextInterval(strength) {
    var schedule = [0, 1, 2, 4, 7, 14, 30];
    var s = Math.max(1, Math.min(strength, 6));
    return schedule[s] === 1 ? "in 1 day" : "in " + schedule[s] + " days";
  }

  function gradeWord(grade) {
    if (!reviewRun) return;
    var item = wordById(reviewRun.queue[reviewRun.i]);
    var w = state.words[item.id];
    if (!w) { reviewRun.i += 1; render(); return; }

    var schedule = [0, 1, 2, 4, 7, 14, 30];
    var xp = 2;
    w.lastSeen = Date.now();
    reviewRun.grades[grade] += 1;

    if (grade === "again") {
      w.strength = Math.max(0, w.strength - 1);
      w.wrong += 1;
      w.due = Date.now();
      xp = 1;
    } else if (grade === "good") {
      w.strength = Math.min(5, w.strength + 1);
      w.correct += 1;
      w.due = Date.now() + schedule[Math.min(6, w.strength)] * 86400000;
      xp = 2;
    } else {
      w.strength = Math.min(5, w.strength + 2);
      w.correct += 1;
      w.due = Date.now() + schedule[Math.min(6, w.strength)] * 86400000;
      xp = 3;
    }

    state.stats.reviews += 1;
    ensureDay().reviews += 1;

    var levelEvent = addXP(xp);
    reviewRun.xp += xp;
    recordActivity();

    var badges = checkBadges();
    saveState();
    announceBadges(badges);
    if (levelEvent && levelEvent.leveled) {
      setTimeout(function () {
        toast("🎉 Level up — <strong>" + esc(levelEvent.level.title) + "</strong>", "badge");
      }, 240);
    }

    reviewRun.i += 1;
    reviewRun.revealed = false;
    if (reviewRun.i >= reviewRun.queue.length) reviewRun.done = true;
    render();
  }

  function reviewSummary() {
    var total = reviewRun.queue.length;
    return '<div class="page review">' +
      '<div class="result reveal">' +
        '<div class="result-top">' +
          '<div class="score-ring" style="--p:100"><div class="score-inner"><strong>' + total + "</strong><span>words</span></div></div>" +
          "<div><span class=\"eyebrow\">" + icon("review") + " Review complete</span>" +
            "<h2>Every repetition counts.</h2>" +
            '<p class="sub">You earned ' + reviewRun.xp + " XP and moved " + plural(total, "word") + " along their schedule.</p></div>" +
        "</div>" +
        '<div class="result-stats">' +
          "<div><strong>" + reviewRun.grades.again + "</strong><span>need another look</span></div>" +
          "<div><strong>" + reviewRun.grades.good + "</strong><span>remembered</span></div>" +
          "<div><strong>" + reviewRun.grades.easy + "</strong><span>felt easy</span></div>" +
          "<div><strong>+" + reviewRun.xp + "</strong><span>XP earned</span></div>" +
        "</div>" +
        '<div class="stage-actions">' +
          '<a class="btn btn-ghost" href="#/home">Back home</a>' +
          '<button class="btn btn-ghost" data-action="practice">Practice more</button>' +
          '<a class="btn btn-primary" href="#/library">Learn something new ' + icon("arrow") + "</a>" +
        "</div>" +
      "</div>" +
      wordBankPreview() +
    "</div>";
  }

  function wordBankPreview() {
    var words = learnedWords().sort(function (a, b) { return a.strength - b.strength; }).slice(0, 12);
    if (!words.length) return "";
    return '<section class="section reveal">' +
      '<div class="section-head"><div><h2>Your word bank</h2><p>' + learnedWords().length + " words collected · " + masteredCount() + " mastered</p></div></div>" +
      '<div class="bank">' + words.map(function (w) {
        var dots = "";
        for (var i = 0; i < 5; i++) dots += '<i class="dot' + (i < w.strength ? " on" : "") + '"></i>';
        return '<button class="bank-item" data-action="speak-word" data-word="' + esc(w.id) + '" title="Hear the word">' +
          "<strong>" + esc(w.word) + "</strong><span>" + dots + "</span></button>";
      }).join("") + "</div>" +
    "</section>";
  }

  /* ------------------------------------------------------------------ *
   *  Stats
   * ------------------------------------------------------------------ */
  function renderStats() {
    var lvl = levelFor(state.xp);
    var streak = currentStreak();
    var acc = quizAccuracy();
    var done = completedCount();
    var minutes = totalMinutes();
    var heat = heatmapData();
    var bars = activityBars(14);

    $("#view").innerHTML =
      '<div class="page stats">' +
        '<header class="page-head reveal">' +
          "<div><span class=\"eyebrow\">" + icon("stats") + " Progress</span><h1>Your learning record</h1>" +
            '<p class="sub">Everything is stored on this device. Nothing is uploaded anywhere.</p></div>' +
          '<div class="head-buttons">' +
            '<a class="btn btn-small btn-ghost" href="#/pet">' + (activePet() ? activePet().emoji + " " + esc(activePet().name) : "🥚 Companion") + "</a>" +
            '<button class="btn btn-small btn-ghost" data-action="open-settings">' + icon("settings") + " Data & settings</button>" +
          "</div>" +
        "</header>" +

        '<div class="level-card reveal">' +
          '<div class="level-badge"><span>Level</span><strong>' + lvl.number + "</strong></div>" +
          "<div class=\"level-main\">" +
            '<div class="level-top"><h2>' + esc(lvl.title) + "</h2><span>" + state.xp + " XP</span></div>" +
            '<div class="level-bar"><i style="width:' + lvl.pct.toFixed(1) + '%"></i></div>' +
            '<p class="muted">' + (lvl.next ? lvl.toNext + " XP to <strong>" + esc(lvl.next.title) + "</strong>" : "Highest level reached — keep collecting words.") + "</p>" +
          "</div>" +
        "</div>" +

        '<section class="stats-grid reveal">' +
          statCard("🔥", plural(streak, "day"), "Current streak", state.streak.best ? "Best: " + plural(state.streak.best, "day") : "Start today") +
          statCard("📖", done + "/" + ALL_LESSONS.length, "Curiosities finished", done ? Math.round((done / ALL_LESSONS.length) * 100) + "% of the library" : "Pick your first") +
          statCard("🗣️", learnedWords().length, "Words collected", masteredCount() + " mastered") +
          statCard("⏱️", minutes, "Minutes learned", state.stats.reviews + " reviews done") +
        "</section>" +

        '<div class="stats-two">' +
          '<section class="card chart-card reveal">' +
            '<div class="section-head"><div><h2>Last 14 days</h2><p>XP earned per day</p></div></div>' +
            '<div class="bars">' + bars.map(function (b) {
              return '<div class="bar-col" title="' + esc(b.label) + ": " + b.xp + ' XP">' +
                '<div class="bar-track"><i style="height:' + b.pct + '%"></i></div>' +
                '<span class="bar-label">' + b.letter + "</span></div>";
            }).join("") + "</div>" +
          "</section>" +

          '<section class="card chart-card reveal">' +
            '<div class="section-head"><div><h2>Quiz accuracy</h2><p>' + state.stats.correct + " correct out of " + state.stats.total + " answered</p></div></div>" +
            '<div class="donut-wrap">' +
              '<div class="donut" style="--p:' + acc + '"><span><strong>' + acc + "%</strong><small>correct</small></span></div>" +
              '<div class="donut-side">' +
                '<div><span>Reviews completed</span><strong>' + state.stats.reviews + "</strong></div>" +
                '<div><span>Reflections written</span><strong>' + reflectionCount() + "</strong></div>" +
                '<div><span>Until next level</span><strong>' + (lvl.next ? lvl.toNext + " XP" : "—") + "</strong></div>" +
              "</div>" +
            "</div>" +
          "</section>" +
        "</div>" +

        '<section class="card heat-card reveal">' +
          '<div class="section-head"><div><h2>Consistency</h2><p>Six months of learning — darker means more XP</p></div></div>' +
          '<div class="heat-wrap">' +
            '<div class="heatmap" role="img" aria-label="Activity heatmap for the last six months">' +
              heat.map(function (d) {
                return '<span class="heat-cell lvl-' + d.level + '" title="' + esc(d.label) + '"></span>';
              }).join("") +
            "</div>" +
            '<div class="heat-side">' +
              '<div><span>Current streak</span><strong>' + (streak ? plural(streak, "day") : "—") + "</strong></div>" +
              '<div><span>Best streak</span><strong>' + (state.streak.best ? plural(state.streak.best, "day") : "—") + "</strong></div>" +
              "<div><span>Active days</span><strong>" + heat.filter(function (d) { return d.xp > 0; }).length + "</strong></div>" +
            "</div>" +
          "</div>" +
          '<div class="heat-foot"><span>Each square is one day</span>' +
            '<span class="heat-legend">Less <i class="heat-cell lvl-0"></i><i class="heat-cell lvl-1"></i><i class="heat-cell lvl-2"></i><i class="heat-cell lvl-3"></i><i class="heat-cell lvl-4"></i> More</span></div>' +
        "</section>" +

        '<section class="section reveal">' +
          '<div class="section-head"><div><h2>Badges</h2><p>' + state.badges.length + " of " + BADGES.length + " unlocked</p></div></div>" +
          '<div class="badge-grid">' + BADGES.map(function (b) {
            var got = state.badges.indexOf(b.id) !== -1;
            return '<div class="badge' + (got ? " got" : "") + '">' +
              '<div class="badge-icon">' + (got ? b.icon : icon("lock")) + "</div>" +
              "<strong>" + esc(b.name) + "</strong>" +
              "<span>" + esc(b.desc) + "</span>" +
              (got ? '<span class="badge-tag">Unlocked</span>' : '<span class="badge-tag locked">Locked</span>') +
            "</div>";
          }).join("") + "</div>" +
        "</section>" +
      "</div>";

    updateDocumentTitle("Progress");
  }

  function statCard(emoji, value, label, sub) {
    return '<div class="stat-card"><span class="stat-emoji" aria-hidden="true">' + emoji + "</span>" +
      '<div><strong class="stat-value">' + value + "</strong><span class=\"stat-label\">" + label + "</span>" +
      '<span class="stat-sub">' + sub + "</span></div></div>";
  }

  function activityBars(days) {
    var list = [];
    var max = 10;
    for (var i = days - 1; i >= 0; i--) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      var key = dateKey(d);
      var xp = (state.history[key] && state.history[key].xp) || 0;
      if (xp > max) max = xp;
      list.push({
        key: key,
        xp: xp,
        label: fmtDate(key),
        letter: ["S", "M", "T", "W", "T", "F", "S"][d.getDay()]
      });
    }
    return list.map(function (b) {
      return {
        key: b.key,
        xp: b.xp,
        label: b.label,
        letter: b.letter,
        pct: b.xp === 0 ? 3 : Math.max(8, Math.round((b.xp / max) * 100))
      };
    });
  }

  function heatmapData() {
    var today = new Date();
    today.setHours(12, 0, 0, 0);
    var dow = (today.getDay() + 6) % 7; // Monday = 0
    var monday = new Date(today);
    monday.setDate(today.getDate() - dow);
    var start = new Date(monday);
    start.setDate(monday.getDate() - 25 * 7);

    var out = [];
    for (var i = 0; i < 26 * 7; i++) {
      var d = new Date(start);
      d.setDate(start.getDate() + i);
      var key = dateKey(d);
      var day = state.history[key];
      var xp = day ? day.xp : 0;
      var level = 0;
      if (d <= today) {
        if (xp >= 100) level = 4;
        else if (xp >= 50) level = 3;
        else if (xp >= 20) level = 2;
        else if (xp > 0) level = 1;
      }
      out.push({
        key: key,
        xp: xp,
        level: d > today ? 0 : level,
        label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }) + " · " + (xp ? xp + " XP" : "no activity")
      });
    }
    return out;
  }

  /* ================================================================== *
   *  STAGE 1 — Little Curio
   * ================================================================== */
  var littleRun = null;

  function littleStreak() {
    var d = new Date();
    if (!state.little.days[dateKey(d)]) d.setDate(d.getDate() - 1);
    var n = 0;
    while (state.little.days[dateKey(d)]) {
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  }

  function renderLittle(activityId) {
    if (!LITTLE.length) {
      $("#view").innerHTML = '<div class="page"><header class="page-head"><div><h1>Little Curio is loading</h1>' +
        '<p class="sub">The sensory games could not be found. Make sure content2.js is next to index.html, then reload.</p></div></header></div>';
      return;
    }
    var activity = activityId ? littleById(activityId) : null;

    if (activity) {
      if (!littleRun || littleRun.activity.id !== activity.id) littleRun = newLittleRun(activity);
      $("#view").innerHTML = littleRun.done ? littleDoneHTML(littleRun) : littlePlayHTML(littleRun);
      updateDocumentTitle(activity.name);
      return;
    }

    littleRun = null;
    var today = littleToday();
    var dayDone = state.little.days[todayKey()];
    var playStreak = littleStreak();
    var stickersEarned = state.little.stickers;

    $("#view").innerHTML =
      '<div class="page little">' +
        '<header class="little-head reveal">' +
          '<span class="eyebrow">' + icon("sun") + " Little Curio · Ages 3–6</span>" +
          "<h1>Play, listen, say it.</h1>" +
          '<p class="sub">A three-minute sensory game for every day. Big pictures, simple words, and a sticker to keep.</p>' +
        "</header>" +

        difficultyControl("little", "Easy: 2 pictures · Standard: 3 pictures · Challenge: 3 pictures with labels hidden.") +

        '<section class="little-today reveal">' +
          '<div class="little-today-art">' + today.emoji + "</div>" +
          '<div class="little-today-body">' +
            '<span class="eyebrow">Today’s play · ' + esc(today.sense) + "</span>" +
            "<h2>" + esc(today.name) + "</h2>" +
            "<p>" + esc(today.blurb) + "</p>" +
            '<span class="little-today-meta">3 quick rounds · ' + (dayDone ? "played today" : "not played yet") + "</span>" +
          "</div>" +
          '<a class="btn btn-little" href="#/little/' + today.id + '">' + (dayDone ? "Play again" : "Start playing") + " " + icon("arrow") + "</a>" +
        "</section>" +

        '<div class="little-stats reveal">' +
          '<div><strong>⭐ ' + state.little.stars + "</strong><span>stars earned</span></div>" +
          '<div><strong>' + stickersEarned.length + "<small>/" + EXTRA.stickers.length + "</small></strong><span>stickers collected</span></div>" +
          '<div><strong>' + littleDays() + "</strong><span>days of play</span></div>" +
          '<div><strong>' + playStreak + "</strong><span>day streak</span></div>" +
        "</div>" +

        '<section class="section reveal">' +
          '<div class="section-head"><div><h2>All the little games</h2><p>Six senses and skills. Play any time, as often as you like.</p></div></div>' +
          '<div class="little-grid">' + LITTLE.map(function (a) {
            var rec = state.little.activities[a.id];
            var stars = rec ? rec.best : 0;
            var dots = "";
            for (var i = 0; i < 3; i++) dots += '<i class="' + (i < stars ? "on" : "") + '"></i>';
            return '<a class="little-card" href="#/little/' + a.id + '">' +
              '<span class="little-card-emoji">' + a.emoji + "</span>" +
              "<strong>" + esc(a.name) + "</strong>" +
              "<small>" + esc(a.sense) + "</small>" +
              '<span class="little-card-stars">' + dots + "</span>" +
            "</a>";
          }).join("") + "</div>" +
        "</section>" +

        '<section class="card parent-note reveal">' +
          '<span class="eyebrow">' + icon("sun") + " For a grown-up</span>" +
          "<p>Read the question aloud, then let your child tap. A gentle shake means “try again”. Finish by saying the new word together — out loud, twice.</p>" +
          "<p><strong>Why this works:</strong> sensory play links a new English word to a picture, a sound and a movement. Three minutes a day is enough. Short and happy beats long and tired.</p>" +
        "</section>" +

        '<section class="section reveal">' +
          '<div class="section-head"><div><h2>Sticker book</h2><p>One sticker for every day you play.</p></div></div>' +
          '<div class="sticker-grid">' + EXTRA.stickers.map(function (st, i) {
            var got = stickersEarned.indexOf(i) !== -1;
            return '<div class="sticker' + (got ? " got" : "") + '" title="' + (got ? esc(st.n) : "Play to unlock") + '">' +
              '<span class="sticker-emoji">' + (got ? st.e : "?") + "</span>" +
              "<small>" + esc(got ? st.n : "Mystery") + "</small>" +
            "</div>";
          }).join("") + "</div>" +
        "</section>" +
      "</div>";

    updateDocumentTitle("Little Curio");
  }

  function newLittleRun(activity, level) {
    level = level || diffFor("little");
    var orders = activity.rounds.map(function (round) {
      var idxs = round.options.map(function (_, i) { return i; });
      if (level === "easy") {
        var wrong = idxs.filter(function (i) { return i !== round.answer; });
        idxs = [round.answer, wrong[0]];
      }
      if (level === "easy" || level === "hard") idxs = shuffle(idxs);
      return idxs;
    });
    return {
      activity: activity,
      level: level,
      orders: orders,
      round: 0,
      picked: null,
      locked: false,
      correct: 0,
      wrong: 0,
      done: false,
      recorded: false,
      newSticker: null,
      lastPraise: ""
    };
  }

  function littlePlayHTML(run) {
    var a = run.activity;
    var round = a.rounds[run.round];
    var picked = run.picked;
    var order = run.orders[run.round] || round.options.map(function (_, i) { return i; });

    var dots = a.rounds.map(function (_, i) {
      var cls = "play-dot";
      if (i < run.round) cls += " done";
      if (i === run.round) cls += " current";
      return '<span class="' + cls + '"></span>';
    }).join("");

    return '<div class="page little-play">' +
      '<a class="back-link" href="#/little">' + icon("back") + " Little Curio</a>" +
      '<header class="little-play-head reveal">' +
        '<div class="little-play-emoji">' + a.emoji + "</div>" +
        "<div>" +
          '<span class="eyebrow">' + esc(a.name) + " · " + esc(a.sense) + ' · <span class="level-chip">' + diffLabel(run.level) + "</span></span>" +
          '<div class="play-dots">' + dots + "</div>" +
        "</div>" +
      "</header>" +

      '<section class="play-card reveal">' +
        '<div class="play-prompt-row">' +
          "<h2>" + esc(round.prompt) + "</h2>" +
          '<button class="speak-btn play-speak" data-speak="' + esc(round.say) + '" aria-label="Hear the question">' + icon("speaker") + "</button>" +
        "</div>" +
        '<div class="play-options' + (order.length === 2 ? " two" : "") + '">' + order.map(function (orig) {
          var opt = round.options[orig];
          var cls = "play-option";
          if (picked !== null) {
            if (orig === round.answer) cls += " correct";
            else if (orig === picked) cls += " wrong";
            else cls += " dim";
          }
          return '<button class="' + cls + '" data-action="little-option" data-i="' + orig + '" aria-label="' + esc(opt.l) + '">' +
            '<span class="play-option-emoji">' + opt.e + "</span>" +
            '<span class="play-option-label' + (run.level === "hard" ? " hide" : "") + '">' + esc(opt.l) + "</span>" +
          "</button>";
        }).join("") + "</div>" +
        (run.locked
          ? '<div class="play-feedback ok">' + round.praise + " ⭐</div>"
          : (picked !== null ? '<div class="play-feedback no">Almost — let’s try again.</div>' : "")) +
      "</section>" +

      '<p class="parent-tip">Grown-up: read the question aloud, then let your child choose. Tap 🔊 to hear it again.' +
        (run.level === "hard" ? " The word labels are hidden on Challenge — say the word clearly." : "") + "</p>" +
    "</div>";
  }

  function littleDoneHTML(run) {
    var a = run.activity;
    var today = state.little.days[todayKey()];
    var sticker = run.newSticker;
    if (!sticker && today && today.sticker !== null && today.sticker !== undefined) {
      sticker = EXTRA.stickers[today.sticker];
    }

    return '<div class="page little-play">' +
      '<div class="play-done reveal">' +
        (sticker ? '<div class="confetti" aria-hidden="true">' + confetti() + "</div>" : "") +
        '<div class="done-stars"><span>⭐</span><span>⭐</span><span>⭐</span></div>' +
        "<h1>You did it!</h1>" +
        '<p class="done-praise">' + esc(run.lastPraise || "Wonderful listening. Say the words again with your grown-up.") + "</p>" +
        (sticker
          ? '<div class="sticker-award"><span class="sticker-big">' + sticker.e + "</span>" +
            "<strong>" + (run.newSticker ? "New sticker!" : "Today’s sticker") + "</strong>" +
            "<small>" + esc(sticker.n) + "</small></div>"
          : "") +
        '<div class="play-done-actions">' +
          '<button class="btn btn-little" data-action="little-again">Play again</button>' +
          '<a class="btn btn-ghost" href="#/little">All games</a>' +
          '<a class="btn btn-ghost" href="#/home">Home</a>' +
        "</div>" +
      "</div>" +
    "</div>";
  }

  function finishLittle(run) {
    if (run.recorded) return;
    run.recorded = true;
    var a = run.activity;
    var key = todayKey();

    state.little.stars += 3;

    var rec = state.little.activities[a.id] || { plays: 0, best: 0 };
    rec.plays += 1;
    rec.best = Math.max(rec.best, 3);
    state.little.activities[a.id] = rec;

    if (!state.little.days[key]) {
      var idx = state.little.stickers.length % EXTRA.stickers.length;
      state.little.days[key] = { activityId: a.id, stars: 3, sticker: idx };
      if (state.little.stickers.indexOf(idx) === -1) state.little.stickers.push(idx);
      run.newSticker = EXTRA.stickers[idx];
    }

    ensureDay().minutes += 3;
    recordActivity();
    var levelEvent = addXP(10);
    var badges = checkBadges();
    saveState();
    announceBadges(badges);
    if (levelEvent && levelEvent.leveled) {
      setTimeout(function () {
        toast("🎉 Level up — <strong>" + esc(levelEvent.level.title) + "</strong>", "badge");
      }, 260);
    }
  }

  function advanceLittle(run) {
    if (littleRun !== run) return;
    run.lastPraise = run.activity.rounds[run.round].praise;
    run.round += 1;
    run.picked = null;
    run.locked = false;
    if (run.round >= run.activity.rounds.length) {
      run.done = true;
      finishLittle(run);
    }
    render();
  }

  /* ================================================================== *
   *  STAGE 3 — Future Worlds landing
   * ================================================================== */
  function renderAdventures() {
    var ch = state.chronicles;
    var chapters = EXTRA.chronicles.chapters.length;
    var chProgress = ch.completed ? 100 : (ch.started ? ((ch.chapter) / chapters) * 100 : 0);
    var aiDone = aiCompleteCount();
    var solved = solvedCaseCount();

    $("#view").innerHTML =
      '<div class="page adventures">' +
        '<header class="page-head reveal">' +
          "<div>" +
            '<span class="eyebrow">' + icon("compass") + " Future Worlds · Advanced English</span>" +
            "<h1>Read. Decide. Argue. Solve.</h1>" +
            '<p class="sub">Three interactive programmes for advanced English: a colony to keep alive, debates about the future, and mysteries that reward close reading.</p>' +
          "</div>" +
        "</header>" +

        difficultyControl("future", "Easy: extra colony supplies, sentence hints and mystery hints · Standard: balanced · Challenge: fewer supplies, no hints, 40-word replies.") +

        '<div class="adventure-grid">' +
          '<a class="adventure-card chron" href="#/chronicles">' +
            '<div class="adventure-art"><span>🛰️</span><span class="adventure-tag">Science fiction · Choices</span></div>' +
            '<div class="adventure-body">' +
              '<span class="eyebrow">Chronicles</span>' +
              "<h2>Kepler Station</h2>" +
              "<p>Forty days of darkness. Five science logs. Every choice spends oxygen, water, food, power or morale — and the colony remembers.</p>" +
              '<div class="adv-meta"><span>' + (ch.completed ? "Completed · " + esc(ch.ending ? ch.ending.grade : "done") : (ch.started ? "Chapter " + (ch.chapter + 1) + " of " + chapters : chapters + " chapters · 12 min")) + "</span>" +
                '<span class="adv-arrow">' + icon("arrow") + "</span></div>" +
              '<div class="adv-track"><i style="width:' + chProgress + '%"></i></div>' +
            "</div>" +
          "</a>" +

          '<a class="adventure-card future" href="#/ai">' +
            '<div class="adventure-art"><span>🤖</span><span class="adventure-tag">Debate · Opinion</span></div>' +
            '<div class="adventure-body">' +
              '<span class="eyebrow">AI & Our Future World</span>' +
              "<h2>Our Future World</h2>" +
              "<p>Three briefings on algorithms, AI tutors and deepfakes. Read a simulated forum, vote in a poll, then build a sentence and write a real reply.</p>" +
              '<div class="adv-meta"><span>' + aiDone + " of " + AI_BRIEFS.length + " briefings complete</span>" +
                '<span class="adv-arrow">' + icon("arrow") + "</span></div>" +
              '<div class="adv-track"><i style="width:' + (aiDone / AI_BRIEFS.length) * 100 + '%"></i></div>' +
            "</div>" +
          "</a>" +

          '<a class="adventure-card mystery" href="#/whodunit">' +
            '<div class="adventure-art"><span>🕵️</span><span class="adventure-tag">Reading · Logic</span></div>' +
            '<div class="adventure-body">' +
              '<span class="eyebrow">The Whodunit Mystery Club</span>' +
              "<h2>Mystery Club</h2>" +
              "<p>Two cases, eight clues and six alibis. Read carefully, notice what is impossible, and name the culprit — then read the full solution.</p>" +
              '<div class="adv-meta"><span>' + solved + " of " + CASES.length + " cases solved</span>" +
                '<span class="adv-arrow">' + icon("arrow") + "</span></div>" +
              '<div class="adv-track"><i style="width:' + (solved / CASES.length) * 100 + '%"></i></div>' +
            "</div>" +
          "</a>" +
        "</div>" +

        '<section class="adv-how card reveal">' +
          '<span class="eyebrow">' + icon("spark") + " How a Future World works</span>" +
          '<div class="adv-how-grid">' +
            "<div><strong>1. Read closely</strong><p>Every screen gives you evidence, not just a story. Vocabulary is supported in context.</p></div>" +
            "<div><strong>2. Make a choice</strong><p>Decisions have costs. You will see the consequence immediately — and can try a different path.</p></div>" +
            "<div><strong>3. Explain yourself</strong><p>Polls, sentence builders and written replies turn understanding into real English you can use.</p></div>" +
          "</div>" +
        "</section>" +
      "</div>";

    updateDocumentTitle("Future Worlds");
  }

  /* ================================================================== *
   *  Chronicles
   * ================================================================== */
  var RES_LABELS = { oxygen: "Oxygen", water: "Water", food: "Food", power: "Power", morale: "Morale" };
  var RES_ICONS = { oxygen: "🫁", water: "💧", food: "🥕", power: "⚡", morale: "💛" };

  function resourceBars(res) {
    return '<div class="resources">' + Object.keys(RES_LABELS).map(function (k) {
      var v = res[k];
      var level = v >= 55 ? "high" : (v >= 30 ? "mid" : "low");
      return '<div class="res res-' + level + '">' +
        '<div class="res-top"><span>' + RES_ICONS[k] + " " + RES_LABELS[k] + "</span><strong>" + v + "</strong></div>" +
        '<div class="res-track"><i style="width:' + Math.max(0, Math.min(100, v)) + '%"></i></div>' +
      "</div>";
    }).join("") + "</div>";
  }

  function effectChips(effects) {
    return '<div class="effect-row">' + Object.keys(RES_LABELS).filter(function (k) {
      return effects[k];
    }).map(function (k) {
      var v = effects[k];
      return '<span class="effect ' + (v > 0 ? "up" : "down") + '">' +
        (v > 0 ? "+" : "") + v + " " + RES_LABELS[k] + "</span>";
    }).join("") + "</div>";
  }

  function renderChronicles() {
    var ch = state.chronicles;
    var meta = EXTRA.chronicles;

    if (!ch.started) {
      $("#view").innerHTML =
        '<div class="page chronicles">' +
          '<a class="back-link" href="#/adventures">' + icon("back") + " Future Worlds</a>" +
          '<div class="chron-intro reveal">' +
            '<span class="eyebrow">Chronicles · Interactive science fiction · <span class="level-chip">' + diffLabel(diffFor("future")) + "</span></span>" +
            "<h1>" + esc(meta.title) + "</h1>" +
            '<p class="chron-tagline">' + esc(meta.tagline) + "</p>" +
            '<p class="sub">' + esc(meta.intro) + "</p>" +
            '<div class="resources-intro">' + Object.keys(RES_LABELS).map(function (k) {
              var lvl = diffFor("future");
              var mod = lvl === "easy" ? 10 : (lvl === "hard" ? -10 : 0);
              return '<span>' + RES_ICONS[k] + " " + RES_LABELS[k] + " <strong>" + Math.max(0, Math.min(100, meta.startResources[k] + mod)) + "</strong></span>";
            }).join("") + "</div>" +
            '<div class="stage-actions"><button class="btn btn-primary" data-action="chron-start">Begin the mission ' + icon("arrow") + "</button></div>" +
            '<p class="chron-warning">Aim to finish with every resource above zero. There is no single perfect path — only trade-offs.</p>' +
          "</div>" +
        "</div>";
      updateDocumentTitle("Chronicles");
      return;
    }

    if (ch.completed) {
      var ending = ch.ending || EXTRA.chronicleEnding(ch.resources);
      $("#view").innerHTML =
        '<div class="page chronicles">' +
          '<a class="back-link" href="#/adventures">' + icon("back") + " Future Worlds</a>" +
          '<div class="chron-end reveal">' +
            '<span class="ending-grade tone-' + esc(ending.tone) + '">' + esc(ending.grade) + "</span>" +
            "<h1>" + esc(ending.title) + "</h1>" +
            '<p class="sub">' + esc(ending.text) + "</p>" +
            '<div class="chron-end-grid">' +
              '<div class="card"><span class="eyebrow">Final systems</span>' + resourceBars(ch.resources) + "</div>" +
              '<div class="card"><span class="eyebrow">Your decisions</span><ol class="choice-recap">' +
                meta.chapters.map(function (chapter, i) {
                  var pick = ch.choices[i];
                  var label = pick !== undefined && chapter.options[pick] ? chapter.options[pick].label : "No decision recorded";
                  return "<li><span>" + (i + 1) + ".</span> " + esc(label) + "</li>";
                }).join("") +
              "</ol></div>" +
            "</div>" +
            '<div class="stage-actions">' +
              '<a class="btn btn-ghost" href="#/adventures">Future Worlds</a>' +
              '<button class="btn btn-primary" data-action="chron-again">Play a different path ' + icon("arrow") + "</button>" +
            "</div>" +
          "</div>" +
        "</div>";
      updateDocumentTitle("Chronicles — complete");
      return;
    }

    var chapter = meta.chapters[ch.chapter];
    var level = ch.difficulty || "standard";
    var heading = chapter.title.replace(/^Log \d+ — /, "");
    var pending = ch.pendingChoice;
    var pickedOption = pending !== null && pending !== undefined ? chapter.options[pending] : null;

    $("#view").innerHTML =
      '<div class="page chronicles">' +
        '<a class="back-link" href="#/adventures">' + icon("back") + " Future Worlds</a>" +
        '<header class="chron-head reveal">' +
          '<span class="eyebrow">Chronicles · Chapter ' + (ch.chapter + 1) + " of " + meta.chapters.length + ' · <span class="level-chip">' + diffLabel(level) + "</span></span>" +
          "<h1>" + esc(heading) + "</h1>" +
          '<p class="sub">Day ' + Math.min(40, (ch.chapter + 1) * 8) + " of the long night. The station is waiting for your decision.</p>" +
        "</header>" +

        resourceBars(ch.resources) +

        '<article class="chron-reader card reveal">' +
          '<div class="chron-log">' + esc(chapter.log) + "</div>" +
          '<div class="vocab-row">' + chapter.vocab.map(function (v) {
            return '<span class="vocab-chip"><strong>' + esc(v.w) + "</strong><span>" + esc(v.def) + "</span></span>";
          }).join("") + "</div>" +
        "</article>" +

        '<section class="decision reveal">' +
          "<h2>" + (pickedOption ? "The consequence" : esc(chapter.question)) + "</h2>" +
          (level === "hard" && !pickedOption ? '<p class="difficulty-note">Challenge mode hides the cost of each choice until you commit.</p>' : "") +
          (pickedOption
            ? '<div class="outcome-card">' +
                '<span class="eyebrow">You chose</span>' +
                "<h3>" + esc(pickedOption.label) + "</h3>" +
                effectChips(pickedOption.effects) +
                '<p class="outcome-text">' + esc(pickedOption.outcome) + "</p>" +
                '<div class="learning-note">' + icon("spark") + "<span>" + esc(pickedOption.note) + "</span></div>" +
                '<div class="stage-actions"><button class="btn btn-primary" data-action="chron-continue">' +
                  (ch.chapter === meta.chapters.length - 1 ? "See how the colony fares" : "Continue the log") + " " + icon("arrow") +
                "</button></div>" +
              "</div>"
            : '<div class="choices">' + chapter.options.map(function (opt, i) {
                return '<button class="choice" data-action="chron-choose" data-i="' + i + '">' +
                  '<span class="choice-letter">' + "ABC"[i] + "</span>" +
                  '<span class="choice-body"><strong>' + esc(opt.label) + "</strong><span>" + esc(opt.detail) + "</span></span>" +
                  '<span class="choice-effects">' + (level === "hard" ? "" : effectChips(opt.effects)) + "</span>" +
                "</button>";
              }).join("") + "</div>") +
        "</section>" +
      "</div>";

    updateDocumentTitle("Chronicles");
  }

  function chronStart() {
    var level = diffFor("future");
    var start = EXTRA.chronicles.startResources;
    var mod = level === "easy" ? 10 : (level === "hard" ? -10 : 0);
    var res = {};
    Object.keys(start).forEach(function (k) {
      res[k] = Math.max(0, Math.min(100, start[k] + mod));
    });
    state.chronicles = {
      started: true, chapter: 0, resources: res, choices: [],
      pendingChoice: null, completed: false, ending: null, xpChapters: [],
      difficulty: level
    };
    saveState();
    render();
    window.scrollTo(0, 0);
  }

  function chronChoose(index) {
    var ch = state.chronicles;
    var chapter = EXTRA.chronicles.chapters[ch.chapter];
    if (!chapter || !chapter.options[index] || ch.pendingChoice !== null) return;
    var opt = chapter.options[index];
    Object.keys(opt.effects).forEach(function (k) {
      if (!(k in ch.resources)) return;
      ch.resources[k] = Math.max(0, Math.min(100, ch.resources[k] + opt.effects[k]));
    });
    ch.choices[ch.chapter] = index;
    ch.pendingChoice = index;
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function chronContinue() {
    var ch = state.chronicles;
    var meta = EXTRA.chronicles;
    if (ch.pendingChoice === null) return;
    var isLast = ch.chapter >= meta.chapters.length - 1;
    var xp = 8;

    if (ch.xpChapters.indexOf(ch.chapter) === -1) {
      ch.xpChapters.push(ch.chapter);
    }

    recordActivity();
    ensureDay().minutes += 2;

    if (isLast) {
      ch.completed = true;
      ch.ending = EXTRA.chronicleEnding(ch.resources);
      xp += 30;
    } else {
      ch.chapter += 1;
      ch.pendingChoice = null;
    }

    var levelEvent = addXP(xp);
    var badges = checkBadges();
    saveState();
    announceBadges(badges);
    if (levelEvent && levelEvent.leveled) {
      setTimeout(function () {
        toast("🎉 Level up — <strong>" + esc(levelEvent.level.title) + "</strong>", "badge");
      }, 260);
    }
    render();
    window.scrollTo(0, 0);
  }

  /* ================================================================== *
   *  AI & Our Future World
   * ================================================================== */
  var aiAttempt = null;

  function renderAI(briefingId) {
    var brief = briefingId ? aiById(briefingId) : null;

    if (!brief) {
      $("#view").innerHTML =
        '<div class="page ai-list">' +
          '<a class="back-link" href="#/adventures">' + icon("back") + " Future Worlds</a>" +
          '<header class="page-head reveal">' +
            "<div>" +
              '<span class="eyebrow">' + icon("compass") + " AI & Our Future World</span>" +
              "<h1>Read. Debate. Write.</h1>" +
              '<p class="sub">Three briefings on the technology shaping your life. Each one ends with a real argument — in English, in your own words.</p>' +
            "</div>" +
          "</header>" +
          '<div class="brief-list">' + AI_BRIEFS.map(function (b) {
            var st = state.ai.briefings[b.id] || {};
            var steps = [st.read, st.vote !== null && st.vote !== undefined, st.challenge, (st.reply || "").trim().length > 10];
            var done = steps.filter(Boolean).length;
            return '<a class="brief-card" href="#/ai/' + b.id + '">' +
              '<span class="brief-num">' + b.num + "</span>" +
              '<span class="brief-emoji">' + b.emoji + "</span>" +
              '<span class="brief-body"><span class="eyebrow">' + esc(b.topic) + " · " + b.minutes + " min</span>" +
                "<strong>" + esc(b.title) + "</strong>" +
                "<small>" + esc(b.summary) + "</small>" +
                '<span class="brief-steps">' + steps.map(function (ok) {
                  return '<i class="' + (ok ? "on" : "") + '"></i>';
                }).join("") + "<em>" + done + " of 4 steps</em></span>" +
              "</span>" +
              '<span class="adv-arrow">' + icon("arrow") + "</span>" +
            "</a>";
          }).join("") + "</div>" +
          '<p class="ai-note">These forums and polls are simulations, written for this app. They are designed to give you something to disagree with.</p>' +
        "</div>";
      updateDocumentTitle("AI & Our Future World");
      return;
    }

    var st = aiState(brief.id);
    if (!st.read) {
      st.read = true;
      ensureDay().minutes += brief.minutes;
      recordActivity();
      addXP(5);
      var firstBadges = checkBadges();
      saveState();
      announceBadges(firstBadges);
      renderShell("ai");
    }

    var level = diffFor("future");
    var minWords = level === "easy" ? 10 : (level === "standard" ? 20 : 40);
    var attempt = aiAttempt && aiAttempt.id === brief.id ? aiAttempt : null;
    var steps = [true, st.vote !== null && st.vote !== undefined, st.challenge, wordCount(st.reply) >= minWords];
    var stepCount = steps.filter(Boolean).length;

    $("#view").innerHTML =
      '<div class="page ai-brief">' +
        '<a class="back-link" href="#/ai">' + icon("back") + " AI & Our Future World</a>" +
        '<header class="brief-head reveal">' +
          '<span class="eyebrow">Briefing ' + brief.num + " · " + esc(brief.topic) + " · " + brief.minutes + ' min · <span class="level-chip">' + diffLabel(level) + "</span></span>" +
          "<h1>" + esc(brief.title) + "</h1>" +
          '<p class="sub">' + esc(brief.summary) + "</p>" +
          '<div class="brief-progress">' + steps.map(function (ok, i) {
            return '<span class="' + (ok ? "done" : "") + '">' + (ok ? "✓ " : "") + ["Read", "Vote", "Sentence", "Reply"][i] + "</span>";
          }).join("") + "<em>" + stepCount + " of 4</em></div>" +
        "</header>" +

        '<article class="ai-article card reveal">' +
          brief.paragraphs.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
          '<div class="vocab-row">' + brief.vocab.map(function (v) {
            return '<span class="vocab-chip"><strong>' + esc(v.w) + "</strong><span>" + esc(v.def) + "</span></span>";
          }).join("") + "</div>" +
        "</article>" +

        '<section class="forum card reveal">' +
          '<div class="section-head"><div><h2>The Forum</h2><p>Simulated discussion — three different positions.</p></div></div>' +
          '<div class="comments">' + brief.forum.map(function (c, i) {
            var liked = st.liked.indexOf(i) !== -1;
            return '<div class="comment">' +
              '<span class="avatar">' + c.emoji + "</span>" +
              "<div><div class=\"comment-head\"><strong>@" + esc(c.author) + "</strong></div>" +
                "<p>" + esc(c.text) + "</p>" +
                '<button class="like' + (liked ? " liked" : "") + '" data-action="ai-like" data-i="' + i + '">' +
                  (liked ? "♥" : "♡") + " " + (c.likes + (liked ? 1 : 0)) + "</button>" +
              "</div>" +
            "</div>";
          }).join("") + "</div>" +
        "</section>" +

        '<section class="poll card reveal">' +
          '<span class="eyebrow">Opinion poll</span>' +
          '<p class="poll-q">' + esc(brief.poll.question) + "</p>" +
          (st.vote === null || st.vote === undefined
            ? '<div class="poll-options">' + brief.poll.options.map(function (opt, i) {
                return '<button class="poll-option" data-action="ai-vote" data-i="' + i + '">' + esc(opt) + "</button>";
              }).join("") + "</div>"
            : '<div class="poll-results">' + brief.poll.options.map(function (opt, i) {
                var pct = brief.poll.results[i];
                return '<div class="poll-result' + (i === st.vote ? " mine" : "") + '">' +
                  '<div class="poll-result-top"><span>' + esc(opt) + (i === st.vote ? " · you" : "") + "</span><strong>" + pct + "%</strong></div>" +
                  '<div class="poll-track"><i style="width:' + pct + '%"></i></div>' +
                "</div>";
              }).join("") + '<p class="poll-note">' + esc(brief.poll.note) + "</p></div>") +
        "</section>" +

        '<section class="challenge card reveal">' +
          '<span class="eyebrow">Sentence builder</span>' +
          '<p class="challenge-instruction">' + esc(brief.challenge.instruction) + "</p>" +
          '<p class="challenge-sentence">' + (st.challenge
            ? esc(brief.challenge.sentence.replace("___", brief.challenge.options[brief.challenge.answer]))
            : esc(brief.challenge.sentence)) + "</p>" +
          (level === "easy" && !st.challenge && brief.challenge.hint
            ? '<p class="challenge-hint">' + icon("spark") + " " + esc(brief.challenge.hint) + "</p>"
            : "") +
          (st.challenge
            ? '<div class="challenge-done">' + icon("check") + " Completed — " + esc(brief.challenge.explain) + "</div>"
            : '<div class="sentence-options">' + brief.challenge.options.map(function (opt, i) {
                return '<button class="sentence-option" data-action="ai-answer" data-i="' + i + '">' + esc(opt) + "</button>";
              }).join("") + "</div>") +
          (attempt
            ? '<div class="feedback ' + (attempt.correct ? "ok" : "no") + '">' +
                "<strong>" + (attempt.correct ? "Exactly right." : "Not quite — look at the relationship between the two clauses.") + "</strong>" +
              "</div>"
            : "") +
        "</section>" +

        '<section class="write card reveal">' +
          '<span class="eyebrow">Your voice</span>' +
          "<h2>Write your reply</h2>" +
          '<p class="write-prompt">' + esc(brief.write.prompt) + "</p>" +
          '<p class="write-requirement">' + (level === "hard"
            ? "Challenge: at least 40 words, without sentence starters."
            : "At least " + minWords + " words. Use a connector like although, because or for example.") + "</p>" +
          (level === "hard" ? "" :
            '<div class="starters">' + brief.write.starters.map(function (s, i) {
              return '<button class="starter" data-action="ai-starter" data-i="' + i + '">' + esc(s) + "</button>";
            }).join("") + "</div>") +
          '<textarea id="ai-reply" rows="5" maxlength="1200" placeholder="' + (level === "hard" ? "Write at least 40 words in your own words." : "Write three to five sentences. Use a connector like although, because or for example.") + '">' + esc(st.reply || "") + "</textarea>" +
          '<div class="write-foot"><span id="ai-word-count">' + wordCount(st.reply) + " words</span>" +
            '<button class="btn btn-small btn-dark" data-action="ai-save">Save my post</button></div>' +
          ((st.reply || "").trim().length > 10
            ? '<div class="posted"><span class="avatar">👤</span><div><strong>You · saved on this device</strong><p>' + esc(st.reply) + "</p></div></div>"
            : "") +
        "</section>" +
      "</div>";

    bindAIComposer(brief);
    updateDocumentTitle(brief.title);
  }

  function wordCount(text) {
    var t = (text || "").trim();
    return t ? t.split(/\s+/).length : 0;
  }

  function bindAIComposer(brief) {
    var area = $("#ai-reply");
    if (!area) return;
    var count = $("#ai-word-count");
    area.addEventListener("input", function () {
      if (count) count.textContent = wordCount(area.value) + " words";
    });
  }

  /* ================================================================== *
   *  Whodunit Mystery Club
   * ================================================================== */
  function renderWhodunit(caseId) {
    var mystery = caseId ? caseById(caseId) : null;

    if (!mystery) {
      $("#view").innerHTML =
        '<div class="page cases">' +
          '<a class="back-link" href="#/adventures">' + icon("back") + " Future Worlds</a>" +
          '<header class="page-head reveal">' +
            "<div>" +
              '<span class="eyebrow">' + icon("compass") + " The Whodunit Mystery Club</span>" +
              "<h1>Everyone has an alibi. One is a lie.</h1>" +
              '<p class="sub">Read the clues, test the alibis, and make an accusation. The answer is always in the text — but it is never on the first line.</p>' +
            "</div>" +
          "</header>" +
          '<div class="case-grid">' + CASES.map(function (c) {
            var st = state.whodunit.cases[c.id];
            return '<a class="case-card" href="#/whodunit/' + c.id + '">' +
              '<div class="case-art"><span>' + c.emoji + "</span>" +
                (st && st.solved ? '<span class="solved-stamp">Case closed</span>' : '<span class="case-difficulty">' + esc(c.difficulty) + "</span>") +
              "</div>" +
              '<div class="case-body"><span class="eyebrow">' + esc(c.era) + "</span>" +
                "<h2>" + esc(c.title) + "</h2>" +
                "<p>" + esc(c.backdrop.slice(0, 130)) + "…</p>" +
                '<div class="case-meta"><span>' + c.clues.length + " clues · " + c.suspects.length + " suspects · " + c.minutes + " min</span>" +
                  '<span class="adv-arrow">' + icon("arrow") + "</span></div>" +
              "</div>" +
            "</a>";
          }).join("") + "</div>" +
          '<section class="club-how card reveal">' +
            '<span class="eyebrow">' + icon("spark") + " How to detect</span>" +
            '<div class="adv-how-grid">' +
              "<div><strong>1. Separate strange from impossible</strong><p>Muddy boots are suspicious. A train that never left is impossible. Impossibility wins.</p></div>" +
              "<div><strong>2. Test every alibi</strong><p>Ask what each person claims, and which clue could prove or break it.</p></div>" +
              "<div><strong>3. Name your evidence</strong><p>A good detective does not just say who. They say which clue gives the game away.</p></div>" +
            "</div>" +
          "</section>" +
        "</div>";
      updateDocumentTitle("Mystery Club");
      return;
    }

    var cst = caseState(mystery.id);
    var level = diffFor("future");
    var answered = cst.answers.length > cst.qIndex;
    var current = mystery.questions[cst.qIndex];

    $("#view").innerHTML =
      '<div class="page case-page">' +
        '<a class="back-link" href="#/whodunit">' + icon("back") + " Mystery Club</a>" +
        '<header class="case-head reveal">' +
          '<span class="eyebrow">' + esc(mystery.era) + " · " + esc(mystery.difficulty) + ' · <span class="level-chip">' + diffLabel(level) + "</span></span>" +
          "<h1>" + esc(mystery.title) + "</h1>" +
          '<p class="sub">' + esc(mystery.brief) + "</p>" +
        "</header>" +

        '<section class="backdrop card reveal"><span class="eyebrow">The setting</span><p>' + esc(mystery.backdrop) + "</p></section>" +

        '<section class="section reveal">' +
          '<div class="section-head"><div><h2>The clues</h2><p>' + mystery.clues.length + " pieces of evidence. Read each one twice.</p></div></div>" +
          '<div class="clue-grid">' + mystery.clues.map(function (clue, i) {
            return '<article class="clue">' +
              '<div class="clue-head"><span class="clue-emoji">' + clue.emoji + "</span><span class=\"clue-num\">Clue " + (i + 1) + "</span></div>" +
              "<h3>" + esc(clue.title) + "</h3>" +
              "<p>" + esc(clue.text) + "</p>" +
            "</article>";
          }).join("") + "</div>" +
        "</section>" +

        '<section class="section reveal">' +
          '<div class="section-head"><div><h2>Suspects & alibis</h2><p>Three people were near the scene. Each one has a story.</p></div></div>' +
          '<div class="suspect-grid">' + mystery.suspects.map(function (s) {
            return '<article class="suspect">' +
              '<span class="suspect-avatar">' + s.emoji + "</span>" +
              "<h3>" + esc(s.name) + "</h3>" +
              '<span class="suspect-role">' + esc(s.role) + "</span>" +
              '<blockquote>' + esc(s.alibi) + "</blockquote>" +
            "</article>";
          }).join("") + "</div>" +
        "</section>" +

        (!cst.solved && level === "easy" ? caseHintHTML(mystery, cst) : "") +
        (cst.solved ? caseSolvedHTML(mystery, cst) : caseQuestionHTML(mystery, cst, current, answered, level)) +
      "</div>";

    updateDocumentTitle(mystery.title);
  }

  function caseHintHTML(mystery, cst) {
    return '<section class="case-hint card reveal">' +
      '<div class="case-hint-copy"><span class="eyebrow">' + icon("spark") + " Easy-mode hint</span>" +
        "<p>" + (cst.hintShown ? esc(mystery.hint) : "Stuck? Reveal one gentle hint — it will not solve the case for you.") + "</p></div>" +
      (cst.hintShown ? "" : '<button class="btn btn-small btn-dark" data-action="case-hint" data-id="' + mystery.id + '">Reveal hint</button>') +
    "</section>";
  }

  function caseQuestionHTML(mystery, cst, q, answered, level) {
    var picked = answered ? cst.answers[cst.qIndex] : null;
    var ok = picked === q.answer;
    return '<section class="deduction reveal">' +
      '<div class="deduction-head"><span class="eyebrow">Make your case · question ' + (cst.qIndex + 1) + " of " + mystery.questions.length + "</span>" +
        '<div class="deduction-dots">' + mystery.questions.map(function (_, i) {
          var cls = i < cst.qIndex ? "done" : (i === cst.qIndex ? "current" : "");
          return '<i class="' + cls + '"></i>';
        }).join("") + "</div></div>" +
      '<h2 class="deduction-q">' + esc(q.q) + "</h2>" +
      '<div class="deduction-options">' + q.options.map(function (opt, i) {
        var cls = "deduction-option";
        if (answered) {
          if (i === q.answer) cls += " correct";
          else if (i === picked) cls += " wrong";
          else cls += " dim";
        }
        return '<button class="' + cls + '" data-action="case-answer" data-i="' + i + '"' + (answered ? " disabled" : "") + ">" +
          '<span class="opt-letter">' + "ABC"[i] + "</span><span>" + esc(opt) + "</span>" +
        "</button>";
      }).join("") + "</div>" +
      (answered
        ? '<div class="feedback ' + (ok ? "ok" : "no") + '"><strong>' + (ok ? "Good deduction." : "Reread the clues.") + "</strong><p>" +
            (level === "hard" ? "Explanation locked until the full solution on Challenge." : esc(q.explain)) + "</p></div>" +
          '<div class="stage-actions"><button class="btn btn-primary" data-action="case-next">' +
            (cst.qIndex === mystery.questions.length - 1 ? "Reveal the solution" : "Next question") + " " + icon("arrow") + "</button></div>"
        : '<p class="quiz-hint">Choose one answer. The evidence is all above — there is no trick.</p>') +
    "</section>";
  }

  function caseSolvedHTML(mystery, cst) {
    var total = mystery.questions.length;
    var perfect = cst.score === total;
    return '<section class="solution reveal">' +
      '<div class="solution-head">' +
        '<span class="solved-stamp big">Case closed</span>' +
        '<span class="solution-score">' + cst.score + "/" + total + " deductions correct</span>" +
      "</div>" +
      "<h2>The culprit: " + esc(mystery.solution.who) + "</h2>" +
      '<p class="solution-text">' + esc(mystery.solution.paragraph) + "</p>" +
      '<div class="solution-recap">' + mystery.questions.map(function (q, i) {
        var ok = cst.answers[i] === q.answer;
        return '<div class="recap-row ' + (ok ? "ok" : "no") + '"><span>' + (ok ? "✓" : "✗") + "</span><div><strong>" + esc(q.q) + "</strong><p>" + esc(q.options[q.answer]) + "</p></div></div>";
      }).join("") + "</div>" +
      (perfect ? '<p class="perfect-line">Perfect score — you read like a detective.</p>' : "") +
      '<div class="stage-actions">' +
        '<a class="btn btn-ghost" href="#/whodunit">All cases</a>' +
        '<button class="btn btn-dark" data-action="case-again">Reopen the case</button>' +
      "</div>" +
    "</section>";
  }


  /* ================================================================== *
   *  Stage actions
   * ================================================================== */
  function littlePick(index) {
    var run = littleRun;
    if (!run || run.done || run.locked) return;
    var round = run.activity.rounds[run.round];
    if (index === round.answer) {
      run.picked = index;
      run.locked = true;
      run.correct += 1;
      run.lastPraise = round.praise;
      speak(round.praise);
      render();
      setTimeout(function () { advanceLittle(run); }, 1100);
    } else {
      run.picked = index;
      run.wrong += 1;
      speak("Try again.");
      render();
      setTimeout(function () {
        if (littleRun === run && !run.locked) {
          run.picked = null;
          render();
        }
      }, 800);
    }
  }

  function aiLike(id, index) {
    var brief = aiById(id);
    if (!brief) return;
    var st = aiState(id);
    var at = st.liked.indexOf(index);
    if (at === -1) st.liked.push(index);
    else st.liked.splice(at, 1);
    saveState();
    render();
  }

  function aiVote(id, index) {
    var brief = aiById(id);
    if (!brief) return;
    var st = aiState(id);
    if (st.vote !== null && st.vote !== undefined) return;
    st.vote = index;
    var levelEvent = addXP(5);
    var badges = checkBadges();
    saveState();
    announceBadges(badges);
    if (levelEvent && levelEvent.leveled) {
      setTimeout(function () { toast("🎉 Level up — <strong>" + esc(levelEvent.level.title) + "</strong>", "badge"); }, 220);
    }
    render();
  }

  function aiAnswer(id, index) {
    var brief = aiById(id);
    if (!brief) return;
    var st = aiState(id);
    if (st.challenge) return;
    var correct = index === brief.challenge.answer;
    aiAttempt = { id: id, idx: index, correct: correct };
    if (correct) {
      st.challenge = true;
      var levelEvent = addXP(10);
      var badges = checkBadges();
      saveState();
      announceBadges(badges);
      if (levelEvent && levelEvent.leveled) {
        setTimeout(function () { toast("🎉 Level up — <strong>" + esc(levelEvent.level.title) + "</strong>", "badge"); }, 220);
      }
    } else {
      saveState();
    }
    render();
  }

  function aiStarter(index) {
    var area = $("#ai-reply");
    var brief = aiById(location.hash.split("/")[2]);
    if (!area || !brief || !brief.write.starters[index]) return;
    var text = brief.write.starters[index];
    area.value = area.value.trim() ? area.value.replace(/\s*$/, " ") + text : text;
    area.focus();
    var count = $("#ai-word-count");
    if (count) count.textContent = wordCount(area.value) + " words";
  }

  function aiSave(id) {
    var area = $("#ai-reply");
    if (!area) return;
    var text = area.value.trim();
    var level = diffFor("future");
    var minWords = level === "easy" ? 10 : (level === "standard" ? 20 : 40);
    if (wordCount(text) < minWords) {
      toast("This level needs at least " + minWords + " words. Keep going.");
      area.focus();
      return;
    }
    var st = aiState(id);
    var first = !st.reply || st.reply.trim().length < 10;
    st.reply = text.slice(0, 1200);
    if (first) {
      addXP(10);
      ensureDay().minutes += 2;
    }
    var badges = checkBadges();
    saveState();
    announceBadges(badges);
    render();
    toast("Your reply is saved on this device.");
  }

  function caseAnswer(id, index) {
    var mystery = caseById(id);
    if (!mystery) return;
    var st = caseState(id);
    if (st.solved || st.answers.length > st.qIndex) return;
    st.answers[st.qIndex] = index;
    saveState();
    render();
  }

  function caseNext(id) {
    var mystery = caseById(id);
    if (!mystery) return;
    var st = caseState(id);
    if (st.answers.length <= st.qIndex) return;
    if (st.qIndex < mystery.questions.length - 1) {
      st.qIndex += 1;
      saveState();
      render();
      return;
    }
    var score = 0;
    mystery.questions.forEach(function (q, i) {
      if (st.answers[i] === q.answer) score += 1;
    });
    st.score = score;
    st.solved = true;
    var perfect = score === mystery.questions.length;
    var xp = 25 + (perfect ? 10 : 0);
    ensureDay().minutes += mystery.minutes;
    recordActivity();
    var levelEvent = addXP(xp);
    var badges = checkBadges();
    saveState();
    announceBadges(badges);
    if (levelEvent && levelEvent.leveled) {
      setTimeout(function () { toast("🎉 Level up — <strong>" + esc(levelEvent.level.title) + "</strong>", "badge"); }, 220);
    }
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function caseAgain(id) {
    delete state.whodunit.cases[id];
    saveState();
    render();
    window.scrollTo(0, 0);
  }

  /* ================================================================== *
   *  Companions — hatch a pet from accumulated XP
   * ================================================================== */
  var petGreeting = null;
  var hatchToken = 0;

  function renderPet() {
    var active = activePet();
    var next = nextPet();
    var ready = petReady(next);
    var mood = petMood();
    var line = active
      ? (petGreeting && petGreeting.id === active.id ? petGreeting.line : petDailyLine(active))
      : "";


    var head = active
      ? '<header class="page-head reveal"><div>' +
          '<span class="eyebrow">' + icon("spark") + " Your companion</span>" +
          "<h1>Meet " + esc(active.name) + ".</h1>" +
          '<p class="sub">Your companion hatched from the points you earned. Every lesson, word and choice feeds it a little more English.</p>' +
        "</div>" +
        '<div class="progress-pill"><strong>' + state.xp + "</strong><span>points shared</span></div></header>"
      : '<header class="page-head reveal"><div>' +
          '<span class="eyebrow">' + icon("spark") + " Your companion</span>" +
          "<h1>An egg is waiting.</h1>" +
          '<p class="sub">Points from every stage warm it. Read, play and practise — fill the first egg to ' + EGG_POINTS + ' points and your companion will hatch.</p>' +
        "</div>" +
        '<div class="progress-pill"><strong>' + state.xp + "</strong><span>points so far</span></div></header>";

    var body = active ? petScene(active, line, mood) : "";
    body += nextEggCard();
    body += petCollection();

    $("#view").innerHTML = '<div class="page pet-page">' + head + body + "</div>";
    updateDocumentTitle(active ? active.name : "Companion");
  }

  function petScene(pet, line, mood) {
    var rec = state.pets.hatched[pet.id];
    var since = "recently";
    if (rec && rec.at) {
      var key = dateKey(new Date(rec.at));
      since = key === todayKey() ? "today" : fmtDate(key).toLowerCase();
    }
    return '<section class="pet-scene pet-tone-' + pet.tone + ' reveal">' +
      '<div class="pet-sky">' +
        '<span class="pet-spark p1"></span><span class="pet-spark p2"></span><span class="pet-spark p3"></span>' +
        '<span class="pet-spark p4"></span>' +
        (line ? '<div class="pet-speech">“' + esc(line) + '”</div>' : "") +
        '<div class="pet-figure"><span class="pet-emoji" aria-hidden="true">' + pet.emoji + "</span><span class=\"pet-shadow\"></span></div>" +
        '<span class="pet-ground"></span>' +
      "</div>" +
      '<div class="pet-info">' +
        '<span class="eyebrow">' + esc(pet.species) + " · " + esc(pet.trait) + "</span>" +
        "<h2>" + esc(pet.name) + "</h2>" +
        "<p>" + esc(pet.blurb) + "</p>" +
        '<div class="pet-meta">' +
          "<span>" + icon("spark") + "Hatched " + esc(since) + "</span>" +
          "<span>" + state.xp + " points together</span>" +
          '<span class="pet-mood-chip">' + esc(mood.label) + "</span>" +
        "</div>" +
        '<div class="pet-actions">' +
          '<button class="btn btn-dark btn-small" data-action="pet-hello">Say hello</button>' +
          '<span class="pet-mood-note">' + esc(mood.detail) + "</span>" +
        "</div>" +
      "</div>" +
    "</section>";
  }

  function nextEggCard() {
    var next = nextPet();
    var done = hatchedPetCount();

    if (!next) {
      return '<section class="card egg-card complete reveal">' +
        '<div class="egg-art"><span class="egg-big">✨</span></div>' +
        '<div class="egg-copy">' +
          '<span class="eyebrow">Collection complete</span>' +
          "<h2>All six companions are here.</h2>" +
          '<p>Every egg has hatched. Keep learning and they will all travel with you — the points still count.</p>' +
        "</div>" +
      "</section>";
    }

    var ready = petReady(next);
    var pct = (petEggPoints(next) / EGG_POINTS) * 100;
    var title = ready
      ? "An egg is ready to hatch!"
      : (done === 0 ? "Your first companion is growing" : "The next companion is growing");

    return '<section class="card egg-card' + (ready ? " ready" : "") + ' reveal">' +
      '<div class="egg-art">' +
        '<span class="egg-big">🥚</span>' +
        (ready ? '<span class="egg-ping"></span>' : "") +
      "</div>" +
      '<div class="egg-copy">' +
        '<span class="eyebrow">' + (ready ? "Egg ready" : "Next egg") + "</span>" +
        "<h2>" + title + "</h2>" +
        "<p>" + (ready
          ? "The shell is warm and moving. Tap the egg to meet your new companion."
          : "Earn points in Little Curio, the Library or Future Worlds. Every point warms the shell.") + "</p>" +
        '<div class="egg-progress"><div class="egg-bar"><i style="width:' + pct.toFixed(1) + '%"></i></div>' +
          "<span>" + (ready ? "Ready to hatch" : petEggPoints(next) + " / " + EGG_POINTS + " points") + "</span></div>" +
        (ready ? '<button class="btn btn-primary" data-action="hatch-open">Hatch the egg ' + icon("arrow") + "</button>" : "") +
      "</div>" +
    "</section>";
  }

  function petCollection() {
    return '<section class="section pet-collection-section reveal">' +
      '<div class="section-head"><div><h2>Companion collection</h2>' +
        "<p>" + hatchedPetCount() + " of " + PETS.length + " hatched · tap a companion to make it active</p></div></div>" +
      '<div class="pet-collection">' + PETS.map(function (p) {
        var rec = state.pets.hatched[p.id];
        var active = state.pets.active === p.id;
        if (rec) {
          return '<button class="pet-collect hatched pet-tone-' + p.tone + (active ? " active" : "") + '" data-action="pet-select" data-id="' + p.id + '">' +
            '<span class="collect-emoji">' + p.emoji + "</span>" +
            "<strong>" + esc(p.name) + "</strong>" +
            "<small>" + esc(p.species) + " · " + esc(p.trait) + "</small>" +
            "<em>" + (active ? "Active" : "Choose") + "</em>" +
          "</button>";
        }
        var upcoming = nextPet();
        var isNext = upcoming && upcoming.id === p.id;
        var pct = isNext ? (petEggPoints(p) / EGG_POINTS) * 100 : 0;
        return '<div class="pet-collect locked' + (isNext ? " next" : "") + '">' +
          '<span class="collect-emoji">🥚</span>' +
          "<strong>???</strong>" +
          "<small>" + (isNext ? petEggPoints(p) + " / " + EGG_POINTS + " points" : "Locked egg") + "</small>" +
          '<span class="collect-bar"><i style="width:' + pct.toFixed(1) + '%"></i></span>' +
        "</div>";
      }).join("") + "</div>" +
    "</section>";
  }

  function homePetCard() {
    var active = activePet();
    var next = nextPet();
    var ready = petReady(next);

    if (active) {
      var eggMeta = "";
      if (next) {
        eggMeta = ready
          ? '<span class="pet-card-meta ready">🥚 An egg is ready — tap to hatch!</span>'
          : '<span class="pet-card-bar"><i style="width:' + ((petEggPoints(next) / EGG_POINTS) * 100).toFixed(1) + '%"></i></span>' +
            '<span class="pet-card-meta">Next egg: ' + petEggPoints(next) + " / " + EGG_POINTS + " points</span>";
      } else {
        eggMeta = '<span class="pet-card-meta">All six companions hatched</span>';
      }
      return '<a class="pet-card pet-tone-' + active.tone + ' reveal" href="#/pet">' +
        '<span class="pet-card-art">' + active.emoji + "</span>" +
        '<span class="pet-card-body">' +
          '<span class="eyebrow">' + icon("spark") + " Your companion</span>" +
          "<strong>" + esc(active.name) + "</strong>" +
          "<p>“" + esc(petDailyLine(active)) + "”</p>" +
          eggMeta +
        "</span>" +
      "</a>";
    }

    if (!next) return "";
    var pct = (petEggPoints(next) / EGG_POINTS) * 100;
    return '<a class="pet-card egg-pet-card' + (ready ? " ready" : "") + ' reveal" href="#/pet">' +
      '<span class="pet-card-art"><span class="egg-small">🥚</span></span>' +
      '<span class="pet-card-body">' +
        '<span class="eyebrow">' + icon("spark") + (ready ? " Egg ready" : " Mystery egg") + "</span>" +
        "<strong>" + (ready ? "An egg is ready to hatch!" : "Your first companion") + "</strong>" +
        "<p>" + (ready ? "Tap to meet your new friend." : "Earn points to warm the egg.") + "</p>" +
        '<span class="pet-card-bar"><i style="width:' + pct.toFixed(1) + '%"></i></span>' +
        '<span class="pet-card-meta">' + (ready ? "Ready to hatch" : petEggPoints(next) + " / " + EGG_POINTS + " points") + "</span>" +
      "</span>" +
    "</a>";
  }

  function openHatch() {
    var pet = nextPet();
    if (!pet || state.xp < pet.hatchAt) {
      toast("This egg needs more points before it can hatch.");
      return;
    }
    var token = ++hatchToken;
    var root = $("#modal-root");
    root.innerHTML =
      '<div class="modal-backdrop hatch-backdrop">' +
        '<div class="hatch-modal" role="dialog" aria-modal="true" aria-label="Hatch your egg">' +
          '<button class="icon-btn hatch-close" data-action="close-modal" aria-label="Close">' + icon("close") + "</button>" +
          '<div class="hatch-stage" id="hatch-stage"><span class="hatch-egg" id="hatch-egg">🥚</span></div>' +
          '<span class="eyebrow" id="hatch-eyebrow">An egg is hatching</span>' +
          '<h2 id="hatch-title">Something is moving…</h2>' +
          '<p class="hatch-sub" id="hatch-sub">Keep still. It can hear you.</p>' +
          '<div class="hatch-actions" id="hatch-actions"></div>' +
        "</div>" +
      "</div>";
    document.body.classList.add("modal-open");

    var back = $(".hatch-backdrop", root);
    back.addEventListener("click", function (e) {
      if (e.target === back) closeModal();
    });

    setTimeout(function () {
      if (token !== hatchToken) return;
      var egg = $("#hatch-egg");
      if (egg) egg.classList.add("cracking");
    }, 420);

    setTimeout(function () {
      if (token !== hatchToken || !$("#hatch-egg")) return;
      revealHatch(pet);
    }, 1450);
  }

  function revealHatch(pet) {
    if (state.pets.hatched[pet.id]) return;
    state.pets.hatched[pet.id] = { at: new Date().toISOString() };
    state.pets.active = pet.id;
    var badges = checkBadges();
    saveState();
    render();

    var stage = $("#hatch-stage");
    if (!stage) return;

    stage.classList.add("revealed");
    stage.innerHTML = '<span class="hatch-pet pet-tone-' + pet.tone + '" aria-hidden="true">' + pet.emoji + "</span>";

    var title = $("#hatch-title");
    var sub = $("#hatch-sub");
    var eyebrow = $("#hatch-eyebrow");
    var actions = $("#hatch-actions");
    if (eyebrow) eyebrow.textContent = "A new companion";
    if (title) title.textContent = pet.name + " hatched!";
    if (sub) sub.innerHTML = esc(pet.species) + " · " + esc(pet.trait) + "<br>" + esc(pet.blurb);
    if (actions) {
      actions.innerHTML = '<button class="btn btn-primary" data-action="hatch-meet">Meet ' + esc(pet.name) + " " + icon("arrow") + "</button>";
    }

    var modal = $(".hatch-modal");
    if (modal) {
      var burst = document.createElement("div");
      burst.className = "confetti hatch-confetti";
      burst.innerHTML = confetti();
      modal.appendChild(burst);
    }

    announceBadges(badges);
  }

  function petHello() {
    var pet = activePet();
    if (!pet) {
      toast("Hatch an egg first — then your companion can talk.");
      return;
    }
    var line = pet.lines[Math.floor(Math.random() * pet.lines.length)];
    petGreeting = { id: pet.id, line: line };
    speak(line);
    render();
  }

  function selectPet(id) {
    if (!state.pets.hatched[id]) return;
    state.pets.active = id;
    petGreeting = null;
    saveState();
    render();
    var pet = petById(id);
    if (pet) toast(pet.name + " is your companion now.");
  }

  /* ------------------------------------------------------------------ *
   *  Settings modal
   * ------------------------------------------------------------------ */
  function closeModal() {
    var root = $("#modal-root");
    if (root) root.innerHTML = "";
    document.body.classList.remove("modal-open");
  }

  function openModal(html) {
    var root = $("#modal-root");
    root.innerHTML = '<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-label="Settings">' + html + "</div></div>";
    document.body.classList.add("modal-open");
    var modal = $(".modal", root);
    var back = $(".modal-backdrop", root);
    back.addEventListener("click", function (e) {
      if (e.target === back) closeModal();
    });
    var close = $("[data-action='close-modal']", modal);
    if (close) close.addEventListener("click", closeModal);
    return modal;
  }

  function goalHintText(goal) {
    var lessons = Math.max(1, Math.round(goal / 35));
    return "Roughly " + lessons + " short lesson" + (lessons === 1 ? "" : "s") + " or a review session a day.";
  }

  function openSettings() {
    var modal = openModal(
      '<div class="modal-head"><div><h2>Settings & data</h2><p>Curio keeps everything on this device.</p></div>' +
        '<button class="icon-btn" data-action="close-modal" aria-label="Close">' + icon("close") + "</button></div>" +

      '<div class="field"><label for="set-name">Your name</label>' +
        '<div class="inline-field"><input id="set-name" maxlength="24" value="' + esc(state.name) + '" placeholder="Curious person">' +
        '<button class="btn btn-small btn-dark" id="save-name-btn">Save</button></div></div>' +

      '<div class="field"><label>Daily goal</label>' +
        '<div class="segmented" id="goal-seg">' + [20, 40, 60, 80, 100].map(function (g) {
          return '<button data-goal="' + g + '" class="' + (state.goal === g ? "active" : "") + '">' + g + " XP</button>";
        }).join("") + "</div>" +
        '<p class="field-hint" id="goal-hint">' + goalHintText(state.goal) + "</p></div>" +

      '<div class="field"><label>Your progress file</label>' +
        '<div class="data-row">' +
          '<button class="btn btn-small btn-ghost" id="export-btn">' + icon("download") + " Export JSON</button>" +
          '<button class="btn btn-small btn-ghost" id="import-btn">' + icon("upload") + " Import</button>" +
          '<button class="btn btn-small btn-danger" id="reset-btn">' + icon("trash") + " Reset</button>" +
        "</div>" +
        '<p class="field-hint">Export creates a file you can keep or move to another browser. Import replaces your current progress.</p></div>' +

      '<div class="modal-foot"><span class="muted">' + (storageOK ? "Auto-saved locally" : "Storage unavailable — progress lasts for this session only") + "</span>" +
        '<button class="btn btn-small btn-dark" data-action="close-modal">Done</button></div>'
    );

    var nameInput = $("#set-name", modal);
    function saveName() {
      var v = (nameInput.value || "").trim().slice(0, 24);
      state.name = v;
      saveState();
      toast(v ? "Saved. Hello, " + esc(v) + "." : "Name cleared.");
      render();
    }
    $("#save-name-btn", modal).addEventListener("click", saveName);
    nameInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); saveName(); }
    });

    $$("#goal-seg button", modal).forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.goal = Number(btn.getAttribute("data-goal"));
        saveState();
        $$("#goal-seg button", modal).forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var gh = $("#goal-hint", modal);
        if (gh) gh.textContent = goalHintText(state.goal);
        toast("Daily goal set to " + state.goal + " XP.");
        render();
      });
    });

    $("#export-btn", modal).addEventListener("click", exportProgress);
    $("#import-btn", modal).addEventListener("click", function () {
      var input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json,.json";
      input.addEventListener("change", function () {
        if (input.files && input.files[0]) importProgress(input.files[0]);
      });
      input.click();
    });
    $("#reset-btn", modal).addEventListener("click", confirmReset);
  }

  function exportProgress() {
    var payload = {
      app: "Curio",
      exportedAt: new Date().toISOString(),
      state: state
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "curio-progress-" + todayKey() + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    toast("Progress exported.");
  }

  function importProgress(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        var incoming = data && data.state ? data.state : data;
        if (!incoming || typeof incoming !== "object") throw new Error("bad file");
        state = sanitizeState(incoming);
        saveState();
        closeModal();
        render();
        toast("Progress imported. Welcome back.");
      } catch (e) {
        toast("That file does not look like a Curio progress file.");
      }
    };
    reader.onerror = function () { toast("Could not read that file."); };
    reader.readAsText(file);
  }

  function confirmReset() {
    var modal = openModal(
      '<div class="modal-head"><div><h2>Reset everything?</h2><p>This deletes your XP, streak, lessons, words, and notes on this device.</p></div></div>' +
      '<p class="reset-warning">This cannot be undone. Consider exporting first.</p>' +
      '<div class="modal-foot"><button class="btn btn-small btn-ghost" data-action="close-modal">Keep my progress</button>' +
      '<button class="btn btn-small btn-danger" id="reset-yes">' + icon("trash") + " Yes, reset</button></div>"
    );
    $("#reset-yes", modal).addEventListener("click", function () {
      state = defaultState();
      saveState();
      reviewRun = null;
      run = null;
      try { window.localStorage.removeItem(STORE_KEY); } catch (e) { /* ignore */ }
      closeModal();
      location.hash = "#/home";
      render();
      toast("Fresh start. Your first curiosity is waiting.");
    });
  }

  /* ------------------------------------------------------------------ *
   *  Actions
   * ------------------------------------------------------------------ */
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleAction(action, el) {
    switch (action) {
      case "open-settings":
        openSettings();
        break;
      case "close-modal":
        closeModal();
        break;
      case "export":
        exportProgress();
        break;
      case "reset":
        confirmReset();
        break;
      case "filter":
        libFilter = el.getAttribute("data-cat");
        applyLibraryFilters();
        break;
      case "hatch-open":
        openHatch();
        break;
      case "hatch-meet":
        closeModal();
        if (location.hash === "#/pet") render();
        break;
      case "pet-hello":
        petHello();
        break;
      case "pet-select":
        selectPet(el.getAttribute("data-id"));
        break;
      case "set-difficulty":
        setDifficulty(el.getAttribute("data-area"), el.getAttribute("data-level"));
        break;
      case "case-hint":
        var hintCase = caseState(el.getAttribute("data-id"));
        hintCase.hintShown = true;
        saveState();
        render();
        break;
      case "little-option":
        littlePick(Number(el.getAttribute("data-i")));
        break;
      case "little-again":
        if (littleRun) { littleRun = newLittleRun(littleRun.activity); render(); }
        break;
      case "chron-start":
        chronStart();
        break;
      case "chron-choose":
        chronChoose(Number(el.getAttribute("data-i")));
        break;
      case "chron-continue":
        chronContinue();
        break;
      case "chron-again":
        chronStart();
        break;
      case "ai-like":
        aiLike(location.hash.split("/")[2], Number(el.getAttribute("data-i")));
        break;
      case "ai-vote":
        aiVote(location.hash.split("/")[2], Number(el.getAttribute("data-i")));
        break;
      case "ai-answer":
        aiAnswer(location.hash.split("/")[2], Number(el.getAttribute("data-i")));
        break;
      case "ai-starter":
        aiStarter(Number(el.getAttribute("data-i")));
        break;
      case "ai-save":
        aiSave(location.hash.split("/")[2]);
        break;
      case "case-answer":
        caseAnswer(location.hash.split("/")[2], Number(el.getAttribute("data-i")));
        break;
      case "case-next":
        caseNext(location.hash.split("/")[2]);
        break;
      case "case-again":
        caseAgain(location.hash.split("/")[2]);
        break;
      case "clear-filters":
        libFilter = "all";
        libQuery = "";
        var search = $("#lib-search");
        if (search) search.value = "";
        applyLibraryFilters();
        break;
      case "add-word":
        addWordToBank(el.getAttribute("data-word"));
        break;
      case "speak-word":
        var sw = wordById(el.getAttribute("data-word"));
        if (sw) speak(sw.word + ". " + sw.example);
        break;
      case "to-words":
        if (run) { run.stage = 1; render(); scrollTop(); }
        break;
      case "to-read":
        if (run) { run.stage = 0; render(); scrollTop(); }
        break;
      case "reveal":
        if (run) {
          var i = el.getAttribute("data-i");
          run.revealed[i] = !run.revealed[i];
          render();
        }
        break;
      case "start-quiz":
        if (run) { run.stage = 2; run.qIndex = 0; run.picked = null; run.answers = []; render(); scrollTop(); }
        break;
      case "answer":
        if (run && run.picked === null) {
          var idx = Number(el.getAttribute("data-i"));
          run.picked = idx;
          run.answers[run.qIndex] = idx;
          render();
        }
        break;
      case "next-q":
        if (!run) break;
        if (run.qIndex < run.questions.length - 1) {
          run.qIndex += 1;
          run.picked = null;
          render();
          scrollTop();
        } else {
          completeLesson(run);
          run.stage = 3;
          render();
          scrollTop();
        }
        break;
      case "review-now":
        var lessonId = el.getAttribute("data-lesson");
        var lesson = C.lessonById(lessonId);
        if (lesson) {
          var ids = lesson.vocab.map(function (v) { return lesson.id + "::" + v.w; });
          var now = Date.now();
          ids.forEach(function (id) {
            if (state.words[id]) state.words[id].due = now;
          });
          saveState();
          pendingReview = { ids: ids, practice: false };
          location.hash = "#/review";
        }
        break;
      case "show-answer":
        if (reviewRun) { reviewRun.revealed = true; render(); }
        break;
      case "grade":
        gradeWord(el.getAttribute("data-g"));
        break;
      case "practice": {
        var practiceWords = learnedWords().sort(function (a, b) { return a.strength - b.strength; });
        if (!practiceWords.length) { toast("Your word bank is empty — finish a lesson first."); break; }
        var practiceIds = shuffle(practiceWords).slice(0, 10).map(function (w) { return w.id; });
        if (location.hash.indexOf("#/review") === 0) {
          startReview(practiceIds, true);
          render();
        } else {
          pendingReview = { ids: practiceIds, practice: true };
          location.hash = "#/review";
        }
        break;
      }
      default:
        break;
    }
  }

  function addWordToBank(id) {
    var w = wordById(id);
    if (!w) return;
    if (state.words[id]) { toast("Already in your word bank."); return; }
    state.words[id] = {
      id: id,
      lessonId: w.lessonId,
      word: w.word,
      strength: 1,
      due: Date.now() + 86400000,
      seen: 0,
      correct: 0,
      wrong: 0,
      added: Date.now(),
      lastSeen: 0
    };
    saveState();
    var badges = checkBadges();
    saveState();
    announceBadges(badges);
    render();
    toast("“" + esc(w.word) + "” added to your review queue.");
  }

  /* ------------------------------------------------------------------ *
   *  Router
   * ------------------------------------------------------------------ */
  var lastHash = null;

  function appendSiteFooter() {
    var view = $("#view");
    if (!view) return;
    var old = view.querySelector(".app-site-foot");
    if (old) old.remove();
    var foot = document.createElement("footer");
    foot.className = "app-site-foot";
    foot.innerHTML =
      '<span class="app-site-brand">Curio</span>' +
      '<a href="../">About the project</a>' +
      '<span class="app-site-dot">·</span>' +
      '<span>Created by 陳大文, Class 3A</span>' +
      '<span class="app-site-dot">·</span>' +
      '<span>Progress stays on this device</span>';
    view.appendChild(foot);
  }

  function render() {
    var hash = location.hash || "#/home";
    var hashChanged = hash !== lastHash;
    if (hashChanged) {
      run = null;
      reviewRun = null;
      littleRun = null;
      aiAttempt = null;
      petGreeting = null;
    }
    lastHash = hash;

    var parts = hash.replace(/^#\/?/, "").split("/");
    var view = parts[0] || "home";
    var arg = parts[1] || "";

    if (view !== "review") pendingReview = null;

    renderShell(view);

    switch (view) {
      case "library":
        renderLibrary(arg);
        break;
      case "lesson":
        renderLesson(arg);
        break;
      case "review":
        renderReview();
        break;
      case "stats":
        renderStats();
        break;
      case "pet":
        renderPet();
        break;
      case "little":
        renderLittle(arg);
        break;
      case "adventures":
        renderAdventures();
        break;
      case "chronicles":
        renderChronicles();
        break;
      case "ai":
        renderAI(arg);
        break;
      case "whodunit":
        renderWhodunit(arg);
        break;
      case "home":
        renderHome();
        break;
      default:
        location.hash = "#/home";
        return;
    }

    appendSiteFooter();
    if (hashChanged) window.scrollTo(0, 0);
  }

  function updateDocumentTitle(suffix) {
    document.title = suffix + " · Curio";
  }

  /* ------------------------------------------------------------------ *
   *  Global event wiring
   * ------------------------------------------------------------------ */
  function bindGlobal() {
    document.addEventListener("click", function (e) {
      var speakEl = e.target.closest("[data-speak]");
      if (speakEl) {
        e.preventDefault();
        e.stopPropagation();
        speak(speakEl.getAttribute("data-speak"));
        return;
      }
      var actionEl = e.target.closest("[data-action]");
      if (!actionEl) return;
      var action = actionEl.getAttribute("data-action");
      if (action === "close-modal") {
        closeModal();
        return;
      }
      // Do not hijack clicks on real links inside cards.
      if (actionEl.tagName === "A" && actionEl.getAttribute("href")) return;
      e.preventDefault();
      handleAction(action, actionEl);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
      if (e.key === "Enter" || e.key === " ") {
        var card = e.target.closest && e.target.closest(".word-card[data-action='reveal']");
        if (card && e.target === card) {
          e.preventDefault();
          handleAction("reveal", card);
        }
      }
    });

    window.addEventListener("hashchange", render);
  }

  /* ------------------------------------------------------------------ *
   *  Boot
   * ------------------------------------------------------------------ */
  function boot() {
    if (!location.hash) location.hash = "#/home";
    bindGlobal();
    render();
    if (!storageOK) {
      setTimeout(function () {
        toast("Private browsing detected — progress will last only for this session.");
      }, 900);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
