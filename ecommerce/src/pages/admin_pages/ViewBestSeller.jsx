import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../common/admin_common/AdminHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Dashboard from '../../common/admin_common/Dashboard'
import prev from '../../images/generic-image-file-icon-hi.png'
import { adminContext } from '../../context.jsx/AdminContext'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'


export default function ViewBestSeller() {
    let { changeMenu } = useContext(adminContext);
    let [viewBestData, setViewBestData] = useState([]);
    let [imgUrl, setImgUrl] = useState('');

    let viewBestSeller = () => {
        axios.get("/best_seller/view-best_seller")
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes)
                setViewBestData(finalRes.dataView)
                setImgUrl(finalRes.bestImgUrl)
            })
    }

    let deleteBestSeller = (id) => {
        axios.delete(`/best_seller/delete-best_seller/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                viewBestSeller();
                NotificationManager.error('Category deleted', 'DELETED!', 3000);
            })
    }

    useEffect(() => {
        viewBestSeller();
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
                                        <th scope="col">Best Product Name</th>
                                        <th scope="col">Best Product Description</th>
                                        <th scope="col">Best Product Price</th>
                                        <th scope="col">Best Product Image</th>
                                        <th scope="col">Best Product Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        viewBestData.length >= 1
                                            ?
                                            viewBestData.map((v, i) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{v.bestName}</td>
                                                        <td>{v.bestDesc}</td>
                                                        <td>{v.bestPrice}</td>
                                                        <td>
                                                            <img src={imgUrl + v.bestImg} alt="" width="100px" />
                                                        </td>
                                                        <td>Active</td>
                                                        <td>
                                                            <button className='mx-1 p-1 rounded-2 text-white border-0' style={{ backgroundColor: "var(--maroon)" }} onClick={() => { deleteBestSeller(v._id) }}>Delete</button>
                                                            <Link to={`/add-bestsell/${v._id}`} state={{product: v}}>
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
