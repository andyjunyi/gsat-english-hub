import { useRef } from 'react'
import styles from './ChapterCard.module.css'
const diffClass = { hot: styles.hot, mid: styles.mid, base: styles.base, review: styles.rev }
export default function ChapterCard({ chapter, onClick }) {
  const cardRef = useRef(null)
  const handleMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%')
    cardRef.current.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%')
  }
  return (
    <article ref={cardRef} className={`${styles.card} ${chapter.isReview ? styles.isReview : ''}`} style={{ '--accent': chapter.accent, '--glow': chapter.glow }} onMouseMove={handleMouseMove} onClick={() => onClick(chapter)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClick(chapter)}>
      <div className={styles.topBar} />
      <div className={styles.shimmer} />
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.num}>{chapter.num}</div>
          <div className={styles.title}>{chapter.title}</div>
        </div>
        <span className={`${styles.pill} ${diffClass[chapter.diff]}`}>{chapter.diffLabel}</span>
      </div>
      <div className={styles.tags}>{chapter.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>
      <div className={styles.meta}><span className={styles.dot} />{chapter.meta}</div>
      <div className={styles.progLabel}><span>學習進度</span><span>0%</span></div>
      <div className={styles.progTrack}><div className={styles.progFill} /></div>
    </article>
  )
}
