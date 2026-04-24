/**
 * ==========================================
 * 【設定・データエリア】
 * 今後、別のフェスや別年度に流用する場合は、
 * HTMLやCSSを一切触らず、この APP_CONFIG とデータだけを書き換えてください。
 * ==========================================
 */

// --- 1. アプリケーション全体の設定 ---
const APP_CONFIG = {
    festivalName: "ARABAKI ROCK FEST.26<br>非公式アプリ",
    officialUrl: "https://arabaki.com/",
    storagePrefix: "arabaki_2026_", 
    startHour: 9, 
    endHour: 25,  
    // ここの日数を3日や1日に変えると、自動的に画面のタブボタンも増減します
    days: [
        { id: 'day1', label: '4/25 (土)' },
        { id: 'day2', label: '4/26 (日)' }
    ],
    mapImages: [
        "https://i-love-music-festivals.github.io/arabaki2026/arabaki26_areamap_ver02.jpg",
        "https://i-love-music-festivals.github.io/arabaki2026/tentarea_26.jpg"
    ],
    weather: {
        areaName: "エコキャンプみちのく周辺の天気",
        iframeUrl: "https://weathernews.jp/onebox/tenki/spot/camp/02/9624686/",
        linkUrl: "https://weathernews.jp/onebox/tenki/spot/camp/02/9624686/"
    },
    source: {
        text: "出典：ARABAKI ROCK FEST.26",
        url: "https://arabaki.com/area/"
    },
    settings: {
        priorityStageOrder: true
    },
    ui: {
        officialLinkText: "<span class='small-text'>公式</span>HP",
        disclaimer: "※各アーティストのジャンルはAIによる判定です。<br>※最新情報は公式HPで確認してください。",
        searchPlaceholder: "出演アーティストを検索（前方一致）...",
        searchEmptyMsg: "見つかりませんでした。",
        searchModalTitlePrefix: "「", 
        searchModalTitleSuffix: "」の出演情報",
        searchModalClose: "×",       
        tabFood: "フード",
        tabMap: "マップ",
        tabWeather: "天気",
        tabMemo: "メモ",
        mapZoomIn: "＋",             
        mapZoomOut: "－",            
        mapZoomReset: "Reset",       
        foodHeader: "フードエリア一覧",
        foodFavListTitle: "★ 食べたいものリスト",
        foodEmptyMsg: "右上にある星マーク(★)を押すと、ここに追加されます。<br>カードはメニュー部分をドラッグして並べ替え可能です。",
        weatherOfflineMsg: "<p>現在オフラインです。<br>天気情報を取得するにはインターネットの接続が必要です。</p>",
        weatherNotice: "※サイト側のセキュリティ制限等でうまく表示されない場合は、<br><a href='{WEATHER_URL}' target='_blank' rel='noopener noreferrer' id='weatherLinkText'>こちらからウェザーニュースを開いて</a>ご確認ください。",
        memoHeader: "メモ",
        memoNotice: "※注意点※<br>・ブラウザのキャッシュ（履歴データ）クリアを行うと、マイタイムテーブル等を含めてメモの内容も消えてしまいます。<br>・他のデバイス（スマホからPCなど）への共有はできません。",
        memoPlaceholder: "ライブの感想やメモを自由に書き込めます。\n入力すると自動保存されます。"
    }
};

// --- 2. ステージ情報定義 ---
const stagesInfo = [
    { id: 'michinoku', name: '陸奥', color: '#D4AF37' },
    { id: 'arahabaki', name: '荒吐', color: '#9932CC' },
    { id: 'hatahata', name: '鰰', color: '#B0003A' },
    { id: 'tsugaru', name: '津軽', color: '#8B8B00' },
    { id: 'hanagasa', name: '花笠', color: '#E83929' },
    { id: 'banetsu', name: '磐越', color: '#0077B6' }
];

// --- 3. データ作成用ヘルパー関数 ---
// タイムテーブルのデータを短く書くための補助関数です
const e = (name, start, end, genre = "", options = {}) => ({ name, start, end, genre, ...options });

// お気に入り保存用のIDを作る関数です
function getFavId(dayKey, stageId, artistName) {
    const cleanName = artistName.replace(/<[^>]*>/g, '').replace(/[^a-zA-Z0-9ぁ-んァ-ヶー一-龠]/g, '');
    return `${dayKey}_${stageId}_${cleanName}`;
}

// ==========================================
// --- 4. フードデータ一覧 ---
const foodList = [ 
    {
        name: "SPONSOR",
        menu: [
            { name: "①いいちこ", menus: ["いい茶こ", "いいちこ下町のハイボール"], message: "「いい茶こ」「いいちこ下町のハイボール」に新たなドリンクも登場！今年も音楽といいちこでカンパイだ！", img: "https://i-love-music-festivals.github.io/arabaki2026/sponsor1-iichiko.png" },
            { name: "②キリン一番搾り", menus: ["キリン一番搾り生ビール"], message: "一番搾りはおいしいとこだけ搾る特別なビール。音楽とビールがおいしいと、フェスはもっと楽しい。一杯のビールで最高の一日を。", img: "https://i-love-music-festivals.github.io/arabaki2026/sponsor2-kirin-ichibanshibori.png" },
            { name: "③ローソン", menus: ["からあげクン", "マチカフェ（コーヒーＳ）", "やきとり"], message: "定番のからあげクンのほか、飲料、酒、揚げ物、菓子 、携帯充電器、その他日用品等を揃えております！", img: "https://i-love-music-festivals.github.io/arabaki2026/sponsor3-lawson.png" },
            { name: "④Red Bull / レッドブル", menus: ["レッドブル・エナジードリンク", "レッドブル パープルエディション", "レッドブル チェリーエディション"], message: "フェスを思いっきり楽しむためのエナジー！ ブースでは4種類のレッドブルとカクテルを販売。", img: "https://i-love-music-festivals.github.io/arabaki2026/sponsor4-red-bull.png" },
            { name: "⑤味の牛たん喜助", menus: ["牛たん焼き", "牛たん焼きジャンボ串", "つくね入テールスープ"], message: "味の牛たん喜助は、昭和五十年一月一日創業、創業５０周年を迎える、牛たん専門店です。", img: "https://i-love-music-festivals.github.io/arabaki2026/sponsor5-aji-no-gyutan-kisuke.png" },
            { name: "⑥仙台辛み噌味よしラーメン", menus: ["仙台辛み噌味よしラーメン", "政宗ブラックまぜそば"], message: "仙台の名物ラーメン「仙台辛み噌味よしラーメン」を食べて、熱い2日間をお過ごしください！", img: "https://i-love-music-festivals.github.io/arabaki2026/sponsor6-sendai-karamiso-ajiyoshi-ramen.png" },
            { name: "⑦利府町", menus: ["利府梨ジュース", "豚串（利府梨を使った焼肉タレ味）", "牡蠣串"], message: "利府梨100%ジュースや利府梨を使った焼肉のタレで味付けした豚串を販売します！", img: "https://i-love-music-festivals.github.io/arabaki2026/sponsor7-rifu-cho.png" },
            { name: "⑧気仙沼市とホヤぼーやとオガトレ", menus: ["プロテイン唐揚げ「からあげたんぱっくん」ホヤぼーやコラボステッカー付", "ホヤぼーやのパインサイダー"], message: "「アラバキを踊り抜く体力を！オガトレ監修、タンパク質3倍の気仙沼唐揚げでパワーフルチャージ！", img: "https://i-love-music-festivals.github.io/arabaki2026/sponsor8-kesennuma-shi-to-hoya-boya-to-ogatore.png" },
            { name: "⑨塩竈市", menus: ["地酒（浦霞、阿部勘、一ノ蔵）", "塩竈おでん"], message: "塩竈市の美味しい地酒や特産品を取り揃えていますので、ぜひお召し上がりください！", img: "https://i-love-music-festivals.github.io/arabaki2026/sponsor9-shiogama-shi.png" },
            { name: "⑩亘理町", menus: ["はらこめしのかけら"], message: "亘理町は、温泉施設「わたり温泉鳥の海」など観光スポットが充実。歴史と自然が調和した魅力的な町です。", img: "https://i-love-music-festivals.github.io/arabaki2026/sponsor10-watari-cho.png" }
        ]
    },
    {
        name: "風の草原／BAN-ETSU",
        menu: [
            { name: "①チーム南三陸", menus: ["タコの唐揚げ", "紅ショウガ揚げ", "海鮮つみれ汁"], message: "ARABAKIと言ったらタコの唐揚げ！アツアツ、プリップリを提供します！！", img: "https://i-love-music-festivals.github.io/arabaki2026/ban-etsu1-team-minamisanriku.png" },
            { name: "②BISTRO ENCORE", menus: ["スープスパゲッティ"], message: "仙台市民に寄り添い早11年、ビストロアンコール！野菜たっぷり熱々スープパスタでエネルギーチャージ！", img: "https://i-love-music-festivals.github.io/arabaki2026/ban-etsu2-bistro-encore.png" },
            { name: "③PRIMAL", menus: ["キューバサンド", "フレンチフライ", "えび担々麺"], message: "オリジナルキューバサンドとプレミアムフレンチフライなど、こだわりのメニューを提供します。", img: "https://i-love-music-festivals.github.io/arabaki2026/ban-etsu3-primal.png" },
            { name: "④博多白天", menus: ["博多ラーメン", "餃子ドッグ", "九州名物かき氷シロクマ"], message: "豚骨100％濃厚スープと博多直送のバリカタ細麺が特徴の本場博多屋台スタイルのラーメンを提供致します！", img: "https://i-love-music-festivals.github.io/arabaki2026/ban-etsu4-hakata-hakuten.png" },
            { name: "⑤ナインゲートバーガー", menus: ["ベーコンエッグスペシャル", "だし漬けアボカドとチーズの濃厚テイスト", "ききのと海苔の和風テイスト"], message: "松阪牛入り自慢のパティ、厳選最適具材、フェスを愛し平和を愛してる、ナインゲートバーガーです。", img: "https://i-love-music-festivals.github.io/arabaki2026/ban-etsu5-nine-gate-burger.png" },
            { name: "⑥炭火焼 鶏まぶし丼 オルガン", menus: ["炭火焼 秘伝のタレ 鶏まぶし丼", "炭火焼 秘伝のタレ 鶏まぶし茶漬け", "炭火焼 軟骨入 つくね"], message: "まぶし丼は秘伝のたれと炭火焼の香ばしさが決めて!名古屋コーチンの出汁の鶏まぶし茶漬けも絶品です!!", img: "https://i-love-music-festivals.github.io/arabaki2026/ban-etsu6-sumibiyaki-torimabushidon-organ.png" },
            { name: "⑦台湾食堂・包子家PAOZUYA", menus: ["DX魯肉飯", "王記 牛肉麺", "焼小籠包"], message: "台湾食堂・包子家の美味しさは、一つ一つ手間を惜しまず作り上げた唯一無二のこだわりの味です！", img: "https://i-love-music-festivals.github.io/arabaki2026/ban-etsu7-taiwan-shokudo-paozuya.png" },
            { name: "⑧風雲児　日ノ本", menus: ["名物肉かすうどん", "極上ホルモン丼", "極上ホルモン焼"], message: "「また食べたくなる」各地でその名を轟かす肉かすうどんとホルモン丼。 あなたの舌でお確かめください。", img: "https://i-love-music-festivals.github.io/arabaki2026/ban-etsu8-fuunji-hinomoto.png" },
            { name: "⑨仙台　居酒屋　周平", menus: ["ダブル牛ステーキどん", "ダブルチキンカツカレー", "ひょうたん揚げ"], message: "仙台市内にある居酒屋です。キャンプサイトで毎年おなじみの24時間営業！深夜、早朝お待ちしております。", img: "https://i-love-music-festivals.github.io/arabaki2026/ban-etsu9-sendai-izakaya-shuhei.png" },
            { name: "⑩イスタンブールGINZA", menus: ["ケバブデラックス", "トルコドッグ", "ビーフサラミ串"], message: "創業1988年日本初のトルコ料理レストラン。ケバブやビーフサラミ串など焼き立てでお待ちしております!", img: "https://i-love-music-festivals.github.io/arabaki2026/ban-etsu10-istanbul-ginza.png" }
        ]
    },
    {
        name: "風の草原／TSUGARU",
        menu: [
            { name: "①1ポンドステーキ専門店", menus: ["クォーターポンドステーキ", "ハーフポンドステーキ", "ワンポンドステーキ"], message: "やわらかい肉質で噛むほどに旨味あふれる一皿。美味しいものを食べて皆様に笑顔になって頂けますように！", img: "https://i-love-music-festivals.github.io/arabaki2026/tsugaru1-1-pound-steak-senmonten.png" },
            { name: "②タイ料理アローイ・アロイ", menus: ["トムヤム炒飯", "ガパオライス(挽き肉のバジル炒め)", "トムヤムクンラーメン"], message: "当店のタイ料理は店主自らが厳選し、本場タイから取り寄せた香辛料、ハーブを使用した自慢のタイ料理です。", img: "https://i-love-music-festivals.github.io/arabaki2026/tsugaru2-Thai-Ryori-Aroi-Aroi.png" },
            { name: "③高円寺アボカド食堂", menus: ["メキシカンタコス", "メキシカンタコライス", "アボカドチーズコロッケ"], message: "肉とアボカドのメキシコ料理屋です。本格タコス、大人気のポークステーキタコライスもあります。", img: "https://i-love-music-festivals.github.io/arabaki2026/tsugaru3-koenji-avocado-shokudo.png" },
            { name: "④王府井", menus: ["焼き小籠包", "炒飯", "クレームブリュレクレープアイス"], message: "横浜中華街で５店舗を構える人気店。肉汁コラーゲン溢れる大粒の焼き小籠包をご賞味ください。", img: "https://i-love-music-festivals.github.io/arabaki2026/tsugaru4-wan-fu-chin.png" },
            { name: "⑤金久右衛門", menus: ["羅臼昆布とシジミの黄金中華", "極上ハラミ焼肉丼", "イカ姿焼き"], message: "高級昆布”羅臼昆布”の旨味と濃厚シジミ醤油の旨味が相性抜群の吟醸中華そば！！", img: "https://i-love-music-festivals.github.io/arabaki2026/tsugaru5-kingu-emon.png" },
            { name: "⑥利久", menus: ["牛たん焼（7切）", "牛たん贅沢丼", "牛たん唐揚げ"], message: "手造りにこだわり、スライスから味付けまで全て職人の手作業で行った利久の牛たんをご賞味ください！", img: "https://i-love-music-festivals.github.io/arabaki2026/tsugaru6-rikyu.png" },
            { name: "⑦THANX!", menus: ["神戸名物　温玉そばめし牛すじ乗せ", "温玉牛すじ煮込み丼", "果肉たっぷり！プレミアムマンゴースムージー"], message: "そばめしに牛すじと温泉卵を乗せたスペシャルプレート、混ぜて食べると抜群に美味しい一品です。", img: "https://i-love-music-festivals.github.io/arabaki2026/tsugaru7-thanx.png" },
            { name: "⑧蔵王温泉オトチャヤ", menus: ["山形名物　にくそば", "ラム串焼き", "たまこん"], message: "親鳥出汁のスッキリスープにコリコリ鶏チャーシュー！歩き回ったフェスの疲れに！染みる一杯！", img: "https://i-love-music-festivals.github.io/arabaki2026/tsugaru8-zao-onsen-otochaya.png" },
            { name: "⑨farmer's table mano", menus: ["たけし豚丼", "たけし豚の豚汁", "川崎町アルフィオーレや県内近県の日本ワイン"], message: "地元・川崎町から出店。シェフ自ら育てる「たけし豚」メニューや地元ワイナリーのワイン等お楽しみ下さい！", img: "https://i-love-music-festivals.github.io/arabaki2026/tsugaru9-farmers-table-mano.png" },
            { name: "⑩CHINAMI", menus: ["BEEF OVER RICE（ビーフオーバーライス）", "BEEF RICE（ビーフライス）", "牛すじ焼きそば"], message: "牛すじを中心に、多国籍なメニューを展開しています。今年もよろしくお願いします！", img: "https://i-love-music-festivals.github.io/arabaki2026/tsugaru10-chinami.png" },
            { name: "⑪Pizza Bakka-ピッツァバッカ-", menus: ["マルゲリータ", "バカポテト", "クラムチャウダー"], message: "重さ1トンの石窯に注目！旨さの秘訣は窯にあり。食べログピザ百名店6連続受賞！", img: "https://i-love-music-festivals.github.io/arabaki2026/tsugaru11-pizza-bakka.png" }
        ]
    },
    {
        name: "エコキャンプ／HATAHATA",
        menu: [
            { name: "①鰰BAR／大學", menus: ["大好きなナチュラルワイン", "クラフトシロップのドリンク"], message: "仙台、大町で好き！を詰め込んだワインスナックをしております。", img: "https://i-love-music-festivals.github.io/arabaki2026/hatahata1-hatahata-bar-daigaku.png" },
            { name: "②ロッキースタンス", menus: ["鯖のゴマ味噌ラーメン", "青森ホタテの塩ラーメン", "鯖orホタテの麻婆まぜうどん"], message: "青森県は太平洋下北半島からやってきた！漁師が店主の青森屋台！愛情たっぷり美味しさ無限∞をどうぞ！", img: "https://i-love-music-festivals.github.io/arabaki2026/hatahata2-rocky-stance.png" },
            { name: "③N.Y Hot Dog", menus: ["40㎝の超！ Looong Hot Dog！", "American Hot Dog"], message: "当店の大名物！40㎝超えの超！Looonng Hot Dog！ぜひ大きな口で頬張ってください！！", img: "https://i-love-music-festivals.github.io/arabaki2026/hatahata3-ny-hot-dog.png" },
            { name: "④カレーと豚丼　石巻　よしだRock食堂", menus: ["国産豚バラ炙り丼", "仙台牛牛すじクラフトカレー", "鮎塩焼き"], message: "鰰エリアで出店しております。創業より９０年以上親しまれる日本料理店が作るフェス飯をご堪能下さい。", img: "https://i-love-music-festivals.github.io/arabaki2026/hatahata4-curry-to-butadon-ishinomaki-yoshida-rock-shokudo.png" },
            { name: "⑤Baran", menus: ["ダブルソースオムライス", "バナナチョコホイップクレープ", "ハーブソーセージ"], message: "新鮮たまごを使用したふわふわとろとろオムライスともちもち生地のクレープを提供致します。", img: "https://i-love-music-festivals.github.io/arabaki2026/hatahata5-baran.png" },
            { name: "⑥もちもちポテト323号室", menus: ["もちもちポテト", "淡麗豚骨醤油らーめん", "担々麺"], message: "長い形状と独特の食感が特徴の揚げたてのフライドポテトです！同時出店にて淡麗豚骨醤油らーめんもご提供！", img: "https://i-love-music-festivals.github.io/arabaki2026/hatahata6-mochimochi-potato-323-goshitsu.png" }
        ]
    },
    {
        name: "エコキャンプ／FOOD TRUCK SQUARE",
        menu: [
            { name: "①SUNNY SITE COFFEE", menus: ["コーヒー", "ラテ", "ココア"], message: "仙台を中心に活動している移動コーヒー店で海外の雑誌にも紹介されてます。七北田公園内にカフェも展開中。", img: "https://i-love-music-festivals.github.io/arabaki2026/food-truck-square1-sunny-site-coffee.png" },
            { name: "②DIVERTENTE", menus: ["ナポリピッツァドッグ マルゲリータ", "イタリアンフライドポテト ボロネーゼ", "湘湘ゆずビール"], message: "こだわりの生地がサックリ＆モッチリ！ピッツェリア発ドッグ型ナポリピッツァ。石窯から焼き立てをどうぞ！", img: "https://i-love-music-festivals.github.io/arabaki2026/food-truck-square2-divertente.png" },
            { name: "③YARN", menus: ["ローズポークと蓮根のキーマカレー", "レモンビール", "カルダモン塩レモンサワー"], message: "茨城の食を届けるキッチンカーYARNです。地産の食材とスパイスカレー、自家製ドリンクを提供します。", img: "https://i-love-music-festivals.github.io/arabaki2026/food-truck-square3-yarn.png" },
            { name: "④NOODLE STAND 栗原商店", menus: ["煮干しらーめん", "大葉のジェノバソース和えそば", "豚骨白湯らーめん"], message: "出汁の旨味で勝負。素材を活かす栗原商店の一杯。", img: "https://i-love-music-festivals.github.io/arabaki2026/food-truck-square4-noodle-stand-kurihara-shoten.png" },
            { name: "⑤旅するパエリア", menus: ["旅するパエリア", "local＆自然派ワイン", "黒毛和牛のローストビーフ"], message: "アラバキのみなさん！！昨年に引き続き九州から極上のパエリアをお届けしますのでお楽しみに！！", img: "https://i-love-music-festivals.github.io/arabaki2026/food-truck-square5-tabisuru-paella.png" }
        ]
    },
    {
        name: "エコキャンプ／COMMUNICATION FIELD",
        menu: [
            { name: "①沖縄料理MARINE", menus: ["沖縄そば", "ソーキ丼", "タコライス"], message: "沖縄の伝統料理ソーキそばは、柔らかい豚あばら肉と風味豊かな出汁が絶品の一品。ぜひ本場の味をどうぞ！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field1-okinawa-ryori-marine.png" },
            { name: "②ビフテキダイナマイト", menus: ["ビフテキ丼おろしポン酢", "唐揚げねぎ塩レモンだれ", "ビフテキポテト"], message: "肉はアツいウチに食うべし！ダイナマイトの名物ビフテキ丼は記憶にも胃袋にも残る逸品です", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field2-bifuteki-dynamite.png" },
            { name: "③富士山食堂", menus: ["富士宮やきそば", "富士宮やきそば目玉焼きのせ", "つぶつぶみかんスカッシュ"], message: "静岡県富士宮市のご当地グルメ富士宮やきそばを地元出身の店主が焼きたてでご提供いたします！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field3-fujisan-shokudo.png" },
            { name: "④麦とろ人", menus: ["牛たん塩たれ麦飯とろろ丼", "厚切り牛たん塩串", "川越かけだれ唐揚げ"], message: "群馬県産の大和芋を使用した牛たん麦とろ丼！塩麴漬けの牛たんとの相性抜群です！！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field4-mugitorojin.png" },
            { name: "⑤大和田らーめん", menus: ["担々麺"], message: "痺れるような辛さの濃厚なスープは食べる手が止まらず、やみつきになること間違いありません！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field5-owada-ramen.png" },
            { name: "⑥犇堂", menus: ["やわらか牛ハラミ丼", "からあげ", "米粉チュロス"], message: "こだわりのハラミ肉をどんぶりにしました！！特製のタレと肉汁の相性も抜群！是非ご賞味ください！！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field6-hishimeki-do.png" },
            { name: "⑦K's Pit", menus: ["リアルアメリカンバーガー", "沖縄カーリーポテト", "生ドーナツ"], message: "愛知県にある創業25年のアメリカンダイナーK's Pitです。メニューと店構えでお客様を魅了します。", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field7-ks-pit.png" },
            { name: "⑧まぐろ問屋いとう水産", menus: ["特選本まぐろ竜田揚げ", "魚河岸まかない丼", "エビホタテロング串"], message: "アラバキ！今年も海鮮づくしでの出店です！魚河岸のプロ集団が吟味したネタを皆様にお届けいたします！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field8-maguro-donya-ito-suisan.png" },
            { name: "⑨ロティサリーチキン専門店エンシニータス", menus: ["ロティサリーチキン＆ハーブライスセット", "ロティサリーチキン欧風\"山賊\"カレー", "スパイシーロングつくねぐし"], message: "焼きたてロティサリーチキンにポテトとハーブライス。ヘルシーかつボリューム満点の看板商品です！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field9-rotisserie-chicken-senmonten-encinitas.png" },
            { name: "⑩ぎょうざのひぐち", menus: ["焼餃子", "タコめし", "自家製バイスサワー"], message: "福島の名物餃子！手作りの自家製バイスサワーはノンアルもOKです！アラバキでみなさん乾杯してくださいね", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field10-gyoza-no-higuchi.png" },
            { name: "⑪NISHIKIYA KITCHEN", menus: ["豚の角煮カレー", "牛すじ煮込みのかけごはん", "特製スパイシー玉コン"], message: "おすすめは豚の角煮カレー！素材のおいしさにこだわったカレーを音楽のお供に如何でしょうか。", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field11-nishikiya-kitchen.png" },
            { name: "⑫博多こうじ屋", menus: ["博多焼豚丼", "自家製肉巻きおにぎり", "厚切り牛タン串"], message: "博多工場より直送の自家製焼豚・肉巻きおにぎりは全国で販売されている人気の商品です", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field12-hakata-kojiya.png" },
            { name: "⑬コンフェッティ", menus: ["山形芋煮", "ローストチキンレッグ", "山形牛タコライス"], message: "山形のソウルフード芋煮を熱々でお届けします。音楽とともに一緒に盛り上がりましょう！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field13-confetti.png" },
            { name: "⑭きちみ製麺", menus: ["おくずかけうーめん", "特製鶏だしうーめん", "肉味噌うーめん"], message: "その空腹、最高の一杯で満たします。400年続く白石うーめんがARABAKIを熱く支えます！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field14-kichimi-seimen.png" },
            { name: "⑮TRAILER BAR HAKU", menus: ["のどぐろフリット", "甘えびフリット", "福井ソースカツ丼"], message: "石川県より、北陸の美味しいをお届けいたします！ドリンクも北陸由来で揃えております。", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field15-trailer-bar-haku.png" },
            { name: "⑯PIZZA　BRAVO", menus: ["マルゲリータ", "しらすとネギ", "ペパロニ"], message: "石窯で焼く本格ナポリピザ。500℃の高温でカリッ、フワッと焼き上げます。", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field16-pizza-bravo.png" },
            { name: "⑰Million Dollar Ice Cream Truck", menus: ["シナモンアップルパイ", "ブルーベリーチーズケーキ", "バナナスモア"], message: "神奈川県、米海軍横須賀基地のアメリカ人が絶賛する濃厚・手作りのアメリカンアイスクリーム。", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field17-million-dollar-ice-cream-truck.png" },
            { name: "⑱ibiscafe船岡", menus: ["米粉チュロス", "チーズハットグ", "ふりふりポテト"], message: "今年アラバキに初参戦！サクッと、モチっとした食感の米粉チュロスをぜひお楽しみください！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field18-ibiscafe-funaoka.png" },
            { name: "⑲月美家", menus: ["大阪西成風ホルモン焼"], message: "特製ダレとにんにくがガツンと効いた大阪西成風ホルモン焼！ビール片手に極上のフェス飯を食らい尽くせ！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field19-tsukimiya.png" },
            { name: "⑳京都ぽーく亭", menus: ["京都ぽーくの塩豚丼", "京だし仕立てのまぜそば", "永田茶園の３種のラテ"], message: "京都唯一のブランド豚【京都ぽーく豚】の専門店です。オーガニック茶葉のラテもご用意。どうぞおこしやす～", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field20-kyoto-pork-tei.png" },
            { name: "㉑KIYOSHI'S KITCHEN", menus: ["アンガス牛ステーキ丼", "豚バラとトマトの欧風カレー", "牛ステーキと欧風カレーのあい盛り"], message: "ASIAN KUNG-FU GENERATION伊地知潔監修。大好評ステーキ丼に特製欧風カレーをぜひ", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field21-kiyoshis-kitchen.png" },
            { name: "㉒鶏小屋", menus: ["濃厚鶏そば", "若鶏の香味焼きごはん", "生搾りシークワーサーソーダ"], message: "骨の髄まで炊き出した極上濃厚スープ他、全て妥協なし！フェス界究極の鶏白湯ラーメン！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field22-torigoya.png" },
            { name: "㉓あいづ酒まつり", menus: ["写楽VS飛露喜", "クレープ　ロックンロールスペシャル"], message: "北会津町・関さん（78）の苺「さちのか」。甘さ広がる味わいを、会津の地酒とともに。", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field23-aizu-sake-matsuri.png" },
            { name: "㉔リトルジュースバー", menus: ["いちごけずり®", "ホットフルーツティー", "マンゴーいちごけずり"], message: "ただいまARABAKI！今年も定番のいちごけずりとホットフルーツティーをご用意！", img: "https://i-love-music-festivals.github.io/arabaki2026/communication-field24-little-juice-bar.png" }
        ]
    }
];

// --- 5. タイムテーブル・出演アーティストデータ ---
const timetableData = {
    day1: {
        date: "2026-04-25",
        michinoku: [
            e("町長挨拶", "11:55", "12:05", "", { isLightBg: true, isSpecialLayout: true, displayTime: "12:00-" }),
            e("川崎中学校吹奏楽部", "10:55", "11:15", "", { isLightBg: true }),
            e("ストレイテナー<br><span class='guest-info'>GUEST<br><span class='guest-item'>●サイトウタクヤ</span> <span class='guest-item'>●清水英介</span></span>", "12:05", "12:55", "Rock"),
            e("マキシマム ザ ホルモン", "13:45", "14:30", "Nu Metal/Hardcore"),
            e("ELLEGARDEN", "15:15", "16:00", "Punk Rock"),
            e("東京スカパラダイスオーケストラ", "16:45", "17:30", "Ska"),
            e("[Alexandros]", "18:15", "19:00", "Rock"),
            e("ASIAN KUNG-FU GENERATION<br><span class='guest-info'>GUEST<br><span class='guest-item'>●岸田繁</span> <span class='guest-item'>●岸谷香</span> <span class='guest-item'>●塩塚モエカ</span> <span class='guest-item'>●スカパラHorn Section</span> <span class='guest-item'>●TOSHI-LOW</span> <span class='guest-item'>●のん</span> <span class='guest-item'>●細美武士</span> <span class='guest-item'>●ホリエアツシ</span> <span class='guest-item'>●Achico</span></span>", "19:50", "21:20", "Rock")
        ],
        arahabaki: [
            e("Ayllton", "10:30", "11:00", "Acoustic"),
            e("森川葵咲樹", "11:25", "11:55", "Acoustic"),
            e("TRAëLL", "12:20", "12:50", "Acoustic"),
            e("PES", "13:15", "13:45", "Hip Hop"),
            e("UNFAIR RULE (Acoustic Set)", "14:10", "14:40", "Rock"),
            e("さとう。", "15:05", "15:35", "Pop"),
            e("関取花", "16:00", "16:30", "Acoustic"),
            e("鈴木実貴子ズ", "16:55", "17:25", "Acoustic"),
            e("奇妙礼太郎", "17:50", "18:20", "Acoustic"),
            e("GLIM SPANKY (Acoustic Set)", "18:50", "19:20", "Rock")
        ],
        hatahata: [
            e("藤原美幸(秋田民謡)", "10:30", "10:45", "", { isLightBg: true, isSpecialLayout: true }),
            e("リアクション ザ ブッタ", "10:45", "11:20", "Rock"),
            e("TENDOUJI", "11:50", "12:25", "Indie Rock"),
            e("みちのくプロレス1", "12:25", "12:45", "", { isLightBg: true, hideEndTime: true }),
            e("ドミコ", "12:55", "13:30", "Garage Rock"),
            e("みちのくプロレス2", "13:30", "13:50", "", { isLightBg: true, hideEndTime: true }),
            e("LOW IQ 01 & THE RHYTHM MAKERS", "14:05", "14:40", "Punk"),
            e("みちのくプロレス3", "14:40", "15:00", "", { isLightBg: true, hideEndTime: true }),
            e("9mm Parabellum Bullet", "15:10", "15:45", "Rock"),
            e("西馬音内盆踊り1", "15:45", "16:05", "", { isLightBg: true, hideEndTime: true }),
            e("Crystal Lake", "16:15", "16:50", "Metalcore"),
            e("西馬音内盆踊り2", "16:50", "17:10", "", { isLightBg: true, hideEndTime: true }),
            e("KOTORI", "17:20", "17:55", "Rock"),
            e("西馬音内盆踊り3", "17:55", "18:15", "", { isLightBg: true, hideEndTime: true }),
            e("打首獄門同好会", "18:25", "19:00", "Loud Rock"),
            e("coldrain", "19:30", "20:05", "Post-Hardcore")
        ],
        tsugaru: [
            e("Cha'R", "10:35", "10:55", "", { isLightBg: true }),
            e("超能力戦士ドリアン", "11:30", "12:05", "Rock"),
            e("おいしくるメロンパン", "12:40", "13:15", "Rock"),
            e("NELKE", "13:50", "14:25", "Indie"),
            e("kurayamisaka", "14:55", "15:30", "Indie"),
            e("のん & the tears of knight", "16:00", "16:35", "Rock"),
            e("岸谷香", "17:05", "17:40", "Pop"),
            e("夢弦会(津軽三味線)1", "18:05", "18:20", "Traditional", { isLightBg: true, isSpecialLayout: true }),
            e("リーガルリリー", "18:20", "18:55", "Rock"),
            e("夢弦会(津軽三味線)2", "19:20", "19:35", "Traditional", { isLightBg: true, isSpecialLayout: true }),
            e("柴田聡子 (BAND SET)", "19:35", "20:10", "Pop"),
            e("夢弦会(津軽三味線)3", "20:35", "20:50", "Traditional", { isLightBg: true, isSpecialLayout: true }),
            e("コレサワ", "20:50", "21:25", "Pop")
        ],
        hanagasa: [
            e("Rol3ert", "11:50", "12:10"),
            e("猪居亜美(クラシックギター)", "13:20", "13:40"),
            e("奈良美智 (DJ)", "14:40", "15:10", "DJ"),
            e("Date fm SOUND GENIC トークセッション", "16:15", "16:35", "", { hideEndTime: true }),
            e("Date fm SOUND GENIC トークセッション", "17:35", "17:55", "", { hideEndTime: true }),
            e("yosugala", "19:00", "19:20"),
            e("もっさ(ネクライトーキー)", "20:30", "21:00", "Acoustic"),
            e("ヒグチアイ (for CAMPERS)", "22:00", "22:30", "Pop"),
            e("いいちこ presents ENKAI<br><span class='guest-info'>アーティスト<br><span class='guest-item'>●関取花</span> <span class='guest-item'>●Ｔ字路s</span> <span class='guest-item'>●ヒグチアイ</span><br>芸人<br><span class='guest-item'>●オズワルド</span> <span class='guest-item'>●ダンビラムーチョ</span> <span class='guest-item'>●ナユタ</span><br>MC<br><span class='guest-item'>●遠山大輔（グランジ）</span></span>", "22:30", "24:10", "Variety"),
            e("杉本ラララ", "24:10", "24:40", "Acoustic")
        ],
        banetsu: [
            e("MONKEY MAJIK", "11:00", "11:45", "Pop Rock"),
            e("礼賛", "12:30", "13:15", "Hip Hop/Rock"),
            e("ハンブレッダーズ", "13:50", "14:35", "Rock"),
            e("くるり", "15:30", "16:15", "Alternative Rock"),
            e("OAU<br><span class='guest-info'>GUEST<br><span class='guest-item'>●大木伸夫</span> <span class='guest-item'>●細美武士</span></span>", "16:50", "17:35", "Acoustic Rock"),
            e("優里", "18:10", "18:55", "Pop"),
            e("STUTS", "19:40", "20:25", "Hip Hop")
        ]
    },
    day2: {
        date: "2026-04-26",
        michinoku: [
            e("Lexulty", "10:20", "10:40", "", { isLightBg: true }),
            e("怒髪天<br><span class='guest-info'>GUEST<br><span class='guest-item'>●当日朝発表！</span></span>", "11:30", "12:20", "Punk"),
            e("MONGOL800", "13:00", "13:45", "Punk"),
            e("10-FEET", "14:35", "15:20", "Punk"),
            e("布袋寅泰", "16:05", "16:50", "Rock"),
            e("あいみょん", "17:35", "18:20", "Pop"),
            e("MICHINOKU PEACE SESSION GTR祭'26<br><span class='guest-info'>SPECIAL BAND<br><span class='guest-item'>●The Birthday</span> <span class='guest-item'>●Paledusk</span> <span class='guest-item'>●Keyboards：高野勲</span><br>GUEST<br><span class='guest-item'>●うつみようこ</span> <span class='guest-item'>●菅原卓郎</span> <span class='guest-item'>●曽我部恵一</span> <span class='guest-item'>●竹安堅一</span> <span class='guest-item'>●TAKUMA</span> <span class='guest-item'>●DURAN</span> <span class='guest-item'>●TOSHI-LOW</span> <span class='guest-item'>●ホリエアツシ</span> <span class='guest-item'>●松尾レミ</span> <span class='guest-item'>●宮崎朝子</span> <span class='guest-item'>●山田将司&菅波栄純</span></span>", "19:30", "21:15", "Rock")
        ],
        arahabaki: [
            e("中村旭", "10:30", "11:00", "Acoustic"),
            e("サカグチアミ", "11:25", "11:55", "Acoustic"),
            e("『ユイカ』", "12:20", "12:50", "Pop"),
            e("石崎ひゅーい", "13:15", "13:45", "Pop"),
            e("サバシスター (Acoustic Set)", "14:10", "14:40", "Rock"),
            e("山中さわお(弾き語り)", "15:05", "15:35", "Rock"),
            e("中田裕二(弾り語り)", "16:00", "16:30", "Pop/Rock"),
            e("堂島孝平", "16:55", "17:25", "Pop"),
            e("曽我部恵一(弾き語り)", "17:50", "18:20", "Acoustic"),
            e("向井秀徳アコースティック＆エレクトリック", "18:45", "19:15", "Alternative")
        ],
        hanagasa: [
            e("Luiz Murá (for CAMPERS)", "09:00", "09:35", "Acoustic"),
            e("おとどけチーたくん高速バンド", "10:30", "10:50", "", { hideEndTime: true }),
            e("Date fm トークセッション", "11:50", "12:10", "", { hideEndTime: true }),
            e("トークセッション 松田晋二の夜更けの囁き", "13:10", "13:30", "", { hideEndTime: true }),
            e("曽我部恵一 (DJ)", "14:35", "15:05", "DJ"),
            e("EMNW", "16:10", "16:40", "Rock"),
            e("忘れらんねえよ柴田", "17:45", "18:15", "Acoustic")
        ],
        hatahata: [
            e("藤原美幸(秋田民謡)", "10:15", "10:30", "Folk", { isLightBg: true, isSpecialLayout: true }),
            e("Blue Mash", "10:30", "11:05", "Rock"),
            e("BURNOUT SYNDROMES", "11:35", "12:10", "Rock"),
            e("みちのくプロレス1", "12:10", "12:30", "", { isLightBg: true, hideEndTime: true }),
            e("MAYSON's PARTY", "12:45", "13:20", "Ska/Punk"),
            e("みちのくプロレス2", "13:20", "13:40", "", { isLightBg: true, hideEndTime: true }),
            e("yonige", "13:55", "14:30", "Rock"),
            e("みちのくプロレス3", "14:30", "14:50", "", { isLightBg: true, hideEndTime: true }),
            e("PEDRO", "15:05", "15:40", "Rock"),
            e("西馬音内盆踊り1", "15:40", "16:00", "", { isLightBg: true, hideEndTime: true }),
            e("THE BACK HORN", "16:15", "16:50", "Rock"),
            e("西馬音内盆踊り2", "16:50", "17:10", "", { isLightBg: true, hideEndTime: true }),
            e("eastern youth", "17:25", "18:00", "Punk/Emo"),
            e("LOSTAGE", "18:30", "19:05", "Rock"),
            e("黒夢", "19:35", "20:10", "Rock")
        ],
        tsugaru: [
            e("坂本サトル ARABAKI special", "10:30", "11:15", "Acoustic"),
            e("luv", "11:45", "12:20", "Rock"),
            e("夢弦会(津軽三味線)1", "12:45", "13:00", "Traditional", { isLightBg: true, isSpecialLayout: true }),
            e("the shes gone", "13:00", "13:35", "Rock"),
            e("夢弦会(津軽三味線)2", "14:00", "14:15", "Traditional", { isLightBg: true, isSpecialLayout: true }),
            e("秋山黄色", "14:15", "14:50", "Rock"),
            e("夢弦会(津軽三味線)3", "15:20", "15:35", "Traditional", { isLightBg: true, isSpecialLayout: true }),
            e("Ｔ字路s", "15:35", "16:10", "Blues/Folk"),
            e("Kvi Baba", "16:40", "17:15", "Hip Hop"),
            e("TOOBOE", "17:45", "18:20", "Pop/Rock"),
            e("浅井健一", "18:50", "19:25", "Rock"),
            e("レトロリロン", "19:55", "20:30", "Pop")
        ],
        banetsu: [
            e("川内太鼓", "10:00", "10:20"),
            e("GEZAN", "11:00", "11:45", "Alternative"),
            e("ハンバート ハンバート", "12:25", "13:10", "Folk"),
            e("KEIJU", "13:45", "14:30", "Hip Hop"),
            e("T.M.Revolution", "15:20", "16:05", "Pop"),
            e("ゴスペラーズ", "16:55", "17:40", "R&B/Pop"),
            e("SHISHAMO", "18:30", "19:15", "Rock")
        ]
    }
};

// --- 検索用：読み仮名辞書 ---
const artistYomiDict = {
    "町長挨拶": "ちょうちょうあいさつ",
    "川崎中学校吹奏楽部": "かわさきちゅうがっこうすいそうがくぶ",
    "ストレイテナー": "すとれいてなー",
    "マキシマム ザ ホルモン": "まきしまむざほるもん",
    "ELLEGARDEN": "えるれがーでん",
    "東京スカパラダイスオーケストラ": "とうきょうすかぱらだいすおーけすとら",
    "[Alexandros]": "あれきさんどろす",
    "ASIAN KUNG-FU GENERATION": "あじあんかんふーじぇねれーしょん",
    "Ayllton": "あいるとん",
    "森川葵咲樹": "もりかわあさぎ",
    "TRAëLL": "とらえる",
    "PES": "ぺす",
    "UNFAIR RULE (Acoustic Set)": "あんふぇあるーる(あこーすてぃっくせっと)",
    "さとう。": "さとう",
    "関取花": "せきとりはな",
    "鈴木実貴子ズ": "すずきみきこず",
    "奇妙礼太郎": "きみょうれいたろう",
    "GLIM SPANKY (Acoustic Set)": "ぐりむすぱんきー(あこーすてぃっくせっと)",
    "藤原美幸(秋田民謡)": "ふじわらみゆき(あきたみんよう)",
    "リアクション ザ ブッタ": "りあくしょんざぶった",
    "TENDOUJI": "てんどうじ",
    "みちのくプロレス": "みちのくぷろれす",
    "ドミコ": "どみこ",
    "LOW IQ 01 & THE RHYTHM MAKERS": "ろうあイクーいちあんどざりずむめーかーず",
    "9mm Parabellum Bullet": "きゅうみりぱらべらむばれっと",
    "西馬音内盆踊り": "にしもないぼんおどり",
    "Crystal Lake": "くりすたるれいく",
    "KOTORI": "ことり",
    "打首獄門同好会": "うちくびごくもんどうこうかい",
    "coldrain": "こーるどれいん",
    "Cha'R": "ちゃる",
    "超能力戦士ドリアン": "ちょうのうりょくせんしどりあん",
    "おいしくるメロンパン": "おいしくるめろんぱん",
    "NELKE": "ねるけ",
    "kurayamisaka": "くらやみざか",
    "のん & the tears of knight": "のんあんどざてぃあーずおぶないと",
    "岸谷香": "きしたにかおり",
    "夢弦会(津軽三味線)": "むげんかい",
    "リーガルリリー": "りーがるりりー",
    "柴田聡子 (BAND SET)": "しばたさとこ(ばんどせっと)",
    "コレサワ": "これさわ",
    "Rol3ert": "ろばーと",
    "猪居亜美(クラシックギター)": "いのいあみ(くらしっくぎたー)",
    "奈良美智 (DJ)": "ならよしとも(でぃーじぇー)",
    "Date fm SOUND GENIC トークセッション": "でいとえふえむさうんどじぇにっくとーくせっしょん",
    "yosugala": "よすがら",
    "もっさ(ネクライトーキー)": "もっさ(ねくらいとーきー)",
    "ヒグチアイ (for CAMPERS)": "ひぐちあい(ふぉーきゃんぱーず)",
    "いいちこ presents ENKAI": "いいちこぷれぜんつえんかい",
    "杉本ラララ": "すぎもとららら",
    "MONKEY MAJIK": "もんきーまじっく",
    "礼賛": "らいさん",
    "ハンブレッダーズ": "はんぶれっだーず",
    "くるり": "くるり",
    "OAU": "おーえーゆー",
    "優里": "ゆうり",
    "STUTS": "すたっつ",
    "Lexulty": "れきさるてぃ",
    "怒髪天": "どはつてん",
    "MONGOL800": "もんごるはっぴゃく",
    "10-FEET": "てんふぃーと",
    "布袋寅泰": "ほていともやす",
    "あいみょん": "あいみょん",
    "MICHINOKU PEACE SESSION GTR祭'26": "みちのくぴーすせっしょんじーてぃーあーるまつりにじゅうろく",
    "中村旭": "なかむらあさひ",
    "サカグチアミ": "さかぐちあみ",
    "『ユイカ』": "ゆいか",
    "石崎ひゅーい": "いしざきひゅーい",
    "サバシスター (Acoustic Set)": "さばしすたー(あこーすてぃっくせっと)",
    "山中さわお(弾き語り)": "やまなかさわお(ひきがたり)",
    "中田裕二(弾り語り)": "なかだゆうじ(ひきがたり)",
    "堂島孝平": "どうじまこうへい",
    "曽我部恵一(弾き語り)": "そかべけいいち(ひきがたり)",
    "向井秀徳アコースティック＆エレクトリック": "むかいひでのりあこーすてぃっくあんどえれくとりっく",
    "Luiz Murá (for CAMPERS)": "るいすむらー(ふぉーきゃんぱーず)",
    "おとどけチーたくん高速バンド": "おとどけちーたくんこうそくばんど",
    "Date fm トークセッション": "でいとえふえむとーくせっしょん",
    "トークセッション 松田晋二の夜更けの囁き": "とーくせっしょんまつだしんじのよふけのささやき",
    "曽我部恵一 (DJ)": "そかべけいいち(でぃーじぇー)",
    "EMNW": "えむにゅー",
    "忘れらんねえよ柴田": "わすれらんねえよしばた",
    "Blue Mash": "ぶるーまっしゅ",
    "BURNOUT SYNDROMES": "ばーんあうとしんどろーむず",
    "MAYSON's PARTY": "めいそんずぱーてぃー",
    "yonige": "よにげ",
    "PEDRO": "ぺどろ",
    "THE BACK HORN": "ざばっくほーん",
    "eastern youth": "いーすたんゆーす",
    "LOSTAGE": "ろすとえいじ",
    "黒夢": "くろゆめ",
    "坂本サトル ARABAKI special": "さかもとさとるあらばきすぺしゃる",
    "luv": "らぶ",
    "the shes gone": "ざしーずごーん",
    "秋山黄色": "あきやまきいろ",
    "Ｔ字路s": "てぃーじろす",
    "Kvi Baba": "くゔぃばば",
    "TOOBOE": "とおぼえ",
    "浅井健一": "あさいけんいち",
    "レトロリロン": "れとろりろん",
    "川内太鼓": "かわうちだいこ",
    "GEZAN": "げざん",
    "ハンバート ハンバート": "はんばーとはんばーと",
    "KEIJU": "けいじゅ",
    "T.M.Revolution": "てぃーえむれぼりゅーしょん",
    "ゴスペラーズ": "ごすぺらーず",
    "SHISHAMO": "ししゃも"
};

// 検索時の揺れを吸収するため、文字を平仮名や小文字に統一する関数です
function normalizeForSearch(str) {
    if (!str) return "";
    let normalized = str.replace(/[\u30a1-\u30f6]/g, function(match) {
        return String.fromCharCode(match.charCodeAt(0) - 0x60);
    });
    normalized = normalized.toLowerCase();
    return normalized;
}

/**
 * ==========================================
 * 【システム・ロジックエリア】
 * データの意味に従って画面を作るだけの処理群です
 * ==========================================
 */

// --- 状態を管理する変数 ---
let currentDay = 1; // 選択中のタブがDay1かDay2か等を覚えておきます
let mapScale = 1.0;
let fullArtistData = [];

// ブラウザにデータを保存するための「引き出しの名前（キー名）」です
const FAV_KEY = APP_CONFIG.storagePrefix + 'favs';
const FOOD_FAV_KEY = APP_CONFIG.storagePrefix + 'food_favs';
const LAST_TAB_KEY = APP_CONFIG.storagePrefix + 'last_tab';
const MEMO_KEY = APP_CONFIG.storagePrefix + 'memo';

// 保存されているお気に入りデータを読み込みます
let favorites = JSON.parse(localStorage.getItem(FAV_KEY)) || {};
let foodFavoritesOrder = JSON.parse(localStorage.getItem(FOOD_FAV_KEY)) || [];

// お気に入りデータをブラウザに保存する関数です
const saveFavorites = () => localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
const saveFoodFavorites = () => localStorage.setItem(FOOD_FAV_KEY, JSON.stringify(foodFavoritesOrder));

// --- 現在時刻の計算ロジック ---
// 指定した開催日の「開始時刻から現在何分経過しているか」を計算します
function getCurrentMinsForDay(dayKey) {
    const now = new Date();
    const dataDate = new Date(timetableData[dayKey].date);
    const isToday = now.toDateString() === dataDate.toDateString();
    
    // 深夜帯をフェスの「同日」として扱うため、カレンダー上の翌日を計算します
    const targetNextDay = new Date(dataDate);
    targetNextDay.setDate(targetNextDay.getDate() + 1); 
    const isNextDayEarly = now.getHours() < APP_CONFIG.startHour && now.toDateString() === targetNextDay.toDateString();

    // もし今日がその開催日であれば、経過した分数を計算して返します
    if (isToday || isNextDayEarly) {
        return (now.getHours() + (isNextDayEarly ? 24 : 0) - APP_CONFIG.startHour) * 60 + now.getMinutes();
    }
    // 開催日以外の場合は -1 を返します
    return -1; 
}

// --- HTMLの空箱に文字やデータを流し込む関数 ---
function applyAppConfig() {
    const ui = APP_CONFIG.ui;
    
    // アプリタイトルなどをHTMLに反映します
    if(document.getElementById('appTitle')) document.getElementById('appTitle').innerHTML = APP_CONFIG.festivalName;
    
    // 公式リンクの設定を反映します
    const officialLinkEl = document.getElementById('officialLink');
    if(officialLinkEl) {
        officialLinkEl.href = APP_CONFIG.officialUrl;
        officialLinkEl.innerHTML = ui.officialLinkText;
    }

    // 各種テキストをHTMLに流し込みます
    if(document.getElementById('disclaimerText')) document.getElementById('disclaimerText').innerHTML = ui.disclaimer;
    if(document.getElementById('artistSearchInput')) document.getElementById('artistSearchInput').placeholder = ui.searchPlaceholder;
    if(document.getElementById('btnFood')) document.getElementById('btnFood').textContent = ui.tabFood;
    if(document.getElementById('btnMap')) document.getElementById('btnMap').textContent = ui.tabMap;
    if(document.getElementById('btnWeather')) document.getElementById('btnWeather').textContent = ui.tabWeather;
    if(document.getElementById('btnMemo')) document.getElementById('btnMemo').textContent = ui.tabMemo;
    if(document.getElementById('foodHeader')) document.getElementById('foodHeader').textContent = ui.foodHeader;
    
    if(document.getElementById('weatherNotice')) {
        document.getElementById('weatherNotice').innerHTML = ui.weatherNotice.replace('{WEATHER_URL}', APP_CONFIG.weather.linkUrl);
    }
    
    if(document.getElementById('weatherOfflineContent')) document.getElementById('weatherOfflineContent').innerHTML = ui.weatherOfflineMsg;
    if(document.getElementById('memoHeader')) document.getElementById('memoHeader').textContent = ui.memoHeader;
    if(document.getElementById('memoNotice')) document.getElementById('memoNotice').innerHTML = ui.memoNotice;
    if(document.getElementById('memoTextArea')) document.getElementById('memoTextArea').placeholder = ui.memoPlaceholder;
    if(document.getElementById('searchModalClose')) document.getElementById('searchModalClose').textContent = ui.searchModalClose;
    if(document.getElementById('btnZoomIn')) document.getElementById('btnZoomIn').textContent = ui.mapZoomIn;
    if(document.getElementById('btnZoomOut')) document.getElementById('btnZoomOut').textContent = ui.mapZoomOut;
    if(document.getElementById('btnZoomReset')) document.getElementById('btnZoomReset').textContent = ui.mapZoomReset;

    // 流用しやすいように、APP_CONFIG.days の日数に合わせてDayタブボタンを自動生成します
    const tabContainer = document.getElementById('tabContainer');
    const firstStaticTab = document.getElementById('btnFood'); 
    
    document.querySelectorAll('.day-tab-btn').forEach(el => el.remove());

    APP_CONFIG.days.forEach((day) => {
        const btnId = 'btn' + day.id.charAt(0).toUpperCase() + day.id.slice(1);
        const btn = document.createElement('button');
        btn.className = 'tab-btn day-tab-btn';
        btn.id = btnId;
        btn.textContent = day.label;
        tabContainer.insertBefore(btn, firstStaticTab);
    });

    // マップ画像をHTMLに追加します
    const mapWrapper = document.getElementById('mapWrapper');
    if (mapWrapper && APP_CONFIG.mapImages) {
        APP_CONFIG.mapImages.forEach(src => {
            const img = document.createElement('img');
            img.className = 'area-map-img';
            img.src = src;
            img.alt = 'Area Map';
            mapWrapper.appendChild(img);
        });
    }

    // 天気情報をHTMLに追加します
    if(document.getElementById('weatherTitle')) document.getElementById('weatherTitle').textContent = APP_CONFIG.weather.areaName;
    const weatherContainer = document.getElementById('weatherIframeContainer');
    if (weatherContainer && APP_CONFIG.weather.iframeUrl) {
        const iframe = document.createElement('iframe');
        iframe.src = APP_CONFIG.weather.iframeUrl;
        iframe.title = "1時間毎の天気";
        weatherContainer.appendChild(iframe);
    }

    // 出典情報を設定します
    const sourceHtml = `${APP_CONFIG.source.text}<br>（<a href="${APP_CONFIG.source.url}" target="_blank" rel="noopener noreferrer" class="source-link">${APP_CONFIG.source.url}</a>）`;
    document.querySelectorAll('.source-credit').forEach(el => el.innerHTML = sourceHtml);
}

// --- 画面上のボタンにイベント（クリック時の動作）を一括で割り当てる関数 ---
function setupEventListeners() {
    // 1. タブ切り替えボタンのクリックイベント
    APP_CONFIG.days.forEach(day => {
        const btnId = 'btn' + day.id.charAt(0).toUpperCase() + day.id.slice(1);
        const btn = document.getElementById(btnId);
        if(btn) btn.addEventListener('click', () => switchTab(day.id));
    });
    
    document.getElementById('btnFood').addEventListener('click', () => switchTab('food'));
    document.getElementById('btnMap').addEventListener('click', () => switchTab('map'));
    document.getElementById('btnWeather').addEventListener('click', () => switchTab('weather'));
    document.getElementById('btnMemo').addEventListener('click', () => switchTab('memo'));

    // 2. マップのズームボタンのクリックイベント
    document.getElementById('btnZoomIn').addEventListener('click', () => zoomMap(0.2));
    document.getElementById('btnZoomOut').addEventListener('click', () => zoomMap(-0.2));
    document.getElementById('btnZoomReset').addEventListener('click', () => resetZoom());

    // 3. タイムテーブル内の「★ボタン」のクリックイベント
    document.getElementById('gridContainer').addEventListener('click', (e) => {
        if (e.target.classList.contains('fav-btn')) {
            const favId = e.target.getAttribute('data-fav-id');
            if (favId) toggleFav(favId);
        }
    });

    // 4. フード画面の「エリア開閉」と「★ボタン」のクリックイベント
    document.getElementById('foodContainer').addEventListener('click', (e) => {
        const toggleEl = e.target.closest('.food-area-toggle');
        if (toggleEl) {
            toggleFoodArea(toggleEl);
            return;
        }
        if (e.target.classList.contains('food-fav-btn')) {
            const favId = e.target.getAttribute('data-fav-id');
            if (favId) toggleFoodFav(favId);
        }
    });

    // 5. 検索結果モーダル内の「★ボタン」のクリックイベント
    document.getElementById('searchModalContent').addEventListener('click', (e) => {
        if (e.target.classList.contains('fav-btn')) {
            const favId = e.target.getAttribute('data-fav-id');
            if (favId) {
                toggleFav(favId);
                const btn = e.target;
                const block = btn.closest('.artist-block');
                if (favorites[favId]) {
                    btn.classList.add('active');
                    block.classList.add('favorited');
                } else {
                    btn.classList.remove('active');
                    block.classList.remove('favorited');
                }
            }
        }
    });
}

// タイムテーブルのお気に入り状態を切り替える関数です
function toggleFav(id) {
    favorites[id] ? delete favorites[id] : favorites[id] = true;
    saveFavorites();
    renderTimetable(); 
}

// フードのお気に入り状態を切り替える関数です
function toggleFoodFav(id) {
    const index = foodFavoritesOrder.findIndex(item => item.id === id);
    if (index > -1) {
        foodFavoritesOrder.splice(index, 1); 
    } else {
        const [areaName, shopName] = id.split("::");
        foodFavoritesOrder.push({ id: id, shopName: shopName, areaName: areaName }); 
    }
    saveFoodFavorites();
    renderFoodSection(); 
}

// フードのエリア（アコーディオン）を開閉する関数です
function toggleFoodArea(element) {
    element.classList.toggle('open');
    const content = element.nextElementSibling;
    if(content) content.classList.toggle('open');
}

// "HH:MM" 形式の時刻を、タイムテーブル上の表示位置（分単位）に変換します
function timeToMins(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const adjustedH = h < APP_CONFIG.startHour ? h + 24 : h;
    return (adjustedH - APP_CONFIG.startHour) * 60 + m;
}

// "HH:MM" を "H:MM" に整えて表示するための関数です
function formatTimeDisplay(timeStr) {
    let [h, m] = timeStr.split(':').map(Number);
    if(h >= 24) h -= 24;
    return `${h}:${m.toString().padStart(2,'0')}`;
}

// タブを切り替える関数です
function switchTab(target) {
    // 全てのタブと画面から 'active' クラスを外します
    document.querySelectorAll('.tab-btn, .content-section').forEach(el => el.classList.remove('active'));

    const dayMatch = target.match(/^day(\d+)$/);
    
    if (dayMatch) {
        currentDay = parseInt(dayMatch[1]);
        const btnId = 'btnDay' + currentDay;
        const btnEl = document.getElementById(btnId);
        if(btnEl) btnEl.classList.add('active');
        document.getElementById('timetableSection').classList.add('active');
        renderTimetable(); 
    } else {
        const btnId = 'btn' + target.charAt(0).toUpperCase() + target.slice(1);
        const btnEl = document.getElementById(btnId);
        if(btnEl) btnEl.classList.add('active');
        const sectionEl = document.getElementById(target + 'Section');
        if(sectionEl) sectionEl.classList.add('active');
    }
    
    // 天気タブの場合はオフラインかどうかチェックします
    if (target === 'weather') {
        checkWeatherOnlineStatus(); 
        const weatherSection = document.getElementById('weatherSection');
        if (weatherSection) {
            weatherSection.scrollTop = 0;
        }
    }
    
    // 次回開いた時のために最後に開いたタブを記憶します
    localStorage.setItem(LAST_TAB_KEY, target);
}

// ネットに繋がっているか確認する関数です（天気用）
function checkWeatherOnlineStatus() {
    const weatherSection = document.getElementById('weatherSection');
    if (weatherSection) {
        if (navigator.onLine) {
            weatherSection.classList.remove('is-offline');
        } else {
            weatherSection.classList.add('is-offline');
        }
    }
}
window.addEventListener('online', checkWeatherOnlineStatus);
window.addEventListener('offline', checkWeatherOnlineStatus);

// タイムテーブルのステージ名（ヘッダー）を描画する関数です
function renderHeaders(myttCols) {
    let html = '';
    if(myttCols > 0) {
        html += `<div class="stage-header mytt" style="--mytt-cols: ${myttCols};">
                    <div class="stage-name mytt">マイタイテ</div>
                 </div>`;
    }
    stagesInfo.forEach(stage => {
        // 色情報はCSSの変数として渡します
        const style = `style="--stage-color: ${stage.color};"`;
        html += `<div class="stage-header">
                    <div class="stage-name" ${style}>${stage.name}</div>
                 </div>`;
    });
    document.getElementById('stageHeaders').innerHTML = html;
}

// 1つのアーティストのブロック（四角い箱）のHTMLを作る関数です
function getArtistHtml(artist, stage, dayKey, isMyTT = false, currentMins = -1) {
    const startMin = timeToMins(artist.start);
    const endMin = timeToMins(artist.end);
    const duration = endMin - startMin;

    const favId = getFavId(dayKey, stage.id, artist.name);
    const isFav = favorites[favId];
    
    // 現在時刻がこのアーティストの演奏時間内かどうか判定します
    let isPlaying = false;
    if (currentMins >= startMin && currentMins < endMin) {
        isPlaying = true;
    }

    // 色を薄くする（is-light-bg）などの「意味」だけをCSSのクラスとして渡します
    const classes = ['artist-block', isFav && 'favorited', isPlaying && 'playing', artist.isLightBg && 'is-light-bg'].filter(Boolean).join(' ');
    
    // 【ルール厳守】マイタイムテーブル用のステージバッジHTML（配置は一切変更していません）
    const stageBadgeHtml = isMyTT ? `<div class="mytt-stage-name">${stage.name}</div>` : '';

    if (artist.isSpecialLayout) {
        const displayTime = artist.displayTime || `${formatTimeDisplay(artist.start)}-`;
        const inlineStageBadge = isMyTT ? `<span class="mytt-stage-name inline-badge">${stage.name}</span>` : '';
        return `<div class="${classes} artist-block-special" style="--start-min: ${startMin}; --duration: ${duration}; --artist-bg: ${stage.color};">
                    ${inlineStageBadge}
                    <span class="artist-time">${displayTime}</span>
                    <span class="artist-name">${artist.name}</span>
                    <button class="fav-btn ${isFav ? 'active' : ''}" data-fav-id="${favId}">★</button>
                </div>`;
    }

    const displayGenre = (artist.hideEndTime || isMyTT) ? "" : (artist.genre || "");
    const timeText = artist.hideEndTime ? `${formatTimeDisplay(artist.start)}-` : `${formatTimeDisplay(artist.start)}-${formatTimeDisplay(artist.end)}`;
    const metaHtml = displayGenre ? `<div class="artist-meta">${displayGenre}</div>` : '';
    
    return `<div class="${classes}" style="--start-min: ${startMin}; --duration: ${duration}; --artist-bg: ${stage.color};">
                ${stageBadgeHtml}
                <div class="artist-top">
                    <span class="artist-time">${timeText}</span>
                    <button class="fav-btn ${isFav ? 'active' : ''}" data-fav-id="${favId}">★</button>
                </div>
                <div class="artist-name">${artist.name}</div>
                ${metaHtml}
            </div>`;
}

// ブロックからはみ出る文字のサイズを自動で小さくする関数です
function adjustFontSize() {
    // ※この処理はブラウザへの計算負荷（レイアウトスラッシング）がやや高めですが、
    // 長いバンド名を綺麗に収めるために現状維持としています。
    document.querySelectorAll('.artist-block:not(.food-block):not(.search-modal-content .artist-block)').forEach(block => {
        const nameEl = block.querySelector('.artist-name');
        const timeEl = block.querySelector('.artist-time');
        const stageBadge = block.querySelector('.mytt-stage-name');
        const metaEl = block.querySelector('.artist-meta');

        if (!nameEl) return;

        const isRow = block.classList.contains('artist-block-special');
        let fontSize = isRow ? 11 : (nameEl.innerText === "" ? 11 : 13);
        const targetEl = (isRow || nameEl.innerText !== "") ? nameEl : timeEl;

        targetEl.style.fontSize = fontSize + 'px';
        
        while ((block.scrollHeight > block.offsetHeight || block.scrollWidth > block.clientWidth) && fontSize > 6) {
            fontSize -= 0.5;
            targetEl.style.fontSize = fontSize + 'px';
        }

        if (block.scrollHeight > block.offsetHeight) {
            block.classList.add('compact-mode');
            let subFontSize = 10;
            while ((block.scrollHeight > block.offsetHeight) && subFontSize > 5) {
                subFontSize -= 0.5;
                if (timeEl) timeEl.style.fontSize = subFontSize + 'px';
                if (stageBadge) stageBadge.style.fontSize = Math.max(4, subFontSize - 2) + 'px';
                if (metaEl) metaEl.style.fontSize = Math.max(5, subFontSize - 2) + 'px';
            }
        }
    });
}

// タイムテーブル全体を描画する関数です
function renderTimetable() {
    const dayKey = `day${currentDay}`;
    const data = timetableData[dayKey];
    if (!data) return; // データが存在しない場合は処理を抜けます

    // 時間の目盛りを作ります
    let timeHtml = '';
    for(let h = APP_CONFIG.startHour; h <= APP_CONFIG.endHour; h++) {
        timeHtml += `<div class="time-slot"><span>${h >= 24 ? h-24 : h}:00</span></div>`;
    }
    document.getElementById('timeCol').innerHTML = timeHtml;

    const currentMins = getCurrentMinsForDay(dayKey);

    // マイタイムテーブル（お気に入り）に登録されたアーティストを集めます
    let myTtItems = [];
    stagesInfo.forEach((stage, stageIndex) => {
        (data[stage.id] || []).forEach(artist => {
            const favId = getFavId(dayKey, stage.id, artist.name);
            if(favorites[favId]) myTtItems.push({ artist, stage, stageIndex });
        });
    });

    if (APP_CONFIG.settings.priorityStageOrder) {
        myTtItems.sort((a,b) => {
            if (a.stageIndex !== b.stageIndex) return a.stageIndex - b.stageIndex;
            return timeToMins(a.artist.start) - timeToMins(b.artist.start);
        });
    } else {
        myTtItems.sort((a,b) => timeToMins(a.artist.start) - timeToMins(b.artist.start));
    }

    // 時間が被っている場合は横に並べる処理（カラム分け）を行います
    let myTtColumns = []; 
    myTtItems.forEach(item => {
        let maxOverlapCol = -1;
        for (let colIdx = 0; colIdx < myTtColumns.length; colIdx++) {
            const overlap = myTtColumns[colIdx].some(ex => {
                return Math.max(timeToMins(item.artist.start), timeToMins(ex.artist.start)) < 
                       Math.min(timeToMins(item.artist.end), timeToMins(ex.artist.end));
            });
            if (overlap) maxOverlapCol = Math.max(maxOverlapCol, colIdx);
        }

        let placed = false;
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
        if (!placed) myTtColumns.push([item]);
    });

    const myTtColCount = myTtItems.length ? myTtColumns.length : 0;
    renderHeaders(myTtColCount); 

    // HTMLに変換して流し込みます
    let gridHtml = '';
    if(myTtColCount > 0) {
        myTtColumns.forEach(col => {
            gridHtml += `<div class="grid-col mytt"><div class="grid-bg-lines"></div>${col.map(i => getArtistHtml(i.artist, i.stage, dayKey, true, currentMins)).join('')}</div>`;
        });
    }

    stagesInfo.forEach(stage => {
        const content = (data[stage.id] || []).map(a => getArtistHtml(a, stage, dayKey, false, currentMins)).join('');
        gridHtml += `<div class="grid-col"><div class="grid-bg-lines"></div>${content}</div>`;
    });

    // ここで現在時刻の線をHTMLの最後に追加しています
    gridHtml += `<div class="current-time-line" id="currentTimeLine"></div>`;
    
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = gridHtml;

    const totalHours = APP_CONFIG.endHour - APP_CONFIG.startHour + 1;
    gridContainer.style.height = `calc(${totalHours} * 60 * var(--px-per-min) * 1px)`;
    
    updateCurrentTimeLine(); 
    adjustFontSize(); 
}

// 現在時刻の赤い横線を正しい位置に動かす関数です
function updateCurrentTimeLine() {
    const line = document.getElementById('currentTimeLine');
    if(!line) return;

    const dayKey = `day${currentDay}`;
    const currentMins = getCurrentMinsForDay(dayKey);

    const maxMins = (APP_CONFIG.endHour - APP_CONFIG.startHour) * 60;

    // 分数が0～最大分数の間に収まっている時だけ線を表示します
    if(currentMins >= 0 && currentMins <= maxMins) {
        line.classList.add('is-visible');
        line.style.setProperty('--current-min', currentMins); 
        return;
    }
    line.classList.remove('is-visible'); 
}

// 1つのフード店舗のカード（HTML）を作る関数です
function generateFoodCard(shop, areaName, isDraggable = false) {
    const menuItems = shop.menus.map(m => `<li>${m}</li>`).join('');
    const messageHtml = shop.message.replace(/\n/g, '<br>');
    const imgSrc = shop.img || ""; 
    const imgHtml = imgSrc ? `<img src="${imgSrc}" class="food-card-img" alt="${shop.name}">` : `<span>NO IMAGE</span>`;
        
    const id = areaName + "::" + shop.name;
    const isFav = foodFavoritesOrder.some(item => item.id === id);
    const safeId = id.replace(/"/g, '&quot;');
    
    const classes = isDraggable ? "food-card draggable-card" : "food-card";
    const dragAttr = isDraggable ? `draggable="true" data-id="${safeId}"` : `data-id="${safeId}"`;

    return `
    <div class="${classes}" ${dragAttr}>
        <div class="food-card-area-badge">${areaName}</div>
        <button class="food-fav-btn ${isFav ? 'active' : ''}" data-fav-id="${safeId}">★</button>
        <div class="food-card-img-wrapper">${imgHtml}</div>
        <div class="food-card-body">
            <h3 class="food-card-title">${shop.name}</h3>
            <ul class="food-card-menus">${menuItems}</ul>
            <p class="food-card-message">${messageHtml}</p>
        </div>
    </div>`;
}

// フード一覧画面全体を描画する関数です
function renderFoodSection() {
    let html = '';
    const ui = APP_CONFIG.ui;
    
    html += `
    <div class="food-area-toggle open food-area-fav">
        <span>${ui.foodFavListTitle}</span>
        <span class="toggle-icon">▶</span>
    </div>
    <div class="food-area-content open" id="foodFavoritesList">
    `;
    
    if (foodFavoritesOrder.length === 0) {
        html += `<div class="food-empty-msg">${ui.foodEmptyMsg}</div>`;
    } else {
        foodFavoritesOrder.forEach(favItem => {
            let shopData = null;
            foodList.forEach(area => {
                if(area.name === favItem.areaName) {
                    const found = area.menu.find(s => s.name === favItem.shopName);
                    if(found) shopData = found;
                }
            });
            if (shopData) html += generateFoodCard(shopData, favItem.areaName, true); 
        });
    }
    html += `</div>`;

    foodList.forEach(area => {
        const shopsHtml = area.menu.map(shop => generateFoodCard(shop, area.name, false)).join('');
        html += `
        <div class="food-area-toggle">
            <span>${area.name}</span>
            <span class="toggle-icon">▶</span>
        </div>
        <div class="food-area-content">
            ${shopsHtml}
        </div>`;
    });
    
    document.getElementById('foodContainer').innerHTML = html;
    setupDragAndDrop(); 
}

// フードのお気に入りをドラッグして並べ替えるための準備です
function setupDragAndDrop() {
    const container = document.getElementById('foodFavoritesList');
    if (!container) return;
    const cards = container.querySelectorAll('.draggable-card');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', () => card.classList.add('dragging'));
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            updateFoodFavoritesOrder(); 
        });
    });
    
    container.addEventListener('dragover', e => {
        e.preventDefault(); 
        const afterElement = getDragAfterElement(container, e.clientX, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (!draggable) return;
        
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });
}

// ドラッグ中、どのカードの下に挿入すべきかを計算する関数です
function getDragAfterElement(container, x, y) {
    const draggableElements = [...container.querySelectorAll('.draggable-card:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - (box.left + box.width / 2);
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// ドラッグで並び替えた後の新しい順番を保存する関数です
function updateFoodFavoritesOrder() {
    const container = document.getElementById('foodFavoritesList');
    const cards = container.querySelectorAll('.draggable-card');
    const newOrder = [];
    cards.forEach(card => {
        const id = card.getAttribute('data-id');
        const favItem = foodFavoritesOrder.find(item => item.id === id);
        if (favItem) newOrder.push(favItem);
    });
    foodFavoritesOrder = newOrder;
    saveFoodFavorites();
}

// マップの拡大縮小を行う関数です
function zoomMap(delta) {
    mapScale = Math.min(Math.max(0.5, mapScale + delta), 3.0);
    // JSは現在の倍率をCSSに渡すだけにします
    document.getElementById('mapWrapper').style.setProperty('--map-scale', mapScale);
}
function resetZoom() {
    mapScale = 1.0;
    document.getElementById('mapWrapper').style.setProperty('--map-scale', mapScale);
}

// 画面右上のデジタル時計を更新する関数です
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const clockElement = document.getElementById('digitalClock');
    if (clockElement) clockElement.textContent = `${h}:${m}:${s}`;
}

// このファイルの最終更新日時を表示する関数です
function displayLastModified() {
    const lastMod = new Date(document.lastModified);
    const y = lastMod.getFullYear();
    const m = String(lastMod.getMonth() + 1).padStart(2, '0');
    const d = String(lastMod.getDate()).padStart(2, '0');
    const hh = String(lastMod.getHours()).padStart(2, '0');
    const mm = String(lastMod.getMinutes()).padStart(2, '0');
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = `更新日時：${y}/${m}/${d} ${hh}:${mm}`;
    }
}

// ---------------- 以下、検索機能系の処理 ----------------

// 検索を高速に行うため、事前にデータを整理してリストアップする関数です
function buildArtistSearchData() {
    const baseNameMap = new Map(); 
    fullArtistData = [];

    function getBaseName(name) {
        return name.replace(/([ぁ-んァ-ヶ一-龥]|\))(\d+)$/, '$1');
    }

    Object.keys(timetableData).forEach(dayKey => {
        const dayInfo = timetableData[dayKey];
        const dayLabel = APP_CONFIG.days.find(d => d.id === dayKey)?.label || dayKey;

        stagesInfo.forEach(stage => {
            if (dayInfo[stage.id]) {
                dayInfo[stage.id].forEach(artist => {
                    const cleanNameForSearch = artist.name.split('<br>')[0].trim();
                    const baseName = getBaseName(cleanNameForSearch);
                    
                    if (!baseNameMap.has(baseName)) {
                        baseNameMap.set(baseName, []);
                    }
                    baseNameMap.get(baseName).push({
                        originalArtist: artist, stage: stage, dayKey: dayKey,
                        dayLabel: dayLabel, startMin: timeToMins(artist.start)
                    });
                });
            }
        });
    });

    baseNameMap.forEach((artistsGroup, baseName) => {
        const originalNames = artistsGroup.map(item => item.originalArtist.name.split('<br>')[0].trim());
        const yomi = artistYomiDict[baseName] || artistYomiDict[originalNames[0]] || baseName;
        
        fullArtistData.push({
            searchName: baseName,
            originalNames: originalNames,
            normYomi: normalizeForSearch(yomi),
            normName: normalizeForSearch(baseName),
            artistsGroup: artistsGroup, 
            dayKey: artistsGroup[0].dayKey,
            dayLabel: artistsGroup[0].dayLabel,
            startMin: Math.min(...artistsGroup.map(item => timeToMins(item.originalArtist.start))) 
        });
    });

    fullArtistData.sort((a, b) => {
        const yomiA = artistYomiDict[a.searchName] || a.searchName;
        const yomiB = artistYomiDict[b.searchName] || b.searchName;
        return yomiA.localeCompare(yomiB, 'ja');
    });
}

// 検索ボックスに文字が入力された時の動きを設定する関数です
function setupSearch() {
    buildArtistSearchData();
    const searchInput = document.getElementById('artistSearchInput');
    const suggestList = document.getElementById('searchSuggestList');
    const modalOverlay = document.getElementById('searchModalOverlay');
    const modalClose = document.getElementById('searchModalClose');

    searchInput.addEventListener('input', function() {
        const query = normalizeForSearch(this.value.trim());
        suggestList.innerHTML = '';

        if (query.length === 0) {
            suggestList.style.display = 'none';
            return;
        }

        const matchedItems = fullArtistData.filter(item => item.normYomi.startsWith(query) || item.normName.startsWith(query));

        if (matchedItems.length > 0) {
            matchedItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.searchName; 
                li.addEventListener('mousedown', () => {
                    searchInput.value = item.searchName; 
                    suggestList.style.display = 'none';
                    showSearchResults(item.searchName);
                });
                suggestList.appendChild(li);
            });
            suggestList.style.display = 'block';
        } else {
            suggestList.style.display = 'none';
        }
    });

    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const queryText = this.value.trim();
            if (queryText.length > 0) {
                suggestList.style.display = 'none';
                showSearchResults(queryText);
                this.blur(); 
            }
        }
    });

    modalClose.addEventListener('click', closeSearchModal);
    modalOverlay.addEventListener('click', closeSearchModal);
}

// 検索結果のポップアップを閉じる関数です
function closeSearchModal() {
    document.getElementById('searchModal').style.display = 'none';
    document.getElementById('searchModalOverlay').style.display = 'none';
    const searchInput = document.getElementById('artistSearchInput');
    const suggestList = document.getElementById('searchSuggestList');
    searchInput.value = '';
    suggestList.style.display = 'none';
    suggestList.innerHTML = '';
}

// 分を「〇時間〇分」という文字に変換する関数です
function formatDiffTime(mins) {
    if (mins >= 60) {
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${h}時間${m}分`;
    } else {
        return `${mins}分`;
    }
}

// 「演奏開始まであと何分」を計算してHTMLを作る関数です
function getArtistTimeStatusHtml(artist, dayDateStr) {
    if (!artist.start) return "";
    const now = new Date();
    
    let [sh, sm] = artist.start.split(':').map(Number);
    let startDayOffset = 0;
    if (sh >= 24) { sh -= 24; startDayOffset = 1; }
    
    let startDate = new Date(dayDateStr);
    startDate.setDate(startDate.getDate() + startDayOffset);
    startDate.setHours(sh, sm, 0, 0);
    
    let endDate = null;
    if (artist.end) {
        let [eh, em] = artist.end.split(':').map(Number);
        let endDayOffset = 0;
        if (eh >= 24) { eh -= 24; endDayOffset = 1; }
        endDate = new Date(dayDateStr);
        endDate.setDate(endDate.getDate() + endDayOffset);
        endDate.setHours(eh, em, 0, 0);
    }

    const diffMs = startDate - now;
    const diffMins = Math.floor(diffMs / 60000);

    if (endDate) {
        const endDiffMs = endDate - now;
        const endDiffMins = Math.floor(endDiffMs / 60000);

        if (diffMins > 0) {
            const timeStr = formatDiffTime(diffMins);
            const numClass = diffMins < 10 ? "text-red" : "";
            return `<div class="search-time-status">演奏前：開始まであと<span class="${numClass}">${timeStr}</span></div>`;
        } else if (endDiffMins > 0) {
            const timeStr = formatDiffTime(endDiffMins);
            return `<div class="search-time-status text-red">演奏中：終了まであと${timeStr}</div>`;
        } else {
            return `<div class="search-time-status">演奏終了</div>`;
        }
    } else {
        if (diffMins > 0) {
            const timeStr = formatDiffTime(diffMins);
            const numClass = diffMins < 10 ? "text-red" : "";
            return `<div class="search-time-status">演奏前：開始まであと<span class="${numClass}">${timeStr}</span></div>`;
        } else {
            return ``; 
        }
    }
}

// 検索結果のポップアップ画面を作る関数です
function showSearchResults(searchText) {
    const query = normalizeForSearch(searchText.trim());
    if (!query) return;

    const results = fullArtistData.filter(item => 
        item.normYomi.startsWith(query) || 
        item.normName.startsWith(query) ||
        item.originalNames.some(orig => normalizeForSearch(orig).startsWith(query))
    );
    
    results.sort((a, b) => {
        if (a.dayKey !== b.dayKey) return a.dayKey.localeCompare(b.dayKey);
        return a.startMin - b.startMin;
    });

    const contentArea = document.getElementById('searchModalContent');
    contentArea.innerHTML = '';
    
    const ui = APP_CONFIG.ui;
    document.getElementById('searchModalTitle').textContent = `${ui.searchModalTitlePrefix}${searchText}${ui.searchModalTitleSuffix}`;

    if (results.length === 0) {
        contentArea.innerHTML = `<div class="search-empty-msg">${ui.searchEmptyMsg}</div>`;
        return;
    }

    const totalArtists = results.reduce((sum, item) => sum + item.artistsGroup.length, 0);
    
    if (totalArtists === 1) {
        const targetGroup = results[0].artistsGroup[0];
        const artist = targetGroup.originalArtist;
        const dayDate = timetableData[targetGroup.dayKey].date;
        const statusHtml = getArtistTimeStatusHtml(artist, dayDate);
        contentArea.innerHTML = statusHtml; 
    } else if (totalArtists > 1) {
        const statusHtml = `<div class="search-time-status">複数時間帯が存在するためカウントダウン対象外</div>`;
        contentArea.innerHTML = statusHtml;
    }

    results.forEach(item => {
        item.artistsGroup.forEach(groupItem => {
            const artist = groupItem.originalArtist;
            const stage = groupItem.stage;
            const dayKey = groupItem.dayKey;
            
            const favId = getFavId(dayKey, stage.id, artist.name);
            const isFav = favorites[favId];
            const dayLabel = APP_CONFIG.days.find(d => d.id === dayKey)?.label || dayKey;
            const timeText = artist.end ? `${formatTimeDisplay(artist.start)}-${formatTimeDisplay(artist.end)}` : `${formatTimeDisplay(artist.start)}-`;

            // JSは「背景を薄くする意味（is-light-bg）」をクラスとして渡すだけに留め、見た目はCSSに任せます。
            const classes = ['artist-block', isFav ? 'favorited' : '', artist.isLightBg ? 'is-light-bg' : ''].filter(Boolean).join(' ');

            const html = `
                <div class="${classes}" style="--artist-bg: ${stage.color};">
                    <div class="artist-top">
                        <span class="artist-time">${dayLabel} ${timeText} <span class="artist-stage-name">${stage.name}</span></span>
                        <button class="fav-btn ${isFav ? 'active' : ''}" data-fav-id="${favId}">★</button>
                    </div>
                    <div class="artist-name">${artist.name}</div>
                </div>
            `;
            contentArea.insertAdjacentHTML('beforeend', html);
        });
    });

    document.getElementById('searchModalOverlay').style.display = 'block';
    document.getElementById('searchModal').style.display = 'flex';
}

// --- ページが読み込まれたときに最初に動く処理 ---
window.addEventListener('DOMContentLoaded', () => {
    applyAppConfig(); // まず初めにHTMLの空箱に文字やボタンを流し込みます
    setupEventListeners(); // ボタンが作られた後で、クリックした時の動きを設定します
    setupSearch();

    // 前回閉じた時のタブを記憶していればそこを開き、なければDay1を開きます
    const lastTab = localStorage.getItem(LAST_TAB_KEY) || (APP_CONFIG.days[0] ? APP_CONFIG.days[0].id : 'food');
    switchTab(lastTab); 

    renderFoodSection();
    displayLastModified();
    
    updateClock();
    setInterval(updateClock, 1000); 
    setInterval(updateCurrentTimeLine, 60000); 

    const memoTextArea = document.getElementById('memoTextArea');
    if (memoTextArea) {
        const savedMemo = localStorage.getItem(MEMO_KEY) || '';
        memoTextArea.value = savedMemo;
        memoTextArea.addEventListener('input', () => {
            localStorage.setItem(MEMO_KEY, memoTextArea.value);
        });
    }

    const weatherIframe = document.querySelector('#weatherOnlineContent iframe');
    if (weatherIframe) {
        weatherIframe.addEventListener('load', () => {
            const weatherSection = document.getElementById('weatherSection');
            if (weatherSection && weatherSection.classList.contains('active')) {
                setTimeout(() => {
                    weatherSection.scrollTop = 0;
                }, 100);
            }
        });
    }
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .catch(err => console.error('SW登録失敗:', err));
    }
});