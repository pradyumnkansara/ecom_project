import React, { useContext, useEffect, useState } from 'react';
import Header from '../../common/web_common/Header';
import { Col, Container, Row } from 'react-bootstrap';
import img1 from '../../images/ganesh.png';
import prod1 from '../../images/ganesh.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Footer from '../../common/web_common/Footer';
import axios from 'axios';
import Slider from 'react-slick';
import { adminContext } from '../../context.jsx/AdminContext';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Home() {
    return (
        <>
            <Container fluid className='p-0' style={{ height: "100vh" }}>
                <Header />
            </Container>
            <Category />
            <Favourite />
            <NewlyLaunched />
            <StatueType />
            <SocialMedia />
            <Footer />
            <NotificationContainer />
        </>
    )
}

function Category() {
    let [catData, setCatData] = useState([])
    let [catUrl, setCatUrl] = useState('')
    useEffect(() => {
        axios.get("/category/view-category")
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes.dataView)
                setCatData(finalRes.dataView)
                setCatUrl(finalRes.CatImgUrl)
            })
    }, [])

    return (
        <>
            <Container fluid>
                <Container className='py-5 border-bottom border-secondary-subtle"'>
                    <div className='text-center'>
                        <div className='text-uppercase fw-semibold fs-5 mb-2 mt-4'>
                            we are the manufacturer
                        </div>
                        <h1 className='text-uppercase' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>
                            shop by metals
                        </h1>
                    </div>
                    <Row className='justify-content-center mt-5 cat-scroll'>
                        {
                            catData.length >= 1
                                ?
                                catData.map((v, i) => {
                                    return (
                                        <Col xs={6} lg={3} key={i}>
                                            <Link to={`/product/${v._id}`} style={{ color: "black" }}>
                                                <div className='cat_hov'>
                                                    <div className='overflow-hidden rounded-top-pill length-mob' style={{height:"430px"}}>
                                                        <img src={catUrl + v.catImg} alt="" height="100%" width="100%" className='rounded-top-pill' />
                                                    </div>
                                                    <h4 className='text-uppercase text-center mt-3 fw-bolder'>{v.catName}</h4>
                                                </div>
                                            </Link>
                                        </Col>
                                    )
                                })
                                :
                                "Loading"
                        }
                    </Row>
                </Container>
            </Container>
        </>
    )
}

function Favourite() {
    let [viewBestData, setViewBestData] = useState([]);
    let [imgUrl, setImgUrl] = useState('');
    let { cart, setCart } = useContext(adminContext)

    let bestSellerData = () => {
        axios.get("/best_seller/view-best_seller")
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes)
                setViewBestData(finalRes.dataView)
                setImgUrl(finalRes.bestImgUrl)
            })
    }

    useEffect(() => {
        bestSellerData()
    },[])

    let addToCart = (product) => {
        let filterProduct = cart.filter((v, i) => v.name == product.bestName)
        if (filterProduct.length == 1) {
            let finalFilterData = cart.filter((v, i) => {
                if (v.name == product.bestName) {
                    v.qty += 1;
                }
                return v;
            })
            setCart(finalFilterData)
            NotificationManager.success(`${product.bestName} qty updated in cart`);
        }
        else {
            let cartDetail = {
                name: product.bestName,
                image: imgUrl + product.bestImg,
                price: product.bestPrice,
                qty: 1
            }
            setCart([...cart, cartDetail])
            NotificationManager.success(`${product.bestName} added to cart`);
        }
    }

    var slideFavourite = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        autoplaySpeed: 200000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows:false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows:false
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    };
    return (
        <>
            <Container fluid>
                <Container className='py-5 border-bottom'>
                    <div className='text-center'>
                        <div className='text-uppercase fw-semibold fs-5 mb-2 mt-4'>
                            Best Sellers
                        </div>
                        <h2 className='text-uppercase fs-1' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>
                            our all time favourites
                        </h2>
                    </div>
                    <Row className='justify-content-center mt-5 '>
                        <Slider {...slideFavourite}>
                            {
                                viewBestData.length >= 1
                                    ?
                                    viewBestData.map((v, i) => {
                                        return (
                                            <Col xs={6} lg={3} className=''>
                                                <div className='' style={{ width: "95%" }}>
                                                    <Link to={`/product-detail/${v._id}`} style={{ color: "black" }}>
                                                        <div>
                                                            <img src={imgUrl + v.bestImg} alt="" width="100%" height="432px" className='length-mob'/>
                                                        </div>
                                                        <h5 className='text-uppercase fw-bold my-3'>{v.bestName}</h5>
                                                        <span className='d-block fw-semibold fs-6'>
                                                            ₹ {v.bestPrice}
                                                        </span>
                                                    </Link>
                                                    <button className='text-uppercase fw-semibold w-100 border-0 text-white rounded-pill py-2 fs-6 fw-semibold my-3' onClick={() => addToCart(v)} style={{ backgroundColor: "var(--maroon)" }}>
                                                        add to cart
                                                    </button>
                                                </div>
                                            </Col>
                                        )
                                    })
                                    :
                                    <div>Loading...</div>
                            }
                        </Slider>
                    </Row>
                </Container>
            </Container>
        </>
    )
}

function NewlyLaunched() {

    let [newLaunch, setNewLaunch] = useState([]);
    let [imgUrl, setImgUrl] = useState('');

    let { cart, setCart } = useContext(adminContext);

    let newLaunchData = () => {
        axios.get("/new_launched/view-new_launched")
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes)
                setNewLaunch(finalRes.dataView)
                setImgUrl(finalRes.newImgUrl)
            })
    }

    useEffect(() => {
        newLaunchData()
    }, [])

    let addToCart = (product) => {
        let filterProduct = cart.filter((v, i) => v.name == product.newlyName)
        if (filterProduct.length == 1) {
            let finalFilterData = cart.filter((v, i) => {
                if (v.name == product.newlyName) {
                    v.qty += 1;
                }
                return v;
            })
            setCart(finalFilterData)
            NotificationManager.success(`${product.newlyName} qty updated in cart`);
        }
        else {
            let cartDetail = {
                name: product.newlyName,
                image: imgUrl + product.newlyImg,
                price: product.newlyPrice,
                qty: 1
            }
            setCart([...cart, cartDetail])
            NotificationManager.success(`${product.newlyName} added to cart`);
        }
    }

    var newSlider = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows:false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows:false
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    };
    return (
        <>
            <Container fluid>
                <Container className='py-5 border-bottom'>
                    <div className='text-center'>
                        <div className='text-uppercase fw-semibold fs-5 mb-2 mt-4'>
                            New Products
                        </div>
                        <h2 className='text-uppercase fs-1' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>
                            our newly launched products
                        </h2>
                    </div>
                    <Row className='justify-content-center mt-5'>
                        <Slider {...newSlider}>
                            {
                                newLaunch.length >= 1
                                    ?
                                    newLaunch.map((v, i) => {
                                        return (
                                            <Col xs={6} lg={3} className=''>
                                                <div style={{ width: "95%" }}>
                                                    <Link to={`/product-detail/${v._id}`} style={{ color: "black" }}>
                                                        <div>
                                                            <img src={imgUrl + v.newlyImg} alt="" width="100%" height="432px" className='length-mob'/>
                                                        </div>
                                                        <h5 className='text-uppercase fw-bold my-3'>{v.newlyName}</h5>
                                                        <span className='d-block fw-semibold fs-6'>
                                                            ₹ {v.newlyPrice}
                                                        </span>
                                                    </Link>
                                                    <button className='text-uppercase fw-semibold w-100 border-0 text-white rounded-pill py-2 fs-6 fw-semibold my-3' onClick={() => addToCart(v)} style={{ backgroundColor: "var(--maroon)" }}>
                                                        add to cart
                                                    </button>
                                                </div>
                                            </Col>
                                        )
                                    })
                                    :
                                    <div>Loading...</div>
                            }
                        </Slider>
                    </Row>
                </Container>
            </Container>
        </>
    )
}

function StatueType() {
    let [statue, setStatue] = useState([]);
    let [statueUrl, setStatueUrl] = useState('');
    useEffect(() => {
        axios.get("/sub-cat/view-subCat")
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes)
                setStatue(finalRes.viewSub)
                setStatueUrl(finalRes.subCatImgUrl)
            })
    }, [])

    var slideStatue = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    arrows:false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows:false
                }
            }
        ]
    };

    return (
        <>
            <Container fluid>
                <Container className='py-5 border-bottom border-secondary-subtle'>
                    <div className='text-center'>
                        <div className='text-uppercase fw-semibold fs-5 mb-2 mt-4'>
                            we are the manufacturer
                        </div>
                        <h1 className='text-uppercase' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>
                            types of statues
                        </h1>
                    </div>
                    <Row className='justify-content-center mt-5 cat-scroll'>
                        <Slider {...slideStatue}>
                            {
                                statue.length >= 1
                                    ?
                                    statue.map((v, i) => {
                                        return (
                                            <Col xs={6} lg={2} key={i}>
                                                <Link to={`/product/${v._id}`} style={{color:"black"}}>
                                                    <div className='cat_hov d-flex flex-column align-items-center'>
                                                        <div className='overflow-hidden rounded-circle border statue-mob-size' style={{ width: "200px", height: "200px" }}>
                                                            <img src={statueUrl + v.subCatImg} alt="" width="100%" height="100%" className='rounded-circle' />
                                                        </div>
                                                        <h4 className='text-uppercase mt-3 fw-bolder small-head'>{v.subCatName}</h4>
                                                    </div>
                                                </Link>
                                            </Col>
                                        )
                                    })
                                    :
                                    <div>Loading...</div>
                            }
                        </Slider>
                    </Row>
                </Container>
            </Container>
        </>
    )
}

function SocialMedia() {
    return (
        <>
            <Container fluid>
                <Container className='py-5'>
                    <div className='text-center'>
                        <div className='text-uppercase fw-semibold fs-5 mb-2 mt-4'>
                            follow us for the latest updates
                        </div>
                        <h1 className='text-capitalize' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>
                            @pd-arts
                        </h1>
                        <div className='d-flex justify-content-center'>
                            <div className='rounded-circle d-flex justify-content-center align-items-center me-3' style={{ backgroundColor: "var(--maroon)", width: "30px", height: "30px", fontFamily: "none" }}>
                                <a href="">
                                    <FontAwesomeIcon icon={faInstagram} className='text-white' />
                                </a>
                            </div>
                            <div className='rounded-circle d-flex justify-content-center align-items-center me-3' style={{ backgroundColor: "var(--maroon)", width: "30px", height: "30px" }}>
                                <a href="">
                                    <FontAwesomeIcon icon={faFacebook} className='text-white' />
                                </a>
                            </div>
                            <div className='rounded-circle d-flex justify-content-center align-items-center me-3' style={{ backgroundColor: "var(--maroon)", width: "30px", height: "30px" }}>
                                <a href="">
                                    <FontAwesomeIcon icon={faWhatsapp} className='text-white' />
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </Container>
        </>
    )
}