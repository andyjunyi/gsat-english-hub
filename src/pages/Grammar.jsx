import { useMemo } from 'react'
import PatternSearch from '../components/grammar/PatternSearch'

const patternModules = import.meta.glob('../data/patterns/*.json', { eager: true })

const CHAPTER_TITLES = {
  1: '虛主詞與強調句型',
  2: '條件句與假設語氣',
  3: '比較句型',
  4: '關係子句與名詞子句',
  5: '動詞進階用法',
  6: '不定詞與動名詞',
  7: '分詞與分詞構句',
  8: '連接詞與副詞子句',
}

function extractSummary(raw) {
  const formula =
    Array.isArray(raw.formulas) && raw.formulas.length > 0
      ? raw.formulas[0].formula ?? ''
      : raw.formula_for ?? raw.formula ?? ''

  const explanation =
    typeof raw.explanation === 'string'
      ? raw.explanation
      : typeof raw.explanation === 'object' && raw.explanation !== null
        ? Object.values(raw.explanation).join(' ')
        : ''

  return {
    code: raw.code,
    chapter: raw.chapter,
    title: raw.title,
    formula,
    explanation,
    chapterTitle: CHAPTER_TITLES[raw.chapter] ?? '',
  }
}

export default function Grammar() {
  const patterns = useMemo(() => {
    const summaries = Object.values(patternModules).map(m => extractSummary(m.default ?? m))
    return summaries.sort((a, b) => {
      if (a.chapter !== b.chapter) return a.chapter - b.chapter
      return Number(a.code.split('-')[1]) - Number(b.code.split('-')[1])
    })
  }, [])

  return (
    <div>
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white py-10 px-4 text-center">
        <h1 className="text-3xl font-black tracking-tight">學測英文必備句型</h1>
        <p className="text-blue-100 text-sm mt-2">系統化學習・互動練習・AI 即時解析</p>
      </header>

      <PatternSearch patterns={patterns} />
    </div>
  )
}
