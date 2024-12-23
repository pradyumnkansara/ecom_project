import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../common/admin_common/AdminHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Dashboard from '../../common/admin_common/Dashboard'
import prev from '../../images/generic-image-file-icon-hi.png'
import { adminContext } from '../../context.jsx/AdminContext'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'


export default function ViewProduct() {
    let { changeMenu } = useContext(adminContext);
    let [viewProdData, setViewProdData] = useState([]);
    let [imgUrl, setImgUrl] = useState('');

    let viewProduct = () => {
        axios.get("http://localhost:8000/product/view-product")
            .then((res) => res.data)
            .then((finalRes) => {
                setViewProdData(finalRes.viewprodData)
                setImgUrl(finalRes.prodImgUrl)
            })
    }

    let deleteProduct = (id) => {
        axios.delete(`http://localhost:8000/product/delete-product/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                viewProduct();
                NotificationManager.error('Category deleted', 'DELETED!', 3000);
            })
    }

    useEffect(() => {
        viewProduct();
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
                                        <th scope="col">Sub Category</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Product Description</th>
                                        <th scope="col">Product Price</th>
                                        <th scope="col">Product Image</th>
                                        <th scope="col">Product Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        viewProdData.length >= 1
                                            ?
                                            viewProdData.map((v, i) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{v.subCatId[0].catId[0].catName}</td>
                                                        <td>{v.subCatId[0].subCatName}</td>
                                                        <td>{v.prodName}</td>
                                                        <td>{v.prodDesc}</td>
                                                        <td>{v.prodPrice}</td>
                                                        <td>
                                                            <img src={imgUrl + v.prodImg} alt="" width="100px" />
                                                        </td>
                                                        <td>Active</td>
                                                        <td>
                                                            <button className='mx-1 p-1 rounded-2 text-white border-0' style={{ backgroundColor: "var(--maroon)" }} onClick={() => { deleteProduct(v._id) }}>Delete</button>
                                                            <Link to={`/add-product/${v._id}`} state={{product: v}}>
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
