
import { useCallback, useState } from 'react'
import Header from '../components/Header.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Chat from '../components/Chat.jsx'

export default function Home() {
  const [model, setModel] = useState('')
  const setModelMemo = useCallback((m) => setModel(m), [])

  return (
    <div className="min-h-screen relative">
      {/* Neon animated background layers */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-neon-stripes animate-scroll-glow"></div>
        <div className="absolute inset-0 bg-neon-gradient mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <Header />
        <main className="py-4 md:py-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <div className="md:col-span-4 lg:col-span-3">
            <Sidebar model={model} onChange={setModelMemo} />
          </div>
          <div className="md:col-span-8 lg:col-span-9">
            <Chat model={model || 'gpt-4o-mini'} />
          </div>
        </main>
      </div>
    </div>
  )
}
