import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logofoot from '../../images/1.svg'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
    let location=useLocation()
    useEffect(()=>{
        window.scrollTo(0,0)
    },[location.pathname])
    return (
        <>
            <Container fluid className='foot-bg rounded-top-5 text-white py-5'>
                <Container className='border-bottom border-white pb-5'>
                    <Row className='justify-content-lg-between'>
                        <Col xs={12} lg={4} className='mb-5 mb-lg-0'>
                            <div className=''>
                                <div>
                                    <img src={logofoot} width="180px" alt="" />
                                </div>
                                <div className='text-capitalize mt-4'>
                                    <span className='fs-4'>
                                        owend by
                                    </span>
                                    <div>
                                        kansara street katla bazar,<br />
                                        joshpur , Rajasthan(342001)<br />
                                        GSTIN : xxxxxxxxxxxxxxxxx
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={6} lg={3}>
                            <div>
                                <h3 className='mb-4' style={{ fontFamily: "var(--secondary_font)" }}>Know more
                                </h3>
                                <ul className='p-0 foot-list' style={{ listStyle: "none" }}>
                                    <li>
                                        <Link to={'/'} className='text-white'>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/about-us'} className='text-white'>
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/contact-us'} className='text-white'>
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/product'} className='text-white'>
                                            Shop
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} lg={3}>
                            <div>
                                <h3 className='mb-4' style={{ fontFamily: "var(--secondary_font)" }}>
                                    Join Our Email List
                                </h3>
                                <p>Be the first to hear about our latest promotions, new products and more.</p>
                                <div>
                                    <input type="email" className='border-bottom border-white w-100 px-2 py-1 einput' placeholder='e-mail' style={{ background: "none", border: "none" }} />
                                </div>
                                <div className='d-flex mt-4'>
                                    <div className='rounded-circle d-flex justify-content-center align-items-center me-3' style={{ backgroundColor: "white", width: "30px", height: "30px", fontFamily: "none" }}>
                                        <a href="">
                                            <FontAwesomeIcon icon={faInstagram} style={{color:"var(--maroon)"}} />
                                        </a>
                                    </div>
                                    <div className='rounded-circle d-flex justify-content-center align-items-center me-3' style={{ backgroundColor: "white", width: "30px", height: "30px" }}>
                                        <a href="">
                                            <FontAwesomeIcon icon={faFacebook} style={{color:"var(--maroon)"}} />
                                        </a>
                                    </div>
                                    <div className='rounded-circle d-flex justify-content-center align-items-center me-3' style={{ backgroundColor: "white", width: "30px", height: "30px" }}>
                                        <a href="">
                                            <FontAwesomeIcon icon={faWhatsapp} style={{color:"var(--maroon)"}} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}
