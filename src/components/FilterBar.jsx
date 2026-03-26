import styles from './FilterBar.module.css'
const FILTERS = [
  { key: 'all', label: '全部章節' },
  { key: 'hot', label: '🔥 學測高頻' },
  { key: 'mid', label: '📘 中等難度' },
  { key: 'base', label: '✅ 基礎入門' },
  { key: 'review', label: '🔁 複習關卡' },
]
export default function FilterBar({ active, onChange }) {
  return (
    <div className={styles.bar}>
      {FILTERS.map(f => (
        <button key={f.key} className={`${styles.pill} ${active === f.key ? styles.active : ''}`} onClick={() => onChange(f.key)}>{f.label}</button>
      ))}
    </div>
  )
}
