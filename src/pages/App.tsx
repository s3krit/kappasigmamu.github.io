import { Suspense } from 'react'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { AccountContextProvider } from '../account/AccountContext'
import { Navbar } from '../components/Navbar'
import { KusamaContextProvider } from '../kusama'
import { GlobalStyle } from '../styles/globalStyle'
import { Theme } from '../styles/Theme'
import { CyborgGuidePage } from './CyborgGuidePage'
import { ExplorePage } from './explore/ExplorePage'
import { JourneyPage } from './JourneyPage'
import { LandingPage } from './LandingPage'
import { WelcomePage } from './WelcomePage'

const AppNavigation = () => {
  const { pathname } = useLocation()
  const isRoot = !!pathname.match("[/]$")

  return (
    <>
      <Navbar
        showAccount={false}
        showExploreButton={false}
        showBrandIcon
        showSocialIcons={isRoot || pathname.includes("guide")}
      />
      <Outlet />
    </>
  )
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppNavigation />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/guide" element={<CyborgGuidePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/explore/*" element={<ExplorePage />} />
          <Route path="*" element={<>NOT FOUND</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const App = () => (
  <>
    <GlobalStyle />
    <KusamaContextProvider>
      <AccountContextProvider>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <Suspense fallback={<p>ERROR/LOADING...</p>}>
            <AppRouter />
          </Suspense>
        </ThemeProvider>
      </AccountContextProvider>
    </KusamaContextProvider>
  </>
)

export { App }
