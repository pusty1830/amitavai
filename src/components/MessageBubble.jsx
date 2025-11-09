
export default function MessageBubble({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-wrap neon-border glass
        ${isUser ? 'bg-neon-gradient' : 'bg-black/40'}
      `}>
        <div className="text-xs uppercase tracking-wide opacity-70 mb-1">
          {isUser ? 'You' : 'Assistant'}
        </div>
        <div className="text-sm md:text-base">{content}</div>
      </div>
    </div>
  )
}
