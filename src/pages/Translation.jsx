import { useState, useRef, useEffect } from 'react'
import { translationData } from '../data/translationData'

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

// Parse template into parts: strings and blank objects
function parseTemplate(template, blanks) {
  const parts = []
  let remaining = template
  let blankIdx = 0

  while (remaining.length > 0) {
    const start = remaining.indexOf('{')
    if (start === -1) {
      parts.push({ type: 'text', value: remaining })
      break
    }
    if (start > 0) {
      parts.push({ type: 'text', value: remaining.slice(0, start) })
    }
    const end = remaining.indexOf('}', start)
    const word = remaining.slice(start + 1, end)
    parts.push({ type: 'blank', word, index: blankIdx, length: word.length })
    blankIdx++
    remaining = remaining.slice(end + 1)
  }
  return parts
}

export default function Translation() {
  const [questions] = useState(() => shuffle(translationData))
  const [currentIdx, setCurrentIdx] = useState(0)
  const [inputs, setInputs] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const [filter, setFilter] = useState('全部')
  const inputRefs = useRef({})

  const filtered = filter === '全部' ? questions : questions.filter(q => q.topic === filter)
  const current = filtered[currentIdx]

  useEffect(() => {
    setInputs({})
    setSubmitted(false)
    setScore(null)
  }, [currentIdx, filter])

  if (!current) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center text-gray-400">
        <div className="text-5xl mb-4">📭</div>
        <p>目前沒有題目，請重新整理頁面。</p>
      </div>
    )
  }

  const parts = parseTemplate(current.template, current.blanks)

  const handleInput = (blankIndex, value, word) => {
    // Only allow letters, max length = word.length
    const clean = value.replace(/[^a-zA-Z]/g, '').slice(0, word.length)
    setInputs(prev => ({ ...prev, [blankIndex]: clean }))
  }

  const handleKeyDown = (e, blankIndex, blanksCount) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      const next = blankIndex + 1
      if (next < blanksCount && inputRefs.current[next]) {
        inputRefs.current[next].focus()
      }
    }
  }

  const checkAnswers = () => {
    let correct = 0
    current.blanks.forEach((word, i) => {
      if ((inputs[i] || '').toLowerCase() === word.toLowerCase()) correct++
    })
    setScore(correct)
    setSubmitted(true)
  }

  const isCorrect = (blankIndex) => {
    return (inputs[blankIndex] || '').toLowerCase() === current.blanks[blankIndex].toLowerCase()
  }

  const allFilled = current.blanks.every((_, i) => (inputs[i] || '').length > 0)
  const allCorrect = score === current.blanks.length

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">✏️</div>
        <div>
          <h1 className="text-2xl font-black text-gray-800">翻譯克漏字練習</h1>
          <p className="text-gray-500 text-sm">看中文句子，填入正確英文搭配詞</p>
        </div>
      </div>

      {/* Filter & Progress */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {['全部', '搭配詞', '句型'].map(f => (
            <button key={f} onClick={() => { setFilter(f); setCurrentIdx(0) }}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${filter === f ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-400">
          第 <span className="text-orange-500 font-bold">{currentIdx + 1}</span> 題 / 共 {filtered.length} 題
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-6">
        {/* Chinese sentence */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 mb-6">
          <div className="text-xs font-bold text-orange-400 uppercase mb-2">中文句子</div>
          <p className="text-gray-800 text-lg font-semibold leading-relaxed">{current.chinese}</p>
        </div>

        {/* Fill in the blanks */}
        <div className="mb-6">
          <div className="text-xs font-bold text-gray-400 uppercase mb-3">填入正確英文</div>
          <div className="bg-gray-50 rounded-xl p-4 leading-loose text-base md:text-lg flex flex-wrap items-baseline gap-1">
            {parts.map((part, pi) => {
              if (part.type === 'text') {
                return <span key={pi} className="text-gray-700">{part.value}</span>
              }
              // Blank input
              const val = inputs[part.index] || ''
              const correct = submitted ? isCorrect(part.index) : null
              return (
                <span key={pi} className="inline-flex flex-col items-center mx-0.5">
                  <input
                    ref={el => inputRefs.current[part.index] = el}
                    type="text"
                    value={val}
                    onChange={e => handleInput(part.index, e.target.value, part.word)}
                    onKeyDown={e => handleKeyDown(e, part.index, current.blanks.length)}
                    disabled={submitted && correct}
                    className={`border-b-2 bg-transparent text-center font-semibold font-en outline-none transition-colors focus:border-orange-400 ${
                      submitted
                        ? correct
                          ? 'border-green-400 text-green-600'
                          : 'border-red-400 text-red-500'
                        : 'border-gray-400 text-gray-800'
                    }`}
                    style={{ width: `${Math.max(part.length * 12, 40)}px` }}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  {/* Letter count dots */}
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: part.length }).map((_, li) => (
                      <div key={li} className={`w-1.5 h-1.5 rounded-full ${val[li] ? 'bg-orange-400' : 'bg-gray-300'}`} />
                    ))}
                  </div>
                </span>
              )
            })}
          </div>

          {/* Letter count hint */}
          <div className="mt-3 flex flex-wrap gap-2">
            {current.blanks.map((word, i) => (
              <span key={i} className="text-xs text-gray-400">
                空格{i + 1}: {word.length}個字母
              </span>
            ))}
          </div>
        </div>

        {/* Hint */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-6">
          <span className="text-xs font-bold text-blue-500">💡 提示：</span>
          <span className="text-blue-700 text-sm">{current.hint}</span>
        </div>

        {/* Submit / Result */}
        {!submitted ? (
          <button
            onClick={checkAnswers}
            disabled={!allFilled}
            className={`w-full py-4 rounded-xl font-black text-lg transition-all ${
              allFilled
                ? 'bg-orange-500 hover:bg-orange-600 text-white active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            確認答案
          </button>
        ) : (
          <div className={`rounded-2xl p-5 ${allCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-amber-50 border-2 border-amber-200'}`}>
            <div className="text-center mb-3">
              {allCorrect ? (
                <div>
                  <div className="text-3xl mb-1">🎉</div>
                  <div className="text-green-600 font-black text-xl">全對！太棒了！</div>
                </div>
              ) : (
                <div>
                  <div className="text-2xl mb-1">📝</div>
                  <div className="text-amber-700 font-bold">答對 {score} / {current.blanks.length} 個</div>
                </div>
              )}
            </div>
            {/* Show correct answers */}
            <div className="bg-white rounded-xl p-4 mb-3">
              <div className="text-xs font-bold text-gray-400 mb-2">正確答案</div>
              <p className="text-gray-800 font-semibold">{current.fullEnglish}</p>
            </div>
            {/* Wrong answers */}
            {!allCorrect && (
              <div className="text-sm text-amber-700">
                {current.blanks.map((word, i) => !isCorrect(i) && (
                  <div key={i}>❌ 空格{i + 1}：應填 <span className="font-bold font-en">{word}</span>，你填了「{inputs[i] || '（空白）'}」</div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}
          disabled={currentIdx === 0}
          className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:border-orange-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          ← 上一題
        </button>
        <button
          onClick={() => setCurrentIdx(i => Math.min(filtered.length - 1, i + 1))}
          disabled={currentIdx === filtered.length - 1}
          className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          下一題 →
        </button>
      </div>
    </div>
  )
}
