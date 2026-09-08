import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";
import { CONTACT } from "@/data/content";

const CONTENT = {
  gdpr: {
    title: "Ochrana osobních údajů",
    testid: "legal-gdpr",
    sections: [
      {
        h: "Správce osobních údajů",
        p: `Správcem osobních údajů je ${CONTACT.owner}, IČO ${CONTACT.ico}, se sídlem ${CONTACT.address}, e-mail: ${CONTACT.email}, telefon: ${CONTACT.phone}.`,
      },
      {
        h: "Jaké údaje zpracováváme",
        p: "Údaje, které nám sdělíte prostřednictvím poptávkového formuláře, e-mailu nebo telefonicky – zejména jméno, telefon, e-mail, lokalitu a popis zakázky, případně přiložené fotografie.",
      },
      {
        h: "Účel zpracování",
        p: "Osobní údaje zpracováváme výhradně za účelem vyřízení vaší poptávky, domluvy zakázky a související komunikace.",
      },
      {
        h: "Doba uchování a vaše práva",
        p: "Údaje uchováváme pouze po dobu nezbytnou pro vyřízení poptávky. Máte právo na přístup k údajům, jejich opravu, výmaz i omezení zpracování. Stačí nás kontaktovat na výše uvedeném e-mailu.",
      },
    ],
  },
  terms: {
    title: "Obchodní podmínky",
    testid: "legal-terms",
    sections: [
      {
        h: "Poskytovatel služeb",
        p: `${CONTACT.name} – ${CONTACT.owner}, IČO ${CONTACT.ico}, sídlo ${CONTACT.address}. Působnost: ${CONTACT.area}.`,
      },
      {
        h: "Objednání a cena",
        p: "Každá zakázka je řešena individuálně. Cena a rozsah práce jsou vždy dohodnuty předem podle konkrétní zakázky – telefonicky, e-mailem nebo při osobní prohlídce.",
      },
      {
        h: "Realizace",
        p: "Termín realizace a způsob provedení prací se domlouvají se zákazníkem předem. Součástí předání může být i finální úklid, je-li dohodnut.",
      },
      {
        h: "Reklamace",
        p: "Případné výhrady ke kvalitě provedené práce řešíme individuálně a férově. Kontaktujte nás na uvedeném telefonu nebo e-mailu.",
      },
    ],
  },
};

export default function LegalPage({ type }) {
  const page = CONTENT[type] || CONTENT.gdpr;
  return (
    <main data-testid={page.testid}>
      <Navbar />
      <section className="pt-40 pb-24 max-w-3xl mx-auto px-5 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D97706] mb-4">
          Právní informace
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tighter text-white mb-12">
          {page.title}
        </h1>
        <div className="space-y-10">
          {page.sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-xl font-bold text-white mb-3">{s.h}</h2>
              <p className="text-[#A1A1AA] leading-relaxed text-sm md:text-base">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <MobileCta />
    </main>
  );
}
