import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PatternDetail from '../components/grammar/PatternDetail'

const patternModules = import.meta.glob('../data/patterns/*.json')

export default function GrammarPattern() {
  const { code } = useParams()
  const [rawPattern, setRawPattern] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setRawPattern(null)
    const key = `../data/patterns/${code}.json`
    const loader = patternModules[key]
    if (loader) {
      loader().then(m => {
        setRawPattern(m.default ?? m)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [code])

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#888', fontSize: '16px' }}>載入中…</p>
      </div>
    )
  }

  if (!rawPattern) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: '#555', fontSize: '18px', fontWeight: 600 }}>找不到句型「{code}」</p>
        <Link
          to="/grammar"
          style={{ color: '#2E6FA3', fontWeight: 600, textDecoration: 'none', fontSize: '15px' }}
        >
          ← 回到句型列表
        </Link>
      </div>
    )
  }

  return <PatternDetail rawPattern={rawPattern} />
}
