import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import FilterBar from '../components/FilterBar'
import TierSection from '../components/TierSection'
import ChapterCard from '../components/ChapterCard'
import ChapterModal from '../components/ChapterModal'
import { TIERS, REVIEWS } from '../data/chapters'
import { CHAPTER_CONTENT } from '../data/chapterContent'
import styles from './GrammarMap.module.css'

const ALL_CHAPTERS = TIERS.flatMap(t => t.chapters)

// 預先為每個章節建立全文搜尋索引（含公式、例句中英文、說明、注意事項等）
function buildContentIndex(id) {
  const content = CHAPTER_CONTENT[parseInt(id)] || CHAPTER_CONTENT[id]
  if (!content) return ''
  const parts = []
  for (const s of content.sections) {
    if (s.title)   parts.push(s.title)
    if (s.body)    parts.push(s.body)
    if (s.formula) parts.push(s.formula)
    if (s.analogy) parts.push(s.analogy)
    if (s.warning) parts.push(s.warning)
    for (const ex of s.examples || []) {
      if (ex.en)   parts.push(ex.en)
      if (ex.zh)   parts.push(ex.zh)
      if (ex.note) parts.push(ex.note)
    }
    for (const ov of s.overview || []) {
      if (ov.en)   parts.push(ov.en)
      if (ov.zh)   parts.push(ov.zh)
      if (ov.note) parts.push(ov.note)
    }
  }
  return parts.join(' ').toLowerCase()
}

const CONTENT_INDEX = new Map(
  [...ALL_CHAPTERS, ...REVIEWS].map(ch => [ch.id, buildContentIndex(ch.id)])
)

function matchQuery(chapter, q) {
  const kw = q.toLowerCase()
  return (
    chapter.title.toLowerCase().includes(kw) ||
    (chapter.tags || []).some(tag => tag.toLowerCase().includes(kw)) ||
    (chapter.desc || '').toLowerCase().includes(kw) ||
    (CONTENT_INDEX.get(chapter.id) || '').includes(kw)
  )
}

function findMatchingSection(chapterId, q) {
  const content = CHAPTER_CONTENT[parseInt(chapterId)] || CHAPTER_CONTENT[chapterId]
  if (!content) return null
  const kw = q.toLowerCase()
  for (const s of content.sections) {
    const text = [
      s.title, s.body, s.formula, s.analogy, s.warning,
      ...(s.examples || []).flatMap(ex => [ex.en, ex.zh, ex.note]),
      ...(s.overview || []).flatMap(ov => [ov.en, ov.zh, ov.note]),
    ].filter(Boolean).join(' ').toLowerCase()
    if (text.includes(kw)) return s.id
  }
  return null
}

export default function GrammarMap() {
  const navigate = useNavigate()
  const location = useLocation()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const scrollTo = params.get('scrollTo')
    if (!scrollTo) {
      window.scrollTo(0, 0)
      return
    }
    window.scrollTo(0, 0)
    const timer = setTimeout(() => {
      const el = document.getElementById(`ch-${scrollTo}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 150)
    return () => clearTimeout(timer)
  }, [location.search])

  const handleCardClick = (chapter) => {
    if (String(chapter.id).startsWith('r')) {
      navigate(`/grammar/ch/${chapter.id}/quiz`)
      return
    }
    setSelected(chapter)
  }

  const handleSearchClick = (chapter) => {
    if (String(chapter.id).startsWith('r')) {
      navigate(`/grammar/ch/${chapter.id}/quiz`)
      return
    }
    const sectionId = findMatchingSection(chapter.id, query.trim())
    const url = sectionId
      ? `/grammar/ch/${chapter.id}?scrollTo=${sectionId}`
      : `/grammar/ch/${chapter.id}`
    navigate(url)
  }

  const searchResults = useMemo(() => {
    if (!query.trim()) return null
    const pool = [...ALL_CHAPTERS, ...REVIEWS]
    return pool.filter(ch => matchQuery(ch, query.trim()))
  }, [query])

  const filtered = useMemo(() => {
    if (filter === 'review') return null
    if (filter === 'all') return TIERS
    return TIERS.map(t => ({ ...t, chapters: t.chapters.filter(c => c.diff === filter) })).filter(t => t.chapters.length > 0)
  }, [filter])

  return (
    <main>
      <HeroBanner title="英文文法學習地圖" subtitle="16 章系統・五層架構・從句子骨架到修辭精修・全面涵蓋學測文法核心" />
      <div className={styles.content}>
        <div className={styles.toolbar}>
          <FilterBar active={filter} onChange={f => { setFilter(f); setQuery('') }} />
        </div>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="搜尋章節、標籤…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key !== 'Enter') return
              const results = [...ALL_CHAPTERS, ...REVIEWS].filter(ch => matchQuery(ch, query.trim()))
              if (!results.length) return
              const first = results[0]
              if (String(first.id).startsWith('r')) {
                navigate(`/grammar/ch/${first.id}/quiz`)
              } else {
                const sectionId = findMatchingSection(first.id, query.trim())
                navigate(sectionId ? `/grammar/ch/${first.id}?scrollTo=${sectionId}` : `/grammar/ch/${first.id}`)
              }
            }}
          />
          {query && (
            <button className={styles.searchClear} onClick={() => setQuery('')}>✕</button>
          )}
        </div>

        {searchResults && (
          <div>
            <div className={styles.searchMeta}>
              找到 <strong>{searchResults.length}</strong> 個結果
            </div>
            {searchResults.length > 0 ? (
              <div className={styles.grid}>
                {searchResults.map((ch, i) => (
                  <div key={ch.id} className={styles.cardWrap} style={{ animationDelay: `${i * 40}ms` }}>
                    <ChapterCard chapter={ch} onClick={handleSearchClick} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.searchEmpty}>找不到符合「{query}」的章節</div>
            )}
          </div>
        )}

        {!searchResults && filter === 'review' && (
          <section>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewBadge}>REVIEW</span>
              <h2 className={styles.reviewLabel}>複習關卡</h2>
              <div className={styles.reviewRule} />
              <span className={styles.reviewCount}>5 關</span>
            </div>
            <div className={styles.grid}>
              {REVIEWS.map((rv, i) => (
                <div key={rv.id} id={`ch-${rv.id}`} className={styles.cardWrap} style={{ animationDelay: `${i * 55}ms` }}>
                  <ChapterCard chapter={rv} onClick={handleCardClick} />
                </div>
              ))}
            </div>
          </section>
        )}
        {!searchResults && filtered && filtered.map((tier, ti) => (
          <TierSection key={tier.key} tier={tier} chapters={tier.chapters} reviewCard={filter === 'all' ? REVIEWS[ti] : null} onCardClick={handleCardClick} />
        ))}
      </div>
      {selected && <ChapterModal chapter={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}
