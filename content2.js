/* Curio — Stage 1 (Little Curio) and Stage 3 (Future Worlds) content.
   Loaded after content.js, before app.js. */
window.CURIO_EXTRA = (function () {
  "use strict";

  /* ================================================================ *
   *  STAGE 1 — Little Curio (ages 3–6, sensory, daily)
   * ================================================================ */
  var littleActivities = [
    {
      id: "colors",
      name: "Colours",
      emoji: "🌈",
      sense: "Sight",
      blurb: "Red, blue, yellow — look and tap.",
      rounds: [
        { say: "Find the red apple.", prompt: "Which one is red?", options: [{ e: "🍎", l: "red" }, { e: "🍌", l: "yellow" }, { e: "🫐", l: "blue" }], answer: 0, praise: "Yes! The apple is red." },
        { say: "Find the blue one.", prompt: "Which one is blue?", options: [{ e: "🍇", l: "purple" }, { e: "🫐", l: "blue" }, { e: "🍊", l: "orange" }], answer: 1, praise: "Blue! You found it." },
        { say: "Find the yellow banana.", prompt: "Which one is yellow?", options: [{ e: "🥬", l: "green" }, { e: "🍓", l: "red" }, { e: "🍌", l: "yellow" }], answer: 2, praise: "Yellow banana! Well done." }
      ]
    },
    {
      id: "animals",
      name: "Animal sounds",
      emoji: "🐄",
      sense: "Hearing",
      blurb: "Moo, baa, quack — who says that?",
      rounds: [
        { say: "Who says moo?", prompt: "Who says moo?", options: [{ e: "🐄", l: "cow" }, { e: "🐑", l: "sheep" }, { e: "🦆", l: "duck" }], answer: 0, praise: "Moo! The cow says moo." },
        { say: "Who says quack?", prompt: "Who says quack?", options: [{ e: "🐸", l: "frog" }, { e: "🦆", l: "duck" }, { e: "🐈", l: "cat" }], answer: 1, praise: "Quack quack! The duck." },
        { say: "Who says baa?", prompt: "Who says baa?", options: [{ e: "🐕", l: "dog" }, { e: "🐑", l: "sheep" }, { e: "🐄", l: "cow" }], answer: 1, praise: "Baa! The sheep." }
      ]
    },
    {
      id: "shapes",
      name: "Shapes",
      emoji: "🔺",
      sense: "Sight & touch",
      blurb: "Round, pointy, square — spot the shape.",
      rounds: [
        { say: "Find the circle. A circle is round.", prompt: "Which one is a circle?", options: [{ e: "🔺", l: "triangle" }, { e: "🔵", l: "circle" }, { e: "⬛", l: "square" }], answer: 1, praise: "The blue circle is round." },
        { say: "Find the triangle. A triangle has three sides.", prompt: "Which one is a triangle?", options: [{ e: "🔺", l: "triangle" }, { e: "⚪", l: "circle" }, { e: "🟨", l: "square" }], answer: 0, praise: "Yes! Three sides — a triangle." },
        { say: "Find the square.", prompt: "Which one is a square?", options: [{ e: "🔺", l: "triangle" }, { e: "🔵", l: "circle" }, { e: "⬛", l: "square" }], answer: 2, praise: "Four sides — a square." }
      ]
    },
    {
      id: "textures",
      name: "Textures",
      emoji: "🧸",
      sense: "Touch",
      blurb: "Soft, hard, wet — describe how things feel.",
      rounds: [
        { say: "Which one is soft?", prompt: "Which one is soft?", options: [{ e: "🧸", l: "teddy" }, { e: "🪨", l: "rock" }, { e: "💧", l: "water" }], answer: 0, praise: "The teddy is soft." },
        { say: "Which one is wet?", prompt: "Which one is wet?", options: [{ e: "🪵", l: "wood" }, { e: "💧", l: "water" }, { e: "🧱", l: "brick" }], answer: 1, praise: "Water is wet." },
        { say: "Which one is hard?", prompt: "Which one is hard?", options: [{ e: "☁️", l: "cloud" }, { e: "🎈", l: "balloon" }, { e: "🪨", l: "rock" }], answer: 2, praise: "The rock is hard." }
      ]
    },
    {
      id: "feelings",
      name: "Feelings",
      emoji: "😊",
      sense: "Heart",
      blurb: "Happy, sad, sleepy — name the feeling.",
      rounds: [
        { say: "Who is happy?", prompt: "Who is happy?", options: [{ e: "😊", l: "happy" }, { e: "😢", l: "sad" }, { e: "😴", l: "sleepy" }], answer: 0, praise: "A big smile — happy!" },
        { say: "Who is sleepy?", prompt: "Who is sleepy?", options: [{ e: "😮", l: "surprised" }, { e: "😴", l: "sleepy" }, { e: "😊", l: "happy" }], answer: 1, praise: "Yawning — sleepy." },
        { say: "Who is sad?", prompt: "Who is sad?", options: [{ e: "😡", l: "angry" }, { e: "😊", l: "happy" }, { e: "😢", l: "sad" }], answer: 2, praise: "A tear — sad. It is okay to feel sad." }
      ]
    },
    {
      id: "counting",
      name: "Counting",
      emoji: "⭐",
      sense: "Sight & numbers",
      blurb: "One, two, three — count with your eyes.",
      rounds: [
        { say: "Tap the group with three stars.", prompt: "Which group has three stars?", options: [{ e: "⭐⭐⭐", l: "three" }, { e: "⭐", l: "one" }, { e: "⭐⭐⭐⭐⭐", l: "five" }], answer: 0, praise: "One, two, three! Three stars." },
        { say: "Tap the group with one star.", prompt: "Which group has one star?", options: [{ e: "⭐⭐", l: "two" }, { e: "⭐⭐⭐⭐", l: "four" }, { e: "⭐", l: "one" }], answer: 2, praise: "Just one star." },
        { say: "Tap the group with two stars.", prompt: "Which group has two stars?", options: [{ e: "⭐⭐⭐", l: "three" }, { e: "⭐⭐", l: "two" }, { e: "⭐", l: "one" }], answer: 1, praise: "Two stars! Count them: one, two." }
      ]
    }
  ];

  var stickers = [
    { e: "🌟", n: "Shining star" },
    { e: "🌈", n: "Rainbow" },
    { e: "🦋", n: "Butterfly" },
    { e: "🐢", n: "Slow turtle" },
    { e: "🍓", n: "Sweet strawberry" },
    { e: "🚀", n: "Little rocket" },
    { e: "🐳", n: "Big whale" },
    { e: "🌻", n: "Sunflower" },
    { e: "🎈", n: "Red balloon" },
    { e: "🦊", n: "Clever fox" },
    { e: "🍪", n: "Happy cookie" },
    { e: "🌙", n: "Goodnight moon" }
  ];

  /* ================================================================ *
   *  STAGE 3 — Chronicles: a colony survival text adventure
   * ================================================================ */
  var chronicles = {
    title: "Chronicles: Kepler Station",
    tagline: "A colony. Forty days of darkness. Every choice costs something.",
    emoji: "🛰️",
    minutes: 12,
    intro: "You are the new systems lead on Kepler Station, a small colony on a moon at the edge of a gas giant's shadow. The colony has survived one long night. This year the night will last forty days. Read the logs, weigh the evidence, and keep your people alive.",
    startResources: { oxygen: 62, water: 58, food: 60, power: 64, morale: 62 },
    chapters: [
      {
        id: "power",
        title: "Log 01 — The Long Dark",
        log: "Kepler Station circles a gas giant at the edge of the habitable zone. For forty days each year the moon slips into the planet's shadow, and the sun disappears. The colony lives on stored energy. Engineering reports that the photovoltaic wings are still working, but dust has cut their output by nearly a fifth. The old fission reactor has never been restarted since landing; its fuel is sealed and its safety record is good, but the crew remembers the training videos.",
        vocab: [
          { w: "photovoltaic", def: "able to turn sunlight directly into electricity" },
          { w: "baseload", def: "the minimum amount of power a system needs all the time" },
          { w: "output", def: "the amount of energy or work something produces" }
        ],
        question: "How will you keep the lights on through the long night?",
        options: [
          {
            label: "Clean the solar wings and ration power.",
            detail: "Send two crew outside for six hours. Save energy everywhere else.",
            effects: { power: 12, morale: 4, oxygen: -2 },
            outcome: "The wings come back to 94% output. Heaters drop to 15°C and everyone wears an extra layer, but the lights stay on. Morale holds.",
            note: "Solar is clean and cheap, but it needs storage and maintenance."
          },
          {
            label: "Restart the sealed fission reactor.",
            detail: "A steady baseload, but the crew is nervous.",
            effects: { power: 28, morale: -12, oxygen: 0 },
            outcome: "The reactor wakes with a deep hum. Power is no longer a worry — but three crew members ask to move their bunks away from the reactor wall.",
            note: "Nuclear power is dense and reliable, yet trust matters as much as watts."
          },
          {
            label: "Switch off non-essential systems.",
            detail: "Dark corridors, cold water, no entertainment.",
            effects: { power: 6, morale: -14, food: -4 },
            outcome: "The station becomes quiet and grey. Power use falls, but so does the colony's mood — and the cold storage loses a little food.",
            note: "Saving energy is not free: comfort and morale are resources too."
          }
        ]
      },
      {
        id: "water",
        title: "Log 02 — The Closed Loop",
        log: "Water is recycled through a closed loop: showers, sinks and urine pass through filters, and the clean water returns to the tanks. The system is good, but the membrane filters are three years past their replacement date. Meanwhile, a survey drone has found a frozen lake under the northern crater, twelve kilometres away. Drilling for ice would need a convoy and a lot of power. The colony has enough water for eighteen days at current use.",
        vocab: [
          { w: "reclamation", def: "the process of cleaning used water so it can be used again" },
          { w: "membrane", def: "a thin layer that filters substances as water passes through it" },
          { w: "ration", def: "to limit how much of something each person may use" }
        ],
        question: "Where will the water come from?",
        options: [
          {
            label: "Send a convoy to drill the crater ice.",
            detail: "Twelve kilometres over rough ground, in the dark.",
            effects: { water: 24, power: -14, morale: -4 },
            outcome: "The convoy returns with two tanks of ice. It was slow and cold, and the drill team is exhausted, but the reservoirs are full again.",
            note: "New sources help — if you can afford the energy to reach them."
          },
          {
            label: "Rebuild the reclamation loop.",
            detail: "Print new membranes. Keep every drop in the loop.",
            effects: { water: 12, power: -4, morale: 5 },
            outcome: "The loop runs cleaner than it has in years. Crew members stop counting their shower seconds. The repair buys weeks, not months.",
            note: "Efficiency is often cheaper than exploration."
          },
          {
            label: "Ration water strictly.",
            detail: "Two litres per person per day. No showers.",
            effects: { water: 6, morale: -15, food: -3 },
            outcome: "Water lasts longer, but the station smells of sweat and the hydroponics bay wilts. Two crew members argue over a bucket.",
            note: "Rationing stretches a supply; it does not create one."
          }
        ]
      },
      {
        id: "food",
        title: "Log 03 — Sixteen Hundred Calories",
        log: "The hydroponics bay grows lettuce, beans and dwarf wheat under pink lamps. The harvest is steady, but it cannot feed forty people for forty days. The supply ship is not due until the sun returns. In storage there are seed vaults, a crate of mealworm starter cultures, and a trade contract with a passing cargo vessel that will accept station power as payment. The cook says the crew will accept almost anything except another bowl of plain beans.",
        vocab: [
          { w: "hydroponics", def: "growing plants in water with nutrients instead of soil" },
          { w: "protein", def: "a nutrient needed to build and repair the body" },
          { w: "yield", def: "the amount of food or crop produced" }
        ],
        question: "What will the colony eat?",
        options: [
          {
            label: "Expand the hydroponics bay.",
            detail: "More lamps, more trays, more power.",
            effects: { food: 22, power: -16, morale: 5 },
            outcome: "The bay glows brighter every hour. Fresh greens appear on the menu, and the crew stops joking about beans.",
            note: "Plant-based food is efficient, but it needs light and heat."
          },
          {
            label: "Start a mealworm farm.",
            detail: "Cheap protein, uncomfortable idea.",
            effects: { food: 15, morale: -9, water: -3 },
            outcome: "The farm produces more protein than expected. The first meal is met with silence, then nervous laughter, then a second helping.",
            note: "Insect protein is sustainable and cheap; culture changes more slowly."
          },
          {
            label: "Trade station power for cargo food.",
            detail: "A deal with a passing freighter.",
            effects: { food: 18, power: -8, morale: 3 },
            outcome: "The freighter docks for eight hours. In exchange for a heavy draw on the station's batteries, the colony gains dried fruit, rice and a box of chocolate.",
            note: "Trade solves today's shortage by spending tomorrow's reserves."
          }
        ]
      },
      {
        id: "air",
        title: "Log 04 — The Air We Breathe",
        log: "Oxygen comes from two places: the hydroponics bay and an ageing chemical scrubber. The scrubber removes carbon dioxide but does not replace oxygen. A biology team proposes a bioreactor full of algae — single-celled plants that photosynthesise, produce oxygen and can be dried into food. The reactor would need light, warm water and careful monitoring. The alternative is to seal off two sections of the station and let them go cold, reducing the volume of air that must be cleaned.",
        vocab: [
          { w: "bioreactor", def: "a container where living cells are used to make useful products" },
          { w: "scrubber", def: "a machine that removes unwanted gas from the air" },
          { w: "photosynthesis", def: "the process plants use to turn light into food and oxygen" }
        ],
        question: "How will you keep the air breathable?",
        options: [
          {
            label: "Build the algae bioreactor.",
            detail: "A living system that makes oxygen and food.",
            effects: { oxygen: 22, food: 4, power: -12 },
            outcome: "The reactor turns a deep, healthy green. Oxygen levels climb, and the cook experiments with algae bread. It is not popular, but it works.",
            note: "Living systems can do two jobs at once — if you keep them alive."
          },
          {
            label: "Service the chemical scrubbers.",
            detail: "Reliable, familiar, a little grim.",
            effects: { oxygen: 15, power: -9, morale: -4 },
            outcome: "The scrubbers run at full efficiency again. The air smells faintly of metal, and the crew complains, but the oxygen monitor stops blinking.",
            note: "Conventional technology is predictable; it rarely inspires anyone."
          },
          {
            label: "Seal two sections and let them go cold.",
            detail: "Less air to clean, less space to live.",
            effects: { oxygen: 7, morale: -13, food: -3 },
            outcome: "Two corridors are closed with yellow tape. The station feels smaller. Oxygen lasts, but so does the sense of being trapped.",
            note: "Shrinking a system can buy time at the cost of well-being."
          }
        ]
      },
      {
        id: "storm",
        title: "Log 05 — The Storm",
        log: "On day thirty-one, the station's sensors detect a coronal mass ejection: a cloud of charged particles thrown out by the distant sun. It will reach the moon in six hours. The hull can absorb most of it, but the greenhouse glass and the external antennae are exposed. The crew can shelter in the central core, or they can spend the storm keeping the crops warm and the antenna aligned. The colony's doctor warns that stress is already high; the engineer warns that the storm is not negotiable.",
        vocab: [
          { w: "coronal mass ejection", def: "a large burst of charged particles from the sun" },
          { w: "shelter", def: "a safe place that protects you from danger" },
          { w: "exposed", def: "not protected from weather, radiation or harm" }
        ],
        question: "How will you face the storm?",
        options: [
          {
            label: "Move everyone to the central core.",
            detail: "Safety first. The greenhouse can wait.",
            effects: { morale: -5, power: -10, food: -4, oxygen: 2 },
            outcome: "Forty people sit shoulder to shoulder in the core for nine hours, playing cards and telling stories. The storm scratches the greenhouse but no one is hurt.",
            note: "Protecting people is a choice; it still has a cost."
          },
          {
            label: "Keep the crops warm and the antenna aligned.",
            detail: "Work through the storm in shifts.",
            effects: { food: 6, power: -14, morale: 6, oxygen: -4 },
            outcome: "The crew works in pairs, roped together, while the sky glows. The harvest survives and the antenna holds. Everyone is tired and strangely proud.",
            note: "Shared risk can build morale — but it is a risk."
          },
          {
            label: "Evacuate to the shuttle until it passes.",
            detail: "Abandon the station's systems for a day.",
            effects: { morale: -10, power: -12, food: -6, oxygen: -4 },
            outcome: "The shuttle is crowded and cold. When the crew returns, the greenhouse has lost heat and the batteries are low. Nobody speaks much.",
            note: "Retreat is sometimes wise — but systems left alone tend to fail."
          }
        ]
      }
    ]
  };

  function chronicleEnding(resources) {
    var keys = ["oxygen", "water", "food", "power", "morale"];
    var min = Math.min.apply(null, keys.map(function (k) { return resources[k]; }));
    var avg = keys.reduce(function (s, k) { return s + resources[k]; }, 0) / keys.length;
    if (min <= 0) {
      return {
        grade: "Colony lost",
        tone: "bad",
        title: "The station goes dark.",
        text: "One system failed, and the others followed. The evacuation order comes too late. In the log, your final entry is short: “Next crew: keep the margins wider than you think you need.”"
      };
    }
    if (avg >= 62) {
      return {
        grade: "Thriving colony",
        tone: "great",
        title: "The sun returns to a working station.",
        text: "Forty days later, the first light touches the solar wings. The greenhouse is green, the tanks are full, and the crew is tired but together. Your choices did not just keep people alive — they kept the colony worth living in."
      };
    }
    if (avg >= 45) {
      return {
        grade: "Fragile survival",
        tone: "ok",
        title: "The colony survives — barely.",
        text: "The sun rises on a station held together with tape and stubbornness. Everyone is alive, but two systems are on their last legs. Survival is not the same as sustainability; next year will be harder."
      };
    }
    return {
      grade: "Hard-won foothold",
      tone: "warn",
      title: "The sun finds a colony on its knees.",
      text: "You kept the air, the water and the people — but only just. The log is full of red warnings. The colony has learned what it cannot afford next year."
    };
  }

  /* ================================================================ *
   *  STAGE 3 — AI & Our Future World
   * ================================================================ */
  var aiBriefings = [
    {
      id: "algorithms",
      num: "01",
      title: "The Algorithm Decides What You See",
      emoji: "📱",
      topic: "Social media",
      minutes: 4,
      summary: "Why your feed looks the way it does — and what that does to a debate.",
      paragraphs: [
        "When you open a social media app, you do not see the world. You see a version of it chosen by a recommendation algorithm — a system that ranks posts by how likely you are to stop, read, react or share.",
        "The system learns from engagement: every pause, like, rewatch and angry reply is a signal. It does not need to know what is true or healthy. It only needs to know what keeps you scrolling. Critics warn that this can create a filter bubble, where you mostly see opinions you already hold, made louder by repetition.",
        "Other researchers argue that the effect is real but exaggerated: many people use several platforms and still encounter disagreement. What is not seriously disputed is that ranking shapes attention. If a platform can change what a billion people see, explaining its choices is not a technical detail. It is a question about power."
      ],
      vocab: [
        { w: "recommendation", def: "a suggestion about what you might want to see or buy" },
        { w: "engagement", def: "the amount of attention and interaction content receives" },
        { w: "filter bubble", def: "a situation where you mainly meet information that confirms your views" }
      ],
      forum: [
        { author: "lena_reads", emoji: "🦉", text: "My feed is 90% one opinion. I never chose that. It feels like the app is deciding who I am.", likes: 34 },
        { author: "sam_builds", emoji: "🔧", text: "I follow people I disagree with on purpose. The algorithm is not the only thing shaping your feed — your choices matter too.", likes: 21 },
        { author: "mira.k", emoji: "🌱", text: "If platforms had to explain why a post was shown to me, at least we could argue with evidence instead of guessing.", likes: 48 }
      ],
      poll: {
        question: "Should platforms be required to explain why they show you a post?",
        options: ["Yes — always", "Only for political content", "No — it would expose trade secrets"],
        results: [58, 27, 15],
        note: "A majority of readers in this simulated poll chose transparency."
      },
      challenge: {
        instruction: "Choose the best linking word. Then read the sentence aloud.",
        sentence: "___ platforms explain their recommendations, users cannot judge what they are not shown.",
        options: ["Although", "Unless", "Because"],
        answer: 1,
        explain: "“Unless” introduces the condition that must happen for the result to change: without explanation, users cannot judge."
      },
      write: {
        prompt: "Should platforms be required to explain why they show you a post? Write a claim, a reason, and a concrete example.",
        starters: ["In my opinion, platforms should … because …", "Although transparency is difficult, …", "For example, if I search for …"]
      }
    },
    {
      id: "tutors",
      num: "02",
      title: "Can a Machine Be a Teacher?",
      emoji: "🎓",
      topic: "Education",
      minutes: 4,
      summary: "AI tutors are patient and always available. That is not the whole story.",
      paragraphs: [
        "An AI tutor can explain fractions at midnight, in your first language, as many times as you need. It does not sigh, run out of patience or teach thirty other students at once. For learners without access to good teachers, that is not a small thing.",
        "But a tutor is not only a machine that gives answers. A good teacher notices why a student is stuck: the fear behind a wrong answer, the gap in earlier knowledge, the day when nobody at home had time to help. An AI can respond to patterns in text; it cannot sit beside you in the corridor.",
        "There is also the question of honesty. Using AI to explain an idea is learning. Using it to produce work you claim as your own is plagiarism, and many schools are still deciding where the line falls. The technology is arriving faster than the rules."
      ],
      vocab: [
        { w: "personalised", def: "designed for one particular person's needs" },
        { w: "plagiarism", def: "using someone else's work or ideas as if they were your own" },
        { w: "accessibility", def: "how easy it is for everyone to use or reach something" }
      ],
      forum: [
        { author: "omar_studies", emoji: "📚", text: "My AI tutor explains physics better than my textbook. It never makes me feel stupid for asking again.", likes: 52 },
        { author: "teach_ellen", emoji: "🍎", text: "I can tell when a student has copied an answer. What I cannot always tell is whether they learned anything from it.", likes: 41 },
        { author: "priya.codes", emoji: "💻", text: "Accessibility is the real story. A blind student I know uses AI to describe diagrams. That is a superpower, not a shortcut.", likes: 63 }
      ],
      poll: {
        question: "Should students be allowed to use AI for homework?",
        options: ["Yes, if they disclose how they used it", "Only for practice, not final work", "No, not at all"],
        results: [44, 39, 17],
        note: "The simulated readers split: disclosure is popular, but so is a clear line between practice and assessment."
      },
      challenge: {
        instruction: "Choose the best linking word. Then read the sentence aloud.",
        sentence: "___ AI tutors are useful, they cannot replace a teacher who knows the student.",
        options: ["Unless", "Because", "Although"],
        answer: 2,
        explain: "“Although” signals a contrast: AI tutors are useful, but there is a limitation."
      },
      write: {
        prompt: "Is an AI tutor a good replacement for a human teacher? Write two or three sentences using “although”, “because” and an example.",
        starters: ["Although AI tutors can …, they cannot …", "A human teacher matters because …", "For example, when I …"]
      }
    },
    {
      id: "deepfakes",
      num: "03",
      title: "When Seeing Is No Longer Believing",
      emoji: "🎭",
      topic: "Media & trust",
      minutes: 4,
      summary: "Synthetic video is getting cheaper. Trust is getting more expensive.",
      paragraphs: [
        "A deepfake is synthetic media: video, audio or images generated or altered by a model so that a person appears to say or do something they never did. Early versions were easy to spot. Current ones can fool careful viewers for a few seconds — often long enough for a clip to travel around the world.",
        "The damage is not only the fake itself. It is the doubt that follows. If any recording might be synthetic, a politician caught on tape can simply call it a fake, and the public has no easy way to check. Researchers call this the “liar's dividend”: the real benefit of deepfakes may be the ability to deny real evidence.",
        "Some protections already exist: watermarking, provenance standards that record how media was made, and laws against non-consensual intimate images. None of them is complete. Verification is becoming a basic literacy skill — like checking whether a website is trustworthy, only faster."
      ],
      vocab: [
        { w: "synthetic", def: "made by a process or machine rather than occurring naturally" },
        { w: "provenance", def: "a record of where something came from and how it was made" },
        { w: "verification", def: "the process of checking that something is true or real" }
      ],
      forum: [
        { author: "noor_factchecks", emoji: "🔍", text: "The question is no longer “is this video fake?” It is “who can prove where it came from?”", likes: 57 },
        { author: "alex.films", emoji: "🎬", text: "Watermarks help until someone removes them. We need tools that survive re-uploading, not just labels.", likes: 29 },
        { author: "jules_teacher", emoji: "🧠", text: "My students spotted a fake in four seconds with a reverse image search. Media literacy works — we just need to teach it earlier.", likes: 44 }
      ],
      poll: {
        question: "Who should be most responsible for stopping harmful deepfakes?",
        options: ["Platforms that host them", "Governments and regulators", "The people who create and share them"],
        results: [38, 31, 31],
        note: "The simulated poll is almost evenly split — a sign that this is a genuinely hard question."
      },
      challenge: {
        instruction: "Choose the best linking word. Then read the sentence aloud.",
        sentence: "___ a video looks completely real, it may be entirely synthetic.",
        options: ["So that", "Even though", "Unless"],
        answer: 1,
        explain: "“Even though” introduces a surprising contrast: realism does not guarantee authenticity."
      },
      write: {
        prompt: "Should AI-generated voices and videos be labelled by law? Explain your position with one example and one possible objection.",
        starters: ["I believe labelling should …, because …", "Some people argue … However, …", "For example, if a …"]
      }
    }
  ];

  /* ================================================================ *
   *  STAGE 3 — The Whodunit Mystery Club
   * ================================================================ */
  var cases = [
    {
      id: "manuscript",
      title: "The Midnight Manuscript",
      era: "Holloway Hall, England · 1934",
      emoji: "📜",
      difficulty: "Warm-up",
      minutes: 9,
      backdrop: "Lord Ashworth has spent seven years writing The Cartographer's Daughter. His rival, Julian Cross, has published a novel every spring — and this year, the reviews were cruel. Tonight, a storm has cut the telephone line. At breakfast, Ashworth's study is found open. The only manuscript of Chapter Twelve is missing, and the grate is full of ash.",
      brief: "Read the four clues, study the three alibis, then make your accusation. A good detective separates what is strange from what is impossible.",
      clues: [
        { id: "page", emoji: "🔥", title: "A burned page", text: "In the study grate, one corner of paper survived: “Chapter Twelve: The Cartographer's—”. The rest is ash. The fire is still warm." },
        { id: "telegram", emoji: "📠", title: "A telegram", text: "Found in the hall: “GREAT EASTERN RAILWAY. ALL SERVICES SUSPENDED DUE TO STORM. PASSENGERS ADVISED TO STAY OVERNIGHT.” It is addressed to J. Cross, Holloway Hall, 8:15 p.m." },
        { id: "boots", emoji: "👣", title: "Muddy prints", text: "Wet prints cross the study carpet from the terrace window to the desk. They are men's boots, size ten, and the mud matches the flowerbed outside." },
        { id: "letter", emoji: "✉️", title: "A half-burnt letter", text: "In the same grate: “Dear Lord Ashworth, with reference to the striking similarities between Chapter Twelve and Mr Cross's earlier work, we are prepared to proceed…” The signature is from Ashworth's solicitor." }
      ],
      suspects: [
        { name: "Julian Cross", role: "Rival novelist, staying overnight", emoji: "🎩", alibi: "“I caught the 9:40 express to London. I was not even in the house at ten o'clock.”" },
        { name: "Miss Ada Finch", role: "Lord Ashworth's secretary", emoji: "✒️", alibi: "“I was in the annex typing letters until ten. My typewriter ribbon jammed at half past nine — you can check it.”" },
        { name: "Mrs. Bell", role: "Housekeeper", emoji: "🔑", alibi: "“I served cocoa at nine, then went to my room. I heard the wind and nothing else.”" }
      ],
      questions: [
        {
          q: "Who took Chapter Twelve?",
          options: ["Miss Ada Finch", "Julian Cross", "Mrs. Bell"],
          answer: 1,
          explain: "The mud on the study carpet matches men's size-ten boots, and Cross is the only male guest."
        },
        {
          q: "Which clue proves that Cross's alibi is false?",
          options: ["The burned page", "The telegram", "The letter from the solicitor"],
          answer: 1,
          explain: "The 8:15 telegram says all trains were suspended. The 9:40 express could not have left."
        },
        {
          q: "What was Cross's likely motive?",
          options: ["He wanted the housekeeper's job", "He owed money to the railway", "Ashworth's solicitor was preparing a plagiarism claim"],
          answer: 2,
          explain: "The half-burnt letter shows Ashworth was about to accuse Cross of copying his work."
        }
      ],
      solution: {
        who: "Julian Cross",
        paragraph: "The impossible alibi is the crack in the case. The railway telegram — sent at 8:15 and addressed to Cross — says every train was suspended because of the storm. So the 9:40 express never left, and Cross was still in the house. The muddy size-ten prints show a man entering the study from the terrace. In the grate, he burned the chapter, but a corner survived; the same fire also caught the solicitor's letter, which reveals his motive. Ashworth had discovered that Cross's celebrated earlier novel was copied from his unpublished work. Cross came for the proof, and took the chapter with it. Miss Finch was at her typewriter; Mrs. Bell was asleep. Both told the truth. Only Cross built his story around a train that never came."
      }
    },
    {
      id: "violinist",
      title: "The Vanishing Violinist",
      era: "Vienna, Austria · 1897",
      emoji: "🎻",
      difficulty: "Detective",
      minutes: 10,
      backdrop: "At the Musikverein, the young violinist Klara Weiss is about to make her debut. During the interval, her violin disappears from the locked dressing room. It is not a Stradivarius, but it belonged to her mother, and the concert cannot continue without it. Outside, snow falls on the Ringstrasse. Inside, three people had a reason to be near the corridor.",
      brief: "The room was locked. That does not mean nobody entered. Examine the clues, test each alibi, then name the thief.",
      clues: [
        { id: "glove", emoji: "🧤", title: "A caught glove", text: "A silk glove is trapped in the hinge of the dressing-room door. Inside the cuff, embroidered in gold thread: the letter L." },
        { id: "keylog", emoji: "🗝️", title: "The key ledger", text: "The spare key was signed out at 7:45 p.m. The signature reads “M. Laurent”. It was never returned to the hook." },
        { id: "silence", emoji: "🎹", title: "The piano tuner", text: "The tuner worked in the practice rooms from 8:00 to 8:50. He says Mme. Laurent's room was silent the whole time — no scales, no piano, no violin." },
        { id: "note", emoji: "📝", title: "A note", text: "In Mme. Laurent's dressing room, under a powder box: “After tonight, the stage will be mine.”" }
      ],
      suspects: [
        { name: "Mme. Isabelle Laurent", role: "Rival violinist", emoji: "🌹", alibi: "“I was practising in my room from eight until the interval. Ask anyone who heard me.”" },
        { name: "Herr Vogel", role: "Conductor", emoji: "🎼", alibi: "“I was in my office marking scores. The concertmaster came in at a quarter to nine.”" },
        { name: "Tomas", role: "Stagehand", emoji: "🔧", alibi: "“I was below the stage, fixing the lift. It takes two people to move it, but I was alone.”" }
      ],
      questions: [
        {
          q: "Who took the violin?",
          options: ["Herr Vogel", "Mme. Isabelle Laurent", "Tomas"],
          answer: 1,
          explain: "The glove is embroidered “L”, the key was signed out in her name, and her alibi is false."
        },
        {
          q: "Which clue contradicts Laurent's alibi?",
          options: ["The glove was silk", "The key ledger was kept at the stage door", "The piano tuner heard no music from her room"],
          answer: 2,
          explain: "She claimed to be practising, but the tuner heard silence from 8:00 to 8:50."
        },
        {
          q: "What was her motive?",
          options: ["Professional jealousy and ambition", "She needed money for the key", "She was protecting Klara"],
          answer: 0,
          explain: "The note — “After tonight, the stage will be mine” — shows ambition and resentment."
        }
      ],
      solution: {
        who: "Mme. Isabelle Laurent",
        paragraph: "The locked door was never the puzzle. The spare key was signed out at 7:45 in Laurent's own hand, and a glove embroidered “L” was caught in the hinge as she left. Her alibi depended on being heard practising; the piano tuner, working twenty metres away, heard nothing for fifty minutes. The note under her powder box supplies the motive: after tonight, the stage would be hers. Vogel was with the concertmaster, and Tomas was alone below the stage — inconvenient, but not incriminating. Laurent took the violin to silence her rival's debut. A search of her dressing-room trunk would end the case."
      }
    }
  ];

  return {
    littleActivities: littleActivities,
    stickers: stickers,
    chronicles: chronicles,
    chronicleEnding: chronicleEnding,
    aiBriefings: aiBriefings,
    cases: cases
  };
})();
