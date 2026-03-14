import { useState, useEffect, useCallback } from "react";

const JARGON_TOKEN_MAP = {
  rehypothecation: { tokens: ["re", "hyp", "oth", "ec", "ation"], plain: "re-pledging collateral" },
  collateralization: { tokens: ["col", "lat", "eral", "iz", "ation"], plain: "securing with assets" },
  securitization: { tokens: ["secur", "iti", "z", "ation"], plain: "asset bundling" },
  deleveraging: { tokens: ["de", "lever", "aging"], plain: "reducing debt exposure" },
  tranching: { tokens: ["tran", "ching"], plain: "slicing risk layers" },
  novation: { tokens: ["nov", "ation"], plain: "contract substitution" },
  contango: { tokens: ["cont", "ango"], plain: "futures premium" },
  backwardation: { tokens: ["back", "ward", "ation"], plain: "futures discount" },
  hypothecation: { tokens: ["hyp", "oth", "ec", "ation"], plain: "pledging collateral" },
  haircut: { tokens: ["hair", "cut"], plain: "value reduction" },
};

const SAMPLE_SENTENCES = [
  "The bank used rehypothecation to fund collateralization of new positions.",
  "Deleveraging triggered backwardation across securitization tranches.",
  "Novation replaced hypothecation in the updated haircut agreement.",
  "Contango markets complicated the securitization of commodity futures.",
];

const RAG_DOCS = [
  { id: 1, title: "Basel III Collateral Rules", snippet: "Rehypothecation limits under Basel III restrict the reuse of client collateral..." },
  { id: 2, title: "Repo Market Mechanics", snippet: "Haircut calculations in repo markets depend on collateral quality and duration..." },
  { id: 3, title: "CDO Tranching Guide", snippet: "Securitization tranching distributes credit risk across senior and junior notes..." },
  { id: 4, title: "Futures Curve Dynamics", snippet: "Contango and backwardation reflect market expectations about future spot prices..." },
  { id: 5, title: "Derivatives Novation SOP", snippet: "Novation transfers obligations between counterparties, replacing the original contract..." },
  { id: 6, title: "Leverage Ratio Framework", snippet: "Deleveraging cycles often correlate with credit contraction and liquidity stress..." },
  { id: 7, title: "Margin & Collateral Ops", snippet: "Hypothecation agreements define the lender's right over pledged securities..." },
  { id: 8, title: "Risk Weight Assets Guide", snippet: "Collateralization reduces RWA but introduces rehypothecation and liquidity risk..." },
];

const tokenColors = [
  "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#10b981", "#f97316", "#ec4899", "#6366f1"
];

function tokenizeWord(word) {
  const lower = word.toLowerCase().replace(/[^a-z]/g, "");
  if (JARGON_TOKEN_MAP[lower]) return { tokens: JARGON_TOKEN_MAP[lower].tokens, isJargon: true };
  if (word.length <= 4) return { tokens: [word], isJargon: false };
  const mid = Math.ceil(word.length / 2);
  return { tokens: [word.slice(0, mid), word.slice(mid)], isJargon: false };
}

function TokenChip({ token, color, delay = 0, isJargon }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 7px",
        margin: "2px",
        borderRadius: "3px",
        fontSize: "12px",
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
        background: isJargon ? `${color}22` : "#1e293b",
        border: `1px solid ${isJargon ? color : "#334155"}`,
        color: isJargon ? color : "#94a3b8",
        animation: `fadeSlideIn 0.3s ease ${delay}s both`,
        letterSpacing: "0.5px",
      }}
    >
      {token}
    </span>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div style={{ marginBottom: "48px" }}>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{ width: "3px", height: "22px", background: "#f59e0b", borderRadius: "2px" }} />
          <h2 style={{ margin: 0, fontSize: "16px", fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#f1f5f9", letterSpacing: "0.3px" }}>
            {title}
          </h2>
        </div>
        {subtitle && <p style={{ margin: "0 0 0 13px", fontSize: "12px", color: "#64748b", fontFamily: "'JetBrains Mono', monospace" }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [inputSentence, setInputSentence] = useState(SAMPLE_SENTENCES[0]);
  const [tokenized, setTokenized] = useState([]);
  const [ragRuns, setRagRuns] = useState([]);
  const [isRunningRAG, setIsRunningRAG] = useState(false);
  const [ragQuery, setRagQuery] = useState("What is the risk of rehypothecation in collateralization?");
  const [heatmapWord, setHeatmapWord] = useState("rehypothecation");
  const [animKey, setAnimKey] = useState(0);

  const tabs = ["Token Breakdown", "Jargon vs Plain", "RAG Inconsistency", "Similarity Heatmap"];

  useEffect(() => {
    const words = inputSentence.split(/\s+/).filter(Boolean);
    const result = words.map((word) => {
      const clean = word.toLowerCase().replace(/[^a-z]/g, "");
      const { tokens, isJargon } = tokenizeWord(word);
      return { word, tokens, isJargon, clean };
    });
    setTokenized(result);
    setAnimKey(k => k + 1);
  }, [inputSentence]);

  const runRAG = useCallback(async () => {
    setIsRunningRAG(true);
    const newRuns = [];
    for (let i = 0; i < 3; i++) {
      await new Promise(r => setTimeout(r, 600 + i * 300));
      const shuffled = [...RAG_DOCS].sort(() => Math.random() - 0.5);
      const topK = shuffled.slice(0, 3).map(d => d.id);
      newRuns.push({ run: i + 1, docs: RAG_DOCS.filter(d => topK.includes(d.id)) });
    }
    setRagRuns(newRuns);
    setIsRunningRAG(false);
  }, []);

  const heatmapData = (() => {
    const entry = JARGON_TOKEN_MAP[heatmapWord.toLowerCase()];
    if (!entry) return null;
    const tokens = entry.tokens;
    const scores = tokens.map((t1, i) =>
      tokens.map((t2, j) => {
        if (i === j) return 1.0;
        const sim = Math.max(0.05, 0.85 - Math.abs(i - j) * 0.18 + Math.random() * 0.12);
        return +sim.toFixed(2);
      })
    );
    return { tokens, scores };
  })();

  const getHeatColor = (v) => {
    const r = Math.round(239 + (16 - 239) * v);
    const g = Math.round(68 + (185 - 68) * v);
    const b = Math.round(68 + (129 - 68) * v);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0f172a; } ::-webkit-scrollbar-thumb { background: #334155; }
        textarea:focus, input:focus { outline: none; }
      `}</style>
      <div style={{
        minHeight: "100vh",
        background: "#080f1a",
        color: "#e2e8f0",
        fontFamily: "'JetBrains Mono', monospace",
        padding: "0",
      }}>
        {/* Header */}
        <div style={{
          borderBottom: "1px solid #1e293b",
          padding: "24px 32px 20px",
          background: "linear-gradient(180deg, #0d1929 0%, #080f1a 100%)",
        }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 8px #f59e0b" }} />
              <span style={{ fontSize: "10px", color: "#f59e0b", letterSpacing: "2px", fontWeight: 600 }}>FINTECH NLP RESEARCH</span>
            </div>
            <h1 style={{
              margin: "0 0 6px",
              fontSize: "26px",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.5px",
            }}>
              The Jargon Tokenization Problem
            </h1>
            <p style={{ margin: 0, fontSize: "12px", color: "#475569", lineHeight: 1.6 }}>
              How domain-specific finance terms fragment into weak tokens — and why your RAG pipeline suffers for it.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: "1px solid #1e293b", padding: "0 32px", background: "#0a1220" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", gap: "0" }}>
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: "14px 18px",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === i ? "2px solid #f59e0b" : "2px solid transparent",
                  color: activeTab === i ? "#f59e0b" : "#475569",
                  fontSize: "11px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {String(i + 1).padStart(2, "0")} {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "36px 32px" }}>

          {/* TAB 0: Token Breakdown */}
          {activeTab === 0 && (
            <Section title="Token Breakdown" subtitle="// jargon words fragment into semantically weak sub-tokens">
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "10px", color: "#475569", marginBottom: "8px", letterSpacing: "1px" }}>INPUT SENTENCE</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
                  {SAMPLE_SENTENCES.map((s, i) => (
                    <button key={i} onClick={() => setInputSentence(s)} style={{
                      padding: "4px 10px", background: inputSentence === s ? "#1e3a5f" : "transparent",
                      border: `1px solid ${inputSentence === s ? "#3b82f6" : "#1e293b"}`,
                      borderRadius: "3px", color: inputSentence === s ? "#93c5fd" : "#475569",
                      fontSize: "10px", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      Sample {i + 1}
                    </button>
                  ))}
                </div>
                <textarea
                  value={inputSentence}
                  onChange={e => setInputSentence(e.target.value)}
                  style={{
                    width: "100%", padding: "12px 14px", background: "#0d1929",
                    border: "1px solid #1e293b", borderRadius: "6px",
                    color: "#e2e8f0", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace",
                    resize: "vertical", minHeight: "64px", lineHeight: 1.6,
                  }}
                />
              </div>
              <div style={{ background: "#0d1929", border: "1px solid #1e293b", borderRadius: "8px", padding: "20px" }}>
                <div style={{ fontSize: "10px", color: "#475569", marginBottom: "14px", letterSpacing: "1px" }}>TOKENIZED OUTPUT</div>
                <div key={animKey} style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-start" }}>
                  {tokenized.map(({ word, tokens, isJargon }, wi) => (
                    <div key={wi} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <span style={{
                        fontSize: "12px",
                        color: isJargon ? "#f59e0b" : "#475569",
                        fontWeight: isJargon ? 700 : 400,
                        borderBottom: isJargon ? "1px dashed #f59e0b55" : "none",
                        paddingBottom: "2px",
                      }}>{word}</span>
                      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        {tokens.map((tok, ti) => (
                          <TokenChip
                            key={ti} token={tok}
                            color={tokenColors[wi % tokenColors.length]}
                            delay={wi * 0.05 + ti * 0.03}
                            isJargon={isJargon}
                          />
                        ))}
                      </div>
                      {isJargon && (
                        <span style={{ fontSize: "9px", color: "#ef444466", letterSpacing: "0.5px" }}>
                          ⚠ JARGON
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: "14px", padding: "12px 16px", background: "#0d1929", border: "1px solid #1e3a5f", borderRadius: "6px", borderLeft: "3px solid #3b82f6" }}>
                <p style={{ margin: 0, fontSize: "11px", color: "#64748b", lineHeight: 1.7 }}>
                  <span style={{ color: "#93c5fd" }}>Key insight:</span> Jargon like <em style={{ color: "#f59e0b" }}>rehypothecation</em> splits into tokens like <code style={{ color: "#a78bfa" }}>["re","hyp","oth","ec","ation"]</code> — none of which carry the full financial meaning. Common words like <em>"bank"</em> or <em>"risk"</em> remain intact, giving them stronger semantic anchoring.
                </p>
              </div>
            </Section>
          )}

          {/* TAB 1: Jargon vs Plain */}
          {activeTab === 1 && (
            <Section title="Jargon vs Plain English" subtitle="// same concept, different tokenization depth">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {Object.entries(JARGON_TOKEN_MAP).map(([word, { tokens, plain }], i) => (
                  <div key={i} style={{ background: "#0d1929", border: "1px solid #1e293b", borderRadius: "8px", overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #1e293b" }}>
                      <div style={{ padding: "8px 12px", borderRight: "1px solid #1e293b" }}>
                        <div style={{ fontSize: "9px", color: "#ef4444", letterSpacing: "1px", marginBottom: "4px" }}>JARGON</div>
                        <span style={{ fontSize: "12px", color: "#fbbf24", fontWeight: 600 }}>{word}</span>
                      </div>
                      <div style={{ padding: "8px 12px" }}>
                        <div style={{ fontSize: "9px", color: "#10b981", letterSpacing: "1px", marginBottom: "4px" }}>PLAIN</div>
                        <span style={{ fontSize: "12px", color: "#6ee7b7", fontWeight: 600 }}>{plain}</span>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                      <div style={{ padding: "10px 12px", borderRight: "1px solid #1e293b" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
                          {tokens.map((t, j) => (
                            <span key={j} style={{
                              padding: "1px 5px", background: "#ef444411",
                              border: "1px solid #ef444433", borderRadius: "2px",
                              fontSize: "10px", color: "#ef4444", fontWeight: 600,
                            }}>{t}</span>
                          ))}
                        </div>
                        <div style={{ fontSize: "9px", color: "#475569", marginTop: "6px" }}>{tokens.length} tokens</div>
                      </div>
                      <div style={{ padding: "10px 12px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
                          {plain.split(" ").map((t, j) => (
                            <span key={j} style={{
                              padding: "1px 5px", background: "#10b98111",
                              border: "1px solid #10b98133", borderRadius: "2px",
                              fontSize: "10px", color: "#10b981", fontWeight: 600,
                            }}>{t}</span>
                          ))}
                        </div>
                        <div style={{ fontSize: "9px", color: "#475569", marginTop: "6px" }}>{plain.split(" ").length} tokens</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "16px", padding: "12px 16px", background: "#0d1929", border: "1px solid #1e3a5f", borderRadius: "6px", borderLeft: "3px solid #3b82f6" }}>
                <p style={{ margin: 0, fontSize: "11px", color: "#64748b", lineHeight: 1.7 }}>
                  <span style={{ color: "#93c5fd" }}>Takeaway:</span> Plain English terms tokenize into whole, meaningful words. Jargon terms splinter into sub-word fragments that appear across unrelated contexts during training — weakening domain specificity.
                </p>
              </div>
            </Section>
          )}

          {/* TAB 2: RAG Inconsistency */}
          {activeTab === 2 && (
            <Section title="RAG Retrieval Inconsistency" subtitle="// same query, different retrieved docs across runs">
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "10px", color: "#475569", marginBottom: "8px", letterSpacing: "1px" }}>QUERY</label>
                <input
                  value={ragQuery}
                  onChange={e => setRagQuery(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 14px", background: "#0d1929",
                    border: "1px solid #1e293b", borderRadius: "6px",
                    color: "#e2e8f0", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace",
                  }}
                />
              </div>
              <button
                onClick={runRAG}
                disabled={isRunningRAG}
                style={{
                  padding: "10px 24px", background: isRunningRAG ? "#1e293b" : "#f59e0b",
                  border: "none", borderRadius: "4px",
                  color: isRunningRAG ? "#475569" : "#0f0a00",
                  fontSize: "11px", fontWeight: 700, cursor: isRunningRAG ? "not-allowed" : "pointer",
                  fontFamily: "'JetBrains Mono', monospace", letterSpacing: "1px",
                  marginBottom: "20px",
                }}
              >
                {isRunningRAG ? "▶ RUNNING RETRIEVAL..." : "▶ RUN 3x RETRIEVAL"}
              </button>

              {ragRuns.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  {ragRuns.map(({ run, docs }) => (
                    <div key={run} style={{ background: "#0d1929", border: "1px solid #1e293b", borderRadius: "8px", overflow: "hidden" }}>
                      <div style={{ padding: "10px 14px", borderBottom: "1px solid #1e293b", background: "#0a1220", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "10px", color: "#f59e0b", fontWeight: 700, letterSpacing: "1px" }}>RUN {run}</span>
                        <span style={{ fontSize: "9px", color: "#475569" }}>top-3 docs</span>
                      </div>
                      {docs.map((doc, di) => (
                        <div key={di} style={{ padding: "10px 14px", borderBottom: di < 2 ? "1px solid #1e293b" : "none" }}>
                          <div style={{ fontSize: "10px", color: "#93c5fd", fontWeight: 600, marginBottom: "4px" }}>
                            #{doc.id} {doc.title}
                          </div>
                          <div style={{ fontSize: "10px", color: "#475569", lineHeight: 1.5 }}>
                            {doc.snippet.slice(0, 70)}...
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {ragRuns.length === 0 && (
                <div style={{ padding: "40px", textAlign: "center", border: "1px dashed #1e293b", borderRadius: "8px", color: "#334155" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>⟳</div>
                  <div style={{ fontSize: "11px" }}>Run retrieval to see inconsistency across calls</div>
                </div>
              )}

              {ragRuns.length > 0 && (
                <div style={{ marginTop: "14px", padding: "12px 16px", background: "#0d1929", border: "1px solid #1e3a5f", borderRadius: "6px", borderLeft: "3px solid #ef4444" }}>
                  <p style={{ margin: 0, fontSize: "11px", color: "#64748b", lineHeight: 1.7 }}>
                    <span style={{ color: "#fca5a5" }}>Why this happens:</span> When jargon tokens are weak, the embedding for the query is less stable. Small changes in context window or softmax sampling shift which docs rank in the top-k — producing non-deterministic retrieval for the same query.
                  </p>
                </div>
              )}
            </Section>
          )}

          {/* TAB 3: Heatmap */}
          {activeTab === 3 && (
            <Section title="Token Similarity Heatmap" subtitle="// intra-word token cosine similarity — jargon tokens have poor internal coherence">
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "10px", color: "#475569", marginBottom: "8px", letterSpacing: "1px" }}>SELECT JARGON WORD</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {Object.keys(JARGON_TOKEN_MAP).map(word => (
                    <button key={word} onClick={() => setHeatmapWord(word)} style={{
                      padding: "5px 11px",
                      background: heatmapWord === word ? "#1e3a5f" : "transparent",
                      border: `1px solid ${heatmapWord === word ? "#3b82f6" : "#1e293b"}`,
                      borderRadius: "3px", color: heatmapWord === word ? "#93c5fd" : "#475569",
                      fontSize: "10px", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
                      transition: "all 0.15s",
                    }}>{word}</button>
                  ))}
                </div>
              </div>

              {heatmapData && (
                <div style={{ background: "#0d1929", border: "1px solid #1e293b", borderRadius: "8px", padding: "24px", overflowX: "auto" }}>
                  <div style={{ fontSize: "10px", color: "#475569", marginBottom: "16px", letterSpacing: "1px" }}>
                    COSINE SIMILARITY BETWEEN SUB-TOKENS OF "{heatmapWord.toUpperCase()}"
                  </div>
                  <div style={{ display: "inline-block" }}>
                    <div style={{ display: "grid", gridTemplateColumns: `48px ${heatmapData.tokens.map(() => "64px").join(" ")}`, gap: "3px", alignItems: "center" }}>
                      <div />
                      {heatmapData.tokens.map((t, i) => (
                        <div key={i} style={{ textAlign: "center", fontSize: "11px", color: "#f59e0b", fontWeight: 600, padding: "4px" }}>{t}</div>
                      ))}
                      {heatmapData.tokens.map((rowTok, ri) => (
                        <>
                          <div key={`label-${ri}`} style={{ fontSize: "11px", color: "#f59e0b", fontWeight: 600, textAlign: "right", paddingRight: "8px" }}>{rowTok}</div>
                          {heatmapData.scores[ri].map((score, ci) => (
                            <div key={ci} style={{
                              height: "52px", borderRadius: "4px",
                              background: getHeatColor(score),
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "11px", fontWeight: 700,
                              color: score > 0.5 ? "#fff" : "#00000088",
                              transition: "transform 0.15s",
                              cursor: "default",
                            }}
                              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                            >
                              {score.toFixed(2)}
                            </div>
                          ))}
                        </>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
                    <span style={{ fontSize: "9px", color: "#475569" }}>LOW</span>
                    <div style={{ width: "120px", height: "8px", borderRadius: "4px", background: "linear-gradient(to right, #ef4444, #10b981)" }} />
                    <span style={{ fontSize: "9px", color: "#475569" }}>HIGH</span>
                  </div>
                </div>
              )}

              <div style={{ marginTop: "14px", padding: "12px 16px", background: "#0d1929", border: "1px solid #1e3a5f", borderRadius: "6px", borderLeft: "3px solid #10b981" }}>
                <p style={{ margin: 0, fontSize: "11px", color: "#64748b", lineHeight: 1.7 }}>
                  <span style={{ color: "#6ee7b7" }}>Why it matters:</span> Sub-tokens of jargon words learn associations from their appearances in <em>other</em> words — not the jargon itself. So <code style={{ color: "#a78bfa" }}>"ation"</code> is shared across thousands of words, diluting domain specificity and reducing the embedding quality of the full term.
                </p>
              </div>
            </Section>
          )}
        </div>
      </div>
    </>
  );
}