import { useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { ArrowRight, Sparkles, Compass, Check } from "lucide-react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Epilogue:wght@400;500;600;700&display=swap');
`;

const COLORS = {
  cream: "#F5F1EA",
  creamSoft: "#ECE3D6",
  burgundy: "#3D2438",
  burgundySoft: "#6B4A63",
  burgundyTint: "#E8DCE4",
  turquoise: "#6FA8B8",
  turquoiseSoft: "#C3DFE6",
  greige: "#C9BFAF",
};

const SYSTEMS = [
  { key: "branding", label: "Personal Branding" },
  { key: "contenu", label: "Contenu" },
  { key: "acquisition", label: "Acquisition" },
  { key: "nerveux", label: "Système nerveux" },
  { key: "vente", label: "Vente" },
];

const QUESTIONS = [
  {
    system: "branding",
    text: "As-tu une vision claire de ton positionnement — ce que tu incarnes et ce qui te différencie — que les gens reconnaissent immédiatement ?",
    options: [
      "Pas vraiment, je navigue à vue",
      "J'ai une idée mais je n'arrive pas à la formuler clairement",
      "C'est clair pour moi, mais pas toujours pour les autres",
      "Ultra clair, on me reconnaît en un coup d'œil",
    ],
  },
  {
    system: "branding",
    info: "Le Founder-Led Growth est une stratégie de croissance où la fondatrice devient elle-même le principal moteur de visibilité et de confiance de sa marque : l'audience la suit et lui fait confiance, elle, avant même de connaître le détail de son offre.",
    text: "Ta stratégie repose-t-elle sur le Founder-Led Growth — es-tu identifiée comme LE visage de ta marque, au point qu'on te suit toi avant de suivre ton offre ?",
    options: [
      "Non, mon image reste en retrait de ma marque",
      "Un peu, mais mon offre passe toujours avant moi",
      "Oui, les gens commencent à me suivre pour moi",
      "Totalement, je SUIS la marque",
    ],
  },
  {
    system: "branding",
    text: "Ta visibilité te permet-elle de créer des opportunités de collaborations ou de partenariats, plutôt que d'attendre qu'on vienne à toi ?",
    options: [
      "Je n'ai jamais d'opportunités qui arrivent",
      "Ça arrive rarement, un peu par hasard",
      "Ça commence à arriver régulièrement",
      "Je crée mes opportunités activement, en continu",
    ],
  },
  {
    system: "contenu",
    text: "As-tu une base de contenu (banque d'idées, scripts, visuels) dans laquelle piocher pour publier avec spontanéité, plutôt qu'un calendrier rigide qui dicte quoi publier et quand ?",
    options: [
      "Aucune banque, je pars de zéro à chaque fois",
      "Quelques notes éparpillées, pas vraiment exploitables",
      "Une base existe, mais je ne l'utilise pas assez",
      "Une vraie banque dans laquelle je pioche librement",
    ],
  },
  {
    system: "contenu",
    text: "Peux-tu créer et publier du contenu aligné avec ta vision sans devoir tout improviser dans l'urgence ?",
    options: [
      "Jamais, c'est toujours la panique de dernière minute",
      "Rarement, je m'y prends souvent trop tard",
      "Parfois, ça dépend des semaines",
      "Toujours, mon contenu est prêt avant que j'en aie besoin",
    ],
  },
  {
    system: "contenu",
    text: "Peux-tu t'absenter une semaine sans que ta présence en ligne s'arrête net ?",
    options: [
      "Impossible, tout s'arrête si je m'arrête",
      "Difficilement, il faudrait énormément préparer en amont",
      "Plutôt oui, avec un peu d'organisation",
      "Sans problème, mon contenu tourne sans moi",
    ],
  },
  {
    system: "acquisition",
    text: "As-tu un système clair pour transformer les personnes qui découvrent ton contenu en abonnés ou prospects ?",
    options: [
      "Non, les gens découvrent puis disparaissent",
      "J'ai une vague idée, mais rien de structuré",
      "Un système existe, mais il n'est pas optimisé",
      "Un système clair, qui convertit régulièrement",
    ],
  },
  {
    system: "acquisition",
    text: "Utilises-tu un outil qui capture automatiquement les leads intéressés (email, ManyChat, formulaire) ?",
    options: [
      "Non, tout se fait manuellement ou pas du tout",
      "J'ai l'outil mais je ne l'utilise pas vraiment",
      "Oui, sur certains canaux seulement",
      "Oui, c'est entièrement automatisé",
    ],
  },
  {
    system: "acquisition",
    text: "Sais-tu précisément d'où viennent tes nouveaux prospects, sans avoir à deviner ?",
    options: [
      "Aucune idée, c'est le flou total",
      "J'ai une intuition, sans vraie certitude",
      "Je sais approximativement",
      "Je sais exactement, canal par canal",
    ],
  },
  {
    system: "nerveux",
    text: "Quand ton business accélère (nouveaux clients, plus de demandes), comment réagit ton corps ?",
    options: [
      "Je passe en mode panique, je dors à peine",
      "Je tiens le coup, mais je suis épuisée dès que ça retombe",
      "La tension monte, mais je reste capable de la gérer",
      "Je reste calme et ancrée, la croissance ne me déstabilise pas",
    ],
  },
  {
    system: "nerveux",
    text: "As-tu des pratiques régulières pour réguler ton système nerveux (respiration, pause, ancrage) ?",
    options: [
      "Aucune, je n'y pense jamais",
      "J'y pense, mais je ne les mets presque jamais en pratique",
      "De temps en temps, sans vraie régularité",
      "Oui, c'est intégré à mon rythme, presque quotidien",
    ],
  },
  {
    system: "nerveux",
    text: "L'urgence (deadlines, imprévus) est-elle devenue ton mode de fonctionnement normal ?",
    options: [
      "Oui, je vis en permanence dans l'urgence",
      "Souvent, l'urgence prend le dessus",
      "Parfois, mais je retrouve un rythme stable après",
      "Non, mon rythme reste stable même sous pression",
    ],
  },
  {
    system: "vente",
    text: "As-tu un processus clair pour lancer et vendre une nouvelle offre, plutôt que de tout réinventer à chaque fois ?",
    options: [
      "Chaque lancement part de zéro, aucun processus",
      "Quelques éléments récurrents, sans vrai processus",
      "Un processus existe, mais je l'ajuste beaucoup à chaque fois",
      "Un processus clair, que je réutilise à chaque lancement",
    ],
  },
  {
    system: "vente",
    text: "As-tu un parcours de vente qui continue de convertir même quand tu n'es pas activement en train de vendre ?",
    options: [
      "Non, je dois vendre activement à chaque fois",
      "Un peu, mais ça dépend beaucoup de moi",
      "Oui, en grande partie automatisé",
      "Oui, il convertit même quand je suis absente",
    ],
  },
  {
    system: "vente",
    text: "As-tu des réponses prêtes pour les objections que tu entends le plus souvent ?",
    options: [
      "Non, je découvre l'objection sur le moment",
      "Quelques réponses en tête, pas structurées",
      "Des réponses assez claires, la plupart du temps",
      "Des réponses prêtes, quasi scriptées",
    ],
  },
  {
    system: "vente",
    text: "Ton offre et ton prix sont-ils clairs dans ta tête, sans hésitation quand on te les demande ?",
    options: [
      "Je bafouille encore quand on me demande mon prix",
      "C'est encore flou, je change souvent d'avis",
      "C'est assez clair, avec quelques doutes",
      "Ultra clair, je l'annonce sans hésiter",
    ],
  },
  {
    system: "vente",
    info: "Un écosystème d'offre, c'est une suite d'offres qui se répondent — du contenu gratuit jusqu'à l'offre la plus premium — pour faire grandir la confiance de ta communauté étape par étape, plutôt que de demander un grand saut d'achat d'un coup.",
    text: "As-tu un écosystème d'offres qui accompagne tes client·es dans un parcours de confiance clair, du gratuit au premium, plutôt qu'une offre isolée ?",
    options: [
      "Je n'ai qu'une seule offre, sans suite logique",
      "J'ai plusieurs offres, mais elles ne se répondent pas entre elles",
      "Il y a un début de parcours, mais il reste des trous",
      "Un vrai parcours, du gratuit jusqu'à mon offre la plus haut de gamme",
    ],
  },
];

// 👉 Remplace ces 3 liens par tes vraies pages avant la mise en ligne.
// Tu peux garder les paramètres ?ref=... : ça te permet de repérer dans
// tes stats (et dans Kit/ManyChat si tu les relies) que le lead vient du
// diagnostic, sans toucher au reste du code.
const OFFER_URLS = {
  systema: "https://leasola.thrivecart.com/systema/?ref=diagnostic",
  alma: "https://leasola.thrivecart.com/alma/?ref=diagnostic",
  siesta: "https://leasola.thrivecart.com/lasiestaclub-fr/?ref=diagnostic",
  lia: "https://tally.so/r/kdQW1o?ref=diagnostic",
};

const RECOMMENDATIONS = {
  systema: {
    name: "Systema",
    tag: "L'atelier gratuit · 45 min",
    whoFor:
      "Pour les créatrices et coachs qui n'ont pas encore de base solide en personal branding, en contenu ou en acquisition — et qui perdent du temps à improviser au lieu de construire.",
    result:
      "Tu repars avec les fondations de ton système de contenu + acquisition, pour publier et attirer sans tout réinventer chaque semaine.",
    nextStep: "Réserve ta place à l'atelier gratuit.",
    ctaLabel: "Réserver ma place à l'atelier",
    url: OFFER_URLS.systema,
  },
  alma: {
    name: "L'Alma",
    tag: "Le cahier de vision · DIY",
    whoFor:
      "Pour celles dont le positionnement et la vision manquent encore de clarté — tu sais que tu as quelque chose à dire, mais tu n'arrives pas encore à le formuler simplement.",
    result:
      "Tu repars avec une vision claire de qui tu es et de ce que tu incarnes, à ton rythme, en autonomie.",
    nextStep: "Découvre le cahier de vision L'Alma.",
    ctaLabel: "Découvrir L'Alma",
    url: OFFER_URLS.alma,
  },
  siesta: {
    name: "La Siesta Club",
    tag: "Le programme de 90 jours",
    whoFor:
      "Pour celles qui ont déjà des bases en personal branding, contenu et acquisition, mais dont la vente et le système nerveux restent imprévisibles ou épuisants.",
    result:
      "Tu sors avec tes systèmes posés et connectés entre eux — contenu, acquisition, vente, système nerveux — en 90 jours, accompagnée.",
    nextStep: "Découvre le programme et réserve un appel de clarté.",
    ctaLabel: "Découvrir La Siesta Club",
    url: OFFER_URLS.siesta,
  },
  lia: {
    name: "LIA",
    tag: "Sur invitation",
    whoFor:
      "Pour celles dont les systèmes tournent déjà bien et qui veulent déléguer entièrement l'exécution — automatisation IA, systèmes construits et pilotés pour elles.",
    result:
      "Tu récupères ton temps : tes systèmes sont construits, automatisés et pilotés pour toi, à grande échelle.",
    nextStep: "Postule pour un accompagnement sur-mesure.",
    ctaLabel: "Postuler pour LIA",
    url: OFFER_URLS.lia,
  },
};

function getRecommendationKey(overall, weakestKey) {
  if (overall >= 75) return "lia";
  if (weakestKey === "branding") return "alma";
  if (["contenu", "acquisition"].includes(weakestKey)) return "systema";
  return "siesta";
}

export default function Diagnostic() {
  const [step, setStep] = useState("intro"); // intro | 0..14 | capture | result
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const qIndex = typeof step === "number" ? step : null;
  const lastIndex = QUESTIONS.length - 1;

  function selectAnswer(value) {
    const next = [...answers];
    next[qIndex] = value;
    setAnswers(next);
    setStep(qIndex < lastIndex ? qIndex + 1 : "capture");
  }

  function scoreFor(systemKey) {
    const idxs = QUESTIONS.map((q, i) => (q.system === systemKey ? i : -1)).filter((i) => i >= 0);
    const sum = idxs.reduce((acc, i) => acc + (answers[i] ?? 0), 0);
    return Math.round((sum / (idxs.length * 3)) * 100);
  }

  const scores = SYSTEMS.map((s) => ({ ...s, score: scoreFor(s.key) }));
  const overall = Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length);
  const weakest = scores.reduce((min, s) => (s.score < min.score ? s : min), scores[0]);
  const strongest = scores.reduce((max, s) => (s.score > max.score ? s : max), scores[0]);
  const recommendationKey = getRecommendationKey(overall, weakest.key);
  const recommendation = RECOMMENDATIONS[recommendationKey];

  async function handleCaptureSubmit(e) {
    e.preventDefault();
    setStep("result");
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch("https://diagnostic-backend-mh76.vercel.app/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang: "fr",
          firstName,
          email,
          offer: recommendationKey,
          scores: {
            branding: scores.find((s) => s.key === "branding").score,
            contenu: scores.find((s) => s.key === "contenu").score,
            acquisition: scores.find((s) => s.key === "acquisition").score,
            nerveux: scores.find((s) => s.key === "nerveux").score,
            vente: scores.find((s) => s.key === "vente").score,
          },
          overall,
          weakest,
          strongest,
        }),
      });
      const data = await response.json();
      const text = (data.diagnosis || "").trim();
      setDiagnosis(text);
      if (!text) setErrorMsg("Le diagnostic n'a pas pu être généré. Réessaie dans un instant.");
    } catch (err) {
      setErrorMsg("Le diagnostic n'a pas pu être généré. Réessaie dans un instant.");
    } finally {
      setLoading(false);
    }
  }

  const radarData = scores.map((s) => ({ system: s.label, score: s.score }));

  return (
    <div
      style={{
        fontFamily: "'Epilogue', sans-serif",
        background: COLORS.cream,
        minHeight: "100%",
        color: COLORS.burgundy,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <style>{FONTS}</style>
      <div style={{ width: "100%", maxWidth: 560, padding: "40px 24px 64px" }}>
        {/* Progress */}
        {qIndex !== null && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 4,
                    flex: 1,
                    borderRadius: 2,
                    background: i <= qIndex ? COLORS.burgundy : COLORS.greige,
                    opacity: i <= qIndex ? 1 : 0.5,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: COLORS.burgundySoft,
                fontWeight: 600,
              }}
            >
              Système {SYSTEMS.findIndex((s) => s.key === QUESTIONS[qIndex].system) + 1}/5 ·{" "}
              {SYSTEMS.find((s) => s.key === QUESTIONS[qIndex].system).label}
            </div>
          </div>
        )}

        {/* INTRO */}
        {step === "intro" && (
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: COLORS.turquoise,
                fontWeight: 700,
                marginBottom: 18,
              }}
            >
              Diagnostic gratuit · 3 minutes
            </div>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: 40,
                lineHeight: 1.15,
                margin: "0 0 20px",
              }}
            >
              Le diagnostic des{" "}
              <span style={{ fontStyle: "italic", color: COLORS.burgundySoft }}>5 systèmes</span>
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: COLORS.burgundySoft, marginBottom: 32 }}>
              Personal branding, contenu, acquisition, vente, système nerveux. Réponds à 17 questions pour
              savoir lequel de tes systèmes freine aujourd'hui ta liberté — et quelle est ta prochaine
              étape pour que ton business tourne, même quand tu n'es pas derrière.
            </p>
            <button
              onClick={() => setStep(0)}
              style={{
                background: COLORS.burgundy,
                color: COLORS.cream,
                border: "none",
                borderRadius: 999,
                padding: "16px 28px",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "'Epilogue', sans-serif",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Commencer le diagnostic <ArrowRight size={17} />
            </button>
          </div>
        )}

        {/* QUESTIONS */}
        {qIndex !== null && (
          <div>
            {QUESTIONS[qIndex].info && (
              <div
                style={{
                  borderLeft: `3px solid ${COLORS.turquoise}`,
                  background: COLORS.creamSoft,
                  borderRadius: "0 12px 12px 0",
                  padding: "12px 16px",
                  marginBottom: 18,
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: COLORS.burgundySoft,
                }}
              >
                {QUESTIONS[qIndex].info}
              </div>
            )}
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: 25,
                lineHeight: 1.3,
                margin: "0 0 28px",
              }}
            >
              {QUESTIONS[qIndex].text}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {QUESTIONS[qIndex].options.map((label, value) => (
                <button
                  key={value}
                  onClick={() => selectAnswer(value)}
                  style={{
                    textAlign: "left",
                    padding: "16px 18px",
                    borderRadius: 14,
                    border: `1.5px solid ${COLORS.greige}`,
                    background: "#fff",
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: 14.5,
                    fontWeight: 500,
                    color: COLORS.burgundy,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = COLORS.turquoise)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.greige)}
                >
                  <span>{label}</span>
                  <ArrowRight size={16} color={COLORS.greige} style={{ flexShrink: 0 }} />
                </button>
              ))}
            </div>
            {qIndex > 0 && (
              <button
                onClick={() => setStep(qIndex - 1)}
                style={{
                  marginTop: 20,
                  background: "none",
                  border: "none",
                  color: COLORS.burgundySoft,
                  fontSize: 13,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                ← Question précédente
              </button>
            )}
          </div>
        )}

        {/* CAPTURE */}
        {step === "capture" && (
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: COLORS.turquoise,
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              Ton diagnostic est prêt
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: 30,
                lineHeight: 1.25,
                margin: "0 0 16px",
              }}
            >
              Où veux-tu qu'on t'envoie tes résultats ?
            </h2>
            <p style={{ fontSize: 15, color: COLORS.burgundySoft, marginBottom: 28, lineHeight: 1.6 }}>
              Ton score par système + un diagnostic personnalisé et ta prochaine étape.
            </p>
            <form onSubmit={handleCaptureSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                required
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1.5px solid ${COLORS.greige}`,
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: 15,
                  background: "#fff",
                }}
              />
              <input
                required
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1.5px solid ${COLORS.greige}`,
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: 15,
                  background: "#fff",
                }}
              />
              <button
                type="submit"
                style={{
                  marginTop: 8,
                  background: "#A8342A",
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "16px 28px",
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "'Epilogue', sans-serif",
                  cursor: "pointer",
                }}
              >
                Voir mon diagnostic
              </button>
            </form>
            <p style={{ fontSize: 12, color: COLORS.greige, marginTop: 14 }}>
              Prototype — ce formulaire ne stocke rien pour l'instant. À brancher sur ManyChat / Kit avant mise en ligne.
            </p>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && (
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: COLORS.turquoise,
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              Score global · {overall}/100
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: 30,
                margin: "0 0 24px",
              }}
            >
              {firstName ? `${firstName}, voici où tu en es` : "Voici où tu en es"}
            </h2>

            <div style={{ background: "#fff", borderRadius: 20, padding: "12px 8px 4px", marginBottom: 24 }}>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData} outerRadius="68%">
                  <PolarGrid stroke={COLORS.greige} />
                  <PolarAngleAxis
                    dataKey="system"
                    tick={{ fill: COLORS.burgundy, fontSize: 12.5, fontFamily: "Epilogue" }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    dataKey="score"
                    stroke={COLORS.turquoise}
                    fill={COLORS.turquoise}
                    fillOpacity={0.35}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              {scores.map((s) => (
                <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 110, fontSize: 12.5, fontWeight: 600, color: COLORS.burgundySoft }}>
                    {s.label}
                  </div>
                  <div style={{ flex: 1, height: 8, background: COLORS.creamSoft, borderRadius: 4, overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${s.score}%`,
                        height: "100%",
                        background: s.key === weakest.key ? COLORS.turquoise : COLORS.burgundyTint,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                  <div style={{ width: 30, fontSize: 13, fontWeight: 600, textAlign: "right" }}>{s.score}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: COLORS.burgundy,
                color: COLORS.cream,
                borderRadius: 20,
                padding: 26,
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Sparkles size={16} color={COLORS.turquoise} />
                <span style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, color: COLORS.turquoise }}>
                  Ton diagnostic personnalisé
                </span>
              </div>
              {loading && (
                <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.cream, opacity: 0.8 }}>
                  Analyse de tes réponses en cours…
                </p>
              )}
              {!loading && errorMsg && (
                <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.cream, opacity: 0.8 }}>{errorMsg}</p>
              )}
              {!loading && !errorMsg && diagnosis && (
                <p style={{ fontSize: 15, lineHeight: 1.75, whiteSpace: "pre-wrap" }}>{diagnosis}</p>
              )}
            </div>

            {!loading && (
              <div
                style={{
                  background: COLORS.turquoise,
                  color: COLORS.burgundy,
                  borderRadius: 20,
                  padding: 26,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Compass size={16} color={COLORS.burgundy} />
                  <span style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>
                    Ta prochaine étape
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 24, margin: "8px 0 16px" }}>
                  {recommendation.name} <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.75 }}>— {recommendation.tag}</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14.5, lineHeight: 1.6 }}>
                  <div>
                    <strong>Pour qui :</strong> {recommendation.whoFor}
                  </div>
                  <div>
                    <strong>Le résultat :</strong> {recommendation.result}
                  </div>
                  <div>
                    <strong>Ta prochaine étape :</strong> {recommendation.nextStep}
                  </div>
                </div>
                <a
                  href={`${recommendation.url}${recommendation.url.includes("?") ? "&" : "?"}prenom=${encodeURIComponent(firstName)}&email=${encodeURIComponent(email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: 20,
                    background: COLORS.burgundy,
                    color: COLORS.cream,
                    border: "none",
                    borderRadius: 999,
                    padding: "14px 24px",
                    fontSize: 14.5,
                    fontWeight: 600,
                    fontFamily: "'Epilogue', sans-serif",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    textDecoration: "none",
                  }}
                >
                  {recommendation.ctaLabel} <ArrowRight size={16} />
                </a>
              </div>
            )}

            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: COLORS.burgundySoft }}>
              <Check size={15} color={COLORS.turquoise} />
              Résultats envoyés (simulation) à {email || "ton email"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
