import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../common/admin_common/AdminHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Dashboard from '../../common/admin_common/Dashboard'
import { adminContext } from '../../context.jsx/AdminContext'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'

export default function ViewUser() {
    let { changeMenu } = useContext(adminContext);
    let [userData, setUserData] = useState([])

    let dataView = () => {
        axios.get("http://localhost:8000/user/view-user")
            .then((res) => res.data)
            .then((finalRes) => {
                setUserData(finalRes.userView)
            })
    }

    let delView = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8000/user/delete-user/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes)
                NotificationManager.error('User deleted', 'DELETED!', 3000);
                dataView();
            })
    }

    useEffect(() => {
        dataView();
    })
    return (
        <>
            <AdminHeader />
            <Container fluid className='ps-0 '>
                <Row>
                    <Col lg={changeMenu ? 1 : 2} style={{ transition: '0.5s' }}>
                        <div>
                            <Dashboard />
                        </div>
                    </Col>
                    <Col lg={8}>
                        <div className='ms-5 mt-5'>
                            <table class="table table-striped">
                                <thead>
                                    <tr className='text-center'>
                                        <th scope="col">#</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Password</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userData.length >= 1
                                            ?
                                            userData.map((v, i) => {
                                                return (
                                                    <tr className='text-center'>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{v.uFirstName}</td>
                                                        <td>{v.uLastName}</td>
                                                        <td>{v.uEmail}</td>
                                                        <td>{v.uPassword}</td>
                                                        <td className='text-center'>
                                                            <button className='mx-1 p-1 rounded-2 text-white border-0' onClick={() => {
                                                                delView(v._id)
                                                            }   } style={{ backgroundColor: "var(--maroon)" }}>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            "No Data Found"
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
                <NotificationContainer />
            </Container>
        </>
    )
}
