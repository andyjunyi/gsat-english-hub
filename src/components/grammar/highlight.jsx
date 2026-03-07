import React from 'react'

function buildKeywordRegex(keyword) {
  const trimmed = keyword.trim()
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  if (trimmed.includes(' ')) {
    const parts = escaped.split(/\s+/)
    const last = parts[parts.length - 1]
    parts[parts.length - 1] = `${last}(?:(?:s|es|ed|ing|'s)(?=\\b))?`
    return new RegExp(`\\b${parts.join('\\s+')}\\b`, 'gi')
  }

  return new RegExp(`\\b${escaped}(?:(?:s|es|ed|ing|'s)(?=\\b))?\\b`, 'gi')
}

export function highlightKeywords(sentence, keywords) {
  if (!keywords || keywords.length === 0) return sentence

  const ranges = []

  for (const kw of keywords) {
    const regex = buildKeywordRegex(kw)
    let match
    while ((match = regex.exec(sentence)) !== null) {
      if (match[0].length === 0) break
      ranges.push([match.index, match.index + match[0].length])
    }
  }

  if (ranges.length === 0) return sentence

  ranges.sort((a, b) => a[0] - b[0])
  const merged = []
  for (const [s, e] of ranges) {
    const prev = merged[merged.length - 1]
    if (prev && s <= prev[1]) {
      prev[1] = Math.max(prev[1], e)
    } else {
      merged.push([s, e])
    }
  }

  const nodes = []
  let cursor = 0

  for (const [start, end] of merged) {
    if (start > cursor) nodes.push(sentence.slice(cursor, start))
    nodes.push(
      <strong key={`h-${start}`} style={{ fontWeight: 700, textDecoration: 'underline', color: '#1A3A5C' }}>
        {sentence.slice(start, end)}
      </strong>
    )
    cursor = end
  }

  if (cursor < sentence.length) nodes.push(sentence.slice(cursor))

  return <>{nodes}</>
}
