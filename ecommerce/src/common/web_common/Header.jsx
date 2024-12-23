import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import banner from "../../images/Metal Statues.png"
import NavBar from './NavBar'
import Slider from 'react-slick';
import axios from 'axios';

export default function Header() {
    let [ban, setban] = useState([]);
    let [baUrl, setBaUrl] = useState('')

    let viewBan = () => {
        axios.get("http://localhost:8000/banner/view-banner")
            .then((res) => res.data)
            .then((finalRes) => {
                setban(finalRes.bannerData)
                setBaUrl(finalRes.banImgUrl)
                console.log(finalRes)
            })
    }

    useEffect(() => {
        viewBan()
    }, [])

    var bannerSlider = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
    };

    return (
        <>
            <Container fluid className='p-0'>
                <Slider {...bannerSlider}>
                    {
                        ban.length >= 1
                            ?
                            ban.map((v, i) => {
                                return (
                                    <div>
                                        <img src={baUrl+v.banImg} width="100%" />
                                    </div>
                                )
                            })
                            :
                            <div>Loading...</div>
                    }
                    {/* <div>
                        <img src={banner} width="100%" />
                    </div><div>
                        <img src={banner} width="100%" />
                    </div> */}
                </Slider>
            </Container>
            <NavBar />
        </>
    )
}
