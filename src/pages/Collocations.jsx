import CollocationSearch from '../components/CollocationSearch'

export default function Collocations() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-2">
          <h1 className="text-2xl font-black text-gray-800">英文搭配詞查詢</h1>
          <p className="text-gray-500 text-sm">學測高頻搭配詞資料庫・支援英文與中文搜尋</p>
        </div>
      </div>
      <CollocationSearch />
    </div>
  )
}
