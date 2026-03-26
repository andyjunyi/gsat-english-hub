import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collocations from './pages/Collocations'
import Grammar from './pages/Grammar'
import GrammarPattern from './pages/GrammarPattern'
import GrammarMap from './pages/GrammarMap'
import ChapterPage from './pages/ChapterPage'
import QuizPage from './pages/QuizPage'
import Vocabulary from './pages/Vocabulary'
import Translation from './pages/Translation'
import CollocationChecker from './components/CollocationChecker'
import JunyiPage from './pages/JunyiPage'
import VideoPage from './pages/VideoPage'
import GrammarVideoPage from './pages/GrammarVideoPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collocations" element={<Collocations />} />
            <Route path="/grammar" element={<GrammarMap />} />
            <Route path="/grammar/ch/r1" element={<QuizPage />} />
            <Route path="/grammar/ch/r2" element={<QuizPage />} />
            <Route path="/grammar/ch/r3" element={<QuizPage />} />
            <Route path="/grammar/ch/r4" element={<QuizPage />} />
            <Route path="/grammar/ch/r5" element={<QuizPage />} />
            <Route path="/grammar/ch/:id" element={<ChapterPage />} />
            <Route path="/grammar/ch/:id/quiz" element={<QuizPage />} />
            <Route path="/grammar-patterns" element={<Grammar />} />
            <Route path="/grammar-patterns/:code" element={<GrammarPattern />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/translation" element={<Translation />} />
            <Route path="/checker" element={<CollocationChecker />} />
            <Route path="/junyi" element={<JunyiPage />} />
            <Route path="/videos" element={<VideoPage />} />
            <Route path="/grammar-videos" element={<GrammarVideoPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
