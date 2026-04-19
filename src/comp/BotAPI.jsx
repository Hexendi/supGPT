import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import supGPT from '../assets/SUPgpt.png';
import { BsRobot } from "react-icons/bs";
import { Link } from "react-router-dom";
import SUPGPT from '../assets/SUPGPTLOGO.png';
import { IoArrowBack } from "react-icons/io5";
import { MdContentCopy, MdCheck } from "react-icons/md";

const G = {
  bg:          "#0d0f14",
  surface:     "#131720",
  card:        "#181d28",
  border:      "#1e2d45",
  borderBright:"#1e4d80",
  accent:      "#0ea5e9",
  accentDim:   "#0369a1",
  accentGlow:  "#0ea5e920",
  text:        "#e2eaf6",
  muted:       "#7a8fa8",
  dim:         "#3d5068",
  green:       "#22d3a0",
  mono:        "'JetBrains Mono', monospace",
  sans:        "'Inter', sans-serif",
};

function FormattedMessage({ text }) {
  if (!text) return null;
  return (
    <div style={{ lineHeight: "1.75", fontSize: "13px", fontFamily: G.sans }}>
      {text.split("\n").map((line, i) => {
        if (line.trim() === "") return <div key={i} style={{ height: "0.4rem" }} />;
        const isBullet = /^[-•*]\s+/.test(line.trim());
        const cleanLine = isBullet ? line.trim().replace(/^[-•*]\s+/, "") : line;
        const parts = cleanLine.split(/\*\*(.*?)\*\*/g);
        const rendered = parts.map((part, j) =>
          j % 2 === 1
            ? <strong key={j} style={{ color: G.text, fontWeight: 600 }}>{part}</strong>
            : part
        );
        if (isBullet) {
          return (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "5px", alignItems: "flex-start" }}>
              <span style={{ color: G.accent, fontFamily: G.mono, fontSize: "11px", marginTop: "3px", flexShrink: 0 }}>▸</span>
              <span>{rendered}</span>
            </div>
          );
        }
        return <p key={i} style={{ margin: "0 0 3px 0" }}>{rendered}</p>;
      })}
    </div>
  );
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      title="Copy" style={{
        background: "transparent", border: "none",
        color: copied ? G.green : G.dim,
        cursor: "pointer", padding: "4px", width: "auto",
        display: "flex", alignItems: "center", fontSize: "13px",
        transition: "color 0.2s",
      }}>
      {copied ? <MdCheck /> : <MdContentCopy />}
    </button>
  );
}

function BotAPI() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!question.trim() || loading) return;
    const msg = question.trim();
    setMessages(p => [...p, { role: "user", text: msg }]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await axios.post("https://supnum.onrender.com/api/ask", { question: msg });
      setMessages(p => [...p, { role: "bot", text: res.data.answer }]);
    } catch {
      setMessages(p => [...p, { role: "bot", text: "Erreur serveur — veuillez réessayer." }]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const suggestions = [
    "Quels sont les cours du semestre ?",
    "C'est quoi la spécialité RSS ?",
    "Comment fonctionne le rattrapage ?",
    "Quelle spécialité choisir ?",
  ];

  const btnBase = {
    background: "transparent", border: "none", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "border-color 0.2s, color 0.2s, background 0.2s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: G.bg, fontFamily: G.sans, color: G.text }}>

   
      <div style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "0 16px", height: "52px",
        background: G.surface, borderBottom: `1px solid ${G.border}`,
        flexShrink: 0,
      }}>
        <Link to="/">
          <button style={{ ...btnBase, border: `1px solid ${G.border}`, color: G.muted, width: "32px", height: "32px", borderRadius: "6px", fontSize: "16px" }}>
            <IoArrowBack />
          </button>
        </Link>

        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: G.accentGlow, border: `1px solid ${G.borderBright}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: G.accent, fontSize: "16px",overflow:"hidden"
        }}>
	 <img src={supGPT} style={{width:"30px", height:"30px"}}/>

        </div>

        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: G.text }}>supGPT</div>
          <div style={{ fontSize: "11px", color: G.muted, display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: G.green, display: "inline-block" }} />
            Institut Supnum · en ligne
          </div>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{
            fontFamily: G.mono, fontSize: "10px", color: G.accent,
            background: G.accentGlow, border: `1px solid ${G.borderBright}`,
            padding: "3px 8px", borderRadius: "4px", letterSpacing: "0.04em",
          }}>llama3.1-8b</span>

          {messages.length > 0 && (
            <button onClick={() => setMessages([])} style={{
              ...btnBase, border: `1px solid ${G.border}`, color: G.dim,
              padding: "4px 10px", borderRadius: "6px",
              fontSize: "11px", fontFamily: G.mono,
            }}>clear</button>
          )}
        </div>
      </div>

     
      <div style={{
        flex: 1, overflowY: "auto",
        padding: "24px 16px",
        display: "flex", flexDirection: "column", gap: "4px",
        maxWidth: "800px", width: "100%", alignSelf: "center", boxSizing: "border-box",
      }}>

        {messages.length === 0 && (
          <div style={{ marginTop: "60px" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "14px",
                background: G.accentGlow, border: `1px solid ${G.borderBright}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: G.accent, fontSize: "26px", margin: "0 auto 16px",overflow:"hidden"
              }}><img src={SUPGPT} style={{width:"56px",hight:"56px"}}/></div>
              <h2 style={{ fontSize: "18px", fontWeight: 600, margin: "0 0 6px", color: G.text }}>
                Bonjour, je suis supGPT
              </h2>
              <p style={{ fontSize: "13px", color: G.muted }}>
                Assistant IA de l'Institut Supnum. Comment puis-je vous aider ?
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "8px" }}>
              {suggestions.map((s, i) => (
                <button key={i}
                  onClick={() => { setQuestion(s); inputRef.current?.focus(); }}
                  style={{
                    background: G.card, border: `1px solid ${G.border}`,
                    borderRadius: "8px", color: G.muted,
                    padding: "12px 14px", fontSize: "12px",
                    textAlign: "left", cursor: "pointer",
                    fontFamily: G.sans, width: "100%", lineHeight: "1.5",
                    transition: "border-color 0.2s, color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = G.accent; e.currentTarget.style.color = G.text; e.currentTarget.style.background = G.accentGlow; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.color = G.muted; e.currentTarget.style.background = G.card; }}
                >{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column",
            alignItems: msg.role === "user" ? "flex-end" : "flex-start",
            marginBottom: "16px",
          }}>
            <div style={{
              fontSize: "10px", fontFamily: G.mono, color: G.dim,
              marginBottom: "5px", letterSpacing: "0.06em", textTransform: "uppercase",
              paddingLeft: msg.role === "user" ? 0 : "2px",
            }}>
              {msg.role === "user" ? "vous" : "supgpt"}
            </div>

            <div style={{
              maxWidth: "75%", padding: "12px 16px",
              borderRadius: msg.role === "user" ? "12px 12px 3px 12px" : "3px 12px 12px 12px",
              border: `1px solid ${msg.role === "user" ? G.borderBright : G.border}`,
              background: msg.role === "user" ? G.accentDim : G.card,
              color: G.text, lineHeight: "1.7",
            }}>
              {msg.role === "bot"
                ? <FormattedMessage text={msg.text} />
                : <p style={{ margin: 0, fontSize: "13px" }}>{msg.text}</p>
              }
            </div>

            {msg.role === "bot" && (
              <div style={{ marginTop: "4px", paddingLeft: "2px" }}>
                <CopyBtn text={msg.text} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "16px" }}>
            <div style={{ fontSize: "10px", fontFamily: G.mono, color: G.dim, marginBottom: "5px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              supgpt
            </div>
            <div style={{
              padding: "14px 18px", borderRadius: "3px 12px 12px 12px",
              border: `1px solid ${G.border}`, background: G.card,
              display: "flex", gap: "5px", alignItems: "center",
            }}>
              {[0, 1, 2].map(j => (
                <span key={j} style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: G.accent, display: "inline-block",
                  animation: "pulse 1.2s infinite",
                  animationDelay: `${j * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

     
      <div style={{ borderTop: `1px solid ${G.border}`, background: G.surface, padding: "12px 16px", flexShrink: 0 }}>
        <div style={{
          maxWidth: "800px", margin: "0 auto",
          display: "flex", gap: "8px", alignItems: "center",
          background: G.card, border: `1px solid ${G.border}`,
          borderRadius: "10px", padding: "6px 6px 6px 14px",
          transition: "border-color 0.2s",
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = G.accent}
          onBlurCapture={e => e.currentTarget.style.borderColor = G.border}
        >
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question..."
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: G.text, fontFamily: G.sans, fontSize: "13px",
              padding: "6px 0", margin: 0,
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !question.trim()}
            style={{
              background: loading || !question.trim() ? G.border : G.accent,
              border: "none", borderRadius: "7px", color: "#fff",
              width: "36px", height: "36px", padding: 0,
              cursor: loading || !question.trim() ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "15px", flexShrink: 0, transition: "background 0.2s",
            }}
          >
            <IoSend />
          </button>
        </div>
        <p style={{
          textAlign: "center", fontSize: "10px", color: G.dim,
          fontFamily: G.mono, marginTop: "8px", letterSpacing: "0.03em",
        }}>
          Enter pour envoyer · supGPT peut faire des erreurs
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Inter:wght@300;400;500;600&display=swap');
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e2d45; border-radius: 2px; }
      `}</style>
    </div>
  );
}

export default BotAPI;
