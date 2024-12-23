import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faB, faDroplet, faLayerGroup, faList, faN, faSliders, faUser } from '@fortawesome/free-solid-svg-icons'
import { faProductHunt } from '@fortawesome/free-brands-svg-icons'
import { adminContext } from '../../context.jsx/AdminContext'

export default function Dashboard() {
    let { changeMenu, setChangeMenu } = useContext(adminContext)
    return (
        <>
            <Container fluid className='px-0'>
                <div className='shadow dashboard' style={{ height: '100vh' }}>
                    <div className="accordion accordion-flush" id="accordionExample" >
                        <div className="accordion-item text-uppercase">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    {
                                        changeMenu
                                            ?
                                            <FontAwesomeIcon icon={faLayerGroup} className='fs-5 me-3' />
                                            :
                                            <>
                                                <FontAwesomeIcon icon={faLayerGroup} className='fs-5 me-3' />
                                                CATEGORY
                                            </>
                                    }
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body overflow-auto">
                                    <ul className='dash-ui'>
                                        <Link to="/add-category" >
                                            <li >ADD CATEGORY</li>
                                        </Link>
                                        <Link to="/view-category">
                                            <li> VIEW CATEGORY</li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item text-uppercase">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                    {
                                        changeMenu
                                            ?
                                            <FontAwesomeIcon icon={faList} className='fs-5 me-3' />
                                            :
                                            <>
                                                <FontAwesomeIcon icon={faList} className='fs-5 me-3' />
                                                SUB CATEGORY
                                            </>
                                    }
                                </button>
                            </h2>
                            <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body overflow-auto">
                                    <ul className='dash-ui'>
                                        <Link to="/add-subcategory">
                                            <li>ADD Sub CATEGORY</li>
                                        </Link>
                                        <Link to="/view-subcategory">
                                            <li> VIEW Sub CATEGORY</li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item text-uppercase">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed text-uppercase d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    {
                                        changeMenu
                                            ?
                                            <FontAwesomeIcon icon={faProductHunt} className='fs-5 me-3' />
                                            :
                                            <>
                                                <FontAwesomeIcon icon={faProductHunt} className='fs-5 me-3' />
                                                PRODUCT
                                            </>
                                    }
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body overflow-auto">
                                    <ul className='dash-ui'>
                                        <Link to="/add-product">
                                            <li> ADD PRODUCT</li>
                                        </Link>
                                        <Link to="/view-product">
                                            <li>VIEW PRODUCT</li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item text-uppercase">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    {
                                        changeMenu
                                            ?
                                            <FontAwesomeIcon icon={faSliders} className='fs-5 me-3' />
                                            :
                                            <>
                                                <FontAwesomeIcon icon={faSliders} className='fs-5 me-3' />
                                                BANNER
                                            </>
                                    }
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body overflow-auto">
                                    <ul className='dash-ui'>
                                        <Link to="/add-banner">
                                            <li>ADD BANNER</li>
                                        </Link>
                                        <Link to="/view-banner">
                                            <li> VIEW BANNER</li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item text-uppercase">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    {
                                        changeMenu
                                            ?
                                            <FontAwesomeIcon icon={faUser} className='fs-5 me-3' />
                                            :
                                            <>
                                                <FontAwesomeIcon icon={faUser} className='fs-5 me-3' />
                                                USERS
                                            </>
                                    }
                                </button>
                            </h2>
                            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body overflow-auto">
                                    <ul className='dash-ui'>
                                        <Link to="/view-user">
                                            <li> VIEW User</li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item text-uppercase">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                    {
                                        changeMenu
                                            ?
                                            <FontAwesomeIcon icon={faN} className='fs-5 me-3' />
                                            :
                                            <>
                                                <FontAwesomeIcon icon={faN} className='fs-5 me-3' />
                                                NEWLY LAUNCHED
                                            </>
                                    }
                                </button>
                            </h2>
                            <div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body overflow-auto">
                                    <ul className='dash-ui'>
                                        <Link to="/add-newlaunch">
                                            <li>ADD Newly Launched</li>
                                        </Link>
                                        <Link to="/view-newlaunch">
                                            <li> VIEW Newly Launched</li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item text-uppercase">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                    {
                                        changeMenu
                                            ?
                                            <FontAwesomeIcon icon={faB} className='fs-5 me-3' />
                                            :
                                            <>
                                                <FontAwesomeIcon icon={faB} className='fs-5 me-3' />
                                                BEST SELLER
                                            </>
                                    }
                                </button>
                            </h2>
                            <div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body overflow-auto">
                                    <ul className='dash-ui'>
                                        <Link to="/add-bestsell">
                                            <li>ADD BEST SELLER</li>
                                        </Link>
                                        <Link to="/view-bestsell">
                                            <li> VIEW BEST SELLER</li>
                                        </Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
