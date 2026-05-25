import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import LeadsPage from './pages/Leads'
import JobsPage from './pages/Jobs'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
