import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../../common/web_common/NavBar';
import ganesh from '../../images/ganesh.png'
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../../common/web_common/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { adminContext } from '../../context.jsx/AdminContext';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function ProductDetail() {
    return (
        <>
            <NavBar />
            <Details />
            <Footer />
        </>
    )
}

function Details() {
    let [qty, setQty] = useState(1)
    const [productDetail, setProductDetail] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    
    let { cart, setCart } = useContext(adminContext)
    
    let params = useParams()

    useEffect(() => {
        // Fetch data from both APIs
        Promise.all([
            axios.get('/product/view-product'),
            axios.get('/new_launched/view-new_launched'),
            axios.get('/best_seller/view-best_seller')
        ])
        .then(([productRes, newLaunchRes,bestSellerRes]) => {
            const productData = productRes.data.viewprodData || [];
            const newLaunchData = newLaunchRes.data.dataView || [];
            const newBestData = bestSellerRes.data.dataView || [];
            
            // Check if the product exists in the first API
            const product = productData.find(item => item._id === params.id);
            if (product) {
                setProductDetail(product);
                setImageUrl(productRes.data.prodImgUrl + product.prodImg);
                return;
            }

            // Check if the product exists in the second API
            const newProduct = newLaunchData.find(item => item._id === params.id);
            if (newProduct) {
                setProductDetail(newProduct);
                setImageUrl(newLaunchRes.data.newImgUrl + newProduct.newlyImg);
            }

             // Check if the product exists in the Third API
             const newBestProduct = newBestData.find(item => item._id === params.id);
             if (newBestProduct) {
                 setProductDetail(newBestProduct);
                 setImageUrl(bestSellerRes.data.bestImgUrl + newBestProduct.bestImg);
             }
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
    }, [params.id]);

    if (!productDetail) {
        return <div>Loading...</div>;
    }       


    let addToCart = () => {
        let filterProduct = cart.filter((v, i) => v.name == (productDetail.prodName || productDetail.newlyName || productDetail.bestName))
        if (filterProduct.length == 1) {
            let finalFilterData = cart.filter((v, i) => {
                if (v.name == (productDetail.prodName || productDetail.newlyName || productDetail.bestName)) {
                    v.qty += 1;
                }
                return v;
            })
            setCart(finalFilterData)
            NotificationManager.success(`${productDetail.prodName || productDetail.newlyName || productDetail.bestName} qty updated in cart`);
        }
        else {
            let cartDetail = {
                name: productDetail.prodName || productDetail.newlyName || productDetail.bestName,
                image: imageUrl,
                price: productDetail.prodPrice || productDetail.newlyPrice || productDetail.bestPrice,
                qty: qty
            }
            setCart([...cart, cartDetail])
            NotificationManager.success(`${productDetail.prodName || productDetail.newlyName || productDetail.bestName} added to cart`);
        }
    }

    return (
        <>
            <Container fluid className='my-5'>
                <Container>
                    <Row>
                        <Col xs={12} lg={6}>
                            <div>
                                <figure>
                                    <img src={imageUrl} alt="" width="100%" />
                                </figure>
                            </div> 
                        </Col>
                        <Col xs={12} lg={6}>
                            <div>
                                <div className='border-secondary-subtle border-bottom'>
                                    <h2 className='text-capitalize mb-4' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>
                                        {productDetail.prodName || productDetail.newlyName || productDetail.bestName}
                                    </h2>
                                    <div className='fs-5 fw-bold mb-3'>
                                        <span>MRP : </span>
                                        {productDetail.prodPrice || productDetail.newlyPrice || productDetail.bestPrice} <br />
                                        <span className='fw-semibold'>incl. of all taxes</span>
                                    </div>
                                    <p className='fs-6 fw-medium mb-4'>
                                        {productDetail.prodDesc || productDetail.newlyDesc || productDetail.bestDesc}
                                    </p>
                                </div>
                                <div className='my-3'>
                                    <div className='fw-medium fs-5'>
                                        Size : <br />
                                        {productDetail.prodSize || productDetail.newlySize || productDetail.bestSize}
                                    </div>
                                    <Row>
                                        <Col xs={4}>
                                            <div className='d-flex fs-5 border-secondary-subtle border rounded-pill px-3'>
                                                <button className='border-0 fw-bold' style={{ background: "transparent" }} onClick={() => {
                                                    if (qty < 10) {
                                                        setQty(qty + 1)
                                                    }
                                                }}>+</button>
                                                <input type="number" value={qty} className='p-1 w-100 fw-semibold text-capitalize rounded-pill text-black px-2 border-0 text-center remove-drop' style={{ color: "white", backgroundColor: "transparent" }} />
                                                <button className='border-0 fw-bold' style={{ background: "transparent" }} onClick={() => {
                                                    if (qty > 1) {
                                                        setQty(qty - 1)
                                                    }
                                                }}>-</button>
                                            </div>
                                        </Col>
                                        <Col xs={8}>
                                            <div>
                                                <button className='p-1 w-100 border-0 fw-semibold text-capitalize rounded-pill fs-5' onClick={addToCart} style={{ color: "white", backgroundColor: "var(--maroon)" }}>add to cart</button>
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <div>
                                                <button className='p-1 w-100 border-0 fw-semibold text-capitalize rounded-pill fs-5 mt-3' style={{ color: "white", backgroundColor: "var(--maroon)" }}>Buy Now</button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <NotificationContainer />
        </>
    )
}
