import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../common/admin_common/AdminHeader'
import Dashboard from '../../common/admin_common/Dashboard'
import { Col, Container, Row } from 'react-bootstrap'
import prevPlaceholder from '../../images/generic-image-file-icon-hi.png'
import { adminContext } from '../../context.jsx/AdminContext'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { useNavigate, useParams } from 'react-router-dom'

export default function AddCategory() {
    let { changeMenu, setChangeMenu } = useContext(adminContext)

    const [imagePreview, setImagePreview] = useState(prevPlaceholder);
    const [imageFile, setImageFile] = useState(null);
    const [imagePath, setImagePath] = useState('');
    
    const [updateCat, setUpdateCat] = useState({
        catName: "",
        catDesc: "",
        catStatus: "",
        catImg: ""
    })

    let params = useParams();
    let navigator = useNavigate();

    useEffect(() => {
        setUpdateCat({
            catName: "",
            catDesc: "",
            catStatus: "",
            catImg: ""
        })

        if (params.id !== "" && params.id !== undefined)
            axios.get(`/category/update-category/${params.id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    // console.log(finalRes)
                    setUpdateCat(finalRes.updateData)
                    setImagePreview(`/upload/cat_image/${finalRes.updateData.catImg}`); // Update the image preview
                })
        // .catch((error) => {
        //     console.error('Error fetching category:', error);
        // });
    }, [params.id])

    let addCategory = (ev) => {
        let AllFormData = new FormData(ev.target);
        
        // let AllFormData = {
        //     catName: ev.target.catName.value,
        //     catDescirption:ev.target.catDescirption.value ,
        //     catStatus:ev.target.catStatus.value,
        //     catImage:ev.target.catImage 
        // }
    
        // Add new category 
        axios.post(`/category/add-category/?id=${params.id ?? ""}`, AllFormData)
            .then((res) => res.data)
            .then((finalRes) => {
                ev.target.reset();
                setImagePreview(prevPlaceholder);
                setImageFile(null);
                NotificationManager.success('Successfully', params.id ? 'Category Updated' : 'Category inserted');
                setTimeout(() => {
                    navigator('/view-category')
                }, 2000)
                console.log(finalRes)
            })
            .catch((error) => {
                // Check if the error is due to a duplicate category name
                if (error.response && error.response.status === 400 && error.response.data.msg === "Category name must be unique") {
                    NotificationManager.error('Category name must be unique', 'Error');
                } else {
                    NotificationManager.error('Failed to Add/Update Category', 'Error');
                }
                console.error("Add/Update Error:", error);
            });
        ev.preventDefault();
    }

    const handleImageChange = (ev) => {
        const file = ev.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Generate a temporary URL for preview
            setImageFile(file); // Store the selected file
            setImagePath(file.name);
        }
    };

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
                            <form className='p-3 mt-5' onSubmit={addCategory}>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Category Name
                                    </label>
                                    <input type="text" name="catName" onChange={(e) => {
                                        let obj = { ...updateCat }
                                        obj['catName'] = e.target.value;
                                        setUpdateCat(obj);
                                    }} value={updateCat.catName} className='w-100 p-2 rounded-2' />
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Category Description
                                    </label>
                                    <textarea name="catDesc" onChange={(e) => {
                                        let obj = { ...updateCat }
                                        obj['catDesc'] = e.target.value;
                                        setUpdateCat(obj);
                                    }} value={updateCat.catDesc} className='w-100 p-2 rounded-2' id="" cols="30" rows="10"></textarea>
                                </div>
                                <div className='mb-4 d-flex justify-content-between'>
                                    <input type="file" onChange={handleImageChange} name='catImg' id='file-input' className='d-none' />
                                    <div>
                                        <label className='mb-2 fw-medium d-block' style={{ fontSize: '18px' }}>
                                            Category Image
                                        </label>
                                        <input type="text" readOnly value={imagePath || ""} placeholder='Upload File' className='p-2 rounded-start-2' />
                                        <label id='file-input-label' for="file-input" className='p-2 rounded-end-2 border border-black text-white' style={{ backgroundColor: "var(--maroon)" }}>
                                            Upload
                                        </label>
                                    </div>
                                    <div>
                                        <img src={imagePreview} alt="Preview" width={120} />
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Category Status
                                    </label>
                                    <div className='d-flex align-items-center'>
                                        <div className='d-flex align-items-center me-5'>
                                            <label htmlFor="" className='me-2'>
                                                Active
                                            </label>
                                            <input type="radio" checked={updateCat.catStatus === "active"} onChange={(e) => {
                                                let obj = { ...updateCat };
                                                obj['catStatus'] = e.target.value;
                                                setUpdateCat(obj);
                                            }} name="catStatus" value={"active"} style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label htmlFor="" className='me-2'>
                                                De-active
                                            </label>
                                            <input type="radio" name="catStatus" checked={updateCat.catStatus === "de-active"} onChange={(e) => {
                                                let obj = { ...updateCat }
                                                obj['catStatus'] = e.target.value;
                                                setUpdateCat(obj);
                                            }} value={"de-active"} style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
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
