import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudyRidehail from './pages/CaseStudyRidehail'
import CaseStudyFleet from './pages/CaseStudyFleet'
import WorkingOnIt from './pages/WorkingOnIt'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/ridehail" element={<CaseStudyRidehail />} />
        <Route path="/work/fleet" element={<CaseStudyFleet />} />
        <Route path="/work/incar" element={<WorkingOnIt />} />
        <Route path="/work/standbyoperator" element={<WorkingOnIt />} />
        <Route path="/work/remoteassist" element={<WorkingOnIt />} />
        <Route path="*" element={<WorkingOnIt />} />
      </Routes>
    </BrowserRouter>
  )
}
