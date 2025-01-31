import React, { useContext, useEffect, useState } from 'react'
import { adminContext } from '../../context.jsx/AdminContext'
import AdminHeader from '../../common/admin_common/AdminHeader'
import { Col, Container, Row } from 'react-bootstrap'
import prev from '../../images/generic-image-file-icon-hi.png'
import Dashboard from '../../common/admin_common/Dashboard'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'

export default function ViewCategory() {
    let { changeMenu, setChangeMenu } = useContext(adminContext)
    let [view, setView] = useState([]);
    let [imgUrl, setImgurl] = useState('')

    console.log(axios.defaults.headers,"ppppppppppppppppppppppppppppppppppppppp")
    let viewCat = () => {
        axios.get("/category/view-category")
            .then((res) => res.data)
            .then((finalRes) => {
                setView(finalRes.dataView);
                setImgurl(finalRes.CatImgUrl)
                console.log(finalRes)
            })
    }

    let deleteCat = (id) => {
        axios.delete(`/category/delete-category/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                viewCat();
                NotificationManager.error('Category deleted', 'DELETED!', 5000);
            })
    }

    useEffect(() => {
        viewCat();
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
                                        <th scope="col">Category Name</th>
                                        <th scope="col">Category Description</th>
                                        <th scope="col">Category Image</th>
                                        <th scope="col">Category Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        view.length >= 1
                                            ?
                                            view.map((catItem, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{catItem.catName}</td>
                                                        <td>{catItem.catDesc}</td>
                                                        <td>
                                                            <img src={imgUrl + catItem.catImg} alt="" width="100px" />
                                                        </td>
                                                        <td>{catItem.catStatus}</td>
                                                        <td>
                                                            <button className='mx-1 p-1 rounded-2 text-white border-0' onClick={() => {
                                                                deleteCat(catItem._id)
                                                            }} style={{ backgroundColor: "var(--maroon)" }}>Delete</button>
                                                            <Link to={`/add-category/${catItem._id}`}>
                                                                <button className='mx-1 p-1 rounded-2 text-white border-0' style={{ backgroundColor: "var(--maroon)" }}>Update</button>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            "Empty data"
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
