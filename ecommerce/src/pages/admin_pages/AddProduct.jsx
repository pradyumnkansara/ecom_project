import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../../common/admin_common/AdminHeader'
import { Col, Container, Row } from 'react-bootstrap'
import Dashboard from '../../common/admin_common/Dashboard'
import prevPlaceholder from '../../images/generic-image-file-icon-hi.png'
import { adminContext } from '../../context.jsx/AdminContext'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { useNavigate, useParams } from 'react-router-dom'


export default function AddProduct() {
    let { changeMenu } = useContext(adminContext);
    let [subCatData, setSubCatData] = useState([])
    let [categories, setCategories] = useState([]);
    let [filteredSubCats, setFilteredSubCats] = useState([]);
    let [selectedCategory, setSelectedCategory] = useState('');

    // image preview
    const [imagePreview, setImagePreview] = useState(prevPlaceholder);
    const [imageFile, setImageFile] = useState(null);
    const [imagePath, setImagePath] = useState('');

    const [updateProd, setUpdateProd] = useState({
        subCatId: "",
        catId: "",
        prodName: "",
        prodDesc: "",
        prodImg: "",
        prodSize: "",
        prodPrice: "",
        prodStatus: 1
    });

    let params = useParams();
    let navigator = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8000/sub-cat/view-subCat")
            .then((res) => res.data)
            .then((finalRes) => {
                setSubCatData(finalRes.viewSub);
            })

        axios.get("http://localhost:8000/category/view-category")
            .then((res) => res.data)
            .then((finalRes) => {
                setCategories(finalRes.dataView);
            })
    }, [])

    // Update filtered subcategories when category changes
    useEffect(() => {
        if (selectedCategory) {
            // console.log(typeof selectedCategory,"oooooooooooooooooooooooooooooo")
            const filtered = subCatData.filter(
                (subcat) => subcat.catId[0]._id === selectedCategory
            );
            setFilteredSubCats(filtered);
        } else {
            setFilteredSubCats([]);
        }
    }, [selectedCategory, subCatData]);


    let handlecategory = (e) => {
        let selected = e.target.value;
        setSelectedCategory(selected)
        // console.log(selected)
        // setUpdateProd((prevState) => ({
        //     ...prevState,
        //     catId: selected, // Update catId in the state
        //     subCatId: "", // Reset subCatId when category changes
        // }));
        // let filtered = subCatData.filter((subcat) => subcat.catId[0]._id === selected)
        // setFilteredSubCats(filtered)
        let obj = { ...updateProd }
        obj['catId'] = selected;
        setUpdateProd(obj)
    }

    const handleImageChange = (ev) => {
        const file = ev.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Generate a temporary URL for preview
            setImageFile(file); // Store the selected file
            setImagePath(file.name);
        }
    };

    let addProducts = (e) => {
        let AllProductData = new FormData(e.target)
        axios.post(`http://localhost:8000/product/add-product/?id=${params.id ?? ""}`, AllProductData)
            .then((res) => res.data)
            .then((finalres) => {
                e.target.reset();
                setImagePreview(prevPlaceholder);
                setImageFile(null);
                NotificationManager.success('Successfully', params.id ? 'Product Updated' : 'Product inserted');
                setTimeout(() => {
                    navigator('/view-product')
                }, 2000)
                console.log(finalres);
            })
            .catch((error) => {
                console.error("Add/Update Error:", error);
            })

        e.preventDefault();
    }
    // console.log(params)
    useEffect(() => {
        setUpdateProd({
            subCatId: "",
            catId: "",
            prodName: "",
            prodDesc: "",
            prodImg: "",
            prodSize: "",
            prodPrice: "",
            prodStatus: 1
        })
        if (params.id !== "" && params.id !== undefined) {
            axios.get(`http://localhost:8000/product/update-product/${params.id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    setUpdateProd(finalRes.updateData)
                    setImagePreview(`http://localhost:8000/upload/prod_img/${finalRes.updateData.prodImg}`);

                    // Set category and filter subcategories for update
                    setSelectedCategory(finalRes.updateData.catId?.[0]);
                })
                .catch(err => console.error("Error fetching product details:", err));
        }
    }, [params.id])

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
                            <form className='p-3 mt-5' onSubmit={addProducts}>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Product Category
                                    </label>
                                    <select name="catId" className='w-100 p-2 rounded-2' onChange={handlecategory} value={selectedCategory || ""}>
                                        <option>--Select--</option>
                                        {
                                            categories.length >= 1
                                                ?
                                                categories.map((v, i) => {
                                                    return (
                                                        <option key={v._id} value={v._id}>{v.catName}</option>
                                                    )
                                                })
                                                :
                                                <option>none</option>
                                        }
                                    </select>
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Product Sub Category
                                    </label>
                                    <select name='subCatId' onChange={(e) => {
                                        let obj = { ...updateProd };
                                        obj['subCatId'] = e.target.value;
                                        setUpdateProd(obj);
                                    }} value={updateProd.subCatId || ""}
                                        className='w-100 p-2 rounded-2'>
                                        <option value="">--Select--</option>
                                        {
                                            filteredSubCats.length > 0
                                                ?
                                                filteredSubCats.map((v, i) => {
                                                    return (
                                                        <option key={v._id} value={v._id}>{v.subCatName}</option>
                                                    )
                                                })
                                                :
                                                <option value="">None</option>
                                        }
                                    </select>
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Product Name
                                    </label>
                                    <input type="text" className='w-100 p-2 rounded-2' name='prodName' onChange={(e) => {
                                        let obj = { ...updateProd }
                                        obj['prodName'] = e.target.value
                                        setUpdateProd(obj)
                                    }} value={updateProd.prodName} />
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Product Size
                                    </label>
                                    <input type="text" className='w-100 p-2 rounded-2' name='prodSize' onChange={(e) => {
                                        let obj = { ...updateProd }
                                        obj['prodSize'] = e.target.value
                                        setUpdateProd(obj)
                                    }} value={updateProd.prodSize} />
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Product Description
                                    </label>
                                    <textarea name='prodDesc' onChange={(e) => {
                                        let obj = { ...updateProd }
                                        obj['prodDesc'] = e.target.value
                                        setUpdateProd(obj)
                                    }} value={updateProd.prodDesc} className='w-100 p-2 rounded-2' id="" cols="30" rows="10"></textarea>
                                </div>
                                <div className='mb-4'>
                                    <label className='mb-2 fw-medium' style={{ fontSize: '18px' }}>
                                        Product Price
                                    </label>
                                    <input type="text" onChange={(e) => {
                                        let obj = { ...updateProd }
                                        obj['prodPrice'] = e.target.value
                                        setUpdateProd(obj)
                                    }} value={updateProd.prodPrice} className='w-100 p-2 rounded-2' name='prodPrice' />
                                </div>
                                <div className='mb-4 d-flex justify-content-between'>
                                    <input type="file" name='prodImg' id='file-input' onChange={handleImageChange} className='d-none' />
                                    <div>
                                        <label className='mb-2 fw-medium d-block' style={{ fontSize: '18px' }}>
                                            Product Image
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
                                        Product Status
                                    </label>
                                    <div className='d-flex align-items-center'>
                                        <div className='d-flex align-items-center me-5'>
                                            <label htmlFor="" className='me-2'>
                                                Active
                                            </label>
                                            <input type="radio" checked={updateProd.prodStatus == 1 ? true : false} onChange={(e) => {
                                                let obj = { ...updateProd }
                                                obj['prodStatus'] = e.target.value
                                                setUpdateProd(obj)
                                            }} name='prodStatus' value={1} style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <label htmlFor="" className='me-2'>
                                                De-active
                                            </label>
                                            <input type="radio" value={0} checked={updateProd.subCatStatus == 0 ? true : false} onChange={(e) => {
                                                let obj = { ...updateProd }
                                                obj['prodStatus'] = e.target.value
                                                setUpdateProd(obj)
                                            }} name='prodStatus' style={{ width: '20px', height: '20px', accentColor: "var(--maroon)" }} />
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
