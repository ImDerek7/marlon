export const CONTACT = {
  name: "MAFER – malířské a úklidové služby",
  shortName: "MAFER",
  owner: "Matyas Ferenc",
  phone: "774 344 186",
  phoneHref: "tel:+420774344186",
  email: "mattyas.ferenc1@seznam.cz",
  emailHref: "mailto:mattyas.ferenc1@seznam.cz",
  ico: "17693021",
  address: "Sokolovská 971/193, Praha 9 – Libeň, 190 00",
  area: "Praha a okolí",
  facebook: "https://www.facebook.com/matisek.ferenc",
  profiles: {
    firemniProfil: "https://www.firemniprofil.cz/firma/42305601/matyas-ferenc",
    nejRemeslnici: "https://www.nejremeslnici.cz/profil/421487-matyas-ferenc",
  },
};

const u = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const IMAGES = {
  hero: u("photo-1645564977352-10a805bbdc1b", 2000),
  painting: u("photo-1562259949-e8e7689d7828", 1400),
  cleaning: u("photo-1628744876497-eb30460be9f6", 1400),
  clearance: u("photo-1600518464441-9154a4dea21b", 1400),
  before: u("photo-1504307651254-35680f356dfd", 1600),
  after: u("photo-1600210492486-724fe5c67fb0", 1600),
};

export const SERVICES_MAIN = [
  {
    slug: "malarske-prace",
    icon: "PaintRoller",
    title: "Malířské práce",
    desc: "Malování interiérů a exteriérů, betonové stěrky a odstranění plísní.",
    image: IMAGES.painting,
    items: [
      "Malování interiérů",
      "Malování exteriérů",
      "Příprava povrchů",
      "Betonové stěrky",
      "Odstranění plísní",
    ],
  },
  {
    slug: "uklidove-sluzby",
    icon: "Sparkles",
    title: "Úklidové služby",
    desc: "Úklidy bytů, domů, nebytových prostor, dlouhodobé i generální úklidy.",
    image: IMAGES.cleaning,
    items: [
      "Úklid bytů a domů",
      "Úklid nebytových prostor",
      "Pravidelné úklidy",
      "Generální úklidy",
      "Úklid po rekonstrukci",
      "Vyklízecí/debordelizační úklidy",
    ],
  },
  {
    slug: "vyklizeci-a-stehovaci-prace",
    icon: "Truck",
    title: "Vyklízecí a stěhovací práce",
    desc: "Vyklízení bytů, domů, sklepů a dalších prostor.",
    image: IMAGES.clearance,
    items: [
      "Vyklízení bytů a domů",
      "Vyklízení sklepů",
      "Vyklízení půd",
      "Odvoz nepotřebných věcí",
      "Pomoc se stěhováním",
    ],
  },
];

export const SERVICES_EXTRA = [
  "Lakýrnické práce",
  "Renovace oken a dveří",
  "Lakování nábytku",
  "Podlahářské práce",
  "Montáž a demontáž nábytku",
  "Drobné opravy",
  "Práce hodinového manžela",
];

export const WHY_US = [
  {
    icon: "ShieldCheck",
    title: "Spolehlivost",
    desc: "Dodržení domluvy a profesionální komunikace.",
  },
  {
    icon: "BadgeCheck",
    title: "Kvalitní práce",
    desc: "Důraz na čistý výsledek a pečlivé provedení.",
  },
  {
    icon: "Layers",
    title: "Kompletní servis",
    desc: "Možnost spojit více služeb do jedné zakázky.",
  },
  {
    icon: "UserCheck",
    title: "Individuální přístup",
    desc: "Každou zakázku řešíme podle konkrétních potřeb zákazníka.",
  },
  {
    icon: "Handshake",
    title: "Férová domluva",
    desc: "Cena a rozsah práce se řeší předem podle konkrétní zakázky.",
  },
];

export const GALLERY_CATEGORIES = [
  { key: "vse", label: "Vše" },
  { key: "malovani", label: "Malování" },
  { key: "interiery", label: "Interiéry" },
  { key: "uklid", label: "Úklid" },
  { key: "vyklizeni", label: "Vyklízení" },
  { key: "lakyrnicke", label: "Lakýrnické práce" },
  { key: "predpo", label: "Před / Po" },
];

// Pozn.: aktuálně ilustrační fotografie – po dodání skutečných fotek realizací
// stačí vyměnit URL v tomto seznamu.
export const GALLERY = [
  { id: "g1", cat: "malovani", src: u("photo-1598300042247-d088f8ab3a91"), title: "Malování interiéru" },
  { id: "g2", cat: "malovani", src: u("photo-1562259949-e8e7689d7828"), title: "Natírání stěny" },
  { id: "g3", cat: "malovani", src: u("photo-1622560480605-d83c853bc5c3"), title: "Malířské práce" },
  { id: "g4", cat: "interiery", src: u("photo-1600210492486-724fe5c67fb0"), title: "Vymalovaný obývák" },
  { id: "g5", cat: "interiery", src: u("photo-1616486338812-3dadae4b4ace"), title: "Moderní interiér" },
  { id: "g6", cat: "interiery", src: u("photo-1600607687939-ce8a6c25118c"), title: "Světlý interiér" },
  { id: "g7", cat: "interiery", src: u("photo-1615873968403-89e068629265"), title: "Ložnice po renovaci" },
  { id: "g8", cat: "uklid", src: u("photo-1581578731548-c64695cc6952"), title: "Profesionální úklid" },
  { id: "g9", cat: "uklid", src: u("photo-1563453392212-326f5e854473"), title: "Úklidová technika" },
  { id: "g10", cat: "uklid", src: u("photo-1628744876497-eb30460be9f6"), title: "Uklizený interiér" },
  { id: "g11", cat: "vyklizeni", src: u("photo-1600518464441-9154a4dea21b"), title: "Stěhování a vyklízení" },
  { id: "g12", cat: "vyklizeni", src: u("photo-1587293852726-70cdb56c2866"), title: "Odvoz věcí" },
  { id: "g13", cat: "lakyrnicke", src: u("photo-1616627561950-9f746e330187"), title: "Lakování nábytku" },
  { id: "g14", cat: "lakyrnicke", src: u("photo-1595428774223-ef52624120d2"), title: "Renovace interiéru" },
  { id: "g15", cat: "predpo", src: u("photo-1504307651254-35680f356dfd"), title: "Před realizací" },
  { id: "g16", cat: "predpo", src: u("photo-1631679706909-1844bbd07221"), title: "Po realizaci" },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Kontakt",
    desc: "Zavoláte nebo odešlete poptávku.",
  },
  {
    n: "02",
    title: "Domluva",
    desc: "Upřesníme rozsah práce a požadavky.",
  },
  {
    n: "03",
    title: "Realizace",
    desc: "Dohodnutý termín a profesionální provedení.",
  },
  {
    n: "04",
    title: "Hotovo",
    desc: "Předání hotové práce a případný finální úklid.",
  },
];

// Skutečné recenze převzaté z veřejného firemního profilu (Firemniprofil.cz).
export const REVIEWS = [
  {
    name: "Roman Č.",
    text: "Dlouho jsme hledali řemeslníka / lakýrníka, který by nám pomohl s natřením dveří. Komunikace a přístup pana Ference byl perfektní. Vše proběhlo včas a podle domluvy. Mohu doporučit.",
    source: "Firemniprofil.cz",
  },
  {
    name: "Jonáš",
    text: "Pan Ferenc přijel, zaměřil si místnost a následný 2 den nám vymaloval byt, + odstranil plíseň v bytě. Vše bylo v pořádku. Doporučuji.",
    source: "Firemniprofil.cz",
  },
  {
    name: "David",
    text: "Vřele doporučuji. Kontakt uchovávám a až budu cokoliv potřebovat, rád se obrátím na služby p. Ference. Vymaloval nám byt 3+1 za pouhý 1 den. Doporučuji.",
    source: "Firemniprofil.cz",
  },
  {
    name: "Tomas",
    text: "Potřeboval jsem natřít fasádu, kluci si vše oblepili a vymalovali tak, jak jsem si představoval. Komunikace jasná a dodržena. Perfektní řemeslník.",
    source: "Firemniprofil.cz",
  },
  {
    name: "Nela",
    text: "S prací P. Ference jsem velice spokojena. Odstranil nám plíseň v celém bytě a následně položil novou podlahu. Komunikace byla vždy jasná a přesná, cena byla dodržena. Doporučuji všemi deseti.",
    source: "Firemniprofil.cz",
  },
];

export const SERVICE_OPTIONS = [
  "Malířské práce",
  "Úklidové služby",
  "Vyklízecí a stěhovací práce",
  "Lakýrnické práce",
  "Další řemeslné práce",
  "Kombinace služeb",
];

export const SERVICE_PAGES = {
  "malarske-prace": {
    overline: "Služby / 01",
    title: "Malířské práce",
    lead: "Malování bytů, domů a komerčních prostor v Praze a okolí. Od důkladné přípravy povrchů po finální nátěr – s důrazem na čistý výsledek.",
    image: IMAGES.painting,
    blocks: [
      {
        title: "Co vymalujeme",
        items: [
          "Malování interiérů – byty, domy, kanceláře",
          "Malování exteriérů a fasád",
          "Příprava povrchů – štukování, penetrace, opravy",
          "Betonové stěrky a dekorativní povrchy",
          "Odstranění plísní a sanace zdí",
        ],
      },
      {
        title: "Jak pracujeme",
        items: [
          "Konzultace a nacenění zakázky předem",
          "Zakrytí podlah, nábytku a oken",
          "Kvalitní barvy a osvědčené postupy",
          "Předání včetně finálního úklidu",
        ],
      },
    ],
  },
  "uklidove-sluzby": {
    overline: "Služby / 02",
    title: "Úklidové služby",
    lead: "Jednorázové i pravidelné úklidy bytů, domů a nebytových prostor. Specializujeme se i na generální úklidy a úklidy po rekonstrukci.",
    image: IMAGES.cleaning,
    blocks: [
      {
        title: "Co uklidíme",
        items: [
          "Úklid bytů a rodinných domů",
          "Úklid nebytových a komerčních prostor",
          "Pravidelné úklidy na míru",
          "Generální úklidy",
          "Úklid po rekonstrukci a malování",
          "Vyklízecí a debordelizační úklidy",
        ],
      },
      {
        title: "Proč s námi",
        items: [
          "Domluva rozsahu a ceny předem",
          "Vlastní úklidová technika a prostředky",
          "Spolehlivost a pečlivost",
          "Možnost spojit úklid s dalšími službami",
        ],
      },
    ],
  },
  "vyklizeci-a-stehovaci-prace": {
    overline: "Služby / 03",
    title: "Vyklízecí a stěhovací práce",
    lead: "Rychlé a diskrétní vyklízení bytů, domů, sklepů i půd. Zajistíme odvoz nepotřebných věcí a pomůžeme i se stěhováním.",
    image: IMAGES.clearance,
    blocks: [
      {
        title: "Co vyklidíme",
        items: [
          "Vyklízení bytů a rodinných domů",
          "Vyklízení sklepů a půd",
          "Odvoz nepotřebných věcí a odpadu",
          "Pomoc se stěhováním",
          "Následný úklid prostor",
        ],
      },
      {
        title: "Jak to probíhá",
        items: [
          "Prohlídka nebo popis zakázky",
          "Cenová nabídka předem",
          "Realizace v dohodnutém termínu",
          "Předání uklizených prostor",
        ],
      },
    ],
  },
};
