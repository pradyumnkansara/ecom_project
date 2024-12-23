import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../common/admin_common/AdminHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Dashboard from '../../common/admin_common/Dashboard'
import prev from '../../images/generic-image-file-icon-hi.png'
import { adminContext } from '../../context.jsx/AdminContext'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'


export default function ViewNewlyLaunched() {
    let { changeMenu } = useContext(adminContext);
    let [viewNewData, setViewNewData] = useState([]);
    let [imgUrl, setImgUrl] = useState('');

    let viewNewLaunch = () => {
        axios.get("http://localhost:8000/new_launched/view-new_launched")
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes)
                setViewNewData(finalRes.dataView)
                setImgUrl(finalRes.newImgUrl)
            })
    }

    let deleteNewLaunch = (id) => {
        axios.delete(`http://localhost:8000/new_launched/delete-new_launched/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                viewNewLaunch();
                NotificationManager.error('New Launch deleted', 'DELETED!', 3000);
            })
    }

    useEffect(() => {
        viewNewLaunch();
    }, [])

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
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">New Product Name</th>
                                        <th scope="col">New Product Description</th>
                                        <th scope="col">New Product Price</th>
                                        <th scope="col">New Product Image</th>
                                        <th scope="col">New Product Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        viewNewData.length >= 1
                                            ?
                                            viewNewData.map((v, i) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{v.newlyName}</td>
                                                        <td>{v.newlyDesc}</td>
                                                        <td>{v.newlyPrice}</td>
                                                        <td>
                                                            <img src={imgUrl + v.newlyImg} alt="" width="100px" />
                                                        </td>
                                                        <td>Active</td>
                                                        <td>
                                                            <button className='mx-1 p-1 rounded-2 text-white border-0' style={{ backgroundColor: "var(--maroon)" }} onClick={() => { deleteNewLaunch(v._id) }}>Delete</button>
                                                            <Link to={`/add-newlaunch/${v._id}`}>
                                                                <button className='mx-1 p-1 rounded-2 text-white border-0' style={{ backgroundColor: "var(--maroon)" }}>Update</button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            "No data Found"
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Container>
            <NotificationContainer />
        </>
    )
}
