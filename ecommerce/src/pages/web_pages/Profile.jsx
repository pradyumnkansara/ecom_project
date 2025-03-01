import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../../common/web_common/NavBar'
import Footer from '../../common/web_common/Footer'
import { Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons/faCircleUser'
import { adminContext } from '../../context.jsx/AdminContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Aos from 'aos'

export default function Profile() {
    const { resetContext } = useContext(adminContext);
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        NotificationManager.error('Logged out successfully');
        setTimeout(() => {
            resetContext(); // Clear user context and local storage
            navigate('/log-in'); // Redirect to the login page
        }, 1500); // 1.5 seconds delay
    };
    return (
        <>
            <NavBar />
            <ProfileDetails onLogout={handleLogout} />
            <NotificationContainer/>
            <Footer />
        </>
    )
}

function ProfileDetails({ onLogout }) {
    const { id } = useParams(); // Get the user ID from URL params
    const [userData, setUserData] = useState({
        uFirstName: '',
        uLastName: '',
        uEmail: '',
    });

    useEffect(() => {
        // Fetch user details from the server
        Aos.init({duration:2000});
        axios
            .get(`/user/view-user/${id}`)
            .then((response) => {
                // Assuming the API response has a "data" object with user details
                const { uFirstName, uLastName, uEmail } = response.data.userView;
                console.log(response.data.userView)
                setUserData({ uFirstName, uLastName, uEmail });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <>
            <Container fluid>
                <Container>
                    <h1 className='text-capitalize text-center my-5 pt-3' style={{ fontFamily: "var(--secondary_font)", color: "var(--maroon)" }} data-aos="fade-down">Profile</h1>
                    <form action="" className='mb-5' data-aos="fade-up">
                        <Row>
                            <Col xs={12} lg={6}>
                                <div className='text-center'>
                                    <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "250px" }} />
                                </div>
                            </Col>
                            <Col xs={12} lg={6}>
                                <Col xs={12}>
                                    <div className='mb-4'>
                                        <label className='mb-2 fw-bold fs-5 contact-input' style={{ color: "var(--maroon)" }}>
                                            First Name :
                                        </label>
                                        <input type="text" value={userData.uFirstName}
                                            readOnly className='w-100 p-2 rounded-2 border' placeholder='Full name' style={{ backgroundColor: "transparent", border: 'none' }} />
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div className='mb-4'>
                                        <label className='mb-2 fw-bold fs-5 contact-input' style={{ color: "var(--maroon)" }}>
                                            Last Name :
                                        </label>
                                        <input type="text" value={userData.uLastName}
                                            readOnly className='w-100 p-2 rounded-2 border' placeholder='Full name' style={{ backgroundColor: "transparent", border: 'none' }} />
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div className='mb-4'>
                                        <label className='mb-2 fw-bold fs-5 contact-input' style={{ color: "var(--maroon)" }}>
                                            E-mail :
                                        </label>
                                        <input type="email" value={userData.uEmail}
                                            readOnly className='w-100 p-2 rounded-2 border' placeholder='E-mail' style={{ backgroundColor: "transparent", border: 'none' }} />
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        <button
                            onClick={onLogout}
                            className='w-75 mt-3 p-2 ms-5 border-0 text-white'
                            style={{ backgroundColor: "var(--maroon)" }}
                        >
                            Log Out
                        </button>
                        <Link to={'/admin-login'}>
                            <button
                                className=' mt-3 ms-2 p-2 border-0 text-white'
                                style={{ backgroundColor: "var(--maroon)", width: "20%" }}
                            >
                                Admin pannel
                            </button>
                        </Link>
                    </form>
                </Container>
            </Container>
        </>
    )
}
