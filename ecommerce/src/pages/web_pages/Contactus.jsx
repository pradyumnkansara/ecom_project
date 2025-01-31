import React, { useState } from 'react'
import NavBar from '../../common/web_common/NavBar'
import { Col, Container, Row } from 'react-bootstrap'
import Footer from '../../common/web_common/Footer'
import axios from 'axios'

export default function Contactus() {
    let [contactForm,setContactForm]=useState({
        cName:"",
        cEmail:"",
        cMessage:""
    })

    let handleContactForm=(e)=>{
        e.preventDefault();
        axios.post("/contact/contact-mail",contactForm)
        .then((res)=>res.data)
        .then((finalRes)=>{
            console.log(finalRes)
            e.target.reset();
        })
    }

    return (
        <>
            <NavBar />
            <Container fluid>
                <Container>
                    <h1 className='text-capitalize text-center my-5 pt-3' style={{fontFamily:"var(--secondary_font)",color:"var(--maroon)"}}>contact us</h1>
                    <form action="" className='mb-5' onSubmit={handleContactForm}>
                        <Row>
                            <Col xs={6}>
                                <div>
                                    <label className='mb-2 fw-bold fs-5 contact-input' style={{color:"var(--maroon)"}}>
                                        Full Name :
                                    </label>
                                    <input type="text" name='cName' value={contactForm.cName} onChange={(e)=>{
                                        let obj={...contactForm};
                                        obj['cName']=e.target.value;
                                        setContactForm(obj)
                                    }} className='w-100 p-2 rounded-2 border' placeholder='Full name' style={{backgroundColor:"transparent",border:'none'}}/>
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div>
                                    <label className='mb-2 fw-bold fs-5 contact-input' style={{color:"var(--maroon)"}}>
                                        E-mail :
                                    </label>
                                    <input type="email" name='cEmail' value={contactForm.cEmail} onChange={(e)=>{
                                        let obj={...contactForm};
                                        obj['cEmail']=e.target.value;
                                        setContactForm(obj)
                                    }} className='w-100 p-2 rounded-2 border' placeholder='E-mail' style={{backgroundColor:"transparent",border:'none'}}/>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className='mt-3'>
                                    <label className='mb-2 fw-bold fs-5 ' style={{color:"var(--maroon)"}}>
                                        Message
                                    </label>
                                    <textarea name="cMessage" value={contactForm.cMessage} onChange={(e)=>{
                                        let obj={...contactForm};
                                        obj['cMessage']=e.target.value;
                                        setContactForm(obj)
                                    }} className='w-100 p-2 rounded-2 border' placeholder='Message' style={{backgroundColor:"transparent",border:'none',height:"200px"}}></textarea>
                                </div>
                            </Col>
                        </Row>
                        <input type="submit" value={'Send'} className='w-100 mt-3 p-2 border-0 text-white' style={{backgroundColor:"var(--maroon)"}}/>
                    </form>
                </Container>
            </Container>
            <Footer/>
        </>
    )
}
