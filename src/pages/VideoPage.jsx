import { useState } from 'react'
import { videoData } from '../data/videoData'

export default function VideoPage() {
  const [selectedYear, setSelectedYear] = useState(videoData[0].year)
  const [playingId, setPlayingId] = useState(null)

  const current = videoData.find(d => d.year === selectedYear)
  const currentIndex = playingId ? current.videos.findIndex(v => v.videoId === playingId) : -1

  function selectYear(year) {
    setSelectedYear(year)
    setPlayingId(null)
  }

  function prev() {
    if (currentIndex > 0) setPlayingId(current.videos[currentIndex - 1].videoId)
  }

  function next() {
    if (currentIndex < current.videos.length - 1) setPlayingId(current.videos[currentIndex + 1].videoId)
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 py-10 px-4 text-center">
        <h1 className="text-3xl font-black text-white tracking-tight">文意字彙講解影片</h1>
        <p className="text-blue-100 text-sm mt-2">歷屆學測 Andy 老師逐題講解・附學生自學講義下載</p>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6">

        {/* 左側：年份選單 + PDF 下載 */}
        <aside className="flex-shrink-0 w-28 flex flex-col gap-4">
          <a
            href={current.pdfFile}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-lg text-center transition-colors leading-snug"
          >
            📄 下載<br />講義 PDF
          </a>
          <div className="flex flex-col gap-1">
            {videoData.map(d => (
              <button
                key={d.year}
                onClick={() => selectYear(d.year)}
                className={`text-sm font-semibold px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedYear === d.year
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {d.year} 學年
              </button>
            ))}
          </div>
        </aside>

        {/* 右側內容 */}
        <div className="flex-1 min-w-0">
          {/* 影片播放器 */}
          <div style={{ width: '70%', margin: '0 auto', maxWidth: '100%', boxSizing: 'border-box' }}>
            {playingId ? (
              <div className="shadow-2xl rounded-xl overflow-hidden" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, border: 'none', outline: 'none' }}>
                <iframe
                  key={playingId}
                  src={`https://www.youtube.com/embed/${playingId}?autoplay=1`}
                  title="YouTube video"
                  frameBorder="0"
                  border="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', outline: 'none', display: 'block' }}
                />
              </div>
            ) : (
              <div className="rounded-xl shadow-2xl overflow-hidden flex flex-col items-center justify-center gap-4 px-6 py-8 text-white text-center"
                style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)' }}>
                {/* 播放圖示 */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{ background: 'rgba(255,255,255,0.2)' }}>
                  ▶
                </div>
                {/* 標題 */}
                <div>
                  <p className="text-xl font-black mb-1">選擇學年與題目</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    從左側選擇學年，點選下方題號即可開始觀看 Andy 老師講解
                  </p>
                </div>
                {/* 資訊卡片 */}
                <div className="flex gap-3 flex-wrap justify-center mt-1">
                  {[
                    { icon: '🎓', text: '23 個學年度' },
                    { icon: '🎬', text: '330+ 支影片' },
                    { icon: '📄', text: '附學生講義' },
                    { icon: '✅', text: '完全免費' },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: 'rgba(255,255,255,0.2)' }}>
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 題目導覽列 */}
          <div className="w-[70%] mx-auto flex items-center justify-between mt-3 mb-5">
            <button
              onClick={prev}
              disabled={currentIndex <= 0}
              className="text-sm font-semibold px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← 上一題
            </button>
            <span className="text-sm font-semibold text-gray-700">
              {playingId ? `現正播放：第 ${currentIndex + 1} 題` : '尚未選擇題目'}
            </span>
            <button
              onClick={next}
              disabled={currentIndex === current.videos.length - 1}
              className="text-sm font-semibold px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              下一題 →
            </button>
          </div>

          {/* 影片列表 */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
            {current.videos.map((video, i) => {
              const isPlaying = video.videoId === playingId
              return (
                <button
                  key={video.videoId}
                  onClick={() => setPlayingId(video.videoId)}
                  className={`py-2 px-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                    isPlaying
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-transparent bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  第 {i + 1} 題
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
