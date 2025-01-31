import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../common/admin_common/AdminHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Dashboard from '../../common/admin_common/Dashboard'
import prevPlaceholder from '../../images/generic-image-file-icon-hi.png'
import { adminContext } from '../../context.jsx/AdminContext'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { useNavigate, useParams } from 'react-router-dom'


export default function AddBestSeller() {
    let { changeMenu } = useContext(adminContext);

    // image preview
    const [imagePreview, setImagePreview] = useState(prevPlaceholder);
    const [imageFile, setImageFile] = useState(null);
    const [imagePath, setImagePath] = useState('');

    const [updateBest, setUpdateBest] = useState({
        bestName: "",
        bestDesc: "",
        bestImg: "",
        bestSize: "",
        bestPrice: "",
        bestStatus: 1
    });

    let params = useParams();
    let navigator = useNavigate();

    useEffect(() => {
        setUpdateBest({
            bestName: "",
            bestDesc: "",
            bestImg: "",
            bestSize: "",
            bestPrice: "",
            bestStatus: 1
        })

        if (params.id !== "" && params.id !== undefined) {
            axios.get(`/best_seller/update-best_seller/${params.id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    setUpdateBest(finalRes.updateData);
                    setImagePreview(`/upload/best_img/${finalRes.updateData.bestImg}`);
                })
        }
    }, [params.id])

    const handleImageChange = (ev) => {
        const file = ev.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Generate a temporary URL for preview
            setImageFile(file); // Store the selected file
            setImagePath(file.name);
        }
    };

    let addBestSeller = (e) => {
        e.preventDefault();
        let AllBestSeller = new FormData(e.target)

        axios.post(`/best_seller/add-best_seller/?id=${params.id ?? ""}`, AllBestSeller)
            .then((res) => res.data)
            .then((finalRes) => {
                e.target.reset(); // Reset form inputs
                // Reset the state for imagePath, imagePreview, and imageFile
                setImagePreview(prevPlaceholder);
                setImageFile(null);
                setImagePath('');
                NotificationManager.success('Successfully', params.id ? 'Best Seller Updated' : 'Best Seller inserted');
                setTimeout(() => {
                    navigator('/view-bestsell')
                }, 2000)
            })
            .catch((error) => {
                NotificationManager.error("Add/Update Error:", error);
            });
    }

    return (
        <>
            <AdminHeader />
            <Container fluid className='ps-0'>
                <Row>
                    <Col lg={changeMenu ? 1 : 2} style={{ transition: '0.5s' }}>
                        <div>
                            <Dashboard />
                        </div>
                    </Col>
                    <Col lg={8}>
                        <div>
                            <form className='p-3 mt-5' onSubmit={addBestSeller}>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Best Product Name
                                    </label>
                                    <input type="text" className='w-100 p-2 rounded-2' name='bestName' onChange={(e) => {
                                        let obj = { ...updateBest }
                                        obj['bestName'] = e.target.value;
                                        setUpdateBest(obj)
                                    }} value={updateBest.bestName} />
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Best Product Size
                                    </label>
                                    <input type="text" className='w-100 p-2 rounded-2' name='bestSize' onChange={(e) => {
                                        let obj = { ...updateBest }
                                        obj['bestSize'] = e.target.value;
                                        setUpdateBest(obj)
                                    }} value={updateBest.bestSize} />
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Best Product Description
                                    </label>
                                    <textarea name='bestDesc' onChange={(e) => {
                                        let obj = { ...updateBest }
                                        obj['bestDesc'] = e.target.value;
                                        setUpdateBest(obj)
                                    }} value={updateBest.bestDesc} className='w-100 p-2 rounded-2' id="" cols="30" rows="10"></textarea>
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Best Product Price
                                    </label>
                                    <input type="text" onChange={(e) => {
                                        let obj = { ...updateBest }
                                        obj['bestPrice'] = e.target.value;
                                        setUpdateBest(obj)
                                    }} value={updateBest.bestPrice} className='w-100 p-2 rounded-2' name='bestPrice' />
                                </div>
                                <div className='mb-4 d-flex justify-content-between'>
                                    <input type="file" name='bestImg' id='file-input' onChange={handleImageChange} className='d-none' />
                                    <div>
                                        <label className='mb-2 fw-medium d-block' style={{ fontSize: '18px' }}>
                                            Best Product Image
                                        </label>
                                        <input type="text" value={imagePath || ""} readOnly placeholder='Upload File' className='p-2 rounded-start-2' />
                                        <label id='file-input-label' for="file-input" className='p-2 rounded-end-2 border border-black text-white' style={{ backgroundColor: "var(--maroon)" }}>
                                            Upload
                                        </label>
                                    </div>
                                    <div>
                                        <img src={imagePreview} width={120} />
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Best Product Status
                                    </label>
                                    <div className='d-flex align-items-center'>
                                        <div className='d-flex align-items-center me-5'>
                                            <label htmlFor="" className='me-2'>
                                                Active
                                            </label>
                                            <input type="radio" checked={updateBest.bestStatus == 1 ? true : false} onChange={(e) => {
                                                let obj = { ...updateBest }
                                                obj['bestStatus'] = e.target.value;
                                                setUpdateBest(obj)
                                            }} name='bestStatus' value={1} style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label htmlFor="" className='me-2'>
                                                De-active
                                            </label>
                                            <input type="radio" value={0} checked={updateBest.bestStatus == 0 ? true : false} onChange={(e) => {
                                                let obj = { ...updateBest }
                                                obj['bestStatus'] = e.target.value;
                                                setUpdateBest(obj)
                                            }} name='bestStatus' style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
                                        </div>
                                    </div>
                                </div>
                                <input type="submit" value={params.id ? 'Update' : 'Submit'} className='p-2 px-3 my-3 rounded-2 text-white border-0 fw-bold ' style={{ backgroundColor: "var(--maroon)" }} />
                            </form>
                        </div>
                    </Col>
                </Row>
                <NotificationContainer />
            </Container>
        </>
    )
}
