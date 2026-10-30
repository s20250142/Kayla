/* Curio — lesson content.
   Every lesson: a short true-ish reading, 5 words, 4 questions, 1 writing prompt.
   Level: B1–B2. Words are glossed in plain English. */
window.CURIO_CONTENT = (function () {
  "use strict";

  var categories = [
    { id: "nature",  name: "Nature & Animals", emoji: "🐙", blurb: "Three hearts, blue blood, and trees that trade." },
    { id: "space",   name: "Space",            emoji: "🪐", blurb: "A day longer than a year." },
    { id: "history", name: "History",          emoji: "🏛️", blurb: "When soldiers fought birds — and lost." },
    { id: "food",    name: "Food",             emoji: "🧅", blurb: "The chemistry behind your tears." },
    { id: "words",   name: "Words & Language", emoji: "📖", blurb: "The little word with 430 meanings." },
    { id: "science", name: "Science & Body",   emoji: "🔬", blurb: "You are outnumbered by bacteria." },
    { id: "mind",    name: "Mind & Memory",    emoji: "🧠", blurb: "Why songs get stuck in your head." },
    { id: "tech",    name: "Technology",       emoji: "💡", blurb: "The first computer bug was a real insect." }
  ];

  var lessons = [
    /* ------------------------------------------------------------------ 1 */
    {
      id: "octopus",
      category: "nature",
      title: "The Octopus: Three Hearts, Blue Blood",
      emoji: "🐙",
      minutes: 4,
      hook: "An alien intelligence is living in our ocean — and it can squeeze through a hole the size of a coin.",
      paragraphs: [
        "An octopus has three hearts, blue blood, and no bones. That last fact might be the most surprising: because an octopus has no skeleton, it can squeeze its whole body through a hole the size of a coin.",
        "Two of its hearts pump blood to the gills, where oxygen is collected from the water. The third heart serves the rest of the body. The blood is blue because it carries oxygen using copper instead of iron, the way ours does.",
        "Octopuses are also escape artists. They can change the colour and texture of their skin in under a second, and they mimic other animals — flatfish, sea snakes, even crabs — to avoid predators. If an octopus loses an arm, it can grow a new one.",
        "In 2009, researchers watched an octopus collect coconut shells, carry them across the tank, and use them as a shield. That kind of planning was once thought to belong only to animals with backbones.",
        "The octopus is, in other words, an alien mind sharing our planet."
      ],
      didYouKnow: "An octopus has about 500 million neurons — and two-thirds of them are in its arms. Each arm can taste and decide things almost on its own.",
      prompt: "If you could borrow one ability from an octopus for a day, which would you choose — camouflage, eight arms, or blue blood? Why?",
      vocab: [
        { w: "gill",       pos: "noun",      ipa: "/ɡɪl/",          def: "the organ fish and octopuses use to take oxygen from water", ex: "Blood flows through the gills, where it picks up oxygen." },
        { w: "pump",       pos: "verb",      ipa: "/pʌmp/",         def: "to push liquid or gas somewhere with force", ex: "Two hearts pump blood to the gills." },
        { w: "mimic",      pos: "verb",      ipa: "/ˈmɪmɪk/",       def: "to copy the way another living thing looks, sounds, or moves", ex: "Some octopuses mimic flatfish to hide from predators." },
        { w: "predator",   pos: "noun",      ipa: "/ˈpredətə(r)/",  def: "an animal that hunts and eats other animals", ex: "Sharks are one of the octopus's main predators." },
        { w: "vertebrate", pos: "noun",      ipa: "/ˈvɜːtɪbrət/",   def: "an animal with a spine, such as a fish, bird, or human", ex: "Tool use was once thought to be limited to vertebrates." }
      ],
      quiz: [
        { q: "Why can an octopus squeeze through a very small hole?",
          options: ["It has no bones", "It can breathe outside water", "Its arms fall off", "It has very strong muscles"],
          answer: 0, explain: "With no skeleton, the only hard part of an octopus is its beak — so almost its whole body can change shape." },
        { q: "Why is octopus blood blue?",
          options: ["It contains copper instead of iron", "It has no oxygen in it", "It is full of ink", "It is colder than human blood"],
          answer: 0, explain: "The protein that carries oxygen in octopus blood uses copper, which turns the blood blue." },
        { q: "What does “mimic” mean in the passage?",
          options: ["To copy another animal's appearance", "To swim very quickly", "To make a loud sound", "To eat without stopping"],
          answer: 0 },
        { q: "What did the 2009 coconut-shell observation suggest?",
          options: ["Octopuses can plan and use objects", "Octopuses prefer tropical water", "Octopuses sleep in shells", "Octopuses cannot see colours"],
          answer: 0, explain: "Carrying a shell around to use later as a shield implies planning — a complex behaviour." }
      ]
    },

    /* ------------------------------------------------------------------ 2 */
    {
      id: "venus",
      category: "space",
      title: "A Day on Venus Is Longer Than a Year",
      emoji: "🪐",
      minutes: 3,
      hook: "Venus takes 243 Earth days to turn once — but only 225 to go around the Sun.",
      paragraphs: [
        "Venus spins on its axis once every 243 Earth days, while it orbits the Sun in just 225 Earth days. In other words, a single day on Venus lasts longer than its year.",
        "The planet also rotates backwards compared with most of the others. On Venus, the Sun would appear to rise in the west and set in the east — if you could see it at all through the clouds.",
        "That slow spin helps explain Venus's fierce weather. Its atmosphere is about 96% carbon dioxide, and the greenhouse effect traps heat so effectively that the surface is around 465°C — hot enough to melt lead. Gentle winds near the ground become jet streams at the cloud tops, circling the planet in four days.",
        "Venus is often called Earth's twin, because the two planets are similar in size and mass. But the twin took a very different path. Our neighbour is a runaway greenhouse: a warning about what an atmosphere can do."
      ],
      didYouKnow: "Venus is the brightest natural object in our night sky after the Moon. You have probably seen it without knowing — it is the “evening star”.",
      prompt: "Would you rather visit Venus or Mars? Write two sentences giving your reasons.",
      vocab: [
        { w: "axis",       pos: "noun",      ipa: "/ˈæksɪs/",       def: "the imaginary line a planet turns around", ex: "Earth spins on its axis once a day." },
        { w: "orbit",      pos: "verb",      ipa: "/ˈɔːbɪt/",       def: "to travel in a circle or curve around a planet or star", ex: "Venus orbits the Sun in 225 Earth days." },
        { w: "rotate",     pos: "verb",      ipa: "/rəʊˈteɪt/",     def: "to turn around a centre point", ex: "Venus rotates in the opposite direction to Earth." },
        { w: "atmosphere", pos: "noun",      ipa: "/ˈætməsfɪə(r)/", def: "the layer of gases around a planet", ex: "Venus's atmosphere is mostly carbon dioxide." },
        { w: "runaway",    pos: "adjective", ipa: "/ˈrʌnəweɪ/",     def: "(of a process) impossible to stop once it has started", ex: "Venus is a runaway greenhouse world." }
      ],
      quiz: [
        { q: "How long is one day on Venus compared with one Venus year?",
          options: ["A day is longer", "A year is longer", "They are exactly equal", "Venus has no days"],
          answer: 0, explain: "A full rotation takes 243 Earth days; a full orbit takes 225. So the day wins." },
        { q: "On Venus, where would the Sun rise?",
          options: ["In the west", "In the east", "It would never rise", "In the north"],
          answer: 0, explain: "Because Venus rotates backwards, the Sun appears to move in the opposite direction." },
        { q: "Why is the surface of Venus so hot?",
          options: ["The greenhouse effect traps heat", "It is very close to the Sun and has no air", "Its volcanoes never stop erupting", "Its days are short"],
          answer: 0, explain: "Carbon dioxide lets sunlight in but holds heat, pushing surface temperatures to about 465°C." },
        { q: "“Runaway greenhouse” describes a process that…",
          options: ["cannot be stopped once it starts", "happens only at night", "creates new planets", "cools a planet quickly"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 3 */
    {
      id: "emu",
      category: "history",
      title: "The Great Emu War of 1932",
      emoji: "🪖",
      minutes: 4,
      hook: "Australia sent soldiers with machine guns to fight birds. The birds won.",
      paragraphs: [
        "In 1932, Australia sent soldiers with machine guns to fight emus. This is not a joke.",
        "After the First World War, thousands of ex-soldiers were given farmland in Western Australia. Then the Great Depression hit, wheat prices fell, and about 20,000 emus wandered into the wheat belt. The birds trampled crops, broke fences, and — to the farmers' frustration — seemed unbothered by gunfire.",
        "The Minister of Defence agreed to provide two soldiers and two machine guns. A crowd of journalists came to watch. The emus, however, were remarkably hard to hit. They scattered at the first shot, and their thick feathers absorbed a surprising amount of damage. After a few weeks, the operation was called off.",
        "A second attempt later that year was slightly more successful, but nobody would call it a victory. The emus had won — and Australia had learned that a war is easier to declare than to finish."
      ],
      didYouKnow: "Emus can run at almost 50 km/h and change direction suddenly. A machine gun is not designed to hit a moving target the size of a large bird.",
      prompt: "Why do you think this strange event is still remembered and joked about today?",
      vocab: [
        { w: "trample",     pos: "verb",      ipa: "/ˈtræmpl/",     def: "to step heavily on something and damage it", ex: "The emus trampled the young wheat." },
        { w: "frustration", pos: "noun",      ipa: "/frʌˈstreɪʃn/", def: "the feeling of being annoyed because you cannot change something", ex: "To the farmers' frustration, the birds kept returning." },
        { w: "scatter",     pos: "verb",      ipa: "/ˈskætə(r)/",   def: "to move quickly in different directions", ex: "The emus scattered at the first shot." },
        { w: "absorb",      pos: "verb",      ipa: "/əbˈzɔːb/",     def: "to take in or soak up something", ex: "Their feathers absorbed much of the impact." },
        { w: "call off",    pos: "phrasal verb", ipa: "/kɔːl ɒf/",  def: "to cancel an event or stop an activity", ex: "The operation was called off after a few weeks." }
      ],
      quiz: [
        { q: "Who were the two sides in the “war”?",
          options: ["Australian soldiers and emus", "Farmers and the government", "Britain and Australia", "Journalists and soldiers"],
          answer: 0 },
        { q: "Why did the emus go into the wheat belt?",
          options: ["Their natural habitat had changed and crops were easy food", "They were brought there by farmers", "They were escaping from a zoo", "They were following the soldiers"],
          answer: 0, explain: "Cleared land created open ground and food, so the birds moved in." },
        { q: "What made the emus difficult to shoot?",
          options: ["They moved fast and their feathers absorbed damage", "They hid underground", "They were protected by law", "They attacked at night"],
          answer: 0 },
        { q: "“The operation was called off” means it was…",
          options: ["cancelled", "made larger", "moved to another country", "declared a success"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 4 */
    {
      id: "onion",
      category: "food",
      title: "Why Chopping Onions Makes You Cry",
      emoji: "🧅",
      minutes: 3,
      hook: "You are not being emotional. You are being attacked by chemistry.",
      paragraphs: [
        "Chop an onion and your eyes water. The cause is a chemical defence system that the onion developed long before humans existed.",
        "An onion is made of cells. When you cut it, you break the cell walls and release an enzyme called alliinase, which is normally kept separate. The enzyme reacts with sulfur compounds in the onion and produces a gas called syn-propanethial-S-oxide. As this gas drifts up to your eyes, it irritates the nerves there, and your brain orders tears to wash it away.",
        "Cold slows the reaction, because enzymes work more slowly at low temperatures, so a chilled onion is gentler. A sharper knife helps too: it damages fewer cells and releases less gas.",
        "And if you cry anyway, you are not weak. Your eyes are simply doing their job."
      ],
      didYouKnow: "The same sulfur chemistry gives onions and garlic their flavour. Cook them gently and the sharp compounds turn sweet; burn them and they turn bitter.",
      prompt: "What is a food you love even though preparing it is unpleasant? Describe the process in three sentences.",
      vocab: [
        { w: "enzyme",       pos: "noun",      ipa: "/ˈenzaɪm/",       def: "a protein that makes a chemical reaction happen faster in a living thing", ex: "Alliinase is the enzyme that starts the reaction." },
        { w: "compound",     pos: "noun",      ipa: "/ˈkɒmpaʊnd/",     def: "a substance formed from two or more elements", ex: "Sulfur compounds give onions their smell." },
        { w: "volatile",     pos: "adjective", ipa: "/ˈvɒlətaɪl/",     def: "easily turning into gas at normal temperatures", ex: "The volatile gas reaches your eyes within seconds." },
        { w: "irritate",     pos: "verb",      ipa: "/ˈɪrɪteɪt/",      def: "to make part of the body sore or uncomfortable", ex: "The gas irritates the surface of the eye." },
        { w: "refrigerate",  pos: "verb",      ipa: "/rɪˈfrɪdʒəreɪt/", def: "to keep food cold to preserve it", ex: "Refrigerate the onion for an hour before chopping it." }
      ],
      quiz: [
        { q: "What releases the enzyme alliinase?",
          options: ["Cutting the onion's cells", "Heating the onion", "Adding salt", "Peeling the skin"],
          answer: 0 },
        { q: "In what form does the irritant reach your eyes?",
          options: ["As a gas", "As a liquid", "As a powder", "As a solid crystal"],
          answer: 0, explain: "It is volatile — it evaporates easily and drifts upwards." },
        { q: "Why does a cold onion make you cry less?",
          options: ["Enzymes work more slowly when cold", "Cold onions have no sulfur", "The gas freezes inside the onion", "Cold water replaces the gas"],
          answer: 0 },
        { q: "A “volatile” liquid is one that…",
          options: ["turns into gas easily", "is always dangerous", "cannot be frozen", "has no smell"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 5 */
    {
      id: "set",
      category: "words",
      title: "The Word “Set” Has 430 Meanings",
      emoji: "📖",
      minutes: 4,
      hook: "One small word. Four hundred and thirty ways to use it.",
      paragraphs: [
        "If you look up the word “set” in the Oxford English Dictionary, you will find an entry longer than many novels. The word has more than 430 senses — different meanings — which makes it one of the most versatile words in English.",
        "Why? Two reasons. First, “set” is very old, and old words collect meanings the way a coat collects pockets. Second, because it is short and sounds solid, English speakers have borrowed it for all kinds of jobs: a set of chess pieces, a set of rules, a film set, a set of tennis, sunset, mindset, and the verb “to set the table”.",
        "The second edition of the Oxford English Dictionary needed about 60,000 words to describe what “set” means — more words than the dictionary used for many complete novels.",
        "Vocabulary is not a list you memorise once. It is a living system, and even a small word can hide a whole history."
      ],
      didYouKnow: "The shortest complete sentence in English is “Go.” The longest entry in many dictionaries belongs to “set”. Size is not the same as importance.",
      prompt: "Choose a word in your own language that has many meanings. Explain two of them in English.",
      vocab: [
        { w: "entry",     pos: "noun",      ipa: "/ˈentri/",      def: "one item in a dictionary or list", ex: "The entry for “set” fills many pages." },
        { w: "sense",     pos: "noun",      ipa: "/sens/",        def: "one particular meaning of a word", ex: "“Set” has more than 430 senses." },
        { w: "versatile", pos: "adjective", ipa: "/ˈvɜːsətaɪl/",  def: "able to be used in many different ways", ex: "“Set” is an unusually versatile word." },
        { w: "estimate",  pos: "verb",      ipa: "/ˈestɪmeɪt/",   def: "to guess an amount after thinking about it", ex: "Linguists estimate that new senses appear regularly." },
        { w: "memorise",  pos: "verb",      ipa: "/ˈmeməraɪz/",   def: "to learn something so that you can remember it exactly", ex: "Do not just memorise lists of words — use them." }
      ],
      quiz: [
        { q: "Why does “set” have so many meanings?",
          options: ["It is old and has been borrowed for many jobs", "It was invented by a dictionary writer", "It is a modern scientific term", "It comes from Latin and has no other forms"],
          answer: 0 },
        { q: "About how many words did the OED need to describe “set”?",
          options: ["60,000", "430", "600", "6,000"],
          answer: 0, explain: "The number is famous — it is far longer than most dictionary entries." },
        { q: "“Versatile” most nearly means…",
          options: ["useful in many different situations", "difficult to pronounce", "very old", "easy to forget"],
          answer: 0 },
        { q: "What is the passage's main point about vocabulary?",
          options: ["It is a living system, not just a list", "Long words are more useful", "Dictionaries are always correct", "Only native speakers can learn it"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 6 */
    {
      id: "gut",
      category: "science",
      title: "You Are Outnumbered by Bacteria",
      emoji: "🔬",
      minutes: 4,
      hook: "There are more bacterial cells in your body than human ones. They are not guests — they are staff.",
      paragraphs: [
        "There are more bacterial cells in and on your body than human cells — perhaps 1.3 bacteria for every human cell, according to a 2016 estimate. Together they weigh a few hundred grams, about as much as a large bar of chocolate. Most of them live in your large intestine.",
        "These bacteria are not simply passengers. They break down fibre that your own enzymes cannot digest, and they produce vitamins such as K and B12. They also train your immune system, teaching it which microbes are harmless and which are intruders.",
        "This community is called your microbiome, and it is sensitive. Antibiotics save lives, but they can disturb the balance by killing helpful bacteria along with harmful ones. That is one reason some doctors suggest foods with live cultures — yogurt, kefir, fermented vegetables — after a course of treatment.",
        "The gut is also connected to the brain by a constant flow of chemical signals. Scientists are still discovering how much this conversation affects mood, sleep, and appetite."
      ],
      didYouKnow: "Your gut bacteria can digest some plant fibres that no human enzyme can break down. Without them, a lot of healthy food would pass straight through you.",
      prompt: "Would you take a pill that changed your gut bacteria if it might improve your mood? What would you want to know first?",
      vocab: [
        { w: "digest",    pos: "verb",      ipa: "/daɪˈdʒest/",     def: "to break food down so the body can use it", ex: "Gut bacteria digest fibre that we cannot." },
        { w: "fibre",     pos: "noun",      ipa: "/ˈfaɪbə(r)/",     def: "the part of plants that helps food move through your body", ex: "Vegetables are a good source of fibre." },
        { w: "immune",    pos: "adjective", ipa: "/ɪˈmjuːn/",      def: "connected with the body's defence against disease", ex: "The microbiome helps train the immune system." },
        { w: "intruder",  pos: "noun",      ipa: "/ɪnˈtruːdə(r)/", def: "someone or something that enters where it is not wanted", ex: "The immune system must recognise dangerous intruders." },
        { w: "disturb",   pos: "verb",      ipa: "/dɪˈstɜːb/",     def: "to interrupt or change something that is working normally", ex: "Antibiotics can disturb the balance of bacteria." }
      ],
      quiz: [
        { q: "According to the passage, how do bacterial cells compare with human cells in your body?",
          options: ["There are slightly more bacteria", "There are far fewer bacteria", "They are exactly equal", "There are no bacteria in a healthy body"],
          answer: 0 },
        { q: "What do gut bacteria do with fibre?",
          options: ["They break down fibre that human enzymes cannot", "They turn fibre into sugar in the blood", "They remove fibre from the body", "They store fibre in the bones"],
          answer: 0 },
        { q: "Why can antibiotics affect your microbiome?",
          options: ["They may kill helpful bacteria as well as harmful ones", "They contain live cultures", "They stop you digesting water", "They make vitamins disappear from food"],
          answer: 0 },
        { q: "“Disturb” in this passage means…",
          options: ["to upset a normal balance", "to make something louder", "to remove completely", "to make something stronger"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 7 */
    {
      id: "time",
      category: "mind",
      title: "Why Time Speeds Up As You Age",
      emoji: "⏳",
      minutes: 4,
      hook: "A year feels shorter at 40 than at 7. The clock has not changed — your brain has.",
      paragraphs: [
        "Why does time seem to speed up as you get older? One explanation is proportional: each year is a smaller fraction of your whole life. For a seven-year-old, a year is one seventh of everything they remember. For a person of 49, it is one forty-ninth.",
        "A second explanation is about novelty. Our brains seem to measure time partly by the amount of new information they process. A year when you are seven is packed with firsts — new school, new words, new places. A year at 47 may look very similar to the one before it, and the brain stores fewer distinct memories.",
        "The two ideas fit together. Fewer new memories and a smaller fraction of life both make a year feel shorter.",
        "This is more useful than it sounds. If novelty stretches time, then trying new things — a different route to work, an unfamiliar food, a new language — may make your life feel longer, not by adding days, but by making the days more memorable."
      ],
      didYouKnow: "In one experiment, volunteers who spent a week in an unfamiliar place reported that the week felt longer than a normal week at home.",
      prompt: "Describe a period of your life that felt long. What made it feel that way?",
      vocab: [
        { w: "proportional", pos: "adjective", ipa: "/prəˈpɔːʃənl/", def: "changing according to the size of something else", ex: "Under the proportional theory, each year feels smaller." },
        { w: "novelty",      pos: "noun",      ipa: "/ˈnɒvlti/",     def: "the quality of being new and unusual", ex: "Novelty makes memories stronger." },
        { w: "fraction",     pos: "noun",      ipa: "/ˈfrækʃn/",     def: "a small part of a whole", ex: "A year is a tiny fraction of a long life." },
        { w: "familiar",     pos: "adjective", ipa: "/fəˈmɪliə(r)/", def: "well known to you", ex: "Familiar routines are easy to forget." },
        { w: "memorable",    pos: "adjective", ipa: "/ˈmemərəbl/",   def: "easy to remember because it is special", ex: "New experiences make a week memorable." }
      ],
      quiz: [
        { q: "What is the “proportional” explanation?",
          options: ["Each year is a smaller part of your life", "Time moves faster near the equator", "Older people sleep less", "Clocks run faster as they age"],
          answer: 0 },
        { q: "How does novelty affect time, according to the passage?",
          options: ["New experiences make time feel longer", "New experiences make time disappear", "Novelty has no effect on time", "Only children experience novelty"],
          answer: 0 },
        { q: "What did the experiment with volunteers suggest?",
          options: ["An unfamiliar week felt longer than a routine one", "People cannot remember holidays", "Travel makes people tired", "A week is always seven days"],
          answer: 0 },
        { q: "A “memorable” experience is one that…",
          options: ["is easy to remember", "happens every day", "is very short", "is difficult to describe"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 8 */
    {
      id: "bug",
      category: "tech",
      title: "The First Computer Bug Was a Real Insect",
      emoji: "💡",
      minutes: 3,
      hook: "In 1947, engineers opened a computer and found a moth inside. The joke wrote itself.",
      paragraphs: [
        "On 9 September 1947, engineers working on the Harvard Mark II computer found a moth trapped in one of its relays. They taped the insect into the logbook and wrote: “First actual case of bug being found.”",
        "The word “bug” already meant a technical fault — engineers had used it for decades. But the moth made the joke literal, and the story became famous.",
        "That team included Grace Hopper, a mathematician who became one of the most important figures in computing. She helped develop COBOL, a programming language designed to work on many kinds of machines, and she spent much of her career persuading people that computers could do more than arithmetic.",
        "Hopper was also famous for explaining difficult ideas with simple objects. She liked to hand out pieces of wire about 30 centimetres long — roughly the distance light travels in a nanosecond — to show how precious a billionth of a second really is.",
        "The bug, meanwhile, is now in a museum. It is probably the most famous insect in the history of technology."
      ],
      didYouKnow: "The moth is stored at the Smithsonian National Museum of American History, still taped into the logbook page.",
      prompt: "Explain a technical idea from your work or studies using an everyday object, as Grace Hopper did with a piece of wire.",
      vocab: [
        { w: "relay",      pos: "noun",      ipa: "/ˈriːleɪ/",    def: "an electrical switch that opens and closes a circuit", ex: "The moth was caught inside a relay." },
        { w: "fault",      pos: "noun",      ipa: "/fɔːlt/",      def: "a mistake or problem that stops something working", ex: "Engineers used “bug” for a technical fault." },
        { w: "literal",    pos: "adjective", ipa: "/ˈlɪtərəl/",   def: "following the exact basic meaning of words", ex: "The moth made the word “bug” literal." },
        { w: "precious",   pos: "adjective", ipa: "/ˈpreʃəs/",    def: "very valuable or important", ex: "A nanosecond is a precious amount of time in computing." },
        { w: "persuade",   pos: "verb",      ipa: "/pəˈsweɪd/",   def: "to make someone believe or do something by giving reasons", ex: "Hopper persuaded companies to adopt new languages." }
      ],
      quiz: [
        { q: "What was found inside the Mark II computer?",
          options: ["A moth", "A spider", "A piece of wire", "A broken relay"],
          answer: 0 },
        { q: "What did “bug” mean before the moth story?",
          options: ["A technical fault", "An insect", "A type of computer", "A programming language"],
          answer: 0, explain: "The word was already used by engineers; the moth simply made it literal." },
        { q: "What did Grace Hopper use a piece of wire to explain?",
          options: ["The distance light travels in a nanosecond", "The size of a computer", "How to build a relay", "The length of a programming line"],
          answer: 0 },
        { q: "“Persuading” someone means…",
          options: ["giving them reasons to agree", "ordering them to obey", "asking them a question", "copying what they do"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 9 */
    {
      id: "trees",
      category: "nature",
      title: "Trees Talk Underground — Maybe",
      emoji: "🌳",
      minutes: 4,
      hook: "Beneath the forest floor, a network of fungi connects the trees. What it really does is still being argued about.",
      paragraphs: [
        "In a forest, the ground beneath your feet is laced with a network of fungal threads. These mycorrhizae attach to tree roots and trade with them: the fungus supplies water and minerals, and the tree supplies sugar made by photosynthesis.",
        "Because one fungus can connect many trees, scientists such as Suzanne Simard have described forests as “sharing” resources — carbon moving from old trees to young seedlings, chemical warnings passing between neighbours. The idea captured the public imagination as the “wood wide web”.",
        "But science is a conversation, not a headline. Some researchers argue that the experiments are hard to interpret and that “sharing” may be too generous a word. A fungus might simply be acting in its own interest, taking sugar where it can and giving minerals in return.",
        "What is clear is that forests are not collections of separate trees. They are communities, and we are only beginning to understand the rules."
      ],
      didYouKnow: "About 90% of land plants live in partnership with fungi. The relationship is older than trees themselves.",
      prompt: "Do you think describing nature with human words like “sharing” helps us understand it, or misleads us? Give an example.",
      vocab: [
        { w: "network",       pos: "noun",      ipa: "/ˈnetwɜːk/",      def: "a group of things connected to each other", ex: "Fungal threads form a network under the soil." },
        { w: "photosynthesis",pos: "noun",      ipa: "/ˌfəʊtəʊˈsɪnθəsɪs/", def: "the process plants use to turn sunlight into food", ex: "Trees make sugar through photosynthesis." },
        { w: "seedling",      pos: "noun",      ipa: "/ˈsiːdlɪŋ/",      def: "a very young plant grown from a seed", ex: "Carbon may move from old trees to seedlings." },
        { w: "interpret",     pos: "verb",      ipa: "/ɪnˈtɜːprɪt/",    def: "to decide what something means", ex: "The results are difficult to interpret." },
        { w: "generous",      pos: "adjective", ipa: "/ˈdʒenərəs/",     def: "willing to give more than is expected", ex: "Calling the trees generous may be too kind." }
      ],
      quiz: [
        { q: "What do the fungi give the trees?",
          options: ["Water and minerals", "Sugar and oxygen", "Seeds and leaves", "Sunlight"],
          answer: 0 },
        { q: "What is the “wood wide web”?",
          options: ["A popular name for fungal networks linking trees", "A website about forests", "A type of tree root", "A method of planting trees"],
          answer: 0 },
        { q: "Why do some researchers disagree with the “sharing” idea?",
          options: ["The experiments are hard to interpret", "Fungi do not exist in forests", "Trees cannot make sugar", "The network was never observed"],
          answer: 0 },
        { q: "If “sharing” is “too generous a word”, the writer means it may…",
          options: ["imply more kindness than really exists", "be too long to pronounce", "be scientifically perfect", "describe the trees too negatively"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 10 */
    {
      id: "iceland",
      category: "nature",
      title: "The Country With No Mosquitoes",
      emoji: "🦟",
      minutes: 3,
      hook: "Iceland has no mosquitoes. It is not because they cannot fly there.",
      paragraphs: [
        "Iceland is one of the few inhabited places on Earth with no mosquitoes. This is surprising, because mosquitoes reach the island regularly on planes and ships.",
        "The explanation seems to be the climate. A mosquito needs still, unfrozen water to lay its eggs and for its larvae to develop. Iceland's winters are not the coldest in the world, but they are unusually unstable: the temperature may rise above freezing and fall again several times in a single winter. Each freeze and thaw can destroy the shallow pools the insects depend on.",
        "There is also a question of timing. Adult mosquitoes need a long enough warm season to breed and for the next generation to become strong before winter. In Iceland, the warm period is short, and a failed generation is a dead end.",
        "So mosquitoes arrive, but they do not establish a population. The island is a reminder that a species needs more than a way to travel. It needs the right conditions to stay."
      ],
      didYouKnow: "Iceland's mid-Atlantic location means it also has very few reptiles or amphibians. It has one native land mammal: the Arctic fox.",
      prompt: "Think of a place you know well. What plant or animal is surprisingly missing there, and why?",
      vocab: [
        { w: "larva",      pos: "noun",      ipa: "/ˈlɑːvə/",     def: "the young form of an insect, before it becomes an adult", ex: "Mosquito larvae live in still water." },
        { w: "breed",      pos: "verb",      ipa: "/briːd/",     def: "to produce young animals", ex: "Mosquitoes need warm weather to breed." },
        { w: "establish",  pos: "verb",      ipa: "/ɪˈstæblɪʃ/", def: "to start something that will continue for a long time", ex: "The insects cannot establish a population in Iceland." },
        { w: "stable",     pos: "adjective", ipa: "/ˈsteɪbl/",   def: "not changing suddenly; steady", ex: "Mosquitoes need stable conditions." },
        { w: "species",    pos: "noun",      ipa: "/ˈspiːʃiːz/", def: "a group of animals or plants of the same kind", ex: "There are thousands of mosquito species." }
      ],
      quiz: [
        { q: "What do mosquitoes need in order to lay eggs?",
          options: ["Still, unfrozen water", "Dry sand", "Tree bark", "Salt water only"],
          answer: 0 },
        { q: "Why can't mosquitoes establish themselves in Iceland?",
          options: ["Repeated freezing and a short warm season", "There are too many birds", "The island is too far from land", "The water is too salty"],
          answer: 0 },
        { q: "Do mosquitoes ever arrive in Iceland?",
          options: ["Yes, on planes and ships", "No, never", "Only in winter", "Only in the north"],
          answer: 0 },
        { q: "To “establish a population” means to…",
          options: ["start a group that continues to live there", "visit for a short time", "build a house", "become extinct"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 11 */
    {
      id: "earworm",
      category: "mind",
      title: "Why Songs Get Stuck in Your Head",
      emoji: "🎵",
      minutes: 3,
      hook: "That song on repeat in your brain has a name — and scientists are studying it.",
      paragraphs: [
        "Some songs get stuck in your head for hours. Scientists call this “involuntary musical imagery”; everyone else calls it an earworm. Earworms are usually short, simple, and repetitive, with a melody that moves in predictable steps.",
        "Why does the brain do this? One theory is that music activates the motor system — the same circuits we use for movement — so a catchy phrase becomes a kind of mental itch that the brain wants to finish. Another is that earworms appear when the mind is bored but not fully occupied: in the shower, on a walk, during a dull task.",
        "In a 2015 study, researchers asked people to chew gum while listening to catchy music. Chewing seemed to reduce earworms, possibly because moving the mouth interferes with the “inner voice” that sings along.",
        "So if a song will not leave you alone, you have options: listen to it all the way through, chew gum, or replace it with something even catchier."
      ],
      didYouKnow: "Nearly everyone experiences earworms. They are more common in people who listen to a lot of music, and they often appear when we are tired or stressed.",
      prompt: "What song gets stuck in your head most often? Describe its rhythm or melody in English without naming it.",
      vocab: [
        { w: "involuntary", pos: "adjective", ipa: "/ɪnˈvɒləntri/", def: "happening without your control or choice", ex: "Hearing a song in your mind is involuntary." },
        { w: "repetitive",  pos: "adjective", ipa: "/rɪˈpetətɪv/",  def: "happening many times in the same way", ex: "Earworms usually have repetitive melodies." },
        { w: "melody",      pos: "noun",      ipa: "/ˈmelədi/",     def: "a series of musical notes that form a tune", ex: "The melody moves in simple steps." },
        { w: "interfere",   pos: "verb",      ipa: "/ˌɪntəˈfɪə(r)/", def: "to get in the way of something", ex: "Chewing may interfere with the inner voice." },
        { w: "occupy",      pos: "verb",      ipa: "/ˈɒkjupaɪ/",    def: "to fill someone's time or attention", ex: "A dull task leaves the mind only partly occupied." }
      ],
      quiz: [
        { q: "What is an earworm?",
          options: ["A song that repeats in your mind", "A small insect in the ear", "A type of hearing loss", "A music genre"],
          answer: 0 },
        { q: "One theory says earworms happen because music…",
          options: ["activates the brain's movement circuits", "damages the memory", "only affects musicians", "travels through the ears as sound"],
          answer: 0 },
        { q: "What did the 2015 chewing-gum study suggest?",
          options: ["Chewing may reduce earworms", "Gum improves singing ability", "Music sounds better while chewing", "Chewing causes earworms"],
          answer: 0 },
        { q: "An “involuntary” action is one you…",
          options: ["do without deciding to", "plan carefully", "do only once", "learn at school"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 12 */
    {
      id: "marathon",
      category: "history",
      title: "The Marathon Is Based on a Story",
      emoji: "🏃",
      minutes: 3,
      hook: "The most famous race in the world is named after a run that probably never happened.",
      paragraphs: [
        "The marathon is named after a run that probably never happened. According to legend, in 490 BCE a messenger ran from the town of Marathon to Athens — about 40 kilometres — to announce that the Greeks had defeated the Persians, gasped “We have won,” and died.",
        "Historians doubt the story. In some versions the messenger runs to Sparta, a distance of about 240 kilometres. The earliest surviving accounts, written centuries later, add the dramatic death. The tale became popular when it made a good story.",
        "The modern race was invented for the first modern Olympics in Athens in 1896, largely to honour the legend. The distance was not fixed until 1921, when the standard became 42.195 kilometres — partly so that the 1908 London course could finish in front of the royal box.",
        "A race built on an unreliable story has become one of the world's most moving events. Runners cross the finish line in tears, not because they are dying, but because they have discovered something about themselves."
      ],
      didYouKnow: "The word “marathon” now means any long, difficult task — “a marathon meeting”, “a marathon study session”. Language loves a good story.",
      prompt: "Is it a problem that a famous event is based on a legend? Why do some stories survive even when the facts are weak?",
      vocab: [
        { w: "messenger",  pos: "noun",      ipa: "/ˈmesɪndʒə(r)/", def: "a person who carries a message", ex: "The messenger ran to Athens with the news." },
        { w: "announce",   pos: "verb",      ipa: "/əˈnaʊns/",      def: "to tell people something officially or publicly", ex: "He announced the victory and collapsed." },
        { w: "legend",     pos: "noun",      ipa: "/ˈledʒənd/",     def: "an old story that may not be true", ex: "The race is based on an ancient legend." },
        { w: "doubt",      pos: "verb",      ipa: "/daʊt/",         def: "to think that something is probably not true", ex: "Historians doubt the details of the story." },
        { w: "endurance",  pos: "noun",      ipa: "/ɪnˈdjʊərəns/",  def: "the ability to continue doing something difficult for a long time", ex: "A marathon is a test of endurance." }
      ],
      quiz: [
        { q: "According to the legend, how far did the messenger run?",
          options: ["About 40 km, from Marathon to Athens", "240 km, from Athens to Sparta", "42.195 km exactly", "10 km around Athens"],
          answer: 0 },
        { q: "Why do historians doubt the story?",
          options: ["No ancient writer mentions the death, and versions differ", "The distance is too short", "The battle never happened", "The Greeks did not have roads"],
          answer: 0 },
        { q: "When did the marathon distance become 42.195 km?",
          options: ["1921", "1896", "490 BCE", "1908"],
          answer: 0, explain: "The 1908 London course influenced the standard, which was fixed in 1921." },
        { q: "“Endurance” is the ability to…",
          options: ["keep going through difficulty", "run very fast for a short time", "remember long stories", "carry heavy messages"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 13 */
    {
      id: "moon",
      category: "space",
      title: "The Moon Is Slowly Leaving Us",
      emoji: "🌙",
      minutes: 3,
      hook: "Every year the Moon moves 3.8 cm further away — about the speed your fingernails grow.",
      paragraphs: [
        "The Moon is moving away from Earth at about 3.8 centimetres a year — roughly the speed at which your fingernails grow. It sounds tiny, but it has been happening for billions of years.",
        "The cause is tidal friction. The Moon pulls on Earth's oceans, creating tides. As Earth rotates faster than the Moon orbits, it drags the tidal bulge slightly ahead of the Moon. That bulge pulls the Moon forward, giving it energy and pushing it into a higher orbit. Earth, meanwhile, loses a little rotational energy, so our days slowly get longer — by around 1.8 milliseconds per century.",
        "Astronauts left reflectors on the Moon during the Apollo missions. By bouncing lasers off them, scientists can measure the distance to the Moon with extraordinary precision — and confirm that it is still drifting away.",
        "In the far future, the Moon will look smaller in our sky. Total solar eclipses, which depend on the Moon covering the Sun almost exactly, will eventually become impossible."
      ],
      didYouKnow: "The Moon is unusually large for a planet's satellite: about a quarter of Earth's diameter. That is one reason its tides are so powerful.",
      prompt: "If the Moon disappeared tomorrow, which everyday thing would you miss most — the tides, the light at night, or the eclipses? Explain.",
      vocab: [
        { w: "drift",     pos: "verb",      ipa: "/drɪft/",     def: "to move slowly without a fixed direction or plan", ex: "The Moon is drifting away from Earth." },
        { w: "tidal",     pos: "adjective", ipa: "/ˈtaɪdl/",    def: "connected with the regular rise and fall of the sea", ex: "Tidal friction slowly changes the Moon's orbit." },
        { w: "friction",  pos: "noun",      ipa: "/ˈfrɪkʃn/",   def: "the force that resists movement when two things touch", ex: "Tidal friction transfers energy from Earth to the Moon." },
        { w: "reflector", pos: "noun",      ipa: "/rɪˈflektə(r)/", def: "an object that sends light or other waves back", ex: "Apollo astronauts placed reflectors on the surface." },
        { w: "precise",   pos: "adjective", ipa: "/prɪˈsaɪs/",  def: "exact and accurate", ex: "Lasers give a precise measurement of the distance." }
      ],
      quiz: [
        { q: "How fast is the Moon moving away from Earth?",
          options: ["About 3.8 cm a year", "About 3.8 m a year", "About 38 km a year", "It is moving closer"],
          answer: 0 },
        { q: "What causes the Moon to move away?",
          options: ["Tidal friction between Earth and the Moon", "The solar wind", "Volcanoes on the Moon", "Earth's magnetic field"],
          answer: 0 },
        { q: "How do scientists measure the distance so precisely?",
          options: ["By bouncing lasers off reflectors left on the Moon", "By looking at the Moon through telescopes", "By timing the tides", "By sending astronauts regularly"],
          answer: 0 },
        { q: "Something “precise” is…",
          options: ["exact and accurate", "very fast", "extremely old", "hard to see"],
          answer: 0 }
      ]
    },

    /* ------------------------------------------------------------------ 14 */
    {
      id: "ok",
      category: "words",
      title: "The Strangest Word in the World: OK",
      emoji: "✅",
      minutes: 3,
      hook: "It began as a joke in a newspaper. Now it is probably the most widely understood word on Earth.",
      paragraphs: [
        "“OK” may be the most successful word in the world. It is short, it is easy to pronounce in almost any language, and it can mean “yes”, “fine”, “acceptable”, or simply “I have heard you”.",
        "Its origin is stranger than most people expect. In 1839, a Boston newspaper made a joke: it used “o.k.” as an abbreviation for “oll korrect”, a deliberately wrong spelling of “all correct”. Other papers copied the joke. A year later, supporters of Martin Van Buren — whose nickname was “Old Kinderhook” — formed “OK Clubs”, and the word spread across the country.",
        "Linguists once doubted this story, but the research of Allen Walker Read in the 1960s found the newspaper evidence. The word then travelled with American English around the world.",
        "Today “OK” appears in dozens of languages, often spelled in local letters. It is a rare thing: a piece of slang that became global, and a reminder that language does not need to be beautiful to be useful."
      ],
      didYouKnow: "“OK” is one of the few words recognised almost everywhere on the planet — even by people who speak no other English.",
      prompt: "Is it good that one word can mean so many things? Write about a time when “OK” was ambiguous.",
      vocab: [
        { w: "abbreviation", pos: "noun",      ipa: "/əˌbriːviˈeɪʃn/", def: "a short form of a word or phrase", ex: "“OK” began as an abbreviation of a joke phrase." },
        { w: "deliberately", pos: "adverb",    ipa: "/dɪˈlɪbərətli/",  def: "on purpose; intentionally", ex: "The newspaper spelled it wrongly on purpose — deliberately." },
        { w: "slang",        pos: "noun",      ipa: "/slæŋ/",          def: "very informal language used by a particular group", ex: "“OK” started as American slang." },
        { w: "linguist",     pos: "noun",      ipa: "/ˈlɪŋɡwɪst/",     def: "a person who studies language", ex: "A linguist found the original newspaper." },
        { w: "global",       pos: "adjective", ipa: "/ˈɡləʊbl/",       def: "affecting or known all over the world", ex: "OK became a global word." }
      ],
      quiz: [
        { q: "What did “o.k.” originally stand for?",
          options: ["“Oll korrect”, a joking misspelling", "“Old Kinderhook”", "“Only known”", "“Okay”"],
          answer: 0 },
        { q: "How did the word spread in 1840?",
          options: ["Through Martin Van Buren's OK Clubs", "Through a dictionary", "Through the Internet", "Through a popular song"],
          answer: 0 },
        { q: "What did Allen Walker Read find?",
          options: ["Newspaper evidence for the origin", "That OK is ancient Greek", "That OK means “no” in most languages", "That the word was invented in 1960"],
          answer: 0 },
        { q: "An “abbreviation” is…",
          options: ["a shortened form of a word or phrase", "a long explanation", "a type of accent", "a spelling mistake"],
          answer: 0 }
      ]
    }
  ];

  /* Fix a small typo risk: normalise every vocab entry to have ipa. */
  lessons.forEach(function (lesson) {
    lesson.vocab.forEach(function (v) {
      if (typeof v.ipa !== "string") v.ipa = "";
    });
  });

  function categoryById(id) {
    for (var i = 0; i < categories.length; i++) if (categories[i].id === id) return categories[i];
    return { id: "other", name: "Other", emoji: "✨", blurb: "" };
  }

  function lessonById(id) {
    for (var i = 0; i < lessons.length; i++) if (lessons[i].id === id) return lessons[i];
    return null;
  }

  var allWords = [];
  lessons.forEach(function (lesson) {
    lesson.vocab.forEach(function (v) {
      allWords.push({
        id: lesson.id + "::" + v.w,
        word: v.w,
        pos: v.pos,
        ipa: v.ipa,
        def: v.def,
        example: v.ex,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        emoji: lesson.emoji
      });
    });
  });

  return {
    categories: categories,
    lessons: lessons,
    categoryById: categoryById,
    lessonById: lessonById,
    allWords: allWords
  };
})();
