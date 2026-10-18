import React from 'react'
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import ondas from '../assets/wave.svg'

const socialNetworks = [
    { name: "whatsapp", icon: <FaWhatsapp /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> }
]

const Footer = () => {
    return (
        <>
            
                <img className='onda' src={ondas} alt="home" viewBox="0 0 1440 318" stroke="none" />
            <div className='container-footer'>
                <div id="footer_items">
                    <div className='contactos'>
                        <h4>Contactos</h4>
                        <div className='links'>
                            <a href=''>Rua do MAT, a 400m da AngoMart</a>
                            <a href=''>Tel: 942555666</a>
                            <a href=''>restaurantembingula@gmail.com</a>
                        </div>
                    </div>

                    <div className="detalhes">
                        <h4>Redes sociais</h4>
                        <p>Visite as nossas redes sociais e conheça o restaurante Mbingula.</p>
                        <div className="social-media-buttons">
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
                    <div className='horario'>
                        <h4>Horário</h4>
                        <p>Aberto todos dias:</p>
                        <p><span>8:00</span> até <span>22:00</span></p>
                    </div>
                </div>
                <div className='copy'>
                    <p>©2024 Todos os direitos reservados a CLAV</p>
                </div>
            </div>
        </>
    )
}

export default Footer
