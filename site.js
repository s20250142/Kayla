/* Curio — bilingual product website */
(function () {
  "use strict";

  /* Return bookmarks from the old root-level app to /app/ */
  var appRoute = /^#\/(home|library|little|lesson|review|stats|pet|adventures|chronicles|ai|whodunit)\b/;
  if (appRoute.test(location.hash)) {
    location.replace("app/" + location.hash);
    return;
  }

  var I18N = {
    en: {
      "meta.title": "Curio — English Through Curiosity",
      "meta.description": "Curio is a three-stage English learning app: sensory play for ages 3–6, fourteen true stories, interactive future worlds, saved progress and collectible companions.",
      "a11y.skip": "Skip to content",
      "a11y.menu": "Open menu",
      "brand.tagline": "English through curiosity",
      "nav.product": "Product",
      "nav.stages": "Stages",
      "nav.inside": "Inside the app",
      "nav.author": "Author",
      "nav.faq": "FAQ",
      "cta.open": "Open the app",
      "cta.start": "Open the app — free",
      "cta.explore": "Explore the three stages",
      "cta.eyebrow": "The next curiosity is waiting",
      "cta.title": "Three minutes is enough to begin.",
      "cta.sub": "No sign-up. Pick a stage, choose a level, and start with one story.",
      "cta.openApp": "Open Curio",
      "hero.eyebrow": "A three-stage English learning app",
      "hero.title": "English that makes you curious.",
      "hero.sub": "Short true stories, sensory play and interactive adventures — with progress that follows you and a companion that grows as you learn.",
      "hero.micro": "No accounts. No ads. Progress stays on your device.",
      "hero.tag1": "Ages 3–6 to adult",
      "hero.tag2": "3 difficulty levels",
      "hero.tag3": "Works offline after loading",
      "hero.floatXp": "Every answer counts",
      "hero.floatPet": "New companion hatched",
      "hero.note": "Built for three minutes a day.",
      "proof.stages": "Learning stages",
      "proof.lessons": "True stories",
      "proof.words": "Useful words",
      "proof.pets": "Companions",
      "proof.levels": "Difficulty levels per stage",
      "why.eyebrow": "Why Curio",
      "why.title": "Built around curiosity, not a word list.",
      "why.sub": "Most English apps ask you to remember. Curio gives you something worth remembering — a strange fact, a difficult choice, a mystery to solve — and builds the language around it.",
      "why.card1.title": "Read something worth retelling",
      "why.card1.body": "Every library lesson begins with a true story: a moon that is drifting away, a war against emus, the first computer bug. You finish with something to tell someone.",
      "why.card2.title": "Use it before you lose it",
      "why.card2.body": "Five words per story, a quiz that explains each answer, and a writing prompt. Words you miss come back later for review, not just once.",
      "why.card3.title": "See the habit, not just the score",
      "why.card3.body": "XP, levels, streaks and a visible record of every learning day. Your progress stays on your device, and it is yours to export.",
      "stages.eyebrow": "Three stages, one journey",
      "stages.title": "Start where the learner is.",
      "stages.sub": "From a child's first spoken colour word to a teenager defending an opinion about AI, the difficulty and the subject change — the habit stays.",
      "stage1.badge": "Ages 3–6 · 3 minutes a day",
      "stage1.eyebrow": "Sensory & daily",
      "stage1.title": "Little Curio",
      "stage1.body": "Six picture games that turn a new English word into a sound, a colour and a movement. An adult reads the prompt aloud; the child taps, listens and says the word back.",
      "img.stage1": "Little Curio sensory colour game",
      "img.stage2": "Curiosity Library lesson cards",
      "img.stage3": "Future Worlds interactive programmes",
      "img.pet": "Curio companion page with a fox and an egg",
      "img.phone": "Curio on a phone",
      "stage1.b1": "Colours, animal sounds, shapes, textures, feelings and counting",
      "stage1.b2": "Spoken prompts and gentle “try again” feedback",
      "stage1.b3": "A sticker for every day of play, plus a grown-up guide",
      "stage1.meta1": "Easy · Standard · Challenge",
      "stage1.meta2": "No reading required",
      "stage2.badge": "Reading & vocabulary",
      "stage2.eyebrow": "Read, collect, write",
      "stage2.title": "Curiosity Library",
      "stage2.body": "Fourteen original true-story lessons in clear B1–B2 English. Each one gives you five useful words, a short comprehension quiz and a prompt worth writing about.",
      "stage2.b1": "Real subjects: space, nature, history, food, language and the mind",
      "stage2.b2": "Every word has a definition, an example and a pronunciation button",
      "stage2.b3": "Shuffled questions, saved written answers and spaced review",
      "stage2.meta1": "14 lessons · 70 words",
      "stage2.meta2": "Ages 8–12 and up",
      "stage3.badge": "Advanced English",
      "stage3.eyebrow": "Decide, argue, solve",
      "stage3.title": "Future Worlds",
      "stage3.body": "Three interactive programmes for learners ready to read closely, weigh evidence and explain a point of view in English.",
      "stage3.b1": "A five-chapter colony survival story with resource trade-offs",
      "stage3.b2": "AI briefings with simulated forums, polls and written arguments",
      "stage3.b3": "Two detective cases with clues, alibis and a full solution",
      "stage3.meta1": "Ages 13+ · advanced",
      "stage3.meta2": "Reading, logic and argument",
      "world1.title": "Chronicles: Kepler Station",
      "world1.body": "Five science logs. Forty days of darkness. Every choice spends oxygen, water, food, power or morale — and the colony remembers.",
      "world1.tag": "Science fiction · systems thinking",
      "world2.title": "AI &amp; Our Future World",
      "world2.body": "Algorithms, AI tutors and deepfakes. Read a simulated forum, vote in a poll, build a complex sentence and write a reply that takes a position.",
      "world2.tag": "Debate · opinion writing",
      "world3.title": "The Whodunit Mystery Club",
      "world3.body": "A burnt page, a cancelled train, a glove in a door. Read the evidence, test every alibi and name the culprit before the solution reveals itself.",
      "world3.tag": "Close reading · logical deduction",
      "difficulty.eyebrow": "One app, three levels",
      "difficulty.title": "Easy, Standard or Challenge — in every stage.",
      "difficulty.body": "Change the level on any stage page. Little Curio changes the number of pictures; the Library changes the number of questions and adds a word-recall task on Challenge; Future Worlds changes colony supplies, hints and writing requirements. Your choice is saved per stage.",
      "inside.eyebrow": "Inside the app",
      "inside.title": "A learning record that feels alive.",
      "inside.sub": "Curio is not a library of PDFs with a score at the end. The app remembers what you have read, which words are fading and how many days in a row you have shown up.",
      "pet.eyebrow": "Companions",
      "pet.title": "Your points hatch a friend.",
      "pet.body": "Every 300 points warms an egg. Six companions hatch across the journey — Pip, Momo, Nori, Kiko, Lumi and Astra — each with a trait and a voice. Switching your active companion is one tap.",
      "pet.link": "Meet the companions →",
      "mini1.title": "Progress you can see",
      "mini1.body": "XP, eight levels, a daily goal, streaks, a 14-day chart and a six-month consistency map.",
      "mini2.title": "Words that come back",
      "mini2.body": "A word bank with Again / Good / Easy grading schedules each word before it fades.",
      "mini3.title": "Local by design",
      "mini3.body": "No accounts, no tracking, no uploads. Export a JSON file whenever you want to move your progress.",
      "mini4.title": "Phone and desktop",
      "mini4.body": "The same app, with a bottom navigation bar on a phone and a sidebar on a larger screen.",
      "phone.eyebrow": "A small daily habit",
      "phone.title": "Three minutes. Then back to your day.",
      "phone.body": "The whole experience is built for short sessions: one story, five words, four or five questions. On a phone, Curio opens in the browser and remembers where you stopped.",
      "phone.b1": "No app store needed",
      "phone.b2": "Respects reduced motion",
      "phone.b3": "Built with plain HTML, CSS and JavaScript",
      "how.eyebrow": "How it works",
      "how.title": "Begin with one curiosity.",
      "how.s1.title": "Choose a stage and a level",
      "how.s1.body": "Little Curio for sensory play, the Library for reading, or Future Worlds for an adventure. Each stage keeps its own Easy, Standard or Challenge setting.",
      "how.s2.title": "Read, play and answer",
      "how.s2.body": "Listen, tap, read, decide. Curio explains every answer and lets you hear the words aloud. The writing prompt is saved as you type.",
      "how.s3.title": "Come back tomorrow",
      "how.s3.body": "Your streak, review queue and companions are waiting. Three minutes today is worth more than two hours on Sunday.",
      "audience.eyebrow": "Who it is for",
      "audience.title": "One app, several kinds of learner.",
      "audience.family.title": "Families",
      "audience.family.body": "Use Little Curio with a child at the table. Read the prompt aloud, let them tap, and finish by saying the new word together.",
      "audience.self.title": "Independent learners",
      "audience.self.body": "Teenagers and adults can read a story on the bus, collect five words, then argue about AI or solve a case on a longer evening session.",
      "audience.class.title": "Classrooms",
      "audience.class.body": "No logins to manage. Students use their own device, keep their own progress, and choose the level that fits the task.",
      "author.eyebrow": "About the creator",
      "author.name": "Wong Tsz Ching",
      "author.class": "Class 2C",
      "author.body": "Curio is a student-built educational project by Wong Tsz Ching of Class 2C. The aim was to make English practice feel less like homework: something you choose to open because the next story, decision or mystery is interesting.",
      "author.note": "The app is free to use, has no advertisements, and keeps learning data in the browser on the learner's own device.",
      "author.app": "Try the app",
      "author.repo": "View the source on GitHub",
      "faq.eyebrow": "Questions",
      "faq.title": "Good to know.",
      "faq.q1": "Is Curio free?",
      "faq.a1": "Yes. There are no accounts, no advertisements and no in-app purchases. It is a student educational project.",
      "faq.q2": "What ages is it for?",
      "faq.a2": "Little Curio is designed for ages 3–6 with an adult nearby. The Curiosity Library suits roughly ages 8–12 and older learners who want clear B1–B2 reading. Future Worlds is for confident readers (around 13+) who enjoy argument and deduction.",
      "faq.q3": "Is my progress saved?",
      "faq.a3": "Progress is saved in your browser’s local storage on the device you use. It is not sent to a server. You can export a JSON backup from Settings &amp; data and import it on another browser.",
      "faq.q4": "Does it work offline?",
      "faq.a4": "Once the page and its files have loaded, the activities work in the browser. Speech uses the voices built into your device or browser. The site itself needs a connection the first time it is opened.",
      "faq.q5": "Can a teacher use it with a class?",
      "faq.a5": "Yes. There is nothing to sign into and no class data is collected. Each student keeps a separate progress record on their own device, and the three difficulty levels make it easy to set different expectations for the same text.",
      "faq.q6": "Does it replace a teacher?",
      "faq.a6": "No. Curio is a practice tool. It gives learners more reading, vocabulary and thinking time; a teacher still provides feedback, conversation and guidance.",
      "footer.tagline": "English through curiosity",
      "footer.app": "Open the app",
      "footer.stages": "Stages",
      "footer.author": "Author",
      "footer.credit": "Created by Wong Tsz Ching · Class 2C",
      "footer.privacy": "Free · No ads · No accounts · Progress stays on your device."
    },

    zh: {
      "meta.title": "Curio — 用好奇心學英文",
      "meta.description": "Curio 是一個三階段英語學習應用程式：3–6 歲感官遊戲、十四篇真實故事、互動未來世界、進度記錄與可孵化的學習夥伴。",
      "a11y.skip": "跳至主要內容",
      "a11y.menu": "開啟選單",
      "brand.tagline": "以好奇心學英文",
      "nav.product": "產品理念",
      "nav.stages": "學習階段",
      "nav.inside": "應用程式功能",
      "nav.author": "作者",
      "nav.faq": "常見問題",
      "cta.open": "開啟應用程式",
      "cta.start": "免費開啟應用程式",
      "cta.explore": "探索三個學習階段",
      "cta.eyebrow": "下一個好奇正在等候",
      "cta.title": "三分鐘，就足以開始。",
      "cta.sub": "毋須註冊。選一個階段、一個難度，由一個故事開始。",
      "cta.openApp": "開啟 Curio",
      "hero.eyebrow": "三階段英語學習應用程式",
      "hero.title": "讓好奇心，帶你學好英文。",
      "hero.sub": "以真實短篇故事、感官遊戲與互動冒險學習英語；進度會跟著你，寵物會隨你一起成長。",
      "hero.micro": "毋須帳戶・沒有廣告・進度只保存在你的裝置。",
      "hero.tag1": "3–6 歲至成人",
      "hero.tag2": "每個階段 3 種難度",
      "hero.tag3": "載入後可離線使用",
      "hero.floatXp": "每一題都算數",
      "hero.floatPet": "新夥伴孵化了",
      "hero.note": "每天三分鐘就足夠。",
      "proof.stages": "學習階段",
      "proof.lessons": "真實故事",
      "proof.words": "實用單字",
      "proof.pets": "學習夥伴",
      "proof.levels": "每階段難度級別",
      "why.eyebrow": "為何選 Curio",
      "why.title": "以好奇心為本，而不是一張單字表。",
      "why.sub": "大部分英語應用程式要求你記住；Curio 先給你值得記住的事——一個奇特的事實、一個艱難的選擇、一宗待解的懸案——再把語言建立在它之上。",
      "why.card1.title": "讀一些值得轉述的內容",
      "why.card1.body": "每一課都由真實故事開始：正在遠離地球的月亮、一場對抗鴯鶓的戰爭、史上第一個電腦蟲。讀完，你會有一件事可以告訴別人。",
      "why.card2.title": "趁還記得，立即運用",
      "why.card2.body": "每個故事五個單字、一個會解釋答案的測驗，以及寫作提示。答錯的單字會在稍後回來複習，而不是只出現一次。",
      "why.card3.title": "看見習慣，不只分數",
      "why.card3.body": "經驗值、等級、連續學習日，以及每一天的學習紀錄。進度保存在你的裝置，也可以隨時匯出。",
      "stages.eyebrow": "三個階段，一段旅程",
      "stages.title": "從學習者所在的位置開始。",
      "stages.sub": "由孩子說出第一個顏色單字，到青少年用英語為 AI 的觀點辯護；題材與難度會變，習慣卻會留下。",
      "stage1.badge": "3–6 歲・每天 3 分鐘",
      "stage1.eyebrow": "感官與日常",
      "stage1.title": "Little Curio",
      "stage1.body": "六個圖像遊戲，把新的英語單字變成聲音、顏色和動作。成人讀出題目，孩子點選、聆聽，再把單字說出來。",
      "img.stage1": "Little Curio 的顏色感官遊戲",
      "img.stage2": "Curiosity Library 的課程卡",
      "img.stage3": "Future Worlds 的互動課程",
      "img.pet": "Curio 夥伴頁面，顯示狐狸與蛋",
      "img.phone": "手機上的 Curio",
      "stage1.b1": "顏色、動物叫聲、形狀、質感、情緒與數數",
      "stage1.b2": "語音提示，以及溫和的「再試一次」回應",
      "stage1.b3": "每天遊玩可得一張貼紙，並附家長指南",
      "stage1.meta1": "簡單・標準・挑戰",
      "stage1.meta2": "毋須識字",
      "stage2.badge": "閱讀與詞彙",
      "stage2.eyebrow": "閱讀、收集、書寫",
      "stage2.title": "Curiosity Library",
      "stage2.body": "十四篇原創真實故事，以清晰的 B1–B2 英語寫成。每篇給你五個實用單字、一個簡短理解測驗，以及值得書寫的提示。",
      "stage2.b1": "真實題材：太空、自然、歷史、食物、語言與心智",
      "stage2.b2": "每個單字都有釋義、例句與發音按鈕",
      "stage2.b3": "題目次序會打亂，寫作答案會保存，單字會定時複習",
      "stage2.meta1": "14 課・70 個單字",
      "stage2.meta2": "約 8–12 歲或以上",
      "stage3.badge": "進階英語",
      "stage3.eyebrow": "決定、辯論、解謎",
      "stage3.title": "Future Worlds",
      "stage3.body": "三個互動課程，適合已能細讀、衡量證據，並用英語解釋觀點的學習者。",
      "stage3.b1": "五章殖民地的生存故事，每個選擇都有資源代價",
      "stage3.b2": "AI 專題：模擬論壇、投票與 40 字論點寫作",
      "stage3.b3": "兩宗偵探懸案：線索、不在場證明與完整解答",
      "stage3.meta1": "13 歲以上・進階",
      "stage3.meta2": "閱讀、邏輯與論證",
      "world1.title": "編年史：開普勒站",
      "world1.body": "五篇科學日誌、四十天黑暗。每個選擇都會消耗氧氣、水、食物、電力或士氣，殖民地會記住你的決定。",
      "world1.tag": "科幻・系統思考",
      "world2.title": "AI 與我們的未來世界",
      "world2.body": "演算法、AI 補習老師與深偽影片。閱讀模擬論壇、投票、組織複雜句子，並寫出有立場的回應。",
      "world2.tag": "辯論・觀點寫作",
      "world3.title": "偵探懸案社",
      "world3.body": "一頁燒焦的稿子、一班取消的火車、一隻卡在門邊的手套。閱讀證據、檢驗不在場證明，在解答揭曉前指出兇手。",
      "world3.tag": "細讀・邏輯推理",
      "difficulty.eyebrow": "一個應用程式，三種難度",
      "difficulty.title": "每個階段都有簡單、標準與挑戰。",
      "difficulty.body": "在任何階段頁面切換難度。Little Curio 會改變圖片數目；Library 會改變題目數量，挑戰模式更加入單字回想題；Future Worlds 會改變殖民地補給、提示與寫作要求。你的選擇會按階段保存。",
      "inside.eyebrow": "應用程式內涵",
      "inside.title": "一個會活起來的學習紀錄。",
      "inside.sub": "Curio 不是把 PDF 堆在一起、最後給一個分數。它會記住你讀過甚麼、哪些單字正在淡忘，以及你連續多少天回來學習。",
      "pet.eyebrow": "學習夥伴",
      "pet.title": "你的分數，會孵化出朋友。",
      "pet.body": "每 300 分會溫暖一顆蛋。旅程中可孵化六位夥伴——Pip、Momo、Nori、Kiko、Lumi 與 Astra——每位都有自己的特質與聲音。切換夥伴只需一按。",
      "pet.link": "認識學習夥伴 →",
      "mini1.title": "看得見的進度",
      "mini1.body": "經驗值、八個等級、每日目標、連續學習、十四天圖表與六個月的一致性地圖。",
      "mini2.title": "會回來的單字",
      "mini2.body": "單字庫以「再來一次／良好／容易」評分，在遺忘前安排下一次複習。",
      "mini3.title": "以本地為先",
      "mini3.body": "沒有帳戶、沒有追蹤、沒有上傳。你隨時可以匯出 JSON 檔案，帶走自己的進度。",
      "mini4.title": "手機與電腦",
      "mini4.body": "同一個應用程式：手機用底部導覽，大螢幕用側邊欄。",
      "phone.eyebrow": "一個小小的每日習慣",
      "phone.title": "三分鐘，然後回到生活。",
      "phone.body": "整個體驗為短時間學習而設：一個故事、五個單字、四至五條問題。在手機上，Curio 直接在瀏覽器打開，並記住你停在哪裏。",
      "phone.b1": "毋須應用程式商店",
      "phone.b2": "尊重「減少動態效果」設定",
      "phone.b3": "以純 HTML、CSS 與 JavaScript 製作",
      "how.eyebrow": "如何使用",
      "how.title": "由一個好奇的問題開始。",
      "how.s1.title": "選擇階段與難度",
      "how.s1.body": "想感官遊戲選 Little Curio；想閱讀選 Library；想冒險選 Future Worlds。每個階段都有自己的簡單、標準或挑戰設定。",
      "how.s2.title": "閱讀、遊玩、作答",
      "how.s2.body": "聽、點、讀、決定。Curio 會解釋每個答案，也可讓你聽到單字讀音；寫作提示會邊寫邊保存。",
      "how.s3.title": "明天再回來",
      "how.s3.body": "你的連續學習、複習佇列與夥伴都在等你。今天三分鐘，勝過星期日兩小時。",
      "audience.eyebrow": "適合誰",
      "audience.title": "一個應用程式，幾種學習者。",
      "audience.family.title": "家庭",
      "audience.family.body": "在飯桌旁與孩子一起玩 Little Curio。讀出題目，讓孩子點選，最後一起把新單字說出來。",
      "audience.self.title": "自學人士",
      "audience.self.body": "青少年與成人可以在巴士上讀一個故事、收集五個單字，再在晚上用較長時間討論 AI 或解一宗懸案。",
      "audience.class.title": "課堂",
      "audience.class.body": "毋須管理登入帳戶。學生用自己的裝置、保存自己的進度，並選擇適合任務的難度。",
      "author.eyebrow": "關於創作者",
      "author.name": "Wong Tsz Ching",
      "author.class": "2C 班",
      "author.body": "Curio 是 2C 班 Wong Tsz Ching 的學生教育項目。目標是讓英語練習不再像功課：你會主動打開它，因為下一個故事、決定或懸案很有趣。",
      "author.note": "應用程式免費使用、沒有廣告，學習資料只保存在學習者自己裝置的瀏覽器中。",
      "author.app": "試用應用程式",
      "author.repo": "在 GitHub 查看原始碼",
      "faq.eyebrow": "問題",
      "faq.title": "值得知道的事。",
      "faq.q1": "Curio 是免費的嗎？",
      "faq.a1": "是。沒有帳戶、沒有廣告、沒有應用程式內購買。這是一個學生的教育項目。",
      "faq.q2": "適合甚麼年齡？",
      "faq.a2": "Little Curio 適合 3–6 歲兒童，並需成人陪同。Curiosity Library 約適合 8–12 歲或以上、想閱讀清晰 B1–B2 內容的學習者。Future Worlds 適合約 13 歲以上、喜歡論證與推理的讀者。",
      "faq.q3": "我的進度會保存嗎？",
      "faq.a3": "進度保存在你使用之裝置的瀏覽器本地儲存空間，不會傳送到伺服器。你可以在「設定與資料」匯出 JSON 備份，並在其他瀏覽器匯入。",
      "faq.q4": "可以離線使用嗎？",
      "faq.a4": "頁面與檔案載入後，活動可在瀏覽器中運作。語音使用裝置或瀏覽器內置的聲音。網站本身第一次開啟時需要網絡連線。",
      "faq.q5": "老師可以在課堂使用嗎？",
      "faq.a5": "可以。毋須登入，也不會收集班級資料。每位學生在自己的裝置保存獨立進度，三種難度也方便老師為同一篇文章設定不同要求。",
      "faq.q6": "它會取代老師嗎？",
      "faq.a6": "不會。Curio 是練習工具，讓學習者有更多閱讀、詞彙與思考時間；老師仍然提供回饋、對話與指導。",
      "footer.tagline": "以好奇心學英文",
      "footer.app": "開啟應用程式",
      "footer.stages": "學習階段",
      "footer.author": "作者",
      "footer.credit": "Wong Tsz Ching 製作・2C 班",
      "footer.privacy": "免費・沒有廣告・毋須帳戶・進度保存在你的裝置。"
    }
  };

  var params = new URLSearchParams(location.search);
  var stored = null;
  try { stored = localStorage.getItem("curio.site.lang"); } catch (e) { /* private mode */ }

  var initial = params.get("lang");
  if (initial !== "en" && initial !== "zh") {
    initial = stored === "en" || stored === "zh"
      ? stored
      : ((navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en");
  }

  var langButtons = Array.prototype.slice.call(document.querySelectorAll("[data-lang]"));
  var navToggle = document.getElementById("nav-toggle");
  var header = document.querySelector(".site-header");

  function setLang(lang) {
    if (!I18N[lang]) lang = "en";
    var dict = I18N[lang];
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
    document.documentElement.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.innerHTML = dict[key];
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (dict[key]) el.setAttribute("alt", dict[key]);
    });

    document.title = dict["meta.title"];
    var desc = document.getElementById("meta-description");
    if (desc) desc.setAttribute("content", dict["meta.description"]);
    var ogTitle = document.getElementById("og-title");
    var ogDesc = document.getElementById("og-description");
    if (ogTitle) ogTitle.setAttribute("content", dict["meta.title"]);
    if (ogDesc) ogDesc.setAttribute("content", dict["meta.description"]);

    document.querySelectorAll('meta[name="twitter:title"]').forEach(function (el) {
      el.setAttribute("content", dict["meta.title"]);
    });
    document.querySelectorAll('meta[name="twitter:description"]').forEach(function (el) {
      el.setAttribute("content", dict["meta.description"]);
    });

    langButtons.forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (navToggle) navToggle.setAttribute("aria-label", lang === "zh" ? "選單" : "Menu");

    try { localStorage.setItem("curio.site.lang", lang); } catch (e) { /* ignore */ }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang"));
    });
  });

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll("#site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.documentElement.classList.add("js");
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  setTimeout(function () {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }, 1800);

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  setLang(initial);
})();
