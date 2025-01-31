import React, { useContext, useEffect, useState } from 'react'
import { adminContext } from '../../context.jsx/AdminContext'
import AdminHeader from '../../common/admin_common/AdminHeader';
import { Col, Container, Row } from 'react-bootstrap';
import Dashboard from '../../common/admin_common/Dashboard';
import prev from '../../images/generic-image-file-icon-hi.png'
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';


export default function ViewSubcategory() {
    let { changeMenu } = useContext(adminContext);
    let [subView, setSubView] = useState([])
    let [imgUrl, setImgUrl] = useState('');

    let viewSubCategory = () => {
        axios.get("/sub-cat/view-subCat")
            .then((res) => res.data)
            .then((finalres) => {
                setSubView(finalres.viewSub)
                setImgUrl(finalres.subCatImgUrl)
                console.log(finalres)
            })
    }

    let deleteSubCategory = (id) => {
        axios.delete(`/sub-cat/delete-subCat/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                viewSubCategory();
                NotificationManager.error('Category deleted', 'DELETED!', 3000);
            })
    }

    useEffect(() => {
        viewSubCategory();
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
                                        <th scope="col">Category</th>
                                        <th scope="col">Sub Category Name</th>
                                        <th scope="col">Sub Category Description</th>
                                        <th scope="col">Sub Category Status</th>
                                        <th scope="col">Sub Category Image</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subView.length >= 1
                                            ?
                                            subView.map((v, i) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{v.catId[0].catName}</td>
                                                        <td>{v.subCatName}</td>
                                                        <td>{v.subCatDesc}</td>
                                                        <td>{v.subCatStatus ? "active" : "de-active"}</td>
                                                        <td>
                                                            <img src={imgUrl + v.subCatImg} alt="preview" width="100px" />
                                                        </td>
                                                        <td>
                                                            <button className='mx-1 p-1 rounded-2 text-white border-0' onClick={() => {
                                                                deleteSubCategory(v._id)
                                                            }} style={{ backgroundColor: "var(--maroon)" }}>Delete</button>
                                                            <Link to={`/add-subcategory/${v._id}`}>
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
                <NotificationContainer />
            </Container>
        </>
    )
}
