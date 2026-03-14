const tools = [
  {
    emoji: '🎯',
    label: '學測英文・沈浸式練習',
    description: '歷屆學測文意字彙 Andy 老師逐題講解',
    href: 'https://learn-gasat.vercel.app/',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
  },
  {
    emoji: '💪',
    label: '單字練功坊 WordGym',
    description: '內建國內出版社分冊、分課，所有的單字，是考前複習的好幫手',
    href: 'https://www.jutor.ai/event/wordgym/index.html',
    iconBg: 'bg-green-100',
    iconText: 'text-green-600',
  },
  {
    emoji: '🎤',
    label: '單句跟讀',
    description: '跟讀單句訓練，提升口說與聽力',
    href: 'https://www.jutor.ai/event/speak/sentence/index.html',
    iconBg: 'bg-purple-100',
    iconText: 'text-purple-600',
  },
  {
    emoji: '📢',
    label: '文章朗讀',
    description: '整篇文章朗讀練習，培養語感',
    href: 'https://www.jutor.ai/event/speak/passage/index.html',
    iconBg: 'bg-orange-100',
    iconText: 'text-orange-600',
  },
  {
    emoji: '💎',
    label: '詞彙寶石 WordGem',
    description: '在歷屆學測大海裡撈出你想要的資料',
    href: 'https://www.jutor.ai/event/vocabgem/index.html',
    iconBg: 'bg-pink-100',
    iconText: 'text-pink-600',
  },
  {
    emoji: '🤖',
    label: 'AI 英文問題提問',
    description: 'AI 英文問答，即時解決學習疑惑',
    href: 'https://www.jutor.ai/event/qa/index.html',
    iconBg: 'bg-indigo-100',
    iconText: 'text-indigo-600',
  },
  {
    emoji: '📖',
    label: '單字記憶卡',
    description: '製作專屬單字記憶卡，隨時複習重要詞彙',
    href: 'https://www.jutor.ai/event/vocabnote/',
    iconBg: 'bg-rose-100',
    iconText: 'text-rose-600',
  },
  {
    emoji: '🃏',
    label: '單字閃卡複習',
    description: '用閃卡方式快速複習單字，強化記憶效果',
    href: 'https://www.jutor.ai/event/vocabloop/',
    iconBg: 'bg-teal-100',
    iconText: 'text-teal-600',
  },
  {
    emoji: '📝',
    label: 'Jutor 國中會考英文科線上測驗',
    description: '歷屆國中會考英文科線上測驗平台，即時批改與解析',
    href: 'https://www.jutor.ai/event/past-exam/cap-english/index.html',
    iconBg: 'bg-yellow-100',
    iconText: 'text-yellow-600',
  },
]

export default function JunyiPage() {
  return (
    <div>
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 py-10 px-4 text-center">
        <h1 className="text-3xl font-black text-white tracking-tight">均一自學工具</h1>
        <p className="text-blue-100 text-sm mt-2">六大練習工具・免費使用・學測英文最佳夥伴</p>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map(tool => (
            <a
              key={tool.href}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 group"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${tool.iconBg}`}>
                {tool.emoji}
              </div>

              {/* Content */}
              <div className="font-bold text-gray-800 mb-1">{tool.label}</div>
              <div className="text-sm text-gray-500 flex-1">{tool.description}</div>

              {/* CTA */}
              <div className="mt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                立即前往 →
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
