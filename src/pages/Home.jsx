import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const modules = [
  {
    path: '/collocations',
    emoji: '📚',
    title: '英文搭配詞',
    desc: '收錄 5,800+ 學測高頻搭配詞，含例句、文法重點與句型分析',
    iconBg: 'from-blue-500 to-blue-700',
    border: 'hover:border-blue-300',
  },
  {
    path: '/grammar',
    emoji: '✏️',
    title: '英文必備句型',
    desc: '收錄 140 個句型，依句型分類練習，涵蓋假設語氣、比較句型、關係子句等學測重點',
    iconBg: 'from-indigo-500 to-indigo-700',
    border: 'hover:border-indigo-300',
  },
  {
    path: '/junyi',
    emoji: '🛠️',
    title: '均一自學工具',
    desc: '精選均一教育平台英文練習工具，涵蓋單字、跟讀、詞彙等多元練習',
    badge: '6 個工具',
    badgeColor: 'bg-orange-100 text-orange-700',
    iconBg: 'from-orange-400 to-yellow-500',
    border: 'hover:border-orange-300',
  },
]

export default function Home() {
  const [visitors, setVisitors] = useState(null)

  useEffect(() => {
    const run = async () => {
      const cached = sessionStorage.getItem('visitorCount')
      if (cached) {
        setVisitors(Number(cached))
        return
      }
      try {
        const res = await fetch('https://api.counterapi.dev/v1/gsat-english-hub/visitors/up')
        const data = await res.json()
        const count = data.count ?? null
        setVisitors(count)
        if (count !== null) sessionStorage.setItem('visitorCount', String(count))
      } catch {
        setVisitors(-1)
      }
    }
    run()
  }, [])

  return (
    <div>
      {/* Visitor Counter */}
      <div style={{ position: 'fixed', right: '1rem', top: '4.5rem', zIndex: 40 }}
        className="bg-white rounded-lg shadow px-3 py-1.5 text-xs text-gray-500">
        👁 累計訪客：{visitors === null ? '---' : visitors === -1 ? '---' : visitors.toLocaleString()} 人
      </div>

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white py-10 px-4 text-center">
        <h1 className="text-3xl font-black tracking-tight">學測英文自學網站</h1>
        <p className="text-blue-200 text-sm mt-2">專為台灣高中生設計・大學學測必備</p>
      </section>

      {/* Module Cards */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {modules.map(m => (
            <Link
              key={m.path}
              to={m.path}
              className={`group bg-white rounded-2xl shadow-sm border-2 border-transparent ${m.border} p-6 block transition-all hover:shadow-md`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.iconBg} flex items-center justify-center text-2xl shadow-sm mb-4 group-hover:scale-105 transition-transform`}>
                {m.emoji}
              </div>
              <div className="mb-1">
                <h2 className="text-lg font-black text-gray-800">{m.title}</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{m.desc}</p>
              <span className="text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">
                開始學習 →
              </span>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6 flex items-center gap-4 opacity-60">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
            🚧
          </div>
          <div>
            <p className="font-bold text-gray-500">更多模組即將推出</p>
            <p className="text-sm text-gray-400 mt-0.5">單字、翻譯練習、閱讀測驗等功能持續開發中</p>
          </div>
        </div>
      </section>
    </div>
  )
}
