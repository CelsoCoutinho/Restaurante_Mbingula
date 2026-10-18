import React from 'react'
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import home3 from '../../assets/hero-bg2.jpg';
import home1 from '../../assets/hero-bg3.jpg';
import home2 from '../../assets/hero-bg4.jpg';

import Cardapio from '../Cardapio/Cardapio.jsx';
import AtividadeHome from '../MostrarAtividadeHome/AtividadeHome.jsx';
import Footer from '../../components/Footer.jsx';
import Menu from '../../components/Menu.jsx'
import { NavLink } from "react-router-dom";

const socialNetworks = [
    { name: "whatsapp", icon: <FaWhatsapp /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> }
]

const Home = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000
    };

    return (
        <>
            <Menu />
            <div className='home'>
                
                    <Slider className='home-img' {...settings}>
                        <div className='home'>
                            <img src={home1} alt="home" />
                        </div>
                        <div className='home'>
                            <img src={home2} alt="home" />
                        </div>
                        <div className='home'>
                            <img src={home3} alt="home" />
                        </div>
                    </Slider>
              
                <div className='home-content'>
                    <h1>O sabor que vai até você</h1>
                    <p>O restaurante mais proximo dos seus desejos, venha e prove !</p>


                    <NavLink to="/Front-office/carrinho" className="peca-aqui"><span>Peça aqui!</span>
                    </NavLink>

                    <div className="social-media-btn">
                        { }
                        {socialNetworks.map((network) => (
                            <a href="#"
                                className='social-btn'
                                id={network.name}
                                key={network.name}>
                                {network.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <Cardapio />
            <AtividadeHome />
            <Cardapio />
            <Footer />
        </>
    )
}

export default Home
