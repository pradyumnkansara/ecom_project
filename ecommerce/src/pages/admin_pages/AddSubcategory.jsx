import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../common/admin_common/AdminHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Dashboard from '../../common/admin_common/Dashboard'
import { adminContext } from '../../context.jsx/AdminContext'
import prevPlaceholder from '../../images/generic-image-file-icon-hi.png'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications'


export default function AddSubcategory() {
    let { changeMenu } = useContext(adminContext);
    let [catData, setCatData] = useState([]);

    const [imagePreview, setImagePreview] = useState(prevPlaceholder);
    const [imageFile, setImageFile] = useState(null);
    const [imagePath, setImagePath] = useState('');
    const [upSubCat, setUpSubCat] = useState({
        catId: "",
        subCatName: "",
        subCatDesc: "",
        subCatImg: "",
        subCatStatus: 1
    })

    let params = useParams();
    let navigator = useNavigate();

    useEffect(() => {
        setUpSubCat({
            catId: "",
            subCatName: "",
            subCatDesc: "",
            subCatImg: "",
            subCatStatus: 1
        })
        if (params.id !== "" && params.id !== undefined) {
            axios.get(`/sub-cat/update-subCat/${params.id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    setUpSubCat(finalRes.updateData)
                    setImagePreview(`/upload/subCat_img/${finalRes.updateData.subCatImg}`);
                    // console.log(finalRes)
                })
        }
    }, [params.id])

    let catbox = () => {
        axios.get("/category/view-category")
            .then((res) => res.data)
            .then((finalRes) => {
                setCatData(finalRes.dataView);
                // console.log(finalRes)
            })
    }

    useEffect(() => {
        catbox();
    }, [])

    let addSubCategory = (e) => {
        let AllSubData = new FormData(e.target);
        axios.post(`/sub-cat/add-subCat/?id=${params.id ?? ""}`, AllSubData)
            .then((res) => res.data)
            .then((finalRes) => {
                e.target.reset();
                setImagePreview(prevPlaceholder);
                setImageFile(null);
                NotificationManager.success('Successfully', params.id ? 'SubCategory Updated' : 'SubCategory inserted');
                setTimeout(() => {
                    navigator('/view-subcategory')
                }, 2000)
            })
            .catch((error) => {
                console.error("Add/Update Error:", error);
            })
        e.preventDefault();
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
                            <form className='p-3 mt-5' onSubmit={addSubCategory}>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Category
                                    </label>
                                    <select name='catId' value={upSubCat.catId} onChange={(e) => {
                                        const value = e.target.value;
                                        setUpSubCat((prevState) => ({
                                            ...prevState,
                                            catId: value, // Update catId with the selected value
                                        }));
                                    }} id="" className='w-100 p-2 rounded-2'>
                                        <option value="">--Select--</option>
                                        {
                                            catData.length >= 1
                                                ?
                                                catData.map((v, i) => {
                                                    return (
                                                        <option key={v._id} value={v._id}>{v.catName}</option>
                                                    )
                                                })
                                                :
                                                <option value="">none</option>
                                        }
                                    </select>
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Sub Category
                                    </label>
                                    <input type="text" className='w-100 p-2 rounded-2' name='subCatName' value={upSubCat.subCatName} onChange={(e) => {
                                        let obj = { ...upSubCat };
                                        obj['subCatName'] = e.target.value;
                                        setUpSubCat(obj)
                                    }} />
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Sub Category Description
                                    </label>
                                    <textarea name='subCatDesc' onChange={(e) => {
                                        let obj = { ...upSubCat };
                                        obj['subCatDesc'] = e.target.value;
                                        setUpSubCat(obj)
                                    }} value={upSubCat.subCatDesc} className='w-100 p-2 rounded-2' id="" cols="30" rows="10"></textarea>
                                </div>
                                <div className='mb-4 d-flex justify-content-between'>
                                    <input type="file" id='file-input' onChange={handleImageChange} className='d-none' name='subCatImg' />
                                    <div>
                                        <label className='mb-2 fw-medium d-block' style={{ fontSize: '18px' }}>
                                            Sub Category Image
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
                                        Sub Category Status
                                    </label>
                                    <div className='d-flex align-items-center'>
                                        <div className='d-flex align-items-center me-5'>
                                            <label htmlFor="" className='me-2'>
                                                Active
                                            </label>
                                            <input type="radio" name='subCatStatus' checked={upSubCat.subCatStatus === 1 ? true : false} onChange={(e) => {
                                                let obj = { ...upSubCat }
                                                obj['subCatStatus'] = e.target.value
                                                setUpSubCat(obj)
                                            }} value={1} style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label htmlFor="" className='me-2'>
                                                De-active
                                            </label>
                                            <input type="radio" checked={upSubCat.subCatStatus === 0 ? true : false} onChange={(e) => {
                                                let obj = { ...upSubCat }
                                                obj['subCatStatus'] = e.target.value
                                                setUpSubCat(obj)
                                            }} name='subCatStatus' value={0} style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
                                        </div>
                                    </div>
                                </div>
                                <input type="submit" value={params.id ? 'Update' : 'Submit'} className='p-2 px-3 my-3 rounded-2 text-white fw-bold border-0' style={{ backgroundColor: "var(--maroon)" }} />
                            </form>
                        </div>
                    </Col>
                </Row >
                <NotificationContainer />
            </Container >
        </>
    )
}
