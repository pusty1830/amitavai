import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble.jsx";
import { askAI } from "../services/Service.js";

const CHAT_KEY = "neon.chat.history";

export default function Chat({ model }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(CHAT_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { role: "assistant", content: "Hey! I am your neon assistant. Ask me anything ✨" },
    ];
  });
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollerRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, sending]);

  useEffect(() => {
    try { localStorage.setItem(CHAT_KEY, JSON.stringify(messages)); } catch {}
  }, [messages]);

  function extractReply(res) {
    return (
      res?.data?.reply ??
      res?.data?.answer ??
      res?.data?.content ??
      res?.reply ??
      res?.answer ??
      res?.content ??
      res?.data?.choices?.[0]?.message?.content ??
      res?.data?.data?.message?.content ??
      "No response from backend."
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    const question = input.trim();
    if (!question || sending) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setInput("");
    const next = [...messages, { role: "user", content: question }];
    setMessages(next);
    setSending(true);

    try {
      const payloadMessages = next.map(({ role, content }) => ({ role, content }));
      const res = await askAI({
        model: model || "gpt-4o-mini",
        messages: payloadMessages,
        signal: controller.signal,
      });

      const reply = String(extractReply(res));
      setMessages((curr) => [...curr, { role: "assistant", content: reply }]);
    } catch (err) {
      if (err?.name === "AbortError") return;
      console.error(err);
      setMessages((curr) => [
        ...curr,
        { role: "assistant", content: "⚠️ Error talking to backend. Check console & API." },
      ]);
    } finally {
      setSending(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !sending) onSubmit(e);
    }
  }

  function cancelRequest() {
    abortRef.current?.abort();
    setSending(false);
  }

  return (
  <section className="flex-1 glass neon-border rounded-2xl min-h-[calc(100dvh-6rem)] md:h-[calc(100vh-6.5rem)] flex flex-col md:overflow-hidden">
    <div
      ref={scrollerRef}
      className="flex-1 overflow-y-auto p-3 md:p-6 space-y-4 scrollbar-neon pb-28 md:pb-6"
    >
      {messages.map((m, i) => (
        <MessageBubble key={`${i}-${m.role}-${m.content?.slice(0, 12)}`} role={m.role} content={m.content} />
      ))}
      {sending && <div className="text-xs opacity-70 animate-pulse">Thinking…</div>}
    </div>

    <form
      onSubmit={onSubmit}
      className="sticky bottom-0 left-0 right-0 z-10 p-2 md:p-4 border-t border-white/10 bg-black/60 backdrop-blur pb-[max(env(safe-area-inset-bottom),0.5rem)]"
    >
      <div className="flex gap-2 items-end">
        <textarea
          ref={inputRef}
          rows={1}
          onKeyDown={onKeyDown}
          className="flex-1 min-w-0 h-12 min-h-12 max-h-40 bg-black/60 border border-white/15 rounded-xl px-4 py-3 outline-none resize-y focus:ring-2 focus:ring-neon-pink focus:border-neon-pink/60"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className="shrink-0 h-12 px-4 md:px-5 rounded-xl bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink text-black font-semibold shadow-neon hover:shadow-neon-strong transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {sending ? "Sending…" : "Send"}
        </button>
        {sending && (
          <button
            type="button"
            onClick={cancelRequest}
            className="shrink-0 h-12 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs"
            title="Cancel"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="mt-2 text-[11px] opacity-70">
        Model in use: <span className="font-mono">{model || "gpt-4o-mini"}</span>
      </div>
    </form>
  </section>
);

}
