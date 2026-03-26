import styles from './HeroBanner.module.css'
export default function HeroBanner({ title, subtitle, stats }) {
  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.sub}>{subtitle}</p>
        {stats && (
          <div className={styles.stats}>
            {stats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
