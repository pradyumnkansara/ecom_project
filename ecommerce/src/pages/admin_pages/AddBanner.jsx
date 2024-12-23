import React, { useContext, useEffect, useState } from 'react'
import { adminContext } from '../../context.jsx/AdminContext'
import AdminHeader from '../../common/admin_common/AdminHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Dashboard from '../../common/admin_common/Dashboard'
import prevPlaceholder from '../../images/generic-image-file-icon-hi.png'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications'


export default function AddBanner() {
    let { changeMenu } = useContext(adminContext);

    const [imagePreview, setImagePreview] = useState(prevPlaceholder);
    const [imageFile, setImageFile] = useState(null);
    const [imagePath, setImagePath] = useState('');

    const [updateBan, setUpdateBan] = useState({
        banName: "",
        banStatus: 1,
        banImg: ""
    })

    let params = useParams();
    let navigator = useNavigate();

    useEffect(() => {
        setUpdateBan(
            {
                banName: "",
                banStatus: 1,
                banImg: ""
            }
        )
        if (params.id !== "" && params.id !== undefined) {
            axios.get(`http://localhost:8000/banner/update-banner/${params.id}`)
                .then((res) => res.data)
                .then((finaRes) => {
                    setUpdateBan(finaRes.updateData)
                    setImagePreview(`http://localhost:8000/upload/ban_img/${finaRes.updateData.banImg}`);
                })
        }
    }, [params.id])

    const handleImageChange = (ev) => {
        const file = ev.target.files[0];
        console.log(file)
        if (file) {
            setImagePreview(URL.createObjectURL(file));// Generate a temporary URL for preview
            setImageFile(file);//Store the selected file
            setImagePath(file.name);
        }
    }

    let addBanner = (e) => {
        e.preventDefault();
        let AllBannerData = new FormData(e.target)

        axios.post(`http://localhost:8000/banner/add-banner/?id=${params.id ?? ""}`, AllBannerData)
            .then((res) => res.data)
            .then((finalRes) => {
                e.target.reset(); // Reset form inputs
                // Reset the state for imagePath, imagePreview, and imageFile
                setImagePreview(prevPlaceholder);
                setImageFile(null);
                setImagePath('');
                NotificationManager.success('Successfully', params.id ? 'Banner Updated' : 'Banner inserted');
                setTimeout(() => {
                    navigator('/view-banner')
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
                            <form className='p-3 mt-5' onSubmit={addBanner}>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Banner Heading
                                    </label>
                                    <input type="text" name='banName' onChange={
                                        (e) => {
                                            let obj = { ...updateBan };
                                            obj['banName'] = e.target.value;
                                            setUpdateBan(obj)
                                        }
                                    } className='w-100 p-2 rounded-2' value={updateBan.banName} />
                                </div>
                                <div className='mb-4 d-flex justify-content-between'>
                                    <input type="file" name='banImg' onChange={handleImageChange} id='file-input' className='d-none' />
                                    <div>
                                        <label className='mb-2 fw-medium d-block' style={{ fontSize: '18px' }}>
                                            Banner Image
                                        </label>
                                        <input type="text" readOnly value={imagePath || ""} placeholder='Upload File' className='p-2 rounded-start-2' />
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
                                        Banner Status
                                    </label>
                                    <div className='d-flex align-items-center'>
                                        <div className='d-flex align-items-center me-5'>
                                            <label htmlFor="" className='me-2'>
                                                Active
                                            </label>
                                            <input type="radio" name='banStatus' checked={updateBan.banStatus == 1 ? true : false} onChange={(e) => {
                                                let obj = { ...updateBan };
                                                obj['banStatus'] = e.target.value;
                                                setUpdateBan(obj)
                                            }} value={1} style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label htmlFor="" className='me-2'>
                                                De-active
                                            </label>
                                            <input type="radio" name='banStatus' checked={updateBan.banStatus == 0 ? true : false} onChange={(e) => {
                                                let obj = { ...updateBan };
                                                obj['banStatus'] = e.target.value;
                                                setUpdateBan(obj)
                                            }} value={0} style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
                                        </div>
                                    </div>
                                </div>
                                <input type="submit" value={params.id ? 'Update' : 'Submit'} className='p-2 px-3 my-3 rounded-2 text-white fw-bold border-0' style={{ backgroundColor: "var(--maroon)" }} />
                            </form>
                        </div>
                    </Col>
                </Row>
                <NotificationContainer />
            </Container>
        </>
    )
}
