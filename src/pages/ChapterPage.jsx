import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { TIERS, REVIEWS } from '../data/chapters'
import { CHAPTER_CONTENT } from '../data/chapterContent'
import styles from './ChapterPage.module.css'

function findChapter(id) {
  const numId = parseInt(id)
  for (const tier of TIERS) {
    const ch = tier.chapters.find(c => c.id === numId || c.id === id)
    if (ch) return { chapter: ch, tier }
  }
  const review = REVIEWS.find(r => r.id === id)
  if (review) return { chapter: review, tier: { color: '#1265a8', bg: 'rgba(18,101,168,0.08)', bd: 'rgba(18,101,168,0.38)', shortLabel: 'R', label: '複習關卡 · 綜合複習' } }
  return null
}

const CH04_MODALS = [
  "needn't have", "can't have", "couldn't have", "shouldn't have", "wouldn't have", "mightn't have",
  "must have", "may have", "might have", "would have", "could have", "should have", "will have",
  "will be able to", "be able to",
  "had better not", "had better",
  "would rather",
  "may well",
  "are used to", "were used to", "am used to", "is used to", "used to",
  "ought not to", "ought to",
  "must not",
  "don't have to", "doesn't have to", "didn't have to",
  "cannot", "can't", "couldn't", "wouldn't", "shouldn't", "mustn't", "won't", "mightn't",
  "haven't", "hasn't", "hadn't", "don't", "doesn't", "didn't", "needn't", "daren't",
  "must", "can", "could", "will", "would", "shall", "should", "may", "might", "need", "dare",
  "does", "did", "do", "has", "had", "have",
]

function highlightText(text, ex, chapterId) {
  const lines = text.split('\n')
  const result = []

  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) result.push(<br key={`br-${lineIdx}`} />)

    let segments = [{ text: line, type: 'plain' }]

    const autoPhrases = parseInt(chapterId) === 4 ? CH04_MODALS : []
    const allPhrases = [...(ex.highlightPhrases || []), ...autoPhrases]

    if (allPhrases.length > 0) {
      for (const phrase of allPhrases) {
        const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const pattern = new RegExp(`(${escaped})`, 'gi')
        segments = segments.flatMap(seg => {
          if (seg.type !== 'plain') return [seg]
          return seg.text.split(pattern).map(part => ({
            text: part,
            type: part.toLowerCase() === phrase.toLowerCase() ? 'verb' : 'plain',
          }))
        })
      }
    }

    if (ex.highlightSubject) {
      const phrase = ex.highlightSubject
      const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const pattern = new RegExp(`(${escaped})`, 'i')
      segments = segments.flatMap(seg => {
        if (seg.type !== 'plain') return [seg]
        return seg.text.split(pattern).map(part => ({
          text: part,
          type: part.toLowerCase() === phrase.toLowerCase() ? 'subject' : 'plain',
        }))
      })
    }

    if (ex.highlightObject && ex.highlightObject.length > 0) {
      const escaped = ex.highlightObject.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')
      segments = segments.flatMap(seg => {
        if (seg.type !== 'plain') return [seg]
        return seg.text.split(pattern).map(part => ({
          text: part,
          type: ex.highlightObject.some(w => w.toLowerCase() === part.toLowerCase()) ? 'object' : 'plain',
        }))
      })
    }

    if (ex.highlightBlue && ex.highlightBlue.length > 0) {
      const escaped = ex.highlightBlue.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')
      segments = segments.flatMap(seg => {
        if (seg.type !== 'plain') return [seg]
        return seg.text.split(pattern).map(part => ({
          text: part,
          type: ex.highlightBlue.some(w => w.toLowerCase() === part.toLowerCase()) ? 'blue' : 'plain',
        }))
      })
    }

    if (ex.highlight && ex.highlight.length > 0) {
      const escaped = ex.highlight.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')
      segments = segments.flatMap(seg => {
        if (seg.type !== 'plain') return [seg]
        return seg.text.split(pattern).map(part => ({
          text: part,
          type: ex.highlight.some(w => w.toLowerCase() === part.toLowerCase()) ? 'verb' : 'plain',
        }))
      })
    }

    if (ex.highlightVerb && ex.highlightVerb.length > 0) {
      const escaped = ex.highlightVerb.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')
      segments = segments.flatMap(seg => {
        if (seg.type !== 'plain') return [seg]
        return seg.text.split(pattern).map(part => ({
          text: part,
          type: ex.highlightVerb.some(w => w.toLowerCase() === part.toLowerCase()) ? 'verbGreen' : 'plain',
        }))
      })
    }

    segments.forEach((seg, i) => {
      if (!seg.text) return
      if (seg.type === 'subject') result.push(<span key={`${lineIdx}-${i}-s`} className={styles.highlightSubject}>{seg.text}</span>)
      else if (seg.type === 'object') result.push(<span key={`${lineIdx}-${i}-o`} className={styles.highlightSubject}>{seg.text}</span>)
      else if (seg.type === 'blue') result.push(<span key={`${lineIdx}-${i}-b`} className={styles.highlightBlue}>{seg.text}</span>)
      else if (seg.type === 'verbGreen') result.push(seg.text)
      else if (seg.type === 'verb') result.push(<span key={`${lineIdx}-${i}-v`} className={parseInt(chapterId) === 13 ? styles.highlightAdj : (parseInt(chapterId) === 8 || parseInt(chapterId) === 3 || parseInt(chapterId) === 4 || parseInt(chapterId) === 6 || parseInt(chapterId) === 7) ? styles.highlightRed : parseInt(chapterId) === 15 ? styles.highlightPrep : styles.highlightVerb}>{seg.text}</span>)
      else result.push(seg.text)
    })
  })

  return result
}

function ExampleCard({ ex, chapterId }) {
  const parts = ex.en.split(' → ')
  const enContent = ex.enHtml
    ? <span dangerouslySetInnerHTML={{ __html: ex.en }} />
    : parts.length === 2
    ? (
      <>
        <span>{highlightText(parts[0], ex, chapterId)}</span>
        <span style={{ display: 'block', paddingLeft: '1rem', color: '#4f6ef7' }}>→ {highlightText(parts[1], ex, chapterId)}</span>
      </>
    )
    : highlightText(ex.en, ex, chapterId)
  const zhContent = ex.highlightZhPhrases
    ? highlightText(ex.zh, { highlightPhrases: ex.highlightZhPhrases }, chapterId)
    : null
  return (
    <div className={styles.exCard}>
      <div className={styles.exEn}>{enContent}</div>
      {zhContent
        ? <div className={styles.exZh}>{zhContent}</div>
        : <div className={styles.exZh} dangerouslySetInnerHTML={{ __html: ex.zh }} />
      }
      {ex.note && <div className={styles.exNote} dangerouslySetInnerHTML={{ __html: '📌 ' + ex.note }} />}
    </div>
  )
}

function ReviewItem({ item, accent, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.reviewItem} ${open ? styles.reviewItemOpen : ''}`}
      style={open ? { borderColor: accent + '55', background: accent + '06' } : {}}>
      <button className={styles.reviewQ} onClick={() => setOpen(o => !o)}>
        <span className={styles.reviewNum} style={{ color: accent, borderColor: accent + '55', background: accent + '12' }}>{index + 1}</span>
        <span className={styles.reviewQText}>{item.q}</span>
        <span className={`${styles.reviewChevron} ${open ? styles.reviewChevronOpen : ''}`} style={open ? { color: accent } : {}}>▾</span>
      </button>
      {open && (
        <div className={styles.reviewA} style={{ borderTopColor: accent + '33' }}>
          <span className={styles.reviewAIcon} style={{ color: accent }}>→</span>
          <span className={styles.reviewAText}>{item.a}</span>
        </div>
      )}
    </div>
  )
}

function IrregularVerbsTable({ verbs }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.irregularBox}>
      <button className={styles.irregularToggle} onClick={() => setOpen(o => !o)}>
        📋 常見不規則動詞表（{verbs.length} 個）{open ? ' ▲' : ' ▼'}
      </button>
      {open && (
        <div className={styles.irregularTable}>
          <div className={styles.irregularHeader}>
            <span>原形</span>
            <span>過去式</span>
            <span>過去分詞</span>
            <span>中文</span>
          </div>
          {verbs.map(v => (
            <div key={v.base} className={styles.irregularRow}>
              <span className={styles.verbBase}>{v.base}</span>
              <span className={styles.verbPast}>{v.past}</span>
              <span className={styles.verbPp}>{v.pp}</span>
              <span className={styles.verbZh}>{v.zh}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SectionBlock({ section, accent, isActive, chapterId }) {
  return (
    <div id={section.id} className={`${styles.sectionBlock} ${isActive ? styles.sectionActive : ''}`} style={{ '--accent': accent }}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionIcon}>{section.icon}</span>
        <h2 className={styles.sectionTitle}>{section.title}</h2>
      </div>
      <p className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: section.body }} />
      {section.id === 's1' && parseInt(chapterId) === 6 && (
        <div className={styles.timelineBox}>
          <div className={styles.timelineTitle}>⏱️ 時態後退圖解</div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineLabel} style={{ color: accent }}>① 與「現在」相反 → 動詞用過去式</div>
            <svg viewBox="0 0 400 80" className={styles.timelineSvg}>
              <defs>
                <marker id="arrow1" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#4f6ef7"/>
                </marker>
              </defs>
              <line x1="20" y1="45" x2="370" y2="45" stroke="#dde3ef" strokeWidth="2"/>
              <polygon points="370,41 380,45 370,49" fill="#dde3ef"/>
              <circle cx="110" cy="45" r="5" fill="#bbb"/>
              <circle cx="220" cy="45" r="8" fill="#e07b6a"/>
              <circle cx="320" cy="45" r="8" fill="#4f6ef7"/>
              <path d="M 315 37 Q 265 8 225 37" fill="none" stroke="#4f6ef7" strokeWidth="2.5" markerEnd="url(#arrow1)"/>
              <text x="110" y="68" textAnchor="middle" fontSize="12" fill="#999">過去完成</text>
              <text x="220" y="68" textAnchor="middle" fontSize="13" fill="#e07b6a" fontWeight="bold">過去</text>
              <text x="320" y="68" textAnchor="middle" fontSize="13" fill="#4f6ef7" fontWeight="bold">現在</text>
            </svg>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineLabel} style={{ color: accent }}>② 與「過去」相反 → 動詞用過去完成式</div>
            <svg viewBox="0 0 400 80" className={styles.timelineSvg}>
              <defs>
                <marker id="arrow2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#e07b6a"/>
                </marker>
              </defs>
              <line x1="20" y1="45" x2="370" y2="45" stroke="#dde3ef" strokeWidth="2"/>
              <polygon points="370,41 380,45 370,49" fill="#dde3ef"/>
              <circle cx="110" cy="45" r="8" fill="#4f6ef7"/>
              <circle cx="220" cy="45" r="8" fill="#e07b6a"/>
              <circle cx="320" cy="45" r="5" fill="#bbb"/>
              <path d="M 215 37 Q 165 8 118 37" fill="none" stroke="#e07b6a" strokeWidth="2.5" markerEnd="url(#arrow2)"/>
              <text x="110" y="68" textAnchor="middle" fontSize="13" fill="#4f6ef7" fontWeight="bold">過去完成</text>
              <text x="220" y="68" textAnchor="middle" fontSize="13" fill="#e07b6a" fontWeight="bold">過去</text>
              <text x="320" y="68" textAnchor="middle" fontSize="12" fill="#999">現在</text>
            </svg>
          </div>

          <div className={styles.timelineSummary}>
            💡 <strong>核心概念：</strong>假設語氣就是把動詞的時態「往過去後退一個時間點」——說現在的假設用過去式，說過去的假設用過去完成式。
          </div>
        </div>
      )}
      {section.formula && (() => {
        const formulaLines = section.formula.split('\n')
        const examples = section.examples || []
        const hasFormulaIndex = examples.some(ex => ex.formulaIndex !== undefined)
        return (
          <div className={styles.formulaPairs}>
            <div className={styles.formulaPairsLabel} style={{ color: accent }}>📐 公式</div>
            {formulaLines.map((line, i) => (
              <div key={i} className={styles.formulaPair}>
                <div className={styles.formulaPairLine} style={{ color: accent, background: accent + '0d' }} dangerouslySetInnerHTML={{ __html: line }} />
                {hasFormulaIndex
                  ? examples.filter(ex => ex.formulaIndex === i).map((ex, j) => (
                      <ExampleCard key={j} ex={ex} chapterId={chapterId} />
                    ))
                  : examples[i] && <ExampleCard ex={examples[i]} chapterId={chapterId} />
                }
              </div>
            ))}
            {hasFormulaIndex
              ? examples.filter(ex => ex.formulaIndex === undefined).map((ex, i) => (
                  <ExampleCard key={`extra-${i}`} ex={ex} chapterId={chapterId} />
                ))
              : examples.slice(formulaLines.length).map((ex, i) => (
                  <ExampleCard key={`extra-${i}`} ex={ex} chapterId={chapterId} />
                ))
            }
          </div>
        )
      })()}
      {section.analogy && (
        <div className={styles.analogy}>
          <span className={styles.analogyIcon}>💬</span>
          <p className={styles.analogyText}>{section.analogy}</p>
        </div>
      )}
      {section.overview && (
        <div className={styles.examples}>
          <div className={styles.exLabel}>📐 結構大綱</div>
          <div className={styles.overviewGrid}>
            {section.overview.map((item, i) => (
              <div key={i} className={styles.overviewItem}>
                <div className={styles.overviewEn}>{item.en}</div>
                <div className={styles.overviewZh} dangerouslySetInnerHTML={{ __html: item.zh }} />
                <div className={styles.overviewNote}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!section.formula && section.examples?.length > 0 && (
        <div className={styles.examples}>
          <div className={styles.exLabel}>✏️ 例句</div>
          {section.examples.map((ex, i) => <ExampleCard key={i} ex={ex} chapterId={chapterId} />)}
        </div>
      )}
      {section.warning && (
        <div className={styles.warning}>
          <span className={styles.warningIcon}>⚠️</span>
          <div className={styles.warningContent}>
            {section.warning.split('\n').map((line, i) => {
              if (line.startsWith('✗')) {
                return <div key={i} className={styles.warningWrong}>{line}</div>
              } else if (line.startsWith('✓')) {
                return <div key={i} className={styles.warningRight} dangerouslySetInnerHTML={{
                __html: line.replace(/\b(is|are|was|were)\b/g, '<u><strong>$1</strong></u>')
              }} />
              }
              return <div key={i}>{line}</div>
            })}
          </div>
        </div>
      )}
      {section.irregularVerbs && (
        <IrregularVerbsTable verbs={section.irregularVerbs} />
      )}
    </div>
  )
}

export default function ChapterPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const result = findChapter(id)
  const content = CHAPTER_CONTENT[parseInt(id)] || CHAPTER_CONTENT[id]
  const [activeSection, setActiveSection] = useState(null)
  const [reviewOpen, setReviewOpen] = useState(false)

  useEffect(() => {
    const sectionId = new URLSearchParams(location.search).get('scrollTo')
    if (sectionId) {
      window.scrollTo(0, 0)
      const t = setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [id, location.search])

  useEffect(() => {
    if (!content) return
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    content.sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [content])

  if (!result) {
    return (
      <main className={styles.notFound}>
        <p>找不到章節 {id}</p>
        <Link to="/grammar">← 返回文法地圖</Link>
      </main>
    )
  }

  const { chapter, tier } = result

  if (!content) {
    if (id.startsWith('r')) {
      navigate(`/grammar/ch/${id}`)
      return null
    }
    return (
      <main className={styles.comingSoon}>
        <div className={styles.comingSoonInner}>
          <div className={styles.comingSoonNum} style={{ color: chapter.accent }}>{chapter.num}</div>
          <h1 className={styles.comingSoonTitle}>{chapter.title}</h1>
          <p className={styles.comingSoonDesc}>本章節內容正在準備中，敬請期待 🚧</p>
          <div className={styles.comingSoonTags}>
            {chapter.tags.map(t => <span key={t} className={styles.comingSoonTag} style={{ color: chapter.accent, borderColor: chapter.accent+'44' }}>{t}</span>)}
          </div>
          <Link to="/grammar" className={styles.backLink}>← 返回文法地圖</Link>
        </div>
      </main>
    )
  }

  const scrollTo = (sid) => {
    const el = document.getElementById(sid)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar} style={{ borderBottomColor: chapter.accent+'33' }}>
        <div className={styles.topInner}>
          <div className={styles.breadcrumb}>
            <Link to="/grammar" className={styles.breadLink}>文法地圖</Link>
            <span className={styles.breadSep}>›</span>
            <span className={styles.breadCurrent} style={{ color: chapter.accent }}>{chapter.num} {chapter.title}</span>
          </div>
          <div className={styles.topActions}>
            <span className={styles.tierBadge} style={{ color: tier.color, borderColor: tier.bd, background: tier.bg }}>
              {tier.shortLabel} {tier.label.split('·')[1]?.trim()}
            </span>
            <button className={styles.quizBtn} style={{ background: chapter.accent }} onClick={() => navigate(`/grammar/ch/${id}/quiz`)}>
              ✏️ 練習題
            </button>
          </div>
        </div>
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar} style={{ '--accent': chapter.accent }}>
          <div className={styles.sidebarInner}>
            <div className={styles.sidebarTitle} style={{ color: chapter.accent }}>{chapter.num}</div>
            <div className={styles.sidebarChTitle}>{chapter.title}</div>
            <div className={styles.sidebarDivider} style={{ background: chapter.accent+'33' }} />
            <nav className={styles.sidebarNav}>
              {content.sections.map((s, i) => (
                <button
                  key={s.id}
                  className={`${styles.navItem} ${activeSection === s.id ? styles.navActive : ''}`}
                  style={activeSection === s.id ? { color: chapter.accent } : {}}
                  onClick={() => scrollTo(s.id)}
                >
                  <span className={styles.navIcon}>{i + 1}</span>
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.chapterHero} style={{ '--accent': chapter.accent }}>
            <div className={styles.heroAccentBar} style={{ background: `linear-gradient(90deg, ${chapter.accent}, ${chapter.accent}88)` }} />
            <div className={styles.heroNum} style={{ color: chapter.accent }}>{chapter.num}</div>
            <h1 className={styles.heroTitle}>{chapter.title}</h1>
            <div className={styles.heroTags}>
              {chapter.tags.map(t => <span key={t} className={styles.heroTag} style={{ color: chapter.accent, borderColor: chapter.accent+'44' }}>{t}</span>)}
              {chapter.estimatedTime && <span className={styles.heroTime}>🕐 {chapter.estimatedTime}</span>}
            </div>
            <p className={styles.heroIntro}>{content.intro}</p>
          </div>

          {content.sections.map(s => (
            <SectionBlock key={s.id} section={s} accent={chapter.accent} isActive={activeSection === s.id} chapterId={id} />
          ))}

          <div className={styles.quickReview} style={{ borderColor: chapter.accent + '33' }}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewIcon}>📋</span>
              <div className={styles.reviewTitle} style={{ color: chapter.accent }}>快速複習 Q&A</div>
              <span className={styles.reviewSubtitle}>點題目看答案</span>
            </div>
            <div className={styles.reviewGrid}>
              {content.quickReview.map((item, i) => (
                <ReviewItem key={i} item={item} accent={chapter.accent} index={i} />
              ))}
            </div>
          </div>

          <div className={styles.bottomCta}>
            <p className={styles.ctaText}>🎉 讀完了嗎？來測試一下你的理解！</p>
            <button className={styles.ctaBtn} style={{ background: chapter.accent }} onClick={() => navigate(`/grammar/ch/${id}/quiz`)}>
              前往練習題 →
            </button>
            <Link to="/grammar" className={styles.ctaBack}>← 返回文法地圖</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
