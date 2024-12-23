import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logo from '../../images/2.svg';
import { Link } from 'react-router-dom';


export default function AdminLogin() {
    return (
        <>
            <Container fluid>
                <Container>
                    <Row className='justify-content-center align-items-center mt-5'>
                        <Col xs={10} lg={6}>
                            <div className=' text-lg-center mb-4'>
                                <img src={logo} alt="" width={280}/>
                            </div>
                            <div>
                                <form >
                                    <h2 className='text-center' style={{fontFamily:"var(--secondary_font)",color:"var(--maroon)"}}>  SIGN IN  </h2>
                                    <p>USERNAME</p>
                                    <input type='text' className='w-100 p-2 mb-2 rounded' placeholder='USERNAME' />
                                    <p>PASSWORD</p>
                                    <input type='text' className='w-100 p-2 mb-2 rounded' placeholder='PASSWORD' />
                                    <Row>
                                        <Col xs={6}>
                                            <div>
                                                <input type="checkbox" className='me-1' /> Stay signed in
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div className='text-end'>
                                                <a href='' style={{ color: 'grey' }}>
                                                    Forget Password ?
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Link to="/admin-page">
                                        <input type="submit" className='w-100 p-2 mt-3 text-white mb-3 border-0' value="SIGN IN" style={{backgroundColor:"var(--maroon)"}}/>
                                    </Link>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}
