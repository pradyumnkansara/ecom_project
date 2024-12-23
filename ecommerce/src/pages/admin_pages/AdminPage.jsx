import React, { useContext } from 'react'
import AdminHeader from '../../common/admin_common/AdminHeader'
import Dashboard from '../../common/admin_common/Dashboard'
import { adminContext } from '../../context.jsx/AdminContext'
import { Col, Container, Row } from 'react-bootstrap'

export default function AdminPage() {
    let { changeMenu, setChangeMenu } = useContext(adminContext)
  return (
    <>
        <AdminHeader />
            <Container fluid className='ps-0'>
                <Row>
                    <Col xs={12} lg={changeMenu ? 1 : 2} style={{transition:'0.5s'}}>
                        <div>
                            <Dashboard />
                        </div>
                    </Col>
                    <Col xs={12} lg={10}>
                        <div className='ms-lg-3 mt-5'>
                            <h2 className='mb-2 ms-2 ms-lg-0' style={{fontFamily:"var(--secondary_font)"}}>Welcome To Admin Panel</h2>
                            <Row className='justify-content-center'>
                                <Col xs={12} lg={3}>
                                    <div className='text-white rounded-3 p-3 mb-3' style={{ background: 'rgb(125,160,250)' }}>
                                        <span>Today’s Bookings</span>
                                        <h2>4006</h2>
                                        <span>10.00% (30 days)</span>
                                    </div>
                                </Col>
                                <Col xs={12} lg={3}>
                                    <div className='text-white rounded-3 p-3 mb-3' style={{ background: 'rgb(71,71,161)' }}>
                                        <span>Today’s Bookings</span>
                                        <h2>4006</h2>
                                        <span>10.00% (30 days)</span>
                                    </div>
                                </Col>
                                <Col xs={12} lg={3}>
                                    <div className='text-white rounded-3 p-3 mb-3' style={{ background: 'rgb(121,120,233)' }}>
                                        <span>Today’s Bookings</span>
                                        <h2>4006</h2>
                                        <span>10.00% (30 days)</span>
                                    </div>
                                </Col>
                                <Col xs={12} lg={3}>
                                    <div className='text-white rounded-3 p-3 mb-3' style={{ background: 'rgb(243,121,126)' }}>
                                        <span>Today’s Bookings</span>
                                        <h2>4006</h2>
                                        <span>10.00% (30 days)</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
    </>
  )
}
