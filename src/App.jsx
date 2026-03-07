import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collocations from './pages/Collocations'
import Grammar from './pages/Grammar'
import GrammarPattern from './pages/GrammarPattern'
import Vocabulary from './pages/Vocabulary'
import Translation from './pages/Translation'
import CollocationChecker from './components/CollocationChecker'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collocations" element={<Collocations />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/grammar/:code" element={<GrammarPattern />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/translation" element={<Translation />} />
            <Route path="/checker" element={<CollocationChecker />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
