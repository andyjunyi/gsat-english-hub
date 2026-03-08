import ScrollToTop from './ScrollToTop'
import PracticeSection from './PracticeSection'
import { highlightKeywords } from './highlight'

const BLUE = '#1F4E7A'
const GREEN = '#1F6B5A'
const NAVY = '#0F2547'

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

function normalize(raw) {
  /* Formulas */
  const formulas = Array.isArray(raw.formulas)
    ? raw.formulas.map((f, i) => ({
        formula: f.formula ?? '',
        zh: f.zh ?? '',
        label: f.label,
        color: f.color ?? (i === 0 ? BLUE : GREEN),
      }))
    : [
        ...(raw.formula_for
          ? [{ formula: raw.formula_for, zh: raw.formula_for_zh ?? '', label: 'for', color: BLUE }]
          : []),
        ...(raw.formula_of
          ? [{ formula: raw.formula_of, zh: raw.formula_of_zh ?? '', label: 'of', color: GREEN }]
          : []),
      ]

  /* Explanation sections */
  const explanationSections =
    typeof raw.explanation === 'string'
      ? [{ heading: '用法說明', text: raw.explanation, color: BLUE }]
      : raw.explanation && typeof raw.explanation === 'object'
        ? [
            { heading: 'for 的用法', text: raw.explanation.for ?? '', color: BLUE },
            { heading: 'of 的用法', text: raw.explanation.of ?? '', color: GREEN },
          ]
        : []

  /* Display examples */
  const examples = (raw.examples ?? []).map((ex, i) => ({
    id: ex.id ?? i + 1,
    sentence: ex.sentence ?? ex.eng ?? '',
    translation: ex.translation ?? ex.chi ?? '',
    keywords: ex.keywords ?? [],
    preposition: ex.preposition ?? '',
  }))

  /* Practice exercises */
  const rawExercises = Array.isArray(raw.exercises) ? raw.exercises : (raw.examples ?? [])

  const exercises = rawExercises.map((ex, i) => {
    const parts = Array.isArray(ex.parts) ? ex.parts : undefined
    const blanks = Array.isArray(ex.blanks) ? ex.blanks : undefined
    const templateStr =
      typeof ex.template === 'string'
        ? ex.template
        : parts
          ? parts.map(p => (p === null ? '___' : p)).join('')
          : ''
    return {
      id: ex.id ?? i + 1,
      sentence: ex.sentence ?? ex.eng ?? '',
      template: templateStr,
      parts,
      blanks,
      answer: blanks?.[0] ?? ex.answer ?? '',
      translation: ex.translation ?? ex.chi ?? '',
      preposition: ex.preposition ?? '',
      keywords: ex.keywords ?? [],
    }
  })

  /* Tables */
  const adjTableFor = raw.adj_table_for ?? []
  const adjTableOf = raw.adj_table_of ?? []
  const vocabTable = raw.vocab_table ?? []
  const vocabTableLabel = raw.vocab_table_label ?? '核心詞彙'

  /* Extension */
  const ext = raw.extension ?? {}
  const extension = {
    tip: ext.tip ?? '',
    examples: ext.examples ?? [],
    note: ext.note ?? '',
  }

  /* Exercises */
  const mcExercises = raw.mc_exercises ?? []
  const translationExercises = raw.translation_exercises ?? []

  return {
    code: raw.code,
    chapter: raw.chapter,
    title: raw.title,
    formulas,
    explanationSections,
    examples,
    adjTableFor,
    adjTableOf,
    vocabTable,
    vocabTableLabel,
    extension,
    exercises,
    mcExercises,
    translationExercises,
  }
}

export default function PatternDetail({ rawPattern }) {
  const p = normalize(rawPattern)

  return (
    <div style={{ fontFamily: 'Arial, "Microsoft JhengHei", sans-serif', background: '#f7f9fc', minHeight: '100vh' }}>
      <style>{`
        .adj-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 640px) {
          .adj-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @keyframes practice-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .practice-shake { animation: practice-shake 0.35s ease; }
      `}</style>
      <ScrollToTop />

      {/* Chapter header */}
      <header style={{ background: NAVY, color: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ padding: '12px 0 4px', fontSize: '13px', opacity: 0.7, letterSpacing: '0.08em' }}>
            第 {p.chapter} 章 · {CHAPTER_TITLES[p.chapter] ?? ''}
          </div>
          <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, padding: '8px 0 20px', lineHeight: 1.3, letterSpacing: '0.02em' }}>
            句型 {p.code}　{p.title}
          </h1>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px 64px' }}>

        {/* 句型公式 */}
        {p.formulas.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <SectionTitle>句型公式</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {p.formulas.map((f, i) => (
                <FormulaCard key={i} color={f.color} label={f.label} formula={f.formula} meaning={f.zh} />
              ))}
            </div>
          </section>
        )}

        {/* 用法解說 */}
        {p.explanationSections.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <SectionTitle>用法解說</SectionTitle>
            <div style={{
              display: 'grid',
              gridTemplateColumns: p.explanationSections.length === 1 ? '1fr' : '1fr 1fr',
              gap: '16px',
            }}>
              {p.explanationSections.map((sec, i) => (
                <ExplanationCard key={i} color={sec.color} heading={sec.heading} text={sec.text} />
              ))}
            </div>
          </section>
        )}

        {/* 詞彙表 */}
        {(p.adjTableFor.length > 0 || p.adjTableOf.length > 0 || p.vocabTable.length > 0) && (
          <section style={{ marginBottom: '40px' }}>
            <SectionTitle>詞彙表</SectionTitle>
            {p.adjTableFor.length > 0 && (
              <AdjTable color={BLUE} title="搭配 for 的形容詞" entries={p.adjTableFor} />
            )}
            {p.adjTableOf.length > 0 && (
              <AdjTable color={GREEN} title="搭配 of 的形容詞" entries={p.adjTableOf} />
            )}
            {p.vocabTable.length > 0 && (
              <AdjTable color={NAVY} title={p.vocabTableLabel} entries={p.vocabTable} />
            )}
          </section>
        )}

        {/* 實用例句 */}
        {p.examples.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <SectionTitle>實用例句</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {p.examples.map((ex, i) => (
                <ExampleCard
                  key={ex.id}
                  index={i + 1}
                  sentence={ex.sentence}
                  keywords={ex.keywords}
                  translation={ex.translation}
                  preposition={ex.preposition ?? ''}
                />
              ))}
            </div>
          </section>
        )}

        {/* 延伸學習 */}
        {(p.extension.tip || p.extension.note) && (
          <section style={{ marginBottom: '48px' }}>
            <SectionTitle>延伸學習</SectionTitle>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
              {p.extension.tip && (
                <p style={{ fontWeight: 700, color: '#333', marginBottom: '12px', fontSize: '16px' }}>
                  {p.extension.tip}
                </p>
              )}
              {p.extension.examples.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {p.extension.examples.map((ex, i) => (
                    <div key={i} style={{
                      background: '#f8fafc', borderRadius: '8px', padding: '12px 16px',
                      borderLeft: `4px solid ${i % 2 === 0 ? GREEN : BLUE}`,
                    }}>
                      <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#555' }}>{ex.test}</p>
                      <p style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: i % 2 === 0 ? GREEN : BLUE }}>
                        {ex.result}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {p.extension.note && (
                <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '8px', padding: '12px 16px' }}>
                  <span style={{ fontWeight: 700, color: '#92400e' }}>口訣：</span>
                  <span style={{ color: '#78350f' }}>{p.extension.note.replace(/^口訣[：:]?\s*/, '')}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 互動填空練習 */}
        {p.exercises.length > 0 && (
          <section>
            <SectionTitle>互動填空練習</SectionTitle>
            <p style={{ color: '#666', marginBottom: '24px', fontSize: '15px' }}>
              填入正確答案，可按「💡 看 AI 解析」取得引導回饋。
            </p>
            <PracticeSection
              exercises={p.exercises}
              mcExercises={p.mcExercises}
              translationExercises={p.translationExercises}
              patternTitle={p.title}
            />
          </section>
        )}
      </main>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1a202c', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #e2e8f0' }}>
      {children}
    </h2>
  )
}

function FormulaCard({ color, label, formula, meaning }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: `2px solid ${color}`, borderRadius: '10px', padding: '16px 20px' }}>
      {label && (
        <span style={{ background: color, color: '#fff', borderRadius: '6px', padding: '4px 12px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', flexShrink: 0, alignSelf: 'flex-start', marginTop: '2px' }}>
          {label}
        </span>
      )}
      <div>
        <code style={{ fontSize: '16px', color: '#1a202c', fontFamily: '"Courier New", Courier, monospace', fontWeight: 600, display: 'block' }}>
          {formula}
        </code>
        {meaning && (
          <span style={{ display: 'block', marginTop: '5px', fontSize: '13px', color, opacity: 0.85, fontStyle: 'italic', letterSpacing: '0.01em' }}>
            {meaning}
          </span>
        )}
      </div>
    </div>
  )
}

function ExplanationCard({ color, heading, text }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ background: color, padding: '10px 16px' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>{heading}</span>
      </div>
      <p style={{ padding: '16px', margin: 0, fontSize: '14px', color: '#444', lineHeight: 1.7 }}>{text}</p>
    </div>
  )
}

function AdjTable({ color, title, entries }) {
  return (
    <div style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
      <div style={{ background: color, padding: '10px 16px' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '15px' }}>{title}</span>
      </div>
      <div className="adj-grid">
        {entries.map((entry, i) => (
          <div key={i} style={{ padding: '6px 10px', borderRight: '1px solid #E8EEF5', borderBottom: '1px solid #E8EEF5' }}>
            <div style={{ fontFamily: '"Courier New", Courier, monospace', fontWeight: 700, color: '#1A3A5C', fontSize: '15px' }}>
              {entry.adj}
            </div>
            <div style={{ fontSize: '13px', color: '#4A4A4A' }}>{entry.zh}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExampleCard({ index, sentence, keywords, translation, preposition }) {
  const accent = preposition === 'of' ? GREEN : BLUE
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderLeft: `4px solid ${accent}`, borderRadius: '8px', padding: '14px 18px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
      <span style={{ background: accent, color: '#fff', borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>
        {index}
      </span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: '0 0 4px', fontSize: '15px', color: '#1a202c', lineHeight: 1.6 }}>
          {highlightKeywords(sentence, keywords)}
        </p>
        <p style={{ margin: 0, fontSize: '13px', color: '#777' }}>{translation}</p>
      </div>
      {preposition && (
        <span style={{ marginLeft: 'auto', background: accent + '18', color: accent, borderRadius: '4px', padding: '2px 8px', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
          {preposition}
        </span>
      )}
    </div>
  )
}
