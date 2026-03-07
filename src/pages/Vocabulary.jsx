import { useState, useMemo } from 'react'
import { vocabularyData } from '../data/vocabularyData'

const topics = ['全部', ...new Set(vocabularyData.map(v => v.topic))]
const levels = ['全部', '基礎', '中級', '高級']

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function Vocabulary() {
  const [mode, setMode] = useState('browse') // browse | flashcard | spelling
  const [topic, setTopic] = useState('全部')
  const [level, setLevel] = useState('全部')
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [spellingInput, setSpellingInput] = useState('')
  const [spellingResult, setSpellingResult] = useState(null)
  const [deck, setDeck] = useState(null)

  const filtered = useMemo(() => {
    return vocabularyData.filter(v =>
      (topic === '全部' || v.topic === topic) &&
      (level === '全部' || v.level === level)
    )
  }, [topic, level])

  const startMode = (m) => {
    const shuffled = shuffle(filtered)
    setDeck(shuffled)
    setCardIndex(0)
    setFlipped(false)
    setSpellingInput('')
    setSpellingResult(null)
    setMode(m)
  }

  const currentCard = deck?.[cardIndex]

  const nextCard = () => {
    setCardIndex(i => (i + 1) % deck.length)
    setFlipped(false)
    setSpellingInput('')
    setSpellingResult(null)
  }

  const prevCard = () => {
    setCardIndex(i => (i - 1 + deck.length) % deck.length)
    setFlipped(false)
    setSpellingInput('')
    setSpellingResult(null)
  }

  const checkSpelling = () => {
    if (!spellingInput.trim()) return
    const correct = spellingInput.trim().toLowerCase() === currentCard.word.toLowerCase()
    setSpellingResult(correct ? 'correct' : 'wrong')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-xl">📚</div>
        <div>
          <h1 className="text-2xl font-black text-gray-800">必備英語單字</h1>
          <p className="text-gray-500 text-sm">閃卡複習・拼字練習・依主題分類</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-6 space-y-4">
        <div>
          <div className="text-sm font-semibold text-gray-500 mb-2">主題</div>
          <div className="flex flex-wrap gap-2">
            {topics.map(t => (
              <button key={t} onClick={() => setTopic(t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${topic === t ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-violet-50'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-500 mb-2">難度</div>
          <div className="flex gap-2">
            {levels.map(l => (
              <button key={l} onClick={() => setLevel(l)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${level === l ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-violet-50'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-400">共 <span className="text-violet-600 font-bold">{filtered.length}</span> 個單字</div>
      </div>

      {/* Mode Selector */}
      {mode === 'browse' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button onClick={() => startMode('flashcard')}
              className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl p-6 text-left hover:shadow-xl transition-all active:scale-95">
              <div className="text-3xl mb-3">🃏</div>
              <div className="font-black text-xl mb-1">閃卡複習</div>
              <div className="text-violet-100 text-sm">看中文猜英文，翻牌確認答案</div>
            </button>
            <button onClick={() => startMode('spelling')}
              className="bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl p-6 text-left hover:shadow-xl transition-all active:scale-95">
              <div className="text-3xl mb-3">⌨️</div>
              <div className="font-black text-xl mb-1">拼字練習</div>
              <div className="text-orange-100 text-sm">看中文解釋，拼出正確英文</div>
            </button>
          </div>

          {/* Word List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((v, i) => (
              <div key={i} className="card p-4 flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-gray-800 font-en">{v.word}</span>
                    <span className="text-gray-400 text-xs">{v.pos}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      v.level === '基礎' ? 'bg-green-100 text-green-700' :
                      v.level === '中級' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>{v.level}</span>
                  </div>
                  <div className="text-blue-600 text-sm font-semibold mb-1">{v.chinese}</div>
                  <div className="text-gray-400 text-xs italic leading-relaxed">{v.example}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Flashcard Mode */}
      {mode === 'flashcard' && currentCard && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setMode('browse')} className="text-gray-400 hover:text-gray-600 font-semibold text-sm">
              ← 返回
            </button>
            <span className="text-gray-500 text-sm">{cardIndex + 1} / {deck.length}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-violet-500 h-2 rounded-full transition-all"
              style={{ width: `${((cardIndex + 1) / deck.length) * 100}%` }} />
          </div>

          {/* Card */}
          <div
            onClick={() => setFlipped(!flipped)}
            className="cursor-pointer bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-3xl p-10 text-center min-h-64 flex flex-col items-center justify-center shadow-xl hover:shadow-2xl transition-all active:scale-98 mb-6 select-none"
          >
            {!flipped ? (
              <>
                <div className="text-lg text-violet-200 mb-4">{currentCard.chinese}</div>
                <div className="text-violet-200 text-sm">{currentCard.pos}</div>
                <div className="mt-8 text-violet-300 text-sm">點擊翻牌</div>
              </>
            ) : (
              <>
                <div className="font-black text-4xl font-en mb-3">{currentCard.word}</div>
                <div className="text-violet-200 text-lg mb-4">{currentCard.chinese}</div>
                <div className="text-violet-100 text-sm italic max-w-xs leading-relaxed">{currentCard.example}</div>
              </>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={prevCard} className="bg-white border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-semibold hover:border-gray-300 transition-all">
              ← 上一張
            </button>
            <button onClick={nextCard} className="bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-all">
              下一張 →
            </button>
          </div>
        </div>
      )}

      {/* Spelling Mode */}
      {mode === 'spelling' && currentCard && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setMode('browse')} className="text-gray-400 hover:text-gray-600 font-semibold text-sm">
              ← 返回
            </button>
            <span className="text-gray-500 text-sm">{cardIndex + 1} / {deck.length}</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-orange-400 h-2 rounded-full transition-all"
              style={{ width: `${((cardIndex + 1) / deck.length) * 100}%` }} />
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
            <div className="text-center mb-6">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${currentCard.level === '基礎' ? 'bg-green-100 text-green-700' : currentCard.level === '中級' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                {currentCard.topic} · {currentCard.level}
              </span>
            </div>
            <div className="text-center mb-2">
              <div className="text-2xl font-black text-gray-800 mb-1">{currentCard.chinese}</div>
              <div className="text-gray-400 text-sm">{currentCard.pos}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 mt-4 text-center">
              <p className="text-gray-500 text-sm italic">{currentCard.example.replace(currentCard.word, '_____')}</p>
            </div>

            <div className="mt-6">
              <input
                type="text"
                value={spellingInput}
                onChange={e => { setSpellingInput(e.target.value); setSpellingResult(null) }}
                onKeyDown={e => e.key === 'Enter' && checkSpelling()}
                placeholder="拼出英文單字..."
                className="input-field text-center text-lg font-en font-semibold"
                disabled={spellingResult === 'correct'}
                autoFocus
              />
            </div>

            {spellingResult === 'correct' && (
              <div className="mt-4 bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">🎉</div>
                <div className="text-green-600 font-black text-lg">{currentCard.word}</div>
                <div className="text-green-500 text-sm">拼對了！</div>
              </div>
            )}
            {spellingResult === 'wrong' && (
              <div className="mt-4 bg-red-50 border-2 border-red-200 rounded-xl p-3 text-center">
                <div className="text-red-500 font-semibold">❌ 再試試看！</div>
                <div className="text-gray-400 text-xs mt-1">提示：共 {currentCard.word.length} 個字母</div>
              </div>
            )}

            <div className="flex gap-3 mt-4">
              {spellingResult !== 'correct' && (
                <button onClick={checkSpelling} className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                  確認答案
                </button>
              )}
              <button
                onClick={nextCard}
                className={`${spellingResult === 'correct' ? 'flex-1' : ''} bg-gray-100 text-gray-600 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors`}
              >
                {spellingResult === 'correct' ? '下一個 →' : '跳過'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
