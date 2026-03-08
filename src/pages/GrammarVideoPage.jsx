import { useState } from 'react'
import { grammarVideoData } from '../data/grammarVideoData'

export default function GrammarVideoPage() {
  const [selectedTitle, setSelectedTitle] = useState(grammarVideoData[0].title)
  const [playingId, setPlayingId] = useState(null)

  const current = grammarVideoData.find(d => d.title === selectedTitle)
  const currentIndex = playingId ? current.videos.findIndex(v => v.videoId === playingId) : -1
  const currentVideo = currentIndex >= 0 ? current.videos[currentIndex] : null

  function selectTopic(title) {
    setSelectedTitle(title)
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
        <h1 className="text-3xl font-black text-white tracking-tight">高中文法教學影片</h1>
        <p className="text-blue-100 text-sm mt-2">Andy 老師高中英文文法影片・點選主題開始學習</p>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6">

        {/* 左側：主題選單 */}
        <aside className="flex-shrink-0 flex flex-col gap-1" style={{ minWidth: '200px' }}>
          {grammarVideoData.map(d => (
            <button
              key={d.title}
              onClick={() => selectTopic(d.title)}
              className={`text-sm font-semibold px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap ${
                selectedTitle === d.title
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {d.title}
            </button>
          ))}
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
                style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #1d4ed8 100%)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{ background: 'rgba(255,255,255,0.25)' }}>
                  ▶
                </div>
                <div>
                  <p className="text-xl font-black mb-1" style={{ color: '#ffffff' }}>選擇文法主題與影片</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
                    從左側選擇文法主題，點選下方影片即可開始觀看
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap justify-center mt-1">
                  {[
                    { icon: '📚', text: '8 個文法主題' },
                    { icon: '🎬', text: '70+ 支影片' },
                    { icon: '🏫', text: 'Andy 老師講解' },
                    { icon: '✅', text: '完全免費' },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                      style={{ background: 'rgba(255,255,255,0.15)' }}>
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 導覽列 */}
          <div className="w-[70%] mx-auto flex items-center justify-between mt-3 mb-5">
            <button
              onClick={prev}
              disabled={currentIndex <= 0}
              className="text-sm font-semibold px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← 上一部
            </button>
            <span className="text-sm font-semibold text-gray-700 text-center px-2 truncate">
              {currentVideo ? `現正播放：${currentVideo.title}` : '尚未選擇影片'}
            </span>
            <button
              onClick={next}
              disabled={currentIndex < 0 || currentIndex === current.videos.length - 1}
              className="text-sm font-semibold px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              下一部 →
            </button>
          </div>

          {/* 影片列表 */}
          <div className="flex flex-col gap-1">
            {current.videos.map((video) => {
              const isPlaying = video.videoId === playingId
              return (
                <button
                  key={video.videoId}
                  onClick={() => setPlayingId(video.videoId)}
                  className={`text-left px-4 py-2.5 rounded-lg border-2 text-sm transition-all ${
                    isPlaying
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                      : 'border-transparent bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2 text-gray-400 text-xs">{video.duration}</span>
                  {video.title}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
