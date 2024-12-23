import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import logo from '../../images/2.svg'
import { adminContext } from '../../context.jsx/AdminContext'

export default function AdminHeader() {
    let { changeMenu, setchangeMenu } = useContext(adminContext)
    return (
        <>
            <nav class="navbar shadow " data-bs-theme="white">
                <div class="container-fluid align-items-center">
                    <div className='d-flex align-items-center'>
                        <a class="navbar-brand">
                            <Link to={'/admin-page'}>
                                <img src={logo} width={130} />
                            </Link>
                        </a>
                        <FontAwesomeIcon icon={faBars} className='fs-4 ms-3 d-lg-block d-none' onClick={() =>
                            setchangeMenu(!changeMenu)} />
                    </div>
                    <form class="d-flex" role="search">
                        <Link to={'/admin-login'}>
                            <button class="p-1 p-lg-2 rounded text-white border-0" style={{ backgroundColor: "var(--maroon)" }} type="submit">Log out </button>
                        </Link>
                        <button class="p-1 p-lg-2 rounded ms-2 text-white border-0" style={{ backgroundColor: "var(--maroon)" }} type="submit">MY PROFILE</button>
                    </form>
                </div>
            </nav>
        </>
    )
}
