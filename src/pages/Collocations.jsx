import CollocationSearch from '../components/CollocationSearch'

export default function Collocations() {
  return (
    <div>
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white py-10 px-4 text-center">
        <h1 className="text-3xl font-black tracking-tight">英文搭配詞查詢</h1>
        <p className="text-blue-100 text-sm mt-2">學測高頻搭配詞資料庫・支援英文與中文搜尋</p>
      </header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CollocationSearch />
      </div>
    </div>
  )
}
