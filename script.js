/* =========================================================================
   ⚙️ 1. アプリケーション設定（標準フォーマット）
   新しいイベントを作成する際は、以下の設定とデータを書き換えるだけで対応可能です。
   ========================================================================= */
const EVENT_CONFIG = {
    // データ保存用のキー接頭辞（フェスごとに変更することでデータ混同を防ぐ）
    STORAGE_KEY_PREFIX: "coachella_2026",
    
    // イベントの基本情報（HTMLヘッダーに自動反映）
    TITLE: "Coachella 2026 weekend2",
    SUBTITLE: "配信用タイムテーブル (日本時間)",
    DISCLAIMER: "※各アーティストのジャンル・出身はAIによる判定です。",
    
    // タイムテーブルの表示設定
    START_HOUR: 8,       // タイムテーブルの開始時刻（例：朝8時）
    END_HOUR: 27,        // タイムテーブルの終了時刻（27時 = 翌日深夜3時）
    PX_PER_MIN: 2        // 1分あたりの高さ（ピクセル数）。CSSの--px-per-minと必ず揃える
};

/* =========================================================================
   📅 2. ステージ情報定義
   ステージID、表示名、背景色、配信のYouTube動画IDを定義します。
   ========================================================================= */
const stagesInfo = [
    { id: 'main', name: 'Main Stage', color: '#1c5b7c', yt: 'xIiSaqq10Yw' },
    { id: 'outdoor', name: 'Outdoor Theatre', color: '#1b9b9c', yt: 'CzAJcgiywFo' },
    { id: 'sahara', name: 'Sahara', color: '#71b92e', yt: 'bkCTPTwU7ls' },
    { id: 'mojave', name: 'Mojave', color: '#e65100', yt: 'cYT79Dp0Wuk' },
    { id: 'gobi', name: 'GOBI', color: '#ef629f', yt: 'OMImphySFJs' },
//    { id: 'sonora', name: 'Sonora', color: '#d32f2f', yt: 'OGNPnQViI3g' },
   { id: 'yuma', name: 'YUMA', color: '#d32f2f', yt: 's5A5Y93nmPI' },
    { id: 'quasar', name: 'Quasar', color: '#fbc02d', yt: 'iulgXa5S62A' }
];

/* =========================================================================
   🎙️ 3. アーティストデータ定義
   各日の出演者情報を定義します。
   ========================================================================= */
/**
 * アーティストオブジェクトを簡潔に生成するためのヘルパー関数
 * @param {string} name - アーティスト名
 * @param {string} start - 開始時間 (例: "09:30")
 * @param {string} end - 終了時間 (例: "10:20")
 * @param {string} genre - ジャンル
 * @param {string} origin - 出身国など
 * @param {boolean} [isReplay=false] - リプレイ（再放送）かどうか
 */
const e = (name, start, end, genre, origin, isReplay = false) => ({ name, start, end, genre, origin, isReplay });

const timetableData = {
    day1: {
        date: "2026-04-18", // 日付を指定（フォーマット: YYYY-MM-DD）
        main: [
            e("Teddy Swims", "09:20", "10:10", "R&B/Soul", "USA"),
            e("The xx", "11:00", "11:55", "Indie Pop", "UK"),
            e("Sabrina Carpenter", "13:00", "14:40", "Pop", "USA"),
            e("Anyma", "16:00", "17:00", "Melodic Techno", "Italy"),
            e("Teddy Swims (Replay)", "18:50", "19:40", "Soul/R&B", "USA", true),
            e("The xx (Replay)", "20:30", "21:25", "Indie Pop", "UK", true),
            e("Sabrina Carpenter (Replay)", "22:30", "24:10", "Pop", "USA", true),
            e("Anyma (Replay)", "25:30", "26:30", "Melodic Techno", "Italy", true)
        ],
        outdoor: [
            e("Dabeull", "08:00", "08:50", "Funk/Synth-pop", "France"),
          e("Lykke Li", "09:20", "10:10", "Dream Pop", "Sweden"),
          e("Dijon", "10:40", "11:30", "R&B/Lo-fi", "USA"),
          e("Turnstile", "12:05", "13:00", "Hardcore Punk", "USA"),
          e("Disclosure", "14:40", "15:55", "Electronic", "UK"),
          e("Dabeull (Replay)", "17:30", "18:20", "Funk/Electronic", "France", true),
          e("Lykke Li (Replay)", "18:50", "19:40", "Indie Pop", "Sweden", true),
          e("Dijon (Replay)", "20:10", "21:00", "R&B/Alternative", "USA", true),
          e("Turnstile (Replay)", "21:35", "22:30", "Hardcore Punk", "USA", true),
          e("Disclosure (Replay)", "24:10", "25:25", "Electronic/House", "UK", true)
        ],
        sahara: [
          e("Youna", "08:00", "08:50", "Electronic", "South Korea"),
          e("HUGEL", "08:50", "09:50", "Latin House", "France"),
          e("Marlon Hoffstadt", "10:15", "11:15", "Techno/Trance", "Germany"),
          e("KATSEYE", "12:00", "12:45", "Global Girl Group", "USA/Global"),
          e("Levity", "13:15", "14:20", "Electronic", "USA"),
          e("Swae Lee", "14:50", "15:40", "Hip Hop", "USA"),
          e("Sexyy Red", "16:05", "16:55", "Hip Hop", "USA"),
          e("Youna (Replay)", "17:30", "18:20", "House/Electronic", "South Korea", true),
          e("HUGEL (Replay)", "18:20", "19:20", "Latin House", "France", true),
          e("KATSEYE (Replay)", "21:30", "22:15", "Global Pop", "USA", true),
          e("Levity (Replay)", "22:45", "23:50", "Electronic", "USA", true),
          e("Swae Lee (Replay)", "24:20", "25:10", "Hip Hop", "USA", true),
          e("Sexyy Red (Replay)", "25:35", "26:25", "Hip Hop", "USA", true)
        ],
        mojave: [
          e("BINI", "08:15", "09:00", "P-pop", "Philippines"),
          e("Central Cee", "09:30", "10:15", "UK Drill", "UK"),
          e("Devo", "10:45", "11:40", "New Wave", "USA"),
          e("Moby", "12:10", "13:00", "Electronic", "USA"),
          e("Slayyyter", "13:20", "14:05", "Hyperpop", "USA"),
          e("Ethel Cain", "14:45", "15:35", "Indie Rock", "USA"),
          e("Blood Orange", "16:00", "16:55", "R&B/Indie", "UK"),
          e("BINI (Replay)", "17:45", "18:30", "P-Pop", "Philippines", true),
          e("Central Cee (Replay)", "19:00", "19:45", "UK Drill", "UK", true),
          e("Devo (Replay)", "20:15", "21:10", "New Wave", "USA", true),
          e("Moby (Replay)", "21:40", "22:30", "Electronic", "USA", true),
          e("Slayyyter (Replay)", "22:50", "23:35", "Hyperpop", "USA", true),
          e("Ethel Cain (Replay)", "24:15", "25:05", "Alternative", "USA", true),
          e("Blood Orange (Replay)", "25:30", "26:25", "Alternative R&B", "UK", true)
        ],
        gobi: [
          e("Bob Baker Marionettes", "08:00", "08:40", "Puppetry/Performance", "USA"),
          e("NewDad", "08:45", "09:25", "Indie Rock", "Ireland"),
          e("Joyce Manor", "09:30", "10:10", "Emo/Pop-punk", "USA"),
          e("CMAT", "10:15", "10:55", "Indie Pop", "Ireland"),
          e("fakemink", "11:20", "12:00", "Electronic", "USA"),
          e("Holly Humberstone", "12:25", "13:10", "Indie Pop", "UK"),
          e("Joost", "13:50", "14:35", "Gabberpop", "Netherlands"),
          e("Creepy Nuts", "15:05", "15:55", "Hip Hop", "Japan"),
          e("Bob Baker Marionettes (Replay)", "17:30", "18:10", "Puppetry/Performance", "USA", true),
          e("NewDad (Replay)", "18:15", "18:55", "Indie Rock", "Ireland", true),
          e("Joyce Manor (Replay)", "19:00", "19:40", "Pop Punk", "USA", true),
          e("CMAT (Replay)", "19:45", "20:25", "Country Pop", "Ireland", true),
          e("fakemink (Replay)", "20:50", "21:30", "Electronic", "USA", true),
          e("Holly Humberstone (Replay)", "21:55", "22:40", "Indie Pop", "UK", true),
          e("Joost (Replay)", "23:20", "24:05", "Pop/Rap", "Netherlands", true),
          e("Creepy Nuts (Replay)", "24:35", "25:25", "Hip Hop", "Japan", true)
        ],
        yuma: [
          e("Groove Armada", "08:00", "09:00", "Electronic", "UK"),
          e("Rossi. x Chloé Caillet", "09:00", "10:15", "House", "UK/France"),
          e("Kettama", "10:15", "11:30", "Techno", "Ireland"),
          e("Prospa", "11:30", "12:45", "Electronic", "UK"),
          e("Max Dean x Luke Dean", "12:45", "14:00", "House", "UK"),
          e("Max Styler", "14:00", "15:15", "House", "USA"),
          e("Gordo", "15:15", "16:55", "House", "Guatemala/USA"),
          e("Groove Armada (DJ Set) (Replay)", "17:30", "18:30", "Electronic", "UK", true),
          e("Rossi. x Chloé Caillet (Replay)", "18:30", "19:45", "House/Electronic", "Multi", true),
          e("Kettama (Replay)", "19:45", "21:00", "Electronic/Techno", "Ireland", true),
          e("Prospa (Replay)", "21:00", "22:15", "Electronic/House", "UK", true),
          e("Max Dean x Luke Dean (Replay)", "22:15", "23:30", "House", "UK", true),
          e("Max Styler (Replay)", "23:30", "24:45", "House", "USA", true),
          e("Gordo (Replay)", "24:45", "26:25", "House", "Guatemala/USA", true)
        ],
        quasar: [
          e("Darco", "09:00", "11:00", "Electronic", "USA"),
          e("Franky Rizardo", "11:00", "13:00", "House", "Netherlands"),
          e("Armin van Buuren x Adam Beyer", "13:00", "15:00", "Trance/Techno", "Netherlands/Sweden"),
          e("Kettama x Prospa x Josh Baker", "15:00", "17:00", "Electronic", "Various"),
          e("Darco (Replay)", "18:30", "20:30", "Electronic", "USA", true),
          e("Franky Rizardo (Replay)", "20:30", "22:30", "House/Techno", "Netherlands", true),
          e("Armin van Buuren x Adam Beyer (Replay)", "22:30", "24:30", "Trance/Techno", "Multi", true),
          e("Kettama x Prospa x Josh Baker (Previously Recorded) (Replay)", "24:30", "26:30", "Electronic", "Multi", true)
        ]
    },
    day2: {
        date: "2026-04-19",
        main: [
          e("Addison Rae", "09:25", "10:20", "Pop", "USA"),
          e("GIVEON", "11:00", "11:50", "R&B", "USA"),
          e("The Strokes", "13:00", "14:10", "Indie Rock", "USA"),
          e("Justin Bieber", "15:25", "16:55", "Pop/R&B", "Canada"),
          e("Addison Rae (Replay)", "18:55", "19:50", "Pop", "USA", true),
          e("GIVĒON (Replay)", "20:30", "21:20", "R&B", "USA", true),
          e("The Strokes (Replay)", "22:30", "23:40", "Indie Rock", "USA", true),
          e("Justin Bieber (Replay)", "24:55", "26:25", "Pop", "Canada", true)
        ],
        outdoor: [
          e("Los Hermanos Flores", "08:00", "08:50", "Cumbia", "El Salvador"),
          e("Alex G", "09:10", "10:00", "Indie Rock", "USA"),
          e("Blondshell", "10:10", "10:55", "Indie Rock", "USA"),
          e("SOMBR", "11:05", "11:55", "Indie Pop", "USA"),
          e("Labrinth", "12:30", "13:25", "R&B/Soul", "UK"),
          e("David Byrne", "14:25", "15:25", "Art Pop/Rock", "UK/USA"),
          e("Gigi Perez (Replay)", "16:30", "17:15", "Indie Pop", "USA", true),
          e("Los Hermanos Flores (Replay)", "17:30", "18:20", "Cumbia", "El Salvador", true),
          e("Alex G (Replay)", "18:40", "19:30", "Indie Rock", "USA", true),
          e("Blondshell (Replay)", "19:40", "20:25", "Indie Rock", "USA", true),
          e("SOMBR (Replay)", "20:35", "21:25", "Alt Pop", "USA", true),
          e("Labrinth (Replay)", "22:00", "22:55", "R&B/Electronic", "UK", true),
          e("David Byrne (Replay)", "23:55", "24:55", "Art Rock", "UK/USA", true)
        ],
        sahara: [
          e("ZULAN", "08:00", "08:50", "Electronic", "China"),
          e("Hamdi", "09:00", "09:55", "Bass/Dubstep", "UK"),
          e("¥0U$UK€ ¥UK1MAT$U", "10:15", "11:10", "Experimental Techno", "Japan"),
          e("TEED", "11:15", "11:50", "Electronic", "UK"),
          e("Nine Inch Noize", "12:00", "12:45", "Industrial/Electronic", "USA"),
          e("Adriatique", "13:15", "14:10", "Melodic Techno", "Switzerland"),
          e("WORSHIP", "14:35", "15:35", "Drum and Bass", "UK"),
          e("ZULAN (Replay)", "17:30", "18:20", "Electronic", "Unknown", true),
          e("Hamdi (Replay)", "18:30", "19:25", "Dubstep/Grime", "UK", true),
          e("¥ØU$UK€ ¥UK1MAT$U (Replay)", "19:45", "20:40", "Experimental/Techno", "Japan", true),
          e("TEED (Replay)", "20:45", "21:20", "Electronic", "UK", true),
          e("Nine Inch Noize (Replay)", "21:30", "22:15", "Electronic/Industrial", "USA", true),
          e("Adriatique (Replay)", "22:40", "23:35", "Melodic Techno", "Switzerland", true),
          e("WORSHIP (Sub Focus, Dimension, Culture Shock, 1991) (Replay)", "24:05", "25:05", "Drum and Bass", "UK", true)
        ],
        mojave: [
          e("Kacey Musgraves", "08:00", "08:50", "Country Pop", "USA"),
          e("Fujii Kaze", "08:55", "09:45", "J-Pop/R&B", "Japan"),
          e("Royel Otis", "09:50", "10:35", "Indie Pop", "Australia"),
          e("Taemin", "11:30", "12:20", "K-Pop", "South Korea"),
          e("PinkPantheress", "12:55", "13:45", "Alt-pop/Garage", "UK"),
          e("Interpol", "14:15", "15:15", "Post-punk Revival", "USA"),
          e("Kacey Musgraves (Replay)", "17:30", "18:20", "Country Pop", "USA", true),
          e("Fujii Kaze (Replay)", "18:25", "19:15", "J-Pop/R&B", "Japan", true),
          e("Royel Otis (Replay)", "19:20", "20:05", "Indie Pop", "Australia", true),
          e("Taemin (Replay)", "21:00", "21:50", "K-Pop", "South Korea", true),
          e("PinkPantheress (Replay)", "22:25", "23:15", "Alt-Pop/DnB", "UK", true),
          e("Interpol (Replay)", "23:45", "24:45", "Indie Rock", "USA", true)
        ],
        gobi: [
          e("WHATMORE", "08:00", "08:40", "Indie", "USA"),
          e("Luísa Sonza", "09:10", "09:50", "Pop", "Brazil"),
          e("Geese", "10:15", "11:00", "Indie Rock", "USA"),
          e("Noga Erez", "11:05", "11:50", "Electropop", "Israel"),
          e("Davido", "11:50", "12:35", "Afrobeats", "Nigeria"),
          e("BIA", "13:00", "13:45", "Hip Hop", "USA"),
          e("Morat", "14:10", "15:00", "Folk-Pop", "Colombia"),
          e("WHATMORE (Replay)", "17:30", "18:10", "Indie/Alternative", "USA", true),
          e("Luísa Sonza (Replay)", "18:40", "19:20", "Pop", "Brazil", true),
          e("Geese (Replay)", "19:45", "20:30", "Indie Rock", "USA", true),
          e("Noga Erez (Replay)", "20:35", "21:20", "Electropop", "Israel", true),
          e("Davido (Replay)", "21:20", "22:05", "Afrobeats", "Nigeria", true),
          e("BIA (Replay)", "22:30", "23:15", "Hip Hop", "USA", true),
          e("Morat (Replay)", "23:40", "24:30", "Folk-Pop", "Colombia", true)
        ],
        yuma: [
          e("Riordan", "08:00", "08:15", "House", "UK"),
          e("Mahmut Orhan", "08:15", "09:30", "Deep House", "Turkey"),
          e("Ben Sterling", "09:30", "10:45", "Tech House", "UK"),
          e("SOSA", "10:45", "12:15", "House", "UK"),
          e("Bedouin", "12:15", "13:45", "Deep House", "USA"),
          e("Boys Noize", "13:45", "15:00", "Techno/Electro", "Germany"),
          e("Armin van Buuren x Adam Beyer", "15:00", "16:55", "Trance/Techno", "Netherlands/Sweden"),
          e("Riordan (Replay)", "17:30", "17:45", "House", "UK", true),
          e("Mahmut Orhan (Replay)", "17:45", "19:00", "Deep House/Indie Dance", "Turkey", true),
          e("Ben Sterling (Replay)", "19:00", "20:15", "Tech House", "UK", true),
          e("SOSA (Replay)", "20:15", "21:45", "Tech House", "UK", true),
          e("Bedouin (Replay)", "21:45", "23:15", "Deep House", "USA", true),
          e("Boys Noize (Replay)", "23:15", "24:30", "Techno/Electro", "Germany", true),
          e("Armin van Buuren x Adam Beyer (Replay)", "24:30", "26:25", "Trance/Techno", "Netherlands/Sweden", true)
        ],
        quasar: [
          e("Devault", "09:00", "11:00", "Electronic", "USA"),
          e("Madeon", "11:00", "12:15", "French House", "France"),
          e("DJ Snake x RL Grime x Flosstradamus", "12:15", "13:45", "Trap/EDM", "Various"),
          e("DJ Snake x Knock2", "13:45", "15:00", "Bass/EDM", "France/USA"),
          e("Devault (Replay)", "18:30", "20:30", "Electronic", "USA", true),
          e("Madeon (Replay)", "20:30", "21:45", "Electropop/House", "France", true),
          e("DJ Snake x RL Grime x Flosstradamus (Replay)", "21:45", "23:15", "EDM/Trap", "France/USA", true),
          e("DJ Snake x Knock2 (Replay)", "23:15", "24:30", "EDM/Bass", "France/USA", true)
        ]
    },
    day3: {
        date: "2026-04-20",
        main: [
          e("Tijuana Panthers", "08:00", "08:35", "Surf Rock", "USA"),
          e("Wet Leg", "08:45", "09:30", "Indie Rock", "UK"),
          e("Major Lazer", "10:10", "11:10", "Electronic/Dancehall", "USA/Global"),
          e("Young Thug", "11:50", "12:40", "Hip Hop", "USA"),
          e("KAROL G", "14:10", "15:55", "Reggaeton", "Colombia"),
          e("Tijuana Panthers (Replay)", "16:30", "17:05", "Surf Rock", "USA", true),
          e("Wet Leg (Replay)", "17:15", "18:00", "Indie Rock", "UK", true),
          e("Major Lazer (Replay)", "18:40", "19:40", "Electronic", "USA/Jamaica", true),
          e("Young Thug (Replay)", "20:20", "21:10", "Hip Hop", "USA", true),
          e("KAROL G (Replay)", "22:40", "24:25", "Reggaeton", "Colombia", true)
        ],
        outdoor: [
          e("Gigi Perez", "08:00", "08:45", "Indie Pop", "USA"),
          e("CLIPSE", "09:15", "10:10", "Hip Hop", "USA"),
          e("Foster The People", "10:45", "11:40", "Indie Pop", "USA"),
          e("Laufey", "12:45", "13:45", "Jazz Pop", "Iceland"),
          e("BIGBANG", "14:30", "15:30", "K-Pop", "South Korea"),
          e("Gigi Perez (Replay)", "16:30", "17:15", "Indie Pop", "USA", true),
          e("CLIPSE (Replay)", "17:45", "18:40", "Hip Hop", "USA", true),
          e("Foster The People (Replay)", "19:15", "20:10", "Indie Pop", "USA", true),
          e("Laufey (Replay)", "21:15", "22:15", "Jazz Pop", "Iceland", true),
          e("BIGBANG (Replay)", "23:05", "24:05", "K-Pop", "South Korea", true)
        ],
        sahara: [
          e("Girl Math (VNSSA x NALA)", "08:00", "09:00", "House", "USA"),
          e("BUNT.", "09:05", "10:05", "Folk House", "Germany"),
          e("Duke Dumont", "10:10", "11:10", "House", "UK"),
          e("Mochakk", "11:25", "12:25", "Tech House", "Brazil"),
          e("Subtronics", "13:05", "14:05", "Dubstep", "USA"),
          e("Kaskade", "14:50", "15:55", "Progressive House", "USA"),
          e("Girl Math (VNSSA x NALA) (Replay)", "16:30", "17:30", "House", "USA", true),
          e("BUNT. (Replay)", "17:35", "18:35", "Folk House", "Germany", true),
          e("Duke Dumont (Replay)", "18:40", "19:40", "House", "UK", true),
          e("Mochakk (Replay)", "19:55", "20:55", "Tech House", "Brazil", true),
          e("Subtronics (Replay)", "21:35", "22:35", "Dubstep", "USA", true),
          e("Kaskade (Replay)", "23:20", "24:25", "Electronic", "USA", true)
        ],
        mojave: [
          e("Little Simz", "08:25", "09:10", "Hip Hop", "UK"),
          e("Suicidal Tendencies", "09:35", "10:25", "Crossover Thrash", "USA"),
          e("Samia", "10:30", "11:10", "Indie Pop", "USA"),
          e("Iggy Pop", "11:10", "12:10", "Punk Rock", "USA"),
          e("FKA twigs", "12:45", "14:00", "Art Pop/R&B", "UK"),
          e("Little Simz (Replay)", "16:55", "17:40", "Hip Hop", "UK", true),
          e("Suicidal Tendencies (Replay)", "18:05", "18:55", "Hardcore Punk", "USA", true),
          e("Samia (Replay)", "19:00", "19:40", "Indie Rock", "USA", true),
          e("Iggy Pop (Replay)", "19:40", "20:40", "Punk Rock", "USA", true),
          e("FKA twigs (Replay)", "21:15", "22:30", "Art Pop", "UK", true)
        ],
        gobi: [
          e("COBRAH", "08:05", "08:50", "Electronic", "Sweden"),
          e("Oklou", "09:15", "10:00", "Ambient Pop", "France"),
          e("Black Flag", "10:30", "11:05", "Hardcore Punk", "USA"),
          e("flowerovlove", "11:10", "11:40", "Indie Pop", "UK"),
          e("TOMORA", "11:45", "12:35", "Indie", "UK"),
          e("The Rapture", "13:05", "13:55", "Dance-punk", "USA"),
          e("The Chats", "14:00", "14:40", "Punk Rock", "Australia"),
          e("COBRAH (Replay)", "16:35", "17:20", "Electronic", "Sweden", true),
          e("Oklou (Replay)", "17:45", "18:30", "Ambient Pop", "France", true),
          e("Black Flag (Replay)", "19:00", "19:35", "Hardcore Punk", "USA", true),
          e("floweroovlove (Replay)", "19:40", "20:10", "Indie Pop", "UK", true),
          e("Tomora (Replay)", "20:15", "21:05", "Indie", "UK", true),
          e("The Rapture (Replay)", "21:35", "22:25", "Dance-punk", "USA", true),
          e("The Chats (Replay)", "22:30", "23:10", "Punk Rock", "Australia", true)
        ],
        yuma: [
          e("&friends", "08:00", "08:15", "Afro House", "USA"),
          e("MËSTIZA", "08:15", "09:30", "Electronic/Flamenco", "Spain"),
          e("Carlita x Josh Baker", "09:30", "11:00", "House", "Turkey/UK"),
          e("Röyksopp", "11:00", "12:30", "Electronic", "Norway"),
          e("WhoMadeWho", "12:30", "14:00", "Art Pop", "Denmark"),
          e("Green Velvet x AYYBO", "14:00", "15:55", "House", "USA"),
          e("&friends (Replay)", "16:30", "16:45", "Afro House", "USA", true),
          e("MËSTIZA (Replay)", "16:45", "18:00", "Electronic/Flamenco", "Spain", true),
          e("Carlita x Josh Baker (Replay)", "18:00", "19:30", "House", "Turkey/UK", true),
          e("Röyksopp (DJ Set) (Replay)", "19:30", "21:00", "Electronic", "Norway", true),
          e("WhoMadeWho (Replay)", "21:00", "22:30", "Art Pop", "Denmark", true),
          e("Green Velvet x AYYBO (Replay)", "22:30", "24:25", "House", "USA", true)
        ],
        quasar: [
          e("Linska", "08:00", "10:00", "Electronic", "Unknown"),
          e("LP Giobbi", "10:00", "12:00", "Piano House", "USA"),
          e("Sara Landry's Blood Oath", "12:00", "14:00", "Hard Techno", "USA"),
          e("Linska (Replay)", "16:30", "18:30", "Electronic", "Unknown", true),
          e("LP Giobbi (Replay)", "18:30", "20:30", "Piano House", "USA", true),
          e("Sara Landry's Blood Oath (Replay)", "20:30", "22:30", "Hard Techno", "USA", true)
        ]
    }
};

/* =========================================================================
   🧠 4. アプリケーション状態＆ローカルストレージ（データ永続化）
   ========================================================================= */

// ① 前回閲覧した日程（タブ）をLocalStorageから読み込む
const savedDayKey = `${EVENT_CONFIG.STORAGE_KEY_PREFIX}_lastDay`;
let currentDay = parseInt(localStorage.getItem(savedDayKey)) || 1;
// もしデータ更新により保存されていた日程が存在しなくなった場合は1日目に戻す
if (!timetableData[`day${currentDay}`]) {
    currentDay = 1;
}

// ② お気に入り（★）情報をLocalStorageから読み込む
const favStorageKey = `${EVENT_CONFIG.STORAGE_KEY_PREFIX}_favs`;
let favorites = JSON.parse(localStorage.getItem(favStorageKey)) || {};

/**
 * 変更されたお気に入り情報をLocalStorageへ保存し、次回アクセス時に復元できるようにする処理
 */
function saveFavorites() {
    localStorage.setItem(favStorageKey, JSON.stringify(favorites));
}

/**
 * お気に入りの追加・削除を切り替える処理
 * @param {string} id - アーティストごとに一意となる識別ID
 */
function toggleFav(id) {
    if (favorites[id]) {
        delete favorites[id]; // すでにお気に入りなら削除
    } else {
        favorites[id] = true; // お気に入りに追加
    }
    saveFavorites();
    renderTimetable(); // 表示を即時反映して画面を更新
}

/* =========================================================================
   🕒 5. 時間計算ロジック
   ========================================================================= */

/**
 * 時刻文字列(HH:mm)を、開始時間(START_HOUR)からの「経過分数」に変換する。
 * 深夜時間帯(0:00〜)にも対応し、表示位置（高さ）を計算するための基準となる。
 * @param {string} timeStr - "09:30" などの時刻文字列
 * @returns {number} 経過分数
 */
function timeToMins(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    // 終了時間が24時を超える場合の計算 (例：1時は25時として計算)
    const adjustedHour = (h < EVENT_CONFIG.START_HOUR) ? h + 24 : h;
    return (adjustedHour - EVENT_CONFIG.START_HOUR) * 60 + m;
}

/** * 表示用の時刻フォーマット調整
 * 内部的に25:00として扱っている時間を、表示時に"1:00"などに直す。
 * @param {string} timeStr - "25:30" などの時刻文字列
 * @returns {string} フォーマット済み文字列
 */
function formatTimeDisplay(timeStr) {
    let [h, m] = timeStr.split(':').map(Number);
    if(h >= 24) h -= 24;
    return `${h}:${m.toString().padStart(2,'0')}`;
}

/** * ライブ進行中の赤線を引くための「現在の相対的な分数」を取得する。
 * 表示中の日程と、現実の日付が合致している時のみ数値を返す。
 * @param {string} baseDateStr - "2026-04-11" のような対象日の日付文字列
 * @returns {number|null} 該当日であれば分数を、違えば null を返す
 */
function getRelativeMins(baseDateStr) {
    const now = new Date();
    const dataDate = new Date(baseDateStr);
    
    // 年月日が完全に一致しているか、または「翌日の深夜(START_HOUR未満)」かをチェック
    const isToday = now.toDateString() === dataDate.toDateString();
    const isLateNight = now.getHours() < EVENT_CONFIG.START_HOUR && now.getDate() === dataDate.getDate() + 1;
    
    if (isToday || isLateNight) {
        let h = now.getHours();
        if (h < EVENT_CONFIG.START_HOUR) h += 24; // 深夜は24時間を足して計算
        return (h - EVENT_CONFIG.START_HOUR) * 60 + now.getMinutes();
    }
    return null; // 該当日でなければ線は表示しない
}

/* =========================================================================
   🎨 6. レンダリング・HTML生成（画面描画処理）
   ========================================================================= */

/**
 * 設定情報からヘッダーのテキスト・日付タブを初期化する処理
 */
function initHeaderUI() {
    document.getElementById('event-title').innerHTML = EVENT_CONFIG.TITLE;
    document.getElementById('event-subtitle').innerHTML = EVENT_CONFIG.SUBTITLE;
    document.getElementById('event-disclaimer').innerHTML = EVENT_CONFIG.DISCLAIMER;
    
    // 最終更新日時の表示生成（ファイルの最終更新日時を取得）
    const lastModifiedDate = new Date(document.lastModified);
    const year = lastModifiedDate.getFullYear();
    const month = String(lastModifiedDate.getMonth() + 1).padStart(2, '0');
    const date = String(lastModifiedDate.getDate()).padStart(2, '0');
    const hours = String(lastModifiedDate.getHours()).padStart(2, '0');
    const minutes = String(lastModifiedDate.getMinutes()).padStart(2, '0');
    document.getElementById('update-time').textContent = `更新日時：${year}/${month}/${date} ${hours}:${minutes}`;
    
    // 日付タブの動的生成
    let tabsHtml = '';
    let dayIndex = 1;
    const daysArr = ['日', '月', '火', '水', '木', '金', '土'];
    
    for (const dayKey in timetableData) {
        const dateObj = new Date(timetableData[dayKey].date);
        const dayOfWeek = daysArr[dateObj.getDay()];
        const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()} (${dayOfWeek})`;
        
        // タブボタンのHTML文字列を作成。カスタムデータ属性(data-day)にインデックスを保持
        const activeClass = (dayIndex === currentDay) ? 'active' : '';
        tabsHtml += `<button class="tab-btn ${activeClass}" data-day="${dayIndex}">${formattedDate}</button>`;
        dayIndex++;
    }
    
    const tabsContainer = document.getElementById('dayTabs');
    tabsContainer.innerHTML = tabsHtml;
    
    // JS側でイベントリスナーを一括登録する（onclick属性の排除）
    tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const dayToSwitch = parseInt(this.getAttribute('data-day'));
            switchDay(dayToSwitch);
        });
    });
}

/**
 * ステージヘッダー部分（My Timetable含む）のHTMLを生成・描画する処理。
 * @param {number} myttCols - マイタイムテーブルで必要となる列数
 */
function renderHeaders(myttCols) {
    let html = '';
    // マイタイムテーブルの見出し（お気に入りが1つ以上あり、列が存在すれば生成）
    // 列数に応じて横幅を拡張（結合）することで1つの大きなタイトルにする
    if(myttCols > 0) {
        html += `<div class="stage-header mytt" style="width: calc(var(--col-width) * ${myttCols});">
                    <div class="stage-name mytt">My Timetable</div>
                 </div>`;
    }
    
    // 各ステージの見出しを生成（設定配列 stagesInfo からループ生成）
    stagesInfo.forEach(stage => {
        html += `<div class="stage-header">
            <div class="stage-name" style="background-color: ${stage.color}">${stage.name}</div>
            <a href="https://www.youtube.com/watch?v=${stage.yt}" target="_blank" class="watch-link">Watch Live📺</a>
        </div>`;
    });
    document.getElementById('stageHeaders').innerHTML = html;
}

/**
 * 個別のアーティストブロック（四角い枠）のHTMLを生成する処理。
 * 時間の長さに応じて高さを計算し、色や表示状態クラスを適用する。
 */
function getArtistHtml(artist, stage, dayKey, isMyTT = false, currentMins) {
    const startMin = timeToMins(artist.start);
    const endMin = timeToMins(artist.end);
    const duration = endMin - startMin; // 出演時間（分）
    
    // 一意のIDを生成してお気に入りの判定に使用（スペースや特殊文字を排除して安全なIDにする）
    const cleanName = artist.name.replace(/<[^>]*>/g, '').replace(/[^a-zA-Z0-9ぁ-んァ-ヶー一-龠]/g, '');
    const favId = `${dayKey}_${stage.id}_${cleanName}`;
    const isFav = favorites[favId];
    
    // 現在の時間がアーティストの出演時間内かどうか判定（赤い枠の点滅アニメーション用）
    const isPlaying = currentMins !== null && currentMins >= startMin && currentMins < endMin;
    
    // 適用するCSSクラスを配列で管理し、条件に応じて追加する
    const classes = ['artist-block'];
    if(artist.isReplay) classes.push('is-replay');
    if(isFav) classes.push('favorited');
    if(isPlaying) classes.push('playing');
    
    // マイタイムテーブル側（isMyTTがtrue）の時は、どのステージか分かるようにステージ名を追記する
    const metaInfo = `${artist.genre} | ${artist.origin} ${isMyTT ? '<br>['+stage.name+']' : ''}`;

    // 絶対配置（top, height）でブロックを描画し、お気に入りボタンにイベントを設定する準備
    // ※今回はインラインイベントハンドラの代わりに、描画後に一括登録する手法も考えられますが、
    // HTML構築のシンプルさを維持するため、ボタンに特別なクラス(js-fav-btn)とデータ属性を持たせます。
    return `
    <div class="${classes.join(' ')}" style="top: ${startMin * EVENT_CONFIG.PX_PER_MIN}px; height: ${duration * EVENT_CONFIG.PX_PER_MIN}px; background-color: ${stage.color};">
        <div class="artist-top">
            <span class="artist-time">${formatTimeDisplay(artist.start)}-${formatTimeDisplay(artist.end)}</span>
            <button class="fav-btn js-fav-btn ${isFav ? 'active' : ''}" data-favid="${favId}">★</button>
        </div>
        <div class="artist-name">${artist.name}</div>
        <div class="artist-meta">${metaInfo}</div>
    </div>`;
}

/**
 * タイムテーブル全体（時間軸、マイタイムテーブル、各ステージ）を再描画するメイン処理。
 */
function renderTimetable() {
    const dayKey = `day${currentDay}`;
    const data = timetableData[dayKey];
    const currentMins = getRelativeMins(data.date);
    
    // ==========================================
    // ① 時間軸カラムの生成（左端の時刻表示）
    // ==========================================
    let timeHtml = '';
    for(let h = EVENT_CONFIG.START_HOUR; h <= EVENT_CONFIG.END_HOUR; h++) {
        timeHtml += `<div class="time-slot"><span>${h >= 24 ? h - 24 : h}:00</span></div>`;
    }
    document.getElementById('timeCol').innerHTML = timeHtml;
    
    // ==========================================
    // ② マイタイムテーブル（お気に入り）の抽出
    // ==========================================
    let myTtItems = [];
    stagesInfo.forEach((stage, stageIndex) => {
        (data[stage.id] || []).forEach(artist => {
            const cleanName = artist.name.replace(/<[^>]*>/g, '').replace(/[^a-zA-Z0-9ぁ-んァ-ヶー一-龠]/g, '');
            const favId = `${dayKey}_${stage.id}_${cleanName}`;
            
            // お気に入りに登録されていれば、マイタイムテーブル表示用の配列に追加
            if(favorites[favId]) {
                myTtItems.push({ artist, stage, stageIndex });
            }
        });
    });
    
    // ==========================================
    // ③ マイタイムテーブルの被り（時間重複）計算と列の配置
    // ==========================================
    // ステージ順序優先、次に開始時間順でソートして整列
    myTtItems.sort((a,b) => {
        if (a.stageIndex !== b.stageIndex) return a.stageIndex - b.stageIndex;
        return timeToMins(a.artist.start) - timeToMins(b.artist.start);
    });
    
    let myTtColumns = []; 
    myTtItems.forEach(item => {
        let maxOverlapCol = -1;
        
        // 重複するアイテムが配置されている最大の列インデックスを取得
        for (let colIdx = 0; colIdx < myTtColumns.length; colIdx++) {
            const overlap = myTtColumns[colIdx].some(ex => {
                return Math.max(timeToMins(item.artist.start), timeToMins(ex.artist.start)) < 
                       Math.min(timeToMins(item.artist.end), timeToMins(ex.artist.end));
            });
            if (overlap) {
                maxOverlapCol = Math.max(maxOverlapCol, colIdx);
            }
        }

        let placed = false;
        // 重複アイテムがある列より右側で、空いている列を探して配置する
        for (let colIdx = maxOverlapCol + 1; colIdx < myTtColumns.length; colIdx++) {
            const overlap = myTtColumns[colIdx].some(ex => {
                return Math.max(timeToMins(item.artist.start), timeToMins(ex.artist.start)) < 
                       Math.min(timeToMins(item.artist.end), timeToMins(ex.artist.end));
            });
            if (!overlap) {
                myTtColumns[colIdx].push(item);
                placed = true;
                break;
            }
        }

        // 適切な列が見つからなければ、新しい列を追加してそこに配置する
        if (!placed) {
            myTtColumns.push([item]);
        }
    });
    
    // ヘッダーの描画（算出されたマイタイムテーブルの列数を渡して幅を決定）
    renderHeaders(myTtColumns.length);
    
    // ==========================================
    // ④ グリッド（MyTT + 各通常ステージ）の描画
    // ==========================================
    let gridHtml = '';
    
    // マイタイムテーブル列の描画（抽出した列データをもとに描画）
    myTtColumns.forEach(colItems => {
        gridHtml += `<div class="grid-col mytt"><div class="grid-bg-lines"></div>`;
        colItems.forEach(item => {
            gridHtml += getArtistHtml(item.artist, item.stage, dayKey, true, currentMins);
        });
        gridHtml += `</div>`;
    });
    
    // 通常ステージ列の描画（設定された順番通りに描画）
    stagesInfo.forEach(stage => {
        gridHtml += `<div class="grid-col"><div class="grid-bg-lines"></div>`;
        if(data[stage.id]) {
            data[stage.id].forEach(artist => {
                gridHtml += getArtistHtml(artist, stage, dayKey, false, currentMins);
            });
        }
        gridHtml += `</div>`;
    });
    
    // 最後に現在時刻の赤い直線をDOMに追加
    gridHtml += `<div class="current-time-line" id="currentTimeLine"></div>`;
    
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = gridHtml;
    
    // イベントリスナーの登録: 生成されたお気に入りボタン(★)全てにクリックイベントを紐付け
    gridContainer.querySelectorAll('.js-fav-btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
            // 親要素へのイベント伝播を止める（念のため）
            event.stopPropagation();
            const favId = this.getAttribute('data-favid');
            toggleFav(favId);
        });
    });
    
    // 赤い線の位置を計算して表示
    updateCurrentTimeLine();
}

/* =========================================================================
   🚀 7. インタラクション＆初期化処理
   ========================================================================= */

/**
 * ヘッダーとタイムテーブル本体の横スクロールを同期させる処理。
 * 下部のタイムテーブルを横スクロールした時、上のステージ名も連動して動きます。
 */
document.getElementById('ttWrapper').addEventListener('scroll', function() {
    document.getElementById('headerWrapper').scrollLeft = this.scrollLeft;
});

/**
 * 上部の日付タブをクリックして表示日を切り替える処理。
 * @param {number} day - 切り替えたい日のインデックス（1, 2, 3...）
 */
function switchDay(day) {
    currentDay = day;
    
    // 現在のタブ情報をLocalStorageに保存（次回ブラウザを開いたときに復元するため）
    localStorage.setItem(savedDayKey, currentDay);
    
    // タブの見た目（アクティブ状態）を更新
    document.querySelectorAll('.tab-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx + 1 === day);
    });
    
    // 新しい日のデータでタイムテーブルを再描画
    renderTimetable();
}

/**
 * 現在時刻を示す赤い水平線の表示位置を更新する処理。
 * 1分ごとに定期的に呼び出されます。
 */
function updateCurrentTimeLine() {
    const line = document.getElementById('currentTimeLine');
    if(!line) return;

    const data = timetableData[`day${currentDay}`];
    const currentMins = getRelativeMins(data.date);
    
    // 現在時刻が時間枠内（開始〜終了時刻）に収まっている場合のみ線を描画
    if(currentMins !== null && currentMins >= 0 && currentMins <= (EVENT_CONFIG.END_HOUR - EVENT_CONFIG.START_HOUR) * 60) {
        line.style.display = 'block';
        line.style.top = `${currentMins * EVENT_CONFIG.PX_PER_MIN}px`;
    } else {
        line.style.display = 'none'; // 時間外、または違う日の場合は非表示
    }
}

// ---------------------------------------------------------
// 🚀 アプリケーション起動時の初期化フロー
// ---------------------------------------------------------
// 1. ヘッダーやタブのUIをデータから動的に生成
initHeaderUI();

// 2. タイムテーブル本体を描画（初期ロード時は保存されていたcurrentDayをもとに描画）
renderTimetable();

// 3. 1分(60000ミリ秒)ごとに現在時刻の赤い線を自動更新するタイマーをセット
setInterval(updateCurrentTimeLine, 60000);