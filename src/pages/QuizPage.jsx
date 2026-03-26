import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { TIERS, REVIEWS } from '../data/chapters'
import { QUIZ_DATA } from '../data/quizData'
import styles from './QuizPage.module.css'

// ── 工具 ──────────────────────────────────────────────────────────
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

const DIFF_STYLE = {
  base: { color: '#0a5e47', border: 'rgba(13,122,95,0.3)',  bg: 'rgba(13,122,95,0.08)',  label: '基礎' },
  mid:  { color: '#7a5000', border: 'rgba(153,101,0,0.3)',  bg: 'rgba(153,101,0,0.08)',  label: '中等' },
  hot:  { color: '#8c1c26', border: 'rgba(181,38,52,0.3)',  bg: 'rgba(181,38,52,0.08)',  label: '高頻' },
}

const OPT_LABELS = ['A', 'B', 'C', 'D']

// ── 題目卡（選擇題 + 填空題）────────────────────────────────────
function QuestionCard({ q, index, total, accent, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [inputVal, setInputVal] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)

  const DIFF_LABEL = { base: '基礎', mid: '中等', hot: '🔥 高頻' }
  const DIFF_COLOR = { base: '#0d7a5f', mid: '#e8a838', hot: '#b52634' }

  // 單選題處理
  const handleSelect = (i) => {
    if (selected !== null) return
    setSelected(i)
    onAnswer(i === q.answer)
  }

  // 填空題處理
  const normalizeFill = (s) =>
    s.toLowerCase().trim()
      .replace(/[\u2018\u2019\u201A\u201B\u2032]/g, "'")
      .replace(/\s*[/,]\s*/g, '/').replace(/\s+/g, ' ')

  const fillMatches = (accepted, input) => {
    const a = normalizeFill(accepted)
    const b = normalizeFill(input)
    return a === b || a.replace(/\//g, ' ') === b
  }

  const handleSubmitFill = () => {
    if (submitted || !inputVal.trim()) return
    const accepted = q.acceptedAnswers ?? [q.answer]
    const correct = accepted.some(a => fillMatches(a, inputVal))
    setSubmitted(true)
    onAnswer(correct)
  }

  const accepted = q.acceptedAnswers ?? [q.answer]
  const fillCorrect = submitted && accepted.some(a => fillMatches(a, inputVal))
  const isAnswered  = q.type === 'single' ? selected !== null : submitted
  const isCorrect   = q.type === 'single' ? selected === q.answer : fillCorrect

  return (
    <div className={styles.qCard}>
      <div className={styles.qTop}>
        <div className={styles.qMeta}>
          <span className={styles.qNum} style={{ color: accent }}>第 {index + 1} 題 / {total}</span>
          <span className={styles.qDiff} style={{ color: DIFF_COLOR[q.difficulty], borderColor: DIFF_COLOR[q.difficulty] + '44', background: DIFF_COLOR[q.difficulty] + '10' }}>
            {DIFF_LABEL[q.difficulty]}
          </span>
          <span className={styles.qType} style={q.type === 'fill'
            ? { color: '#6b2fa0', borderColor: '#6b2fa044', background: '#6b2fa010' }
            : { color: '#1a5fb4', borderColor: '#1a5fb444', background: '#1a5fb410' }}>
            {q.type === 'fill' ? '✏️ 填空' : '☑️ 選擇'}
          </span>
          {q.source && <span className={styles.qSource}>{q.source}</span>}
        </div>
        <p className={styles.qStem} style={{ whiteSpace: 'pre-line' }}>{q.stem}</p>
      </div>

      {/* 單選題 */}
      {q.type === 'single' && (
        <div className={styles.options}>
          {q.options.map((opt, i) => {
            let optClass = styles.option
            if (selected !== null) {
              if (i === q.answer) optClass = `${styles.option} ${styles.correct}`
              else if (i === selected && i !== q.answer) optClass = `${styles.option} ${styles.wrong}`
              else optClass = `${styles.option} ${styles.dim}`
            }
            return (
              <button key={i} className={optClass} onClick={() => handleSelect(i)} disabled={selected !== null}
                style={selected === null ? { '--hover-border': accent } : {}}>
                <span className={styles.optLabel}>{OPT_LABELS[i]}</span>
                <span className={styles.optText}>{opt}</span>
                {selected !== null && i === q.answer && <span className={styles.optIcon}>✓</span>}
                {selected !== null && i === selected && i !== q.answer && <span className={styles.optIcon}>✗</span>}
              </button>
            )
          })}
        </div>
      )}

      {/* 填空題 */}
      {q.type === 'fill' && (
        <div className={styles.fillArea}>
          {q.hint && !submitted && (
            <div className={styles.fillHint}>💡 提示：{q.hint}</div>
          )}
          <div className={styles.fillInputRow}>
            <input
              className={`${styles.fillInput} ${submitted ? (fillCorrect ? styles.fillCorrect : styles.fillWrong) : ''}`}
              style={submitted ? {} : { '--focus-color': accent }}
              type="text"
              placeholder="輸入你的答案..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSubmitFill() }}
              disabled={submitted}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
            {!submitted ? (
              <button
                className={styles.fillBtn}
                style={{ background: accent }}
                onClick={handleSubmitFill}
                disabled={!inputVal.trim()}
              >
                確認
              </button>
            ) : (
              <div className={`${styles.fillResult} ${fillCorrect ? styles.fillResultCorrect : styles.fillResultWrong}`}>
                {fillCorrect ? '✓ 正確' : '✗ 答錯'}
              </div>
            )}
          </div>
          {submitted && !fillCorrect && (
            <div className={styles.fillAnswer} style={{ borderColor: accent + '44', background: accent + '08' }}>
              <span style={{ color: accent }}>正確答案：</span>
              <strong style={{ color: accent }}>{accepted[0]}</strong>
            </div>
          )}
        </div>
      )}

      {/* 回饋區 */}
      {isAnswered && (
        <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}>
          <div className={styles.feedbackMain}>
            <span className={styles.feedbackIcon}>{isCorrect ? '🎉' : '💡'}</span>
            <div>
              <span className={styles.feedbackText}>
                {isCorrect
                  ? q.quick_feedback
                  : q.type === 'single'
                    ? `答錯了！正確答案是 ${OPT_LABELS[q.answer]}。`
                    : '沒關係！看看正確答案，再想想為什麼 🤔'}
              </span>
              {q.stemZh && (
                <div className={styles.stemZhInline} dangerouslySetInnerHTML={{ __html: `📖 中譯：${q.stemZh}` }} />
              )}
            </div>
          </div>
          <button className={styles.analysisToggle} onClick={() => setShowAnalysis(o => !o)}
            style={{ color: accent, borderColor: accent + '44', background: accent + '08' }}>
            📖 {showAnalysis ? '收起解析' : '看詳細解析'} {showAnalysis ? '▲' : '▼'}
          </button>
          {showAnalysis && (
            <div className={styles.analysis}>
              <div className={styles.analysisSection}>
                <div className={styles.analysisLabel} style={{ color: accent }}>✅ 解析</div>
                <p className={styles.analysisText}>{q.analysis.why_correct}</p>
              </div>
              {q.type === 'single' && q.analysis.why_wrong && (
                <div className={styles.analysisSection}>
                  <div className={styles.analysisLabel} style={{ color: '#b52634' }}>❌ 錯誤選項分析</div>
                  {Object.entries(q.analysis.why_wrong).map(([k, v]) => (
                    <div key={k} className={styles.wrongItem}>
                      <span className={styles.wrongLabel}>選項 {OPT_LABELS[parseInt(k)]}：</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.analysisTip} style={{ borderColor: accent + '44', background: accent + '08' }}>
                <span style={{ color: accent }}>💡 記憶小技巧：</span>{q.analysis.tip}
              </div>
              <div className={styles.analysisPoint}>
                考點：<span style={{ color: accent }}>{q.analysis.grammar_point}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── 結果畫面 ──────────────────────────────────────────────────────
function ResultScreen({ score, total, accent, chapterId, onRetry }) {
  const navigate = useNavigate()
  const pct = Math.round((score / total) * 100)

  const emoji = pct === 100 ? '🏆' : pct >= 80 ? '🎉' : pct >= 60 ? '📚' : '💪'
  const msg   = pct === 100
    ? '滿分！你已完全掌握這個章節的文法概念！'
    : pct >= 80
    ? '非常棒！只差一點點就完美了，再確認一下錯的題目。'
    : pct >= 60
    ? '還不錯！建議回到學習頁複習錯誤的部分再挑戰。'
    : '繼續加油！多看幾遍學習內容，你一定可以的！'

  return (
    <div className={styles.result}>
      <div className={styles.resultEmoji}>{emoji}</div>
      <div className={styles.resultTitle}>練習完成！</div>
      <div className={styles.resultScore}>
        <span className={styles.resultNum} style={{ color: accent }}>{score}</span>
        <span className={styles.resultDenom}> / {total}</span>
      </div>
      <div className={styles.resultPct} style={{ color: accent }}>{pct}%</div>
      <div className={styles.resultBar}>
        <div className={styles.resultBarFill} style={{ width: `${pct}%`, background: accent }} />
      </div>
      <p className={styles.resultSub}>{msg}</p>
      <div className={styles.resultActions}>
        <button className={styles.retryBtn} style={{ background: accent }} onClick={onRetry}>
          🔄 再練一次
        </button>
        <button className={styles.reviewBtn} onClick={() => navigate(String(chapterId).startsWith('r') ? '/grammar' : `/grammar/ch/${chapterId}`)}>
          {String(chapterId).startsWith('r') ? '← 回到文法地圖' : '📖 回到學習頁'}
        </button>
        <Link to={`/grammar?scrollTo=${chapterId}`} className={styles.mapBtn}>← 返回文法地圖</Link>
      </div>
    </div>
  )
}

// ── 主元件 ────────────────────────────────────────────────────────
export default function QuizPage() {
  const { id } = useParams()
  const isReview = String(id).startsWith('r')
  const result   = findChapter(id)
  const quizData = QUIZ_DATA[parseInt(id)] || QUIZ_DATA[id]

  const [answers, setAnswers]       = useState([])
  const [showResult, setShowResult] = useState(false)
  const [cardKey, setCardKey]       = useState(0)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!result) {
    return (
      <div className={styles.notFound}>
        <p>找不到章節 {id}</p>
        <Link to="/grammar" style={{ color: 'var(--primary)' }}>← 返回文法地圖</Link>
      </div>
    )
  }

  const { chapter } = result

  if (!quizData) {
    return (
      <div className={styles.comingSoon}>
        <div className={styles.comingSoonInner}>
          <div style={{ color: chapter.accent, fontFamily: 'Space Mono', fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>
            {chapter.num}
          </div>
          <h1 style={{ fontFamily: 'Noto Serif TC', fontSize: 26, fontWeight: 900, marginBottom: 12 }}>
            {chapter.title}
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>練習題正在建置中，敬請期待 🚧</p>
          <Link to={`/grammar/ch/${id}`} style={{ color: chapter.accent }}>← 回到學習頁</Link>
        </div>
      </div>
    )
  }

  const singleCount   = quizData.questions.filter(q => q.type === 'single').length
  const fillCount     = quizData.questions.filter(q => q.type === 'fill').length
  const answeredCount = answers.filter(a => a !== undefined).length
  const correctCount  = answers.filter(a => a === true).length
  const allAnswered   = answeredCount === quizData.questions.length

  const handleAnswer = (qIndex, isCorrect) => {
    setAnswers(prev => {
      const next = [...prev]
      next[qIndex] = isCorrect
      return next
    })
  }

  const handleRetry = () => {
    setAnswers([])
    setShowResult(false)
    setCardKey(k => k + 1)
    window.scrollTo(0, 0)
  }

  const descParts = []
  if (singleCount) descParts.push(`${singleCount} 題選擇題`)
  if (fillCount)   descParts.push(`${fillCount} 題填空題`)

  return (
    <div className={styles.page}>

      <div className={styles.topBar} style={{ borderBottomColor: chapter.accent + '33' }}>
        <div className={styles.topInner}>
          <nav className={styles.breadcrumb}>
            <Link to={`/grammar?scrollTo=${id}`} className={styles.breadLink}>文法地圖</Link>
            <span className={styles.breadSep}>›</span>
            {isReview ? (
              <span className={styles.breadCurrent}>REVIEW {id.slice(1)} {quizData.title}</span>
            ) : (
              <>
                <Link to={`/grammar/ch/${id}`} className={styles.breadLink}>{chapter.num} {chapter.title}</Link>
                <span className={styles.breadSep}>›</span>
                <span className={styles.breadCurrent}>練習題</span>
              </>
            )}
          </nav>
          <div className={styles.progress}>
            <span className={styles.progressText} style={{ color: chapter.accent }}>
              {answeredCount} / {quizData.questions.length}
            </span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(answeredCount / quizData.questions.length) * 100}%`, background: chapter.accent }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {!showResult ? (
          <>
            <div className={styles.header}>
              <div className={styles.headerNum} style={{ color: chapter.accent }}>
                {chapter.num} · 互動練習
              </div>
              <h1 className={styles.headerTitle}>{chapter.title}</h1>
              <p className={styles.headerDesc}>
                {descParts.join(' + ')} · 即時顯示解析
              </p>
            </div>

            <div className={styles.questions} key={cardKey}>
              {quizData.questions.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  q={q}
                  index={i}
                  total={quizData.questions.length}
                  accent={chapter.accent}
                  onAnswer={(isCorrect) => handleAnswer(i, isCorrect)}
                />
              ))}
            </div>

            {allAnswered && (
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <button
                  style={{
                    background: chapter.accent, color: '#fff',
                    padding: '14px 44px', borderRadius: 10, border: 'none',
                    fontSize: 16, fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  }}
                  onClick={() => { setShowResult(true); window.scrollTo(0, 0) }}
                >
                  查看成績 →
                </button>
              </div>
            )}
          </>
        ) : (
          <ResultScreen
            score={correctCount}
            total={quizData.questions.length}
            accent={chapter.accent}
            chapterId={id}
            onRetry={handleRetry}
          />
        )}
      </div>
    </div>
  )
}
