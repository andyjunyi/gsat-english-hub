import { useState } from 'react'
import { collocationData } from '../data/collocation/collocationData'

// 不規則動詞：只存不規則過去式（+s / +ing 由 getVerbForms 自動產生）
const IRREGULAR_VERBS = {
  tell: ['told'],    make: ['made'],      take: ['took'],    give: ['gave'],
  come: ['came'],    go: ['went'],        get: ['got'],      find: ['found'],
  keep: ['kept'],    bring: ['brought'],  think: ['thought'],feel: ['felt'],
  leave: ['left'],   meet: ['met'],       run: ['ran'],      see: ['saw'],
  write: ['wrote'],  know: ['knew'],      grow: ['grew'],    show: ['showed', 'shown'],
  begin: ['began'],  break: ['broke'],    build: ['built'],  buy: ['bought'],
  catch: ['caught'], choose: ['chose'],   draw: ['drew'],    drive: ['drove'],
  eat: ['ate'],      fall: ['fell'],      fly: ['flew'],     forget: ['forgot'],
  hold: ['held'],    lead: ['led'],       lose: ['lost'],    pay: ['paid'],
  put: ['put'],      read: ['read'],      rise: ['rose'],    sell: ['sold'],
  send: ['sent'],    set: ['set'],        speak: ['spoke'],  spend: ['spent'],
  stand: ['stood'],  teach: ['taught'],   throw: ['threw'],  win: ['won'],
  understand: ['understood'],
  be: ['is', 'are', 'was', 'were', 'been', 'being', 'am'],
  drop: ['dropped'], stop: ['stopped'],   plan: ['planned'],
  refer: ['referred'], occur: ['occurred'],
}

function needsDoubling(word) {
  const vowels = 'aeiou'
  const n = word.length
  if (n < 3) return false
  const last = word[n - 1]
  const prev = word[n - 2]
  const beforePrev = word[n - 3]
  return !vowels.includes(last) && !'wxy'.includes(last) &&
    vowels.includes(prev) &&
    !vowels.includes(beforePrev)
}

function getVerbForms(word) {
  const lower = word.toLowerCase()
  const irregular = IRREGULAR_VERBS[lower]
  const forms = [lower, lower + 's']

  if (irregular) {
    forms.push(...irregular)
  } else if (lower.endsWith('e') && !lower.endsWith('ee')) {
    forms.push(lower + 'd')
  } else {
    forms.push(lower + 'ed')
  }

  if (lower.endsWith('ie')) {
    forms.push(lower.slice(0, -2) + 'ying')
  } else if (lower.endsWith('e') && !lower.endsWith('ee')) {
    forms.push(lower.slice(0, -1) + 'ing')
  } else if (needsDoubling(lower)) {
    forms.push(lower + lower[lower.length - 1] + 'ing')
  } else {
    forms.push(lower + 'ing')
  }

  return forms
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function isStructuralToken(token) {
  return /^(sb\.?|sth\.?|\.\.\.|one's|oneself)$/i.test(token)
}

function buildTokenPattern(token, isFirstToken) {
  const lower = token.toLowerCase()
  if (lower === "one's") return "(my|his|her|its|your|their|our|one's)"
  if (lower === 'oneself') return '(myself|himself|herself|itself|yourself|themselves|ourselves|oneself)'
  if (/^(sb\.?|sth\.?|\.\.\.)$/i.test(lower)) return '\\S+(?:\\s+\\S+){0,4}'
  if (isFirstToken || IRREGULAR_VERBS[lower]) {
    const forms = getVerbForms(lower)
    return '(?:' + forms.map(escapeRegex).join('|') + ')'
  }
  return escapeRegex(token)
}

function renderHighlights(text, ranges) {
  if (ranges.length === 0) return <span>{text}</span>
  const parts = []
  let pos = 0
  for (const { start, end } of ranges) {
    if (start > pos) parts.push(<span key={`t${pos}`}>{text.slice(pos, start)}</span>)
    parts.push(
      <strong key={`h${start}`} className="underline decoration-blue-700 text-blue-900">
        {text.slice(start, end)}
      </strong>
    )
    pos = end
  }
  if (pos < text.length) parts.push(<span key={`t${pos}`}>{text.slice(pos)}</span>)
  return <span>{parts}</span>
}

function highlightPhrase(text, phrase) {
  try {
    const tokens = phrase.split(/\s+/)
    const tokenPatterns = tokens.map((token, i) => buildTokenPattern(token, i === 0))

    const firstIsStructural = isStructuralToken(tokens[0])
    const lastIsStructural = isStructuralToken(tokens[tokens.length - 1])
    const fullPattern =
      (firstIsStructural ? '' : '\\b') +
      tokenPatterns.join('\\s+') +
      (lastIsStructural ? '' : '\\b')

    const fullMatch = new RegExp(fullPattern, 'i').exec(text)
    if (fullMatch) {
      return renderHighlights(text, [{ start: fullMatch.index, end: fullMatch.index + fullMatch[0].length }])
    }

    const solidTokens = tokens.filter(t => !isStructuralToken(t))
    if (solidTokens.length === 0) return <span>{text}</span>

    const ranges = []
    for (const token of solidTokens) {
      const isFirst = tokens.indexOf(token) === 0
      const forms = (isFirst || IRREGULAR_VERBS[token.toLowerCase()])
        ? getVerbForms(token)
        : [token.toLowerCase()]
      const m = new RegExp('\\b(?:' + forms.map(escapeRegex).join('|') + ')\\b', 'i').exec(text)
      if (m) ranges.push({ start: m.index, end: m.index + m[0].length })
    }

    ranges.sort((a, b) => a.start - b.start)
    const merged = []
    for (const r of ranges) {
      if (merged.length > 0 && r.start <= merged[merged.length - 1].end) {
        merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, r.end)
      } else {
        merged.push({ ...r })
      }
    }
    return renderHighlights(text, merged)
  } catch {
    return <span>{text}</span>
  }
}

const TYPE_COLORS = {
  '動詞 + 名詞': 'bg-blue-100 text-blue-700',
  '動詞 + 副詞': 'bg-purple-100 text-purple-700',
  '形容詞 + 名詞': 'bg-green-100 text-green-700',
  '副詞 + 動詞': 'bg-orange-100 text-orange-700',
  '動詞片語 + 名詞': 'bg-pink-100 text-pink-700',
  '動詞片語': 'bg-rose-100 text-rose-700',
  '名詞片語': 'bg-teal-100 text-teal-700',
  '動詞 + 代名詞': 'bg-indigo-100 text-indigo-700',
  '動詞 + 連接詞': 'bg-yellow-100 text-yellow-700',
}

function CollocationCard({ collocation, expanded, onToggle }) {
  const { phrase, type, chinese, example, vocabulary, sentence_pattern, keywords } = collocation
  const typeColor = TYPE_COLORS[type] || 'bg-gray-100 text-gray-700'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl font-bold text-gray-900">{phrase}</span>
          <span className="text-sm text-gray-400 font-normal">({keywords.join(' · ')})</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${typeColor}`}>
            {type}
          </span>
          <button
            onClick={onToggle}
            className="text-sm text-blue-500 hover:text-blue-700 whitespace-nowrap"
          >
            {expanded ? '收起' : '展開'}
          </button>
        </div>
      </div>

      <p className={`text-lg text-gray-500 ${expanded ? 'mb-4' : ''}`}>{chinese}</p>

      {expanded && (
        <>
          <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
            <p className="text-gray-800 leading-relaxed mb-1">
              {highlightPhrase(example.english, phrase)}
            </p>
            <p className="text-gray-500 text-sm">{example.chinese}</p>
            <div className="mt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                <span>文法重點</span>
                <span className="text-emerald-600">· {example.grammar_point}</span>
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">必備單字</h4>
            <div className="flex flex-wrap gap-2">
              {vocabulary.map((v, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-sm"
                >
                  <span className="font-semibold text-gray-800">{v.word}</span>
                  <span className="text-gray-400 text-xs">{v.pos}</span>
                  <span className="text-gray-600">{v.chinese}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
            <h4 className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">句型結構</h4>
            <p className="text-base font-mono text-indigo-800 font-medium">{sentence_pattern.pattern}</p>
            <p className="text-sm text-indigo-500 mt-1 italic">{sentence_pattern.example}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default function CollocationSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [lastQuery, setLastQuery] = useState('')
  const [expandedCards, setExpandedCards] = useState(new Set())
  const [selectedType, setSelectedType] = useState(null)

  const availableTypes = [...new Set(results.map((item) => item.type))]

  const displayedResults = selectedType
    ? results.filter((item) => item.type === selectedType)
    : results

  const buildExpanded = (items) =>
    items.length <= 2 ? new Set(items.map((item) => item.phrase)) : new Set()

  const handleSearch = () => {
    const q = query.trim()
    if (!q) return
    setResults([])
    setSelectedType(null)
    setExpandedCards(new Set())
    setSearched(false)
    const isEnglish = /[a-zA-Z]/.test(q)
    const wordRegex = isEnglish ? new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i') : null
    const matches = collocationData.filter((item) =>
      isEnglish
        ? wordRegex.test(item.phrase) || (item.keywords && item.keywords.some((k) => wordRegex.test(k)))
        : item.chinese.includes(q)
    )
    matches.sort((a, b) => {
      const aWords = a.phrase.trim().split(/\s+/).length;
      const bWords = b.phrase.trim().split(/\s+/).length;
      if (aWords !== bWords) return aWords - bWords;
      return a.phrase.localeCompare(b.phrase);
    })
    setResults(matches)
    setSearched(true)
    setLastQuery(q)
    setExpandedCards(buildExpanded(matches))
    setQuery('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setSearched(false)
    setLastQuery('')
    setExpandedCards(new Set())
    setSelectedType(null)
  }

  const selectType = (type) => {
    setSelectedType(type)
    const filtered = results.filter((item) => item.type === type)
    setExpandedCards(buildExpanded(filtered))
  }

  const resetType = () => {
    setSelectedType(null)
    setExpandedCards(buildExpanded(results))
  }

  const toggleCard = (phrase) => {
    setExpandedCards((prev) => {
      const next = new Set(prev)
      if (next.has(phrase)) next.delete(phrase)
      else next.add(phrase)
      return next
    })
  }

  const allExpanded =
    displayedResults.length > 0 &&
    displayedResults.every((item) => expandedCards.has(item.phrase))

  const toggleAll = () => {
    setExpandedCards((prev) => {
      const next = new Set(prev)
      if (allExpanded) {
        displayedResults.forEach((item) => next.delete(item.phrase))
      } else {
        displayedResults.forEach((item) => next.add(item.phrase))
      }
      return next
    })
  }

  return (
    <div>
      {/* Search Box */}
      <div className="max-w-2xl mx-auto flex gap-2 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="輸入英文單字或中文..."
            className="w-full px-4 py-2.5 rounded-lg text-gray-700 text-sm outline-none border border-gray-200 bg-white placeholder-gray-400 pr-8 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
              aria-label="清除"
            >
              ×
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm whitespace-nowrap"
        >
          查詢
        </button>
      </div>

      {/* Initial state */}
      {!searched && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-7xl mb-4">📚</div>
          <p className="text-xl font-medium text-gray-500">輸入單字開始學習搭配詞</p>
          <p className="text-sm mt-2">支援英文關鍵字、搭配詞片語、或中文搜尋</p>
        </div>
      )}

      {/* No results */}
      {searched && results.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-7xl mb-4">🔍</div>
          <p className="text-xl font-medium text-gray-500">
            找不到「<span className="text-blue-600">{lastQuery}</span>」的相關搭配詞
          </p>
          <p className="text-sm mt-2">請嘗試其他關鍵字，例如：make、achieve、environment</p>
          <button
            onClick={handleClear}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            重新搜尋
          </button>
        </div>
      )}

      {/* Results */}
      {searched && results.length > 0 && (
        <>
          {/* Summary bar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-sm">
              搜尋「<span className="font-semibold text-gray-700">{lastQuery}</span>」
              ・找到 <span className="font-bold text-blue-600">{results.length}</span> 個搭配詞
            </p>
            <div className="flex items-center gap-4">
              {displayedResults.length > 2 && (
                <button
                  onClick={toggleAll}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  {allExpanded ? '收起全部內容' : '展開全部內容'}
                </button>
              )}
              <button
                onClick={handleClear}
                className="text-sm text-gray-400 hover:text-gray-600 underline"
              >
                清除搜尋
              </button>
            </div>
          </div>

          {/* Type filter buttons */}
          <div className="flex flex-wrap gap-2 mb-5">
            <button
              onClick={resetType}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                selectedType === null
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
              }`}
            >
              全部
            </button>
            {availableTypes.map((type) => (
              <button
                key={type}
                onClick={() => selectType(type)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                  selectedType === type
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Filter active: back button + info */}
          {selectedType && (
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={resetType}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                ← 回到全部結果
              </button>
              <span className="text-gray-400 text-xs">|</span>
              <p className="text-sm text-gray-500">
                目前篩選：<span className="font-semibold text-gray-700">{selectedType}</span>
                ，共 <span className="font-bold text-blue-600">{displayedResults.length}</span> 個結果
              </p>
            </div>
          )}

          {/* Card list */}
          <div className="flex flex-col gap-4">
            {displayedResults.map((item) => (
              <CollocationCard
                key={item.phrase}
                collocation={item}
                expanded={expandedCards.has(item.phrase)}
                onToggle={() => toggleCard(item.phrase)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
