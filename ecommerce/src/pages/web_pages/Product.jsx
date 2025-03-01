import React from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../../common/web_common/Footer'
import NavBar from '../../common/web_common/NavBar'
import prod1 from '../../images/ganesh.png';
import Accordion from 'react-bootstrap/Accordion';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { height } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { adminContext } from '../../context.jsx/AdminContext';
import Aos from 'aos';

export default function Product() {
    let [prod, setProd] = useState([])
    let [prodUrl, setProdUrl] = useState('')
    let [catData, setCatData] = useState([])
    let [subCatData, setSubCatData] = useState([])
    let [minPrice, setMinPrice] = useState(0);
    let [maxPrice, setMaxPrice] = useState(100);
    let [selectedPrice, setSelectedPrice] = useState(maxPrice);

    // Filter states
    let [selectedCategories, setSelectedCategories] = useState([]);
    let [selectedSubCategories, setSelectedSubCategories] = useState([]);

    let params=useParams();
    // console.log(params.id)

    const handlePriceChange = (e) => {
        setSelectedPrice(e.target.value);
    };

    // Handle category selection
    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories(prev => 
            checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };

    // Handle sub-category selection
    const handleSubCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedSubCategories(prev => 
            checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };

    let catApi = () => {
        axios.get("/category/view-category")
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes)
                setCatData(finalRes.dataView)
            })
    }

    let productApi = () => {
        axios.get("/product/view-product")
            .then((res) => res.data)
            .then((finalRes) => {
                setProd(finalRes.viewprodData)
                setProdUrl(finalRes.prodImgUrl);

                 // Extract min and max prices
                if (finalRes.viewprodData.length > 0) {
                    let prices = finalRes.viewprodData.map(product => product.prodPrice);
                    setMinPrice(Math.min(...prices));  // Set minimum price
                    setMaxPrice(Math.max(...prices));  // Set maximum price
                    setSelectedPrice(Math.min(...prices));  // Set default selected price to max
                }
            })
    }

    let subCatApi = () => {
        axios.get("/sub-cat/view-subCat")
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes)
                setSubCatData(finalRes.viewSub)
            })
    }

    useEffect(() => {
        productApi();
        catApi();
        subCatApi();
        Aos.init({ duration: 2000 });
    }, [])

    useEffect(() => {
        if (params.id && catData.length > 0) {
            const matchedCategory = catData.find(category => category._id === params.id);
            if (matchedCategory) {
                setSelectedCategories([matchedCategory.catName]);
            }
        }
    }, [params.id, catData]);
    
    useEffect(() => {
        if (params.id && subCatData.length > 0 && catData.length > 0) {
            // Find the matched subcategory
            const matchedSubCategory = subCatData.find(subCategory => subCategory._id === params.id);
            if (matchedSubCategory) {
                setSelectedSubCategories([matchedSubCategory.subCatName]);
    
                // Find the parent category of the matched subcategory
                const parentCategory = catData.find(category => category._id === matchedSubCategory.catId);
                if (parentCategory) {
                    setSelectedCategories([parentCategory.catName]);
                }
            }
        }
    }, [params.id, subCatData, catData]);

    const filteredProducts = prod.filter(product => {
        // console.log(product.subCatId[0].catId[0].catName)
        const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.subCatId[0].catId[0].catName);
        const isSubCategoryMatch = selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCatId[0].subCatName);
        const isPriceMatch = product.prodPrice >= selectedPrice;
        return isCategoryMatch && isSubCategoryMatch && isPriceMatch;
        // return isCategoryMatch && isSubCategoryMatch;
    });

    return (
        <>
            <NavBar />
            <Container fluid className='py-5'>
                <Container>
                    <h1 className='text-capitalise text-center mb-5' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }} data-aos="fade-down"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine">Products</h1>
                    <Row>
                        <Col xs={12} lg={3} className='mb-4 mb-lg-0' data-aos="fade-right">
                            <div>
                                <h3 className='text-capitalize fw-semibold mb-3' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>Filter</h3>
                                <div className='product'>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header className='py-0'  ><h4 className='text-capitalize fw-semibold' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>Categories</h4></Accordion.Header>
                                            <Accordion.Body className='pb-0'>
                                                <ul className='p-0' style={{ listStyle: "none" }}>
                                                    {
                                                        catData.length >= 1
                                                            ?
                                                            catData.map((v, i) => {
                                                                return (
                                                                    <li className='text-black fs-5 fw-medium p-2 d-flex justify-content-between align-items-center' key={i}>
                                                                        <span>{v.catName}</span>
                                                                        <input type="checkbox" value={v.catName} style={{ transform: "scale(1.2)" }}  onChange={handleCategoryChange} checked={selectedCategories.includes(v.catName)}/>
                                                                    </li>
                                                                )
                                                            })
                                                            :
                                                            "Load"
                                                    }
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header className='py-0'><h4 className='text-capitalize fw-semibold' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>Statue Categories</h4></Accordion.Header>
                                            <Accordion.Body className='pb-0 drop-statue-cat'>
                                                <ul className='p-0' style={{ listStyle: "none" }}>
                                                    {
                                                        subCatData.length >= 1
                                                            ?
                                                            Array.from(new Set(subCatData.map(v => v.subCatName))).map((name, i) => (
                                                                <li className='text-black fs-5 fw-medium p-2 d-flex justify-content-between align-items-center' key={i}>
                                                                    <span>{name}</span>
                                                                    <input type="checkbox" value={name} style={{ transform: "scale(1.2)" }} onChange={handleSubCategoryChange} checked={selectedSubCategories.includes(name)}/>
                                                                </li>
                                                            ))
                                                            :
                                                            "loading"
                                                    }
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </div>
                            <div className='border-maroon'>
                                <h4 className='text-capitalize fw-semibold p-3' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>Price Range</h4>
                                <div className='p-2'>
                                <input 
                                        type="range" 
                                        className='w-100' 
                                        min={minPrice} 
                                        max={maxPrice} 
                                        value={selectedPrice} 
                                        onChange={handlePriceChange} 
                                        style={{ outline: "none", accentColor: "var(--maroon)" }} 
                                    />
                                    <div className='d-flex justify-content-between'>
                                        <div className='text-center'>
                                            min<br />{minPrice}
                                        </div>
                                        <div>
                                            {selectedPrice}
                                        </div>
                                        <div className='text-center'>
                                            max<br />{maxPrice}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} lg={9} data-aos="fade-left">
                            <div>
                                <Row className='gy-5'>
                                    {
                                        filteredProducts.length >= 1
                                            ?
                                            filteredProducts.map((v, i) => {
                                                return (
                                                    <Col xs={6} lg={4}>
                                                        <div>
                                                            <ProductBox props={v} key={i} prodUrl={prodUrl}/>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                            :
                                            "no data found"
                                    }
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Footer />
            <NotificationContainer />
        </>
    )
}

function ProductBox({ props, prodUrl }) {
    let { cart, setCart } = useContext(adminContext)

    let addToCart = () => {
        let filterProduct = cart.filter((v, i) => v.name == props.prodName)
        if (filterProduct.length == 1) {
            let finalFilterData = cart.filter((v, i) => {
                if (v.name == props.prodName) {
                    v.qty += 1;
                }
                return v;
            })
            setCart(finalFilterData)
            NotificationManager.success(`${props.prodName} qty updated in cart`);
        }
        else {
            let cartDetail = {
                name: props.prodName,
                image: prodUrl + props.prodImg,
                price: props.prodPrice,
                qty: 1
            }
            setCart([...cart, cartDetail])
            NotificationManager.success(`${props.prodName} added to cart`);
        }
    }
    // console.log(prodUrl)
    return (
        <>
            <div data-aos="zoom-in">
                <Link to={`/product-detail/${props._id}`} style={{ color: "black" }}>
                    <div className='length-mob' style={{ height: "430px" }}>
                        <img src={prodUrl + props.prodImg} alt="" width="100%" height="100%" />
                    </div>
                    <h5 className='text-uppercase fw-bold my-3'>{props.prodName}</h5>
                    <span className='d-block fw-semibold fs-6'>
                        Rs.{props.prodPrice}
                    </span>
                </Link>
                <button className='text-uppercase fw-semibold w-100 border-0 text-white rounded-pill py-2 fs-6 fw-semibold my-3' onClick={addToCart} style={{ backgroundColor: "var(--maroon)" }}>
                    add to cart
                </button>
            </div>
        </>
    )
}