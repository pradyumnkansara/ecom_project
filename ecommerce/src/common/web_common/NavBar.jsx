import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logo from "../../images/1.svg"
import logo2 from "../../images/2.svg"
import banner from "../../images/Metal Statues.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronCircleUp, faCircleUser, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { Link, useLocation } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios'

export default function NavBar() {
    let [show, setShow] = useState(false);
    let [navhead, setNavhead] = useState(false)
    let [arrowup, setArrowUp] = useState(false)
    let [search, setSearch] = useState(true)
    let [catData, setCatData] = useState([])
    let [subCatData, setSubCatData] = useState([])
    let location = useLocation()

    let handleClose = () => setShow(false);
    let handleShow = () => setShow(true);


    let arrowtop = () => {
        if (window.scrollY >= 800) {
            setArrowUp(true)
        }
        else {
            setArrowUp(false)
        }
    }

    let stickhead = () => {
        if (window.scrollY >= 800) {
            setNavhead(true)
        }
        else {
            setNavhead(false)
        }
    }

    let relativePages = ['/', '/about-us']
    let isRelative = relativePages.includes(location.pathname)

    window.addEventListener("scroll", stickhead)
    window.addEventListener("scroll", arrowtop)

    let catApi = () => {
        axios.get("http://localhost:8000/category/view-category")
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes.dataView)
                setCatData(finalRes.dataView)
            })
    }

    let subCatApi = () => {
        axios.get("http://localhost:8000/sub-cat/view-subCat")
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes.viewSub)
                setSubCatData(finalRes.viewSub)
            })
    }

    useEffect(() => {
        catApi();
        subCatApi();
    }, [])

    return (
        <>
            <Container fluid className={`top-0 start-0 z-3
                ${navhead
                    ?
                    'position-fixed nav-bg shadow-sm'
                    :
                    isRelative
                        ?
                        'position-absolute'
                        :
                        'position-relative'
                }`
            }>
                <Container className={`pt-4 pb-3 px-4 position-relative ${navhead
                    ?
                    ''
                    :
                    isRelative
                        ?
                        ''
                        :
                        'border-secondary-subtle border-bottom'
                    }`}>
                    <Row className='align-items-center text-white'>
                        <Col xs={4} className='navhov'>
                            <div className={`d-flex align-items-center nav-fs nav-fs-mob ${navhead
                                ?
                                'newnav'
                                :
                                isRelative
                                    ?
                                    ''
                                    :
                                    'newnav'
                                }`} onClick={handleShow}>
                                <div className='me-3'>
                                    <FontAwesomeIcon icon={faBars} />
                                </div>
                                <div className='text-uppercase fw-semibold'>
                                    Shop
                                </div>
                            </div>
                            <div className='position-absolute top-0 start-0 rounded-5 rounded-top-0 second-menu d-none shadow-lg' style={{ backgroundColor: "#F9F5EC", width: "100%" }}>
                                <div className='d-none d-lg-block'>
                                    <Container className='pt-3 pb-3 px-4 border-bottom'>
                                        <Row className='align-items-center py-3' style={{ color: "var(--maroon)" }}>
                                            <Col xs={4}>
                                                <div className='d-flex align-items-center fs-4 navhov'>
                                                    <div className='me-3'>
                                                        <FontAwesomeIcon icon={faBars} />
                                                    </div>
                                                    <div className='text-uppercase fw-semibold'>
                                                        Shop
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={4}>
                                                <div className='text-center'>
                                                    <img src={logo2} alt="" width="160px" />
                                                </div>
                                            </Col>
                                            <Col xs={4}>
                                                <div className='d-flex align-items-center fs-4 justify-content-end'>
                                                    <div className='px-3' >
                                                        <Link to={'/log-in'} style={{ color: "var(--maroon)" }}>
                                                            <FontAwesomeIcon icon={faCircleUser} />
                                                        </Link>
                                                    </div>
                                                    <div className='px-3' onClick={() => setSearch(!search)}>
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                                    </div>
                                                    <div className='px-3'>
                                                        <Link to={'/cart'} style={{ color: "var(--maroon)" }}>
                                                            <FontAwesomeIcon icon={faShoppingBag} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Container className='px-5 py-4'>
                                        <Row>
                                            <Col lg={2}>
                                                <div>
                                                    <h2 className='text-uppercase' style={{ fontFamily: "var(--secondary_font)", color: "var(--maroon)" }}>pd-arts</h2>
                                                    <ul className='p-0' style={{ listStyle: "none" }}>
                                                        <li>
                                                            <Link to={'/'} className='text-black fs-5 fw-medium'>
                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={'/about-us'} className='text-black fs-5 fw-medium'>
                                                                About Us
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={'/contact-us'} className='text-black fs-5 fw-medium'>
                                                                Contact Us
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link to={'/product'} className='text-black fs-5 fw-medium'>
                                                                Shop
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col lg={3}>
                                                <div>
                                                    <h2 className='text-uppercase' style={{ fontFamily: "var(--secondary_font)", color: "var(--maroon)" }}>shop by metal categories</h2>
                                                    <ul className='p-0' style={{ listStyle: "none" }}>
                                                        {
                                                            catData.length >= 1
                                                                ?
                                                                catData.map((v, i) => {
                                                                    return (
                                                                        <li key={i}>
                                                                            <Link to={`/product/${v._id}`} className='text-black fs-5 fw-medium'>
                                                                                {v.catName}
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                })
                                                                :
                                                                ""
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col lg={3}>
                                                <div>
                                                    <h2 className='text-uppercase' style={{ fontFamily: "var(--secondary_font)", color: "var(--maroon)" }}>shop by statue categories</h2>
                                                    <ul className='p-0' style={{ listStyle: "none", overflowY: "scroll", height: "150px" }}>
                                                        {
                                                            subCatData.length >= 1
                                                                ?
                                                                Array.from(new Set(subCatData.map(v => v.subCatName))).map((name, i) => {
                                                                    // Find the subCatId corresponding to the subCatName
                                                                    const subCat = subCatData.find(v => v.subCatName === name);
                                                                    return (
                                                                        <li key={i}>
                                                                            <Link to={`/product/${subCat._id}`} className='text-black fs-5 fw-medium'>
                                                                                {name}
                                                                            </Link>
                                                                        </li>
                                                                    );
                                                                })
                                                                :
                                                                ""
                                                        }

                                                        {/* <li>
                                                            <Link className='text-black fs-5 fw-medium'>
                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className='text-black fs-5 fw-medium'>
                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className='text-black fs-5 fw-medium'>
                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className='text-black fs-5 fw-medium'>
                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className='text-black fs-5 fw-medium'>
                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className='text-black fs-5 fw-medium'>
                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className='text-black fs-5 fw-medium'>
                                                                Home
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className='text-black fs-5 fw-medium'>
                                                                Home
                                                            </Link>
                                                        </li> */}
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div>
                                                    <img src={banner} width="100%" height="100%" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        </Col>
                        <Col xs={4}>
                            <div className='text-center logo-mob'>
                                <img src={
                                    navhead
                                        ?
                                        logo2
                                        :
                                        isRelative
                                            ?
                                            logo
                                            :
                                            logo2
                                } alt="" width="160px" />
                            </div>
                        </Col>
                        <Col xs={4}>
                            <div className='d-flex align-items-center nav-fs nav-fs-mob justify-content-end '>
                                <div className='pe-2 pe-lg-3 nav-point'>
                                    <Link to={'/log-in'} className={`${navhead
                                        ?
                                        'newnav'
                                        :
                                        isRelative
                                            ?
                                            'text-white'
                                            :
                                            'newnav'
                                        }`}>
                                        <FontAwesomeIcon icon={faCircleUser} />
                                    </Link>
                                </div>
                                <div onClick={() => { setSearch(!search) }} className='px-1 px-lg-2 nav-point'>
                                    <Link className={`${navhead
                                        ?
                                        'newnav'
                                        :
                                        isRelative
                                            ?
                                            'text-white'
                                            :
                                            'newnav'
                                        }`}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </Link>
                                </div>
                                <div className='ps-2 ps-lg-3 nav-point'>
                                    <Link to={'/cart'} className={`${navhead
                                        ?
                                        'newnav'
                                        :
                                        isRelative
                                            ?
                                            'text-white'
                                            :
                                            'newnav'
                                        }`}>
                                        <FontAwesomeIcon icon={faShoppingBag} />
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container >

            {/* mobile menu */}
            < Offcanvas show={show} onHide={handleClose} >
                <Offcanvas.Header className='d-flex justify-content-between align-items-center border-bottom' style={{ backgroundColor: "#F9F5EC" }}>
                    <Offcanvas.Title>
                        <h2 className='text-uppercase' style={{ fontFamily: "var(--secondary_font)", color: "var(--maroon)" }}>pd-arts</h2>
                    </Offcanvas.Title>
                    <div className='fs-3' style={{ color: "var(--maroon)" }} onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className='p-0' style={{ backgroundColor: "#F9F5EC" }}>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>ALL</Accordion.Header>
                            <Accordion.Body className='p-0'>
                                <ul style={{ listStyle: "none", backgroundColor: "#F9F5EC" }}>
                                    <li>
                                        <Link to={'/'} className='text-black fs-5 fw-medium'>
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/about-us'} className='text-black fs-5 fw-medium'>
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/contact-us'} className='text-black fs-5 fw-medium'>
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/product'} className='text-black fs-5 fw-medium'>
                                            Shop
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/cart'} className='text-black fs-5 fw-medium'>
                                            Cart
                                        </Link>
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>SHOP BY METAL</Accordion.Header>
                            <Accordion.Body className='p-0'>
                                <ul style={{ listStyle: "none", backgroundColor: "#F9F5EC" }}>
                                    <li>
                                        <Link className='text-black fs-5 fw-medium'>
                                            Aluminium
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='text-black fs-5 fw-medium'>
                                            Brass
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='text-black fs-5 fw-medium'>
                                            Marble
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='text-black fs-5 fw-medium'>
                                            Iron
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='text-black fs-5 fw-medium'>
                                            Wooden
                                        </Link>
                                    </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas >
            {/* arrow */}
            <div className={`position-fixed fs-1 end-0 bottom-0 me-4 mb-3 ${arrowup
                ?
                'd-block'
                :
                'd-none'
                }`}>
                <FontAwesomeIcon icon={faChevronCircleUp} className='shadow rounded-circle bg-white' style={{ color: "var(--maroon)", cursor: "pointer" }} onClick={() => {
                    window.scrollTo(0, 0)
                }} />
            </div>
            {/* Search engine */}
            <Container fluid style={{ backgroundColor: "var(--cream)" }} className={`w-100 h-100 start-0 shadow position-fixed z-3 text-center search-hide ${search
                ?
                'search-hide'
                :
                'search-show'

                }`}>
                <Container>
                    <Row className='align-items-end'>
                        <Col xs={11}>
                            <div>
                                <input type="text" className='mob-search mt-5 p-2 ' placeholder='Search' style={{ width: "100%" }} />
                            </div>
                        </Col>
                        <Col xs={1}>
                            <div>
                                <FontAwesomeIcon icon={faXmark} className='fs-2 mb-1 me-4' style={{ cursor: "pointer" }} onClick={() => setSearch(!search)} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}
