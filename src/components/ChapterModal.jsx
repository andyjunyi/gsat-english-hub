import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ChapterModal.module.css'
import { CHAPTER_CONTENT } from '../data/chapterContent'

const DIFF_COLORS = {
  hot:    { color: '#8c1c26', border: 'rgba(181,38,52,0.30)',  bg: 'rgba(181,38,52,0.07)' },
  mid:    { color: '#7a5000', border: 'rgba(153,101,0,0.30)',  bg: 'rgba(153,101,0,0.07)' },
  base:   { color: '#0a5e47', border: 'rgba(13,122,95,0.28)',  bg: 'rgba(13,122,95,0.07)' },
  review: { color: '#0c4e82', border: 'rgba(18,101,168,0.28)', bg: 'rgba(18,101,168,0.07)' },
}

function Stars({ count, total = 5 }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={styles.star}>{i < count ? '★' : '☆'}</span>
      ))}
      <span className={styles.starsLabel}>難度 {count}/{total}</span>
    </div>
  )
}

export default function ChapterModal({ chapter, onClose }) {
  const overlayRef = useRef(null)
  const navigate = useNavigate()
  const [sectionsOpen, setSectionsOpen] = useState(true)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  if (!chapter) return null

  const diff = DIFF_COLORS[chapter.diff] ?? DIFF_COLORS.base
  const accent = chapter.accent

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={e => e.target === overlayRef.current && onClose()}>
      <div className={styles.modal}>
        <div className={styles.topBar} style={{ background: accent }} />

        {/* 標頭 */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrow} style={{ color: accent }}>{chapter.num}</div>
            <h2 className={styles.title}>{chapter.title}</h2>
            {chapter.stars && <Stars count={chapter.stars} />}
          </div>
          <div className={styles.headerRight}>
            <span
              className={styles.diffPill}
              style={{ color: diff.color, borderColor: diff.border, background: diff.bg }}
            >
              {chapter.diffLabel}
            </span>
            <button className={styles.closeBtn} onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Tags + 預估時間 */}
        <div className={styles.tags}>
          {chapter.tags.map(t => (
            <span key={t} className={styles.tag} style={{ borderColor: accent + '55', color: accent }}>{t}</span>
          ))}
          {chapter.estimatedTime && (
            <span className={styles.timeTag}>⏱ {chapter.estimatedTime}</span>
          )}
        </div>

        {/* 簡介 */}
        <p className={styles.desc}>{chapter.desc}</p>

        {/* 重點預覽 */}
        {chapter.highlights?.length > 0 && (
          <div className={styles.highlights}>
            {chapter.highlights.map((h, i) => (
              <div key={i} className={styles.highlightItem}>
                <span className={styles.highlightDot} style={{ background: accent }} />
                {h}
              </div>
            ))}
          </div>
        )}

        {/* 學習節點（可收合） */}
        {(() => {
          const contentSections = CHAPTER_CONTENT[chapter.id]?.sections
          const sectionTitles = contentSections
            ? contentSections.map(s => s.title)
            : chapter.sections
          return (
            <div className={styles.sectionBlock}>
              <button
                className={styles.sectionToggle}
                style={{ borderColor: accent + '55' }}
                onClick={() => setSectionsOpen(o => !o)}
              >
                <span className={styles.blockLabel} style={{ color: accent }}>📚 學習節點 · {sectionTitles.length} 節</span>
                <span className={`${styles.chevron} ${sectionsOpen ? styles.open : ''}`}>▾</span>
              </button>
              {sectionsOpen && (
                <ul className={styles.sectionList}>
                  {sectionTitles.map((s, i) => (
                    <li key={i} className={styles.sectionItem}>
                      <span className={styles.sectionNum} style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</span>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })()}

        {/* 相關章節 */}
        {chapter.related?.length > 0 && (
          <div className={styles.related}>
            <span className={styles.blockLabel} style={{ color: '#94a3b8' }}>相關章節</span>
            <div className={styles.relatedPills}>
              {chapter.related.map(id => (
                <span
                  key={id}
                  className={styles.relatedPill}
                  style={{ color: accent, borderColor: accent + '55' }}
                >
                  CH.{String(id).padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 進度條 */}
        <div className={styles.progRow}>
          <span className={styles.progLabel}>學習進度</span>
          <span className={styles.progPct}>0%</span>
        </div>
        <div className={styles.progTrack}>
          <div className={styles.progFill} style={{ background: accent }} />
        </div>

        {/* CTA */}
        <div className={styles.actions}>
          <button className={styles.btnPrimary} style={{ background: accent }} onClick={() => { onClose(); navigate(`/grammar/ch/${chapter.id}`) }}>
            📖 開始學習
          </button>
          <button className={styles.btnGhost} onClick={() => { onClose(); navigate(`/grammar/ch/${chapter.id}/quiz`) }}>✏️ 直接練習</button>
          <button className={styles.btnBookmark} title="加入書籤">🔖</button>
        </div>
      </div>
    </div>
  )
}
