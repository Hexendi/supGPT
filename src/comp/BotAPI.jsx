import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";

function FormattedMessage({ text }) {
  if (!text) return null;

  const lines = text.split("\n");

  return (
    <div style={{ lineHeight: "1.7", fontSize: "0.95rem" }}>
      {lines.map((line, i) => {
      
        if (line.trim() === "") return <div key={i} style={{ height: "0.6rem" }} />;

      
        const isBullet = /^[-•*]\s+/.test(line.trim());
        const cleanLine = isBullet ? line.trim().replace(/^[-•*]\s+/, "") : line;

      
        const parts = cleanLine.split(/\*\*(.*?)\*\*/g);
        const rendered = parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        );

        if (isBullet) {
          return (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
              <span style={{ color: "#60a5fa", fontWeight: "bold", flexShrink: 0 }}>•</span>
              <span>{rendered}</span>
            </div>
          );
        }

        return <p key={i} style={{ margin: "0 0 4px 0" }}>{rendered}</p>;
      })}
    </div>
  );
}

function BotAPI() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!question.trim() || loading) return;

    const userMessage = question.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("https://supnum.onrender.com/api/ask", {
        question: userMessage,
      });
      setMessages((prev) => [...prev, { role: "bot", text: res.data.answer }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Oooh sorry, something went wrong." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      maxWidth: "780px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', sans-serif",
      background: "#0f1117",
      color: "#e2e8f0",
    }}>
     
      <div style={{
        padding: "1rem 1.5rem",
        borderBottom: "1px solid #1e293b",
        textAlign: "center",
      }}>
        <h2 style={{ margin: 0, fontSize: "1.2rem", color: "#60a5fa" }}>supGPT</h2>
        <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#64748b" }}>
          Supnum Institute Assistant
        </p>
      </div>

    
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "#475569", marginTop: "4rem" }}>
            <p style={{ fontSize: "1.5rem" }}>..</p>
            <p>How can I help you today?</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div style={{
              maxWidth: "75%",
              padding: "0.75rem 1rem",
              borderRadius: msg.role === "user"
                ? "18px 18px 4px 18px"
                : "18px 18px 18px 4px",
              background: msg.role === "user"
                ? "#2563eb"
                : "#1e293b",
              color: "#e2e8f0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              lineHeight: "1.6",
            }}>
              {msg.role === "bot"
                ? <FormattedMessage text={msg.text} />
                : <p style={{ margin: 0 }}>{msg.text}</p>
              }
            </div>
          </div>
        ))}

        
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "0.75rem 1.2rem",
              borderRadius: "18px 18px 18px 4px",
              background: "#1e293b",
              color: "#64748b",
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}>
              {[0, 1, 2].map((j) => (
                <span key={j} style={{
                  width: "7px", height: "7px",
                  borderRadius: "50%",
                  background: "#60a5fa",
                  display: "inline-block",
                  animation: "bounce 1.2s infinite",
                  animationDelay: `${j * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

     
      <div style={{
        padding: "1rem",
        borderTop: "1px solid #1e293b",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        background: "#0f1117",
      }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something... (Enter to send)"
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            borderRadius: "12px",
            border: "1px solid #1e293b",
            background: "#1e293b",
            color: "#e2e8f0",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !question.trim()}
          style={{
            background: loading || !question.trim() ? "#334155" : "#2563eb",
            border: "none",
            borderRadius: "12px",
            width: "48px",
            height: "48px",
            cursor: loading || !question.trim() ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#e2e8f0",
            fontSize: "1.2rem",
            transition: "background 0.2s",
          }}
        >
          <IoSend />
        </button>
      </div>

      
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

export default BotAPI;
