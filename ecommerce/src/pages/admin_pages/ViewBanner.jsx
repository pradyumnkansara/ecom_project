import React, { useContext, useEffect, useState } from 'react'
import { adminContext } from '../../context.jsx/AdminContext'
import AdminHeader from '../../common/admin_common/AdminHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Dashboard from '../../common/admin_common/Dashboard'
// import prev from '../../images/generic-image-file-icon-hi.png'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'

export default function ViewBanner() {
    let { changeMenu } = useContext(adminContext)
    let [dataBanner, setDataBanner] = useState([])
    let [imgUrl, setImgurl] = useState('')

    let viewBan = () => {
        axios.get("/banner/view-banner")
            .then((res) => res.data)
            .then((finalRes) => {
                setDataBanner(finalRes.bannerData)
                setImgurl(finalRes.banImgUrl)
            })
    }

    let deleteBan = (id) => {
        axios.delete(`/banner/delete-banner/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                viewBan();
                NotificationManager.error('Category deleted', 'DELETED!', 5000);
            })
    }

    useEffect(() => {
        viewBan();
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
                                        <th scope="col">Banner Heading</th>
                                        <th scope="col">Banner Image</th>
                                        <th scope="col">Banner Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataBanner.length >= 1
                                            ?
                                            dataBanner.map((v, i) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{v.banName}</td>
                                                        <td>
                                                            <img src={imgUrl + v.banImg} alt="" width="100px" />
                                                        </td>
                                                        <td>{v.banStatus ? "active" : "de-active"}</td>
                                                        <td>
                                                            <button className='mx-1 p-1 rounded-2 text-white border-0' onClick={() => {
                                                                deleteBan(v._id)
                                                            }} style={{ backgroundColor: "var(--maroon)" }}>Delete</button>
                                                            <Link to={`/add-banner/${v._id}`}>
                                                                <button className='mx-1 p-1 rounded-2 text-white border-0' style={{ backgroundColor: "var(--maroon)" }}>Update</button>
                                                            </Link>
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
