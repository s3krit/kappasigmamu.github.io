import { Col, Container, Row } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useKusama } from '../../kusama'
import { ApiState } from '../../kusama/KusamaContext'
import { BiddersPage } from './BiddersPage'
import { CandidatesPage } from './CandidatesPage'
import { LoadingSpinner } from './components/LoadingSpinner'
import { NavigationBar } from './components/NavigationBar'
import { MembersPage } from './MembersPage'
import { SuspendedPage } from './SuspendedPage'

const ExplorePage = (): JSX.Element => {
  const { api, apiState } = useKusama()

  return (
    <Container>
      <Row>
        <Col>
          <NavigationBar />
        </Col>
      </Row>
      <Row>
        <Col>
          {apiState !== ApiState.ready
            ? <LoadingSpinner />
            : (
              <Routes>
                <Route path="/" element={<Navigate to="/explore/bidders" replace />} />
                <Route path="/bidders" element={<BiddersPage api={api} />} />
                <Route path="/candidates" element={<CandidatesPage api={api} />} />
                <Route path="/members" element={<MembersPage api={api} />} />
                <Route path="/suspended" element={<SuspendedPage api={api} />} />
              </Routes>
            )}
        </Col>
      </Row>
    </Container>
  )
}

export { ExplorePage }
