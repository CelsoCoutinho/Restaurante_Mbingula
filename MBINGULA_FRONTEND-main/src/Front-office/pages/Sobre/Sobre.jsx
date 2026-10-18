import React from 'react';
import Menu from '../../components/Menu';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const Sobre = () => {
    return (
        <div className="container mt-5" style={{ backgroundColor: 'white', color: 'white', width: '100%' }}>
            <div className="row">
                <div className="col-12">
                    <Menu />
                </div>
            </div>

            <div className="row mt-5 pt-5">
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm bg-dark text-white">
                        <div className="card-body">
                            <h4 className="card-title" style={{ color: '#e8c34b' }}>Bem-vindo ao Nosso Restaurante</h4>
                            <p className="card-text">
                                O nosso restaurante oferece uma experiência única, combinando pratos tradicionais com toques modernos. 
                                Cada refeição é preparada com ingredientes frescos e de alta qualidade, garantindo sabores excepcionais.
                            </p>
                            <p className="card-text">
                                Estamos comprometidos com o atendimento ao cliente e a criação de um ambiente acolhedor e amigável para todos os nossos visitantes.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm bg-dark text-white">
                        <div className="card-body">
                            <h4 className="card-title" style={{ color: '#e8c34b' }}>Missão</h4>
                            <p className="card-text">
                                Nossa missão é proporcionar experiências inesquecíveis através da gastronomia, criando memórias que os nossos clientes levarão para a vida.
                            </p>
                            <h4 className="card-title" style={{ color: '#e8c34b' }}>Visão</h4>
                            <p className="card-text">
                                Ser reconhecido como um dos melhores restaurantes da região, inovando e correspondendo as expectativas dos nossos clientes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sobre;
