export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center">
      <div className="max-w-6xl mx-auto px-4">
        <div className="font-black text-white text-xl mb-1">GSAT English Hub</div>
        <div className="text-sm mb-4">大學學測英文自學網站・專為台灣高中生設計</div>

        <div className="flex items-center justify-center gap-3 mb-1">
          <span className="text-gray-400 text-sm">有任何建議或回饋？</span>
          <a
            href="https://forms.gle/3BpRMnNv1kfJs67dA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-blue-500 text-blue-400 text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
          >
            📝 填寫回饋與建議表單
          </a>
        </div>

        <div className="text-xs text-gray-600 mt-5">
          © 2025 GSAT English Hub・專為台灣高中生設計
        </div>
      </div>
    </footer>
  )
}
