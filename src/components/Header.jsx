export default function Header() {
  return (
    <header className="sticky top-0 z-10 glass neon-border rounded-b-xl px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-neon-cyan animate-pulse"></div>
        <h1 className="text-lg font-semibold tracking-wide text-white">
          Amitav<span className="text-neon-pink">'s</span>{" "}
          <span className="text-neon-cyan">AI</span>
        </h1>
      </div>

      <div className="text-xs text-neon-cyan italic">
        “Think. Create. Evolve.”
      </div>
    </header>
  );
}
