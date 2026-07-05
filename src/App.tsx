import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import PageWrapper from './components/PageWrapper'
import AnnouncementBanner from './components/AnnouncementBanner'
import AuthorityBanner from './components/AuthorityBanner'
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
import StaffGuide from './pages/StaffGuide'
import Partnership from './pages/Partnership'
import Tickets from './pages/Tickets'
import PowerAbuse from './pages/PowerAbuse'
import Resources from './pages/Resources'
import StaffAuthority from './pages/StaffAuthority'
import StaffPortal from './pages/StaffPortal'
import Admin, { MaintenanceScreen, loadSettings } from './pages/Admin'

function AuthCallbackFallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')
    if (error) {
      window.location.replace(`/admin?error=${error}`)
    } else {
      window.location.reload()
    }
  }, [])
  return null
}

function AppInner() {
  useScrollReveal()
  const { pathname } = useLocation()

  const [settings, setSettings] = React.useState(() => loadSettings())

  useEffect(() => {
    const refresh = () => setSettings(loadSettings())
    window.addEventListener('tshe-store-update', refresh)
    window.addEventListener('storage', refresh)
    const interval = setInterval(refresh, 1000)
    return () => {
      window.removeEventListener('tshe-store-update', refresh)
      window.removeEventListener('storage', refresh)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (pathname.startsWith('/auth/')) window.location.reload()
  }, [pathname])

  if (pathname.startsWith('/auth/')) return null

  if (settings.maintenanceMode && pathname !== '/admin') {
    return <MaintenanceScreen />
  }

  if (pathname === '/admin') {
    return <Admin />
  }

  return (
    <>
      <PageLoader />
      <ScrollProgressBar />
      <AnnouncementBanner />
      <AuthorityBanner />
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
          <Route path="/staff"       element={<StaffGuide />}   />
          <Route path="/staff-portal" element={<StaffPortal />} />
          <Route path="/partnership" element={<Partnership />}  />
          <Route path="/tickets"    element={<Tickets />}       />
          <Route path="/power-abuse" element={<PowerAbuse />}    />
          <Route path="/authority"   element={<StaffAuthority />} />
          <Route path="/updates"  element={<Resources />}     />
          <Route path="/tos"      element={<ToS />}         />
          <Route path="/privacy"  element={<Privacy />}     />
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
