import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../common/web_common/Footer'
import NavBar from '../../common/web_common/NavBar'
import { Col, Container, Row } from 'react-bootstrap'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import productimg from '../../images/ganesh.png'
import { adminContext } from '../../context.jsx/AdminContext'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Aos from 'aos';

export default function Cart() {
    useEffect(()=>{
        Aos.init({duration:2000});
    },[])
    return (
        <>
            <NavBar />
            <MainCart />
            <Footer />
            <NotificationContainer />
        </>
    )
}

function MainCart() {
    let { cart, setCart } = useContext(adminContext)
    let finaltot = 0;
    cart.forEach(element => {
        finaltot += (element.price * element.qty)
    });
    let gstAmount = finaltot * 0.18; // 18% GST
    let grandTotal = finaltot + gstAmount;
    let finalcart = cart.map((cartdetail, i) => {
        return (
            <ProdDetails cartdetail={cartdetail} index={i} key={i} />
        )
    })
    return (
        <>
            <Container fluid className='py-5'>
                <Container className='py-3'>
                    <Row className='justify-content-center'>
                        <Col lg={6}>
                            <div className='text-center'>
                                <h2 className='mb-4 fs-1' style={{ fontFamily: "var(--secondary_font)",color:"var(--maroon)" }} data-aos="fade-down"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine">Cart</h2>
                                {/* <p style={{ color: '#696969', fontSize: '18px' }}>
                                    Our legal policies for our Digital Customers. We recommend you to read all the policies before purchasing any product from our website.
                                </p> */}
                            </div>
                        </Col>
                    </Row>
                    <div className='overflow-x-auto' data-aos="fade-right">
                        <table class="table table-bg my-5">
                            <thead>
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col">Produuct</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                {finalcart}
                            </tbody>
                        </table>
                    </div>
                    <Row className='justify-content-end' data-aos="fade-left">
                        <Col lg={6} xs={12}>
                            <div>
                                <h3>Cart Total</h3>
                                <table border={1} className='table-total w-100'>
                                    <tr>
                                        <th><h4 className='fw-bold'>Subtotal</h4></th>
                                        <th><h5 style={{ color: '#696969' }}>Rs {finaltot}</h5></th>
                                    </tr>
                                    <tr>
                                        <th><h4 className='fw-bold'>Gst 18%</h4></th>
                                        <th>
                                            <h6 style={{ color: '#696969' }}>
                                            Rs {gstAmount.toFixed(2)}
                                            </h6>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th><h4 className='fw-bold'>Total</h4></th>
                                        <th><h5 style={{ color: '#696969' }}>Rs {grandTotal.toFixed(2)}</h5></th>
                                    </tr>
                                </table>
                                <div className='cart-btn'>
                                    <button className='w-100 my-3 rounded fw-bold'>Proceed to Checkout</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}

function ProdDetails({ cartdetail, index }) {
    let [qtyChange, setQtyChange] = useState(cartdetail.qty)
    let { cart, setCart } = useContext(adminContext)


    let changeQty = (event) => {
        setQtyChange(event.target.value)
        let qtyfilter = cart.filter((v, i) => {
            if (index == i) {
                v.qty = event.target.value;
            }
            return v;
        })
        setCart(qtyfilter);
    }

    let deleteCart = () => {
        let finaldelete = cart.filter((item, i) => i != index)
        setCart(finaldelete)
        NotificationManager.warning(`${cartdetail.name} deleted`);
    }
    console.log(cartdetail.price)
    return (
        <>
            <tr>
                <th scope="row">{index+1}</th>
                <td style={{ color: 'red', cursor: 'pointer', fontSize: '20px' }}>
                    <FontAwesomeIcon icon={faCircleXmark} onClick={deleteCart} />
                </td>
                <td>
                    <img src={cartdetail.image} width='100px' />
                </td>
                <td>{cartdetail.name}</td>
                <td>{cartdetail.price}</td>
                <td>
                    <input type="number" className='qty-box text-center' onChange={changeQty} min={1} max={10} value={qtyChange} />
                </td>
                <td>{cartdetail.qty * cartdetail.price}</td>
            </tr>
        </>
    )
}