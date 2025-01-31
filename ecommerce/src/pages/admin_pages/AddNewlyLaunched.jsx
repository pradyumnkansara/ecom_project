import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../common/admin_common/AdminHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Dashboard from '../../common/admin_common/Dashboard'
import prevPlaceholder from '../../images/generic-image-file-icon-hi.png'
import { adminContext } from '../../context.jsx/AdminContext'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { useNavigate, useParams } from 'react-router-dom'

export default function AddNewlyLaunched() {
    let { changeMenu } = useContext(adminContext);

    // image preview
    const [imagePreview, setImagePreview] = useState(prevPlaceholder);
    const [imageFile, setImageFile] = useState(null);
    const [imagePath, setImagePath] = useState('');

    const [updateNew, setUpdateNew] = useState({
        newlyName: "",
        newlyDesc: "",
        newlyImg: "",
        newlySize: "",
        newlyPrice: "",
        newlyStatus: 1
    });

    let params = useParams();
    let navigator = useNavigate();

    useEffect(() => {
        setUpdateNew({
            newlyName: "",
            newlyDesc: "",
            newlyImg: "",
            newlySize: "",
            newlyPrice: "",
            newlyStatus: 1
        })

        if (params.id !== "" && params.id !== undefined) {
            axios.get(`/new_launched/update-new_launched/${params.id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    setUpdateNew(finalRes.updateData);
                    setImagePreview(`/upload/newly_img/${finalRes.updateData.newlyImg}`);
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

    let addNewLaunched = (e) => {
        e.preventDefault();
        let AllNewLaunchedData = new FormData(e.target)

        axios.post(`/new_launched/add-new_launched/?id=${params.id ?? ""}`, AllNewLaunchedData)
            .then((res) => res.data)
            .then((finalRes) => {
                e.target.reset(); // Reset form inputs
                // Reset the state for imagePath, imagePreview, and imageFile
                setImagePreview(prevPlaceholder);
                setImageFile(null);
                setImagePath('');
                NotificationManager.success('Successfully', params.id ? 'New Launched Updated' : 'New Launched inserted');
                setTimeout(() => {
                    navigator('/view-newlaunch')
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
                            <form className='p-3 mt-5' onSubmit={addNewLaunched}>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        New Product Name
                                    </label>
                                    <input type="text" className='w-100 p-2 rounded-2' name='newlyName' value={updateNew.newlyName} onChange={(e) => {
                                        let obj = { ...updateNew }
                                        obj['newlyName'] = e.target.value;
                                        setUpdateNew(obj);
                                    }} />
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        New Product Size
                                    </label>
                                    <input type="text" className='w-100 p-2 rounded-2' name='newlySize' value={updateNew.newlySize} onChange={(e) => {
                                        let obj = { ...updateNew }
                                        obj['newlySize'] = e.target.value;
                                        setUpdateNew(obj);
                                    }} />
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        New Product Description
                                    </label>
                                    <textarea name='newlyDesc' value={updateNew.newlyDesc} onChange={(e) => {
                                        let obj = { ...updateNew }
                                        obj['newlyDesc'] = e.target.value;
                                        setUpdateNew(obj);
                                    }} className='w-100 p-2 rounded-2' id="" cols="30" rows="10"></textarea>
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        New Product Price
                                    </label>
                                    <input type="text" onChange={(e) => {
                                        let obj = { ...updateNew }
                                        obj['newlyPrice'] = e.target.value;
                                        setUpdateNew(obj);
                                    }} value={updateNew.newlyPrice} className='w-100 p-2 rounded-2' name='newlyPrice' />
                                </div>
                                <div className='mb-4 d-flex justify-content-between'>
                                    <input type="file" name='newlyImg' id='file-input' onChange={handleImageChange} className='d-none' />
                                    <div>
                                        <label className='mb-2 fw-medium d-block' style={{ fontSize: '18px' }}>
                                            New Product Image
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
                                        New Product Status
                                    </label>
                                    <div className='d-flex align-items-center'>
                                        <div className='d-flex align-items-center me-5'>
                                            <label htmlFor="" className='me-2'>
                                                Active
                                            </label>
                                            <input type="radio" checked={updateNew.newlyStatus == 1 ? true : false} onChange={(e) => {
                                                let obj = { ...updateNew }
                                                obj['newlyStatus'] = e.target.value;
                                                setUpdateNew(obj);
                                            }} name='newlyStatus' value={1} style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label htmlFor="" className='me-2'>
                                                De-active
                                            </label>
                                            <input type="radio" value={0} checked={updateNew.newlyStatus == 0 ? true : false} onChange={(e) => {
                                                let obj = { ...updateNew }
                                                obj['newlyStatus'] = e.target.value;
                                                setUpdateNew(obj);
                                            }} name='newlyStatus' style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
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
