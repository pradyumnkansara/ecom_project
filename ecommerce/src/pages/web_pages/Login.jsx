import React, { useState } from 'react'
import NavBar from '../../common/web_common/NavBar'
import Footer from '../../common/web_common/Footer'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
    const [loginData, setLoginData] = useState({ uEmail: "", uPassword: "" });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const loginForm = async (event) => {
        event.preventDefault();
        if (!loginData.uEmail || !loginData.uPassword) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:8000/user/login", loginData);
            const finalRes = res.data;

            if (finalRes.loginmatch && finalRes.loginmatch._id) {
                alert("Login Successful");
                // Save user data (e.g., using localStorage or state management library)
                console.log("User Details:", finalRes);
            } else {
                alert("Login Unsuccessful");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <Container fluid>
                <Container className='my-5 pb-5'>
                    <div className='text-center'>
                        <div className='text-uppercase fw-semibold fs-5 mb-2 mt-4' style={{ wordSpacing: "8px", letterSpacing: "2px" }}>
                            sign-in to pd-arts
                        </div>
                        <h1 className='text-uppercase' style={{ color: "var(--maroon)", fontFamily: "var(--secondary_font)" }}>
                            log-in
                        </h1>
                        <div className='text-uppercase fw-semibold fs-6 mb-2 mt-4'>
                            we are happy! you are here
                        </div>
                    </div>
                    <form className='text-center mt-5' action="" onSubmit={loginForm}>
                        <div className='mb-4'>
                            <label className='d-block mb-1 fw-semibold fs-6' style={{ marginRight: "165px", color: "var(--maroon)" }}>Username or e-mail</label>
                            <input type="text" className='p-2 border mob-login-input rounded-pill' placeholder='Username or e-mail' name='uEmail' onChange={handleInputChange} style={{ width: "25%", background: "transparent" }} />
                        </div>
                        <div>
                            <label className='d-block mb-1 fw-semibold fs-6' style={{ marginRight: "240px", color: "var(--maroon)" }}>password</label>
                            <input type="password" className='p-2 border mob-login-input rounded-pill' placeholder='password' name='uPassword'  onChange={handleInputChange} style={{ width: "25%", background: "transparent" }} />
                        </div>
                        <div className='mt-4'>
                            <input type="submit" value={'Log In'}  className='mob-login-input rounded-pill p-2 border-0 fw-semibold text-white' style={{ width: "25%", backgroundColor: "var(--maroon)" }}/>
                        </div>
                    </form>
                    <div className='text-uppercase text-center fw-semibold text-decoration-underline mb-2 mt-4' style={{ wordSpacing: "8px" }}>
                        forgot password
                    </div>
                    <div className='text-uppercase text-center fw-semibold text-decoration-underline fs-6 mb-2 mt-4' style={{ wordSpacing: "4px", letterSpacing: "2px" }}>
                        <Link to={'/register'} className='text-black'>
                            new here ? create an account
                        </Link>
                    </div>
                </Container>
            </Container>
            <Footer />
        </>
    )
}
