import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useSnow } from './hooks/useSnow'
import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import PageWrapper from './components/PageWrapper'
import AnnouncementBanner from './components/AnnouncementBanner'
import BackToTop from './components/BackToTop'
import ScrollProgressBar from './components/ScrollProgressBar'
import Home from './pages/Home'
import Rules from './pages/Rules'
import Punishments from './pages/Punishments'
import AutoMod from './pages/AutoMod'
import FAQ from './pages/FAQ'
import Docs from './pages/Docs'
import ToS from './pages/ToS'
import Privacy from './pages/Privacy'
import Roles from './pages/Roles'
import Services from './pages/Services'
import StaffGuide from './pages/StaffGuide'
import Partnership from './pages/Partnership'
import Resources from './pages/Resources'
import StaffPortal from './pages/StaffPortal'
import Admin, { MaintenanceScreen, loadSettings } from './pages/Admin'
import { getSiteConfig } from './data/store'

// If React Router catches /auth/callback (meaning nginx proxy isn't set up yet),
// preserve the query string and redirect to /admin so error params are shown.
function AuthCallbackFallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')
    if (error) {
      window.location.replace(`/admin?error=${error}`)
    } else {
      // Real callback — force reload so nginx/Express handles it
      window.location.reload()
    }
  }, [])
  return null
}

function AppInner() {
  useSnow()
  useScrollReveal()
  const { pathname } = useLocation()

  // Re-read settings whenever localStorage changes (same tab via custom event, other tabs via storage event)
  const [settings, setSettings] = React.useState(() => loadSettings())

  useEffect(() => {
    const refresh = () => setSettings(loadSettings())
    // Custom event fires in the same tab when admin panel saves
    window.addEventListener('tshe-store-update', refresh)
    // Native storage event fires for other tabs
    window.addEventListener('storage', refresh)
    // Fallback poll — catches anything missed
    const interval = setInterval(refresh, 1000)
    return () => {
      window.removeEventListener('tshe-store-update', refresh)
      window.removeEventListener('storage', refresh)
      clearInterval(interval)
    }
  }, [])

  // /auth/* must NEVER be handled by React Router
  useEffect(() => {
    if (pathname.startsWith('/auth/')) window.location.reload()
  }, [pathname])

  if (pathname.startsWith('/auth/')) return null

  // If maintenance mode is on and we're NOT on /admin, show maintenance screen
  if (settings.maintenanceMode && pathname !== '/admin') {
    return (
      <>
        <canvas id="snow-canvas" />
        <div className="ambient">
          <div className="ab ab1" />
          <div className="ab ab2" />
          <div className="ab ab3" />
        </div>
        <MaintenanceScreen />
      </>
    )
  }

  // /admin route renders without navbar/footer
  if (pathname === '/admin') {
    return (
      <>
        <canvas id="snow-canvas" />
        <div className="ambient">
          <div className="ab ab1" />
          <div className="ab ab2" />
          <div className="ab ab3" />
        </div>
        <Admin />
      </>
    )
  }

  return (
    <>
      <PageLoader />
      <canvas id="snow-canvas" />
      <div className="ambient">
        <div className="ab ab1" />
        <div className="ab ab2" />
        <div className="ab ab3" />
      </div>

      <ScrollProgressBar />
      <AnnouncementBanner />
      <Navbar />

      <PageWrapper>
        <Routes>
          <Route path="/"         element={<Home />}        />
          <Route path="/rules"    element={<Rules />}       />
          <Route path="/punish"   element={<Punishments />} />
          <Route path="/automod"  element={<AutoMod />}     />
          <Route path="/faq"      element={<FAQ />}         />
          <Route path="/docs"     element={<Docs />}        />
          <Route path="/roles"    element={<Roles />}       />
          <Route path="/services" element={<Services />}    />
          <Route path="/staff"       element={<StaffGuide />}   />
          <Route path="/staff-portal" element={<StaffPortal />}  />
          <Route path="/partnership" element={<Partnership />}  />
          <Route path="/updates"  element={<Resources />}     />
          <Route path="/tos"      element={<ToS />}         />
          <Route path="/privacy"  element={<Privacy />}     />
          {/* Auth callback fallback — real handler is the Express server via nginx */}
          <Route path="/auth/callback" element={<AuthCallbackFallback />} />
          <Route path="*"         element={<Home />}        />
        </Routes>
      </PageWrapper>

      <Footer />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
