import React, { useState } from 'react'
import NavBar from '../../common/web_common/NavBar'
import Footer from '../../common/web_common/Footer'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'

export default function Register() {

  let [userData, setUserData] = useState({
    uFirstName: "",
    uLastName: "",
    uEmail: "",
    uPassword: "",
    uPhone: ""
  })

  let userRegister = (e) => {
    setUserData({
      uFirstName: "",
      uLastName: "",
      uEmail: "",
      uPassword: "",
      uPhone: ""
    })
    e.preventDefault();
    axios.post("http://localhost:8000/user/add-user", userData)
      .then((res) => res.data)
      .then((finalRes) => {
        e.target.reset();
        // console.log(finalRes)
        NotificationManager.success('Successfully', 'User Registered');
      })
  }

  return (
    <>
      <NavBar />
      <Container fluid className='my-5'>
        <Container>
          <div className='text-center'>
            <h1 className='text-uppercase' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>
              Create Account
            </h1>
          </div>
          <form className='text-center mt-5' onSubmit={userRegister}>
            <div className='mb-4'>
              <input type="text" name='uFirstName' value={userData.uFirstName} onChange={(e) => {
                let obj = { ...userData };
                obj['uFirstName'] = e.target.value;
                setUserData(obj)
              }} className='mob-login-input p-2 border rounded-pill' placeholder='First Name' style={{ width: "25%", background: "transparent" }} />
            </div>
            <div className='mb-4'>
              <input type="text" name='uLastName' value={userData.uLastName} onChange={(e) => {
                let obj = { ...userData }
                obj['uLastName'] = e.target.value;
                setUserData(obj);
              }} className='mob-login-input p-2 border rounded-pill' placeholder='Last Name' style={{ width: "25%", background: "transparent" }} />
            </div>
            <div className='mb-4'>
              <input type="email" name='uEmail' value={userData.uEmail} onChange={(e) => {
                let obj = { ...userData };
                obj['uEmail'] = e.target.value;
                setUserData(obj)
              }} className='mob-login-input p-2 border rounded-pill' placeholder='Email' style={{ width: "25%", background: "transparent" }} />
            </div>
            <div className='mb-4'>
              <input type="tel" name='uPhone' value={userData.Uphone} onChange={(e) => {
                let obj = { ...userData };
                obj['uPhone'] = e.target.value;
                setUserData(obj);
              }} className='mob-login-input p-2 border rounded-pill' placeholder='Phone Number' style={{ width: "25%", background: "transparent" }} />
            </div>
            <div className='mb-4'>
              <input type="password" name='uPassword' value={userData.Upassword} onChange={(e) => {
                let obj = { ...userData };
                obj['uPassword'] = e.target.value;
                setUserData(obj)
              }} className='mob-login-input p-2 border rounded-pill' placeholder='password' style={{ width: "25%", background: "transparent" }} />
            </div>
            <div className='mt-4'>
              <input type="submit" value='Create' className='mob-login-input rounded-pill p-2 border-0 fw-semibold text-white' style={{ width: "25%", backgroundColor: "var(--maroon)" }} />
            </div>
          </form>
        </Container>
      </Container>
      <NotificationContainer />
      <Footer />
    </>
  )
}
