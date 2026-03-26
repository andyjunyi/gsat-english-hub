import ChapterCard from './ChapterCard'
import styles from './TierSection.module.css'
export default function TierSection({ tier, chapters, reviewCard, onCardClick }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge} style={{ color: tier.color, borderColor: tier.bd, background: tier.bg }}>{tier.shortLabel}</span>
        <h2 className={styles.label}>{tier.label}</h2>
        <div className={styles.rule} />
        <span className={styles.count}>{chapters.length} 章</span>
      </div>
      <div className={styles.grid}>
        {chapters.map((ch, i) => (
          <div key={ch.id} id={`ch-${ch.id}`} className={styles.cardWrap} style={{ animationDelay: `${i * 55}ms` }}>
            <ChapterCard chapter={ch} onClick={onCardClick} />
          </div>
        ))}
        {reviewCard && (
          <div id={`ch-${reviewCard.id}`} className={styles.cardWrap} style={{ animationDelay: `${chapters.length * 55}ms` }}>
            <ChapterCard chapter={reviewCard} onClick={onCardClick} />
          </div>
        )}
      </div>
    </section>
  )
}
