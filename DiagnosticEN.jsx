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
  { key: "content", label: "Content" },
  { key: "acquisition", label: "Acquisition" },
  { key: "nervous", label: "Nervous System" },
  { key: "sales", label: "Sales" },
];

const QUESTIONS = [
  {
    system: "branding",
    text: "Do you have a clear vision of your positioning — what you stand for and what sets you apart — that people recognize instantly?",
    options: [
      "Not really, I'm figuring it out as I go",
      "I have an idea but can't quite put it into words",
      "It's clear to me, but not always to others",
      "Crystal clear, people recognize me at a glance",
    ],
  },
  {
    system: "branding",
    info: "Founder-Led Growth is a growth strategy where the founder herself becomes the main driver of her brand's visibility and trust: the audience follows and trusts her before they even know the details of her offer.",
    text: "Does your strategy rely on Founder-Led Growth — are you clearly identified as the face of your brand, to the point people follow you before they follow your offer?",
    options: [
      "No, my image stays in the background of my brand",
      "A little, but my offer always comes before me",
      "Yes, people are starting to follow me for me",
      "Completely, I AM the brand",
    ],
  },
  {
    system: "branding",
    text: "Does your visibility let you create collaboration or partnership opportunities, rather than waiting for people to come to you?",
    options: [
      "Opportunities never come my way",
      "It happens rarely, mostly by chance",
      "It's starting to happen regularly",
      "I actively create my own opportunities, continuously",
    ],
  },
  {
    system: "content",
    text: "Do you have a content bank (a library of ideas, scripts, visuals) you can draw from to post spontaneously, rather than a rigid calendar dictating what to post and when?",
    options: [
      "No bank at all, I start from zero every time",
      "A few scattered notes, not really usable",
      "A bank exists, but I don't use it enough",
      "A real bank I draw from freely",
    ],
  },
  {
    system: "content",
    text: "Can you create and publish content aligned with your vision without having to improvise everything at the last minute?",
    options: [
      "Never, it's always last-minute panic",
      "Rarely, I usually leave it too late",
      "Sometimes, it depends on the week",
      "Always, my content is ready before I need it",
    ],
  },
  {
    system: "content",
    text: "Can you take a week off without your online presence coming to a dead stop?",
    options: [
      "Impossible, everything stops if I stop",
      "Barely, I'd need to prep a huge amount in advance",
      "Mostly yes, with a bit of organizing",
      "No problem, my content runs without me",
    ],
  },
  {
    system: "acquisition",
    text: "Do you have a clear system for turning people who discover your content into followers or leads?",
    options: [
      "No, people discover me and then disappear",
      "I have a vague idea, but nothing structured",
      "A system exists, but it's not optimized",
      "A clear system that converts consistently",
    ],
  },
  {
    system: "acquisition",
    text: "Do you use a tool that automatically captures interested leads (email, ManyChat, a form)?",
    options: [
      "No, everything is manual or nonexistent",
      "I have the tool but I don't really use it",
      "Yes, on some channels only",
      "Yes, it's fully automated",
    ],
  },
  {
    system: "acquisition",
    text: "Do you know exactly where your new leads come from, without having to guess?",
    options: [
      "No idea, it's a total blur",
      "I have a hunch, without real certainty",
      "I know roughly",
      "I know exactly, channel by channel",
    ],
  },
  {
    system: "nervous",
    text: "When your business speeds up (new clients, more demand), how does your body react?",
    options: [
      "I go into panic mode, I barely sleep",
      "I hold on, but I'm drained the moment things settle",
      "The tension rises, but I can still manage it",
      "I stay calm and grounded, growth doesn't destabilize me",
    ],
  },
  {
    system: "nervous",
    text: "Do you have regular practices to regulate your nervous system (breathwork, pausing, grounding)?",
    options: [
      "None, I never even think about it",
      "I think about it, but rarely put it into practice",
      "Every now and then, without real consistency",
      "Yes, it's part of my rhythm, almost daily",
    ],
  },
  {
    system: "nervous",
    text: "Has urgency (deadlines, unexpected fires) become your normal way of operating?",
    options: [
      "Yes, I live in constant urgency",
      "Often, urgency takes over",
      "Sometimes, but I find a stable rhythm again afterward",
      "No, my rhythm stays stable even under pressure",
    ],
  },
  {
    system: "sales",
    text: "Do you have a clear process to launch and sell a new offer, rather than reinventing everything each time?",
    options: [
      "Every launch starts from scratch, no process",
      "A few recurring pieces, but no real process",
      "A process exists, but I heavily adjust it every time",
      "A clear process I reuse for every launch",
    ],
  },
  {
    system: "sales",
    text: "Do you have a sales journey that keeps converting even when you're not actively selling?",
    options: [
      "No, I have to sell actively every single time",
      "A little, but it depends a lot on me",
      "Yes, largely automated",
      "Yes, it converts even when I'm away",
    ],
  },
  {
    system: "sales",
    text: "Do you have ready answers for the objections you hear most often?",
    options: [
      "No, I discover the objection in the moment",
      "A few answers in mind, not really structured",
      "Fairly clear answers, most of the time",
      "Ready answers, almost scripted",
    ],
  },
  {
    system: "sales",
    text: "Are your offer and your price clear in your head, with no hesitation when someone asks?",
    options: [
      "I still stumble when asked about my price",
      "It's still fuzzy, I change my mind often",
      "Fairly clear, with a few doubts",
      "Crystal clear, I state it without hesitating",
    ],
  },
  {
    system: "sales",
    info: "An offer ecosystem is a set of offers that build on each other — from free content to your most premium offer — growing your community's trust step by step, rather than asking for one big leap of purchase.",
    text: "Do you have an offer ecosystem that guides your clients through a clear trust journey, from free to premium, rather than a single standalone offer?",
    options: [
      "I only have one offer, with no logical follow-up",
      "I have several offers, but they don't connect to each other",
      "There's the start of a journey, but there are still gaps",
      "A real journey, from free all the way to my top-tier offer",
    ],
  },
];

// 👉 Replace these 3 links with your real pages before going live.
// You can keep the ?ref=... parameters: they let you spot in your
// stats (and in Kit/ManyChat if you connect them) that the lead came
// from the diagnostic, without touching the rest of the code.
const OFFER_URLS = {
  systema: "https://leasola.thrivecart.com/systema/?ref=diagnostic",
  alma: "https://leasola.thrivecart.com/alma/?ref=diagnostic",
  siesta: "https://leasola.thrivecart.com/la-siesta-club-en/?ref=diagnostic",
  lia: "https://tally.so/r/VLBONM?ref=diagnostic",
};

const RECOMMENDATIONS = {
  systema: {
    name: "Systema",
    tag: "Free workshop · 45 min",
    whoFor:
      "For creators and coaches who don't yet have a solid foundation in personal branding, content, or acquisition — and are losing time improvising instead of building.",
    result:
      "You'll leave with the foundations of your content + acquisition system, so you can post and attract without reinventing everything every week.",
    nextStep: "Reserve your spot at the free workshop.",
    ctaLabel: "Reserve my spot",
    url: OFFER_URLS.systema,
  },
  alma: {
    name: "L'Alma",
    tag: "The vision workbook · DIY",
    whoFor:
      "For those whose positioning and vision still feel unclear — you know you have something to say, but can't yet put it simply into words.",
    result:
      "You'll come out with a clear vision of who you are and what you stand for, at your own pace, self-guided.",
    nextStep: "Explore the L'Alma vision workbook.",
    ctaLabel: "Discover L'Alma",
    url: OFFER_URLS.alma,
  },
  siesta: {
    name: "La Siesta Club",
    tag: "The 90-day program",
    whoFor:
      "For those who already have solid personal branding, content, and acquisition, but whose sales journey and nervous system regulation stay unpredictable or exhausting.",
    result:
      "You'll come out with your systems in place and connected — content, acquisition, sales, nervous system — in 90 days, with support.",
    nextStep: "Explore the program and book a clarity call.",
    ctaLabel: "Discover La Siesta Club",
    url: OFFER_URLS.siesta,
  },
  lia: {
    name: "LIA",
    tag: "By invitation",
    whoFor:
      "For those whose systems already run well and who want to fully hand off execution — AI automation, systems built and run for them.",
    result:
      "You get your time back: your systems are built, automated, and run for you, at scale.",
    nextStep: "Apply for tailored support.",
    ctaLabel: "Apply for LIA",
    url: OFFER_URLS.lia,
  },
};

function getRecommendationKey(overall, weakestKey) {
  if (overall >= 75) return "lia";
  if (weakestKey === "branding") return "alma";
  if (["content", "acquisition"].includes(weakestKey)) return "systema";
  return "siesta";
}

export default function Diagnostic() {
  const [step, setStep] = useState("intro"); // intro | 0..15 | capture | result
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
          lang: "en",
          firstName,
          email,
          offer: recommendationKey,
          scores: {
            branding: scores.find((s) => s.key === "branding").score,
            content: scores.find((s) => s.key === "content").score,
            acquisition: scores.find((s) => s.key === "acquisition").score,
            nervous: scores.find((s) => s.key === "nervous").score,
            sales: scores.find((s) => s.key === "sales").score,
          },
          overall,
          weakest,
          strongest,
        }),
      });
      const data = await response.json();
      const text = (data.diagnosis || "").trim();
      setDiagnosis(text);
      if (!text) setErrorMsg("The diagnosis couldn't be generated. Please try again in a moment.");
    } catch (err) {
      setErrorMsg("The diagnosis couldn't be generated. Please try again in a moment.");
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
              System {SYSTEMS.findIndex((s) => s.key === QUESTIONS[qIndex].system) + 1}/5 ·{" "}
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
              Free diagnostic · 3 minutes
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
              The{" "}
              <span style={{ fontStyle: "italic", color: COLORS.burgundySoft }}>5 systems</span>{" "}
              diagnostic
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: COLORS.burgundySoft, marginBottom: 32 }}>
              Personal branding, content, acquisition, sales, nervous system. Answer 17 questions to find
              out which of your systems is holding back your freedom today — and what your next
              step is to get your business running, even when you're not behind it.
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
              Start the diagnostic <ArrowRight size={17} />
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
                ← Previous question
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
              Your diagnostic is ready
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
              Where should we send your results?
            </h2>
            <p style={{ fontSize: 15, color: COLORS.burgundySoft, marginBottom: 28, lineHeight: 1.6 }}>
              Your score for each system + a personalized diagnosis and your next step.
            </p>
            <form onSubmit={handleCaptureSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                required
                placeholder="First name"
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
                placeholder="Email address"
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
                See my diagnostic
              </button>
            </form>
            <p style={{ fontSize: 12, color: COLORS.greige, marginTop: 14 }}>
              Prototype — this form doesn't store anything yet. Connect it to ManyChat / Kit before going live.
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
              Overall score · {overall}/100
            </div>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: 30,
                margin: "0 0 24px",
              }}
            >
              {firstName ? `${firstName}, here's where you stand` : "Here's where you stand"}
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
                  Your personalized diagnosis
                </span>
              </div>
              {loading && (
                <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.cream, opacity: 0.8 }}>
                  Analyzing your answers…
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
                    Your next step
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 500, fontSize: 24, margin: "8px 0 16px" }}>
                  {recommendation.name} <span style={{ fontSize: 14, fontWeight: 500, opacity: 0.75 }}>— {recommendation.tag}</span>
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14.5, lineHeight: 1.6 }}>
                  <div>
                    <strong>Who it's for:</strong> {recommendation.whoFor}
                  </div>
                  <div>
                    <strong>The result:</strong> {recommendation.result}
                  </div>
                  <div>
                    <strong>Your next step:</strong> {recommendation.nextStep}
                  </div>
                </div>
                <a
                  href={`${recommendation.url}${recommendation.url.includes("?") ? "&" : "?"}firstname=${encodeURIComponent(firstName)}&email=${encodeURIComponent(email)}`}
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
              Results sent (simulation) to {email || "your email"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
