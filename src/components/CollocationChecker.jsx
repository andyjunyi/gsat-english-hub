import { useState } from 'react'
import { collocationData } from '../data/collocation/collocationData'

export default function CollocationChecker() {
  const [input, setInput] = useState('')
  const [notFound, setNotFound] = useState(null)
  const [found, setFound] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleCheck = () => {
    const items = input
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 0)

    const uniqueItems = [...new Set(items)]
    const dbPhrases = new Set(collocationData.map((d) => d.phrase.toLowerCase()))

    const inDB = uniqueItems.filter((item) => dbPhrases.has(item))
    const notInDB = uniqueItems.filter((item) => !dbPhrases.has(item))

    setFound(inDB)
    setNotFound(notInDB)
    setCopied(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(notFound.join(', '))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          輸入搭配詞清單（逗點分隔）
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例如：make a decision, take action, pay attention, ..."
          className="w-full h-40 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
        />
        <button
          onClick={handleCheck}
          className="mt-3 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm"
        >
          比對
        </button>
      </div>

      {notFound !== null && (
        <div className="flex flex-col gap-4">
          {/* 尚未收錄 */}
          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-800">
                尚未收錄
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-bold">
                  {notFound.length} 個
                </span>
              </h2>
              {notFound.length > 0 && (
                <button
                  onClick={handleCopy}
                  className="text-sm px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  {copied ? '已複製！' : '複製'}
                </button>
              )}
            </div>
            {notFound.length === 0 ? (
              <p className="text-sm text-gray-400">所有搭配詞皆已收錄</p>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed break-all">
                {notFound.join(', ')}
              </p>
            )}
          </div>

          {/* 已收錄 */}
          <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
            <h2 className="font-semibold text-gray-800 mb-3">
              已收錄
              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full font-bold">
                {found.length} 個
              </span>
            </h2>
            {found.length === 0 ? (
              <p className="text-sm text-gray-400">沒有已收錄的搭配詞</p>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed break-all">
                {found.join(', ')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
