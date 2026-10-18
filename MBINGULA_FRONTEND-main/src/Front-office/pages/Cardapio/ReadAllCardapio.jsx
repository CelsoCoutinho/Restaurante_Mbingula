import React, { useState, useEffect } from 'react';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';
import './ReadAllCardapio.css';

const Cardapio = () => {
    const [itensCardapio, setItensCardapio] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/getItemsCardapio');
                const data = await response.json();
                setItensCardapio(data);
            } catch (error) {
                console.error("Erro ao buscar os itens do cardápio:", error);
            }
        };

        fetchData();
    }, []);

    const handleFilterClick = () => {
        navigate('/Front-office/pages/FilterCardapioItems');
    };

    const handleButtonClick = () => {
        navigate('/Front-office/carrinho');
    };

    return (
        <div>
            <Menu />
            <section id="cardapio-comida">
                <h2 className="cardapio-title">Cardápio</h2>
                <h3 className="cardapio-subtitle">Visualize o que temos:</h3>

                <button 
                    className="btn-filtrar-pesquisa" 
                    onClick={handleFilterClick}
                >
                    Filtrar pesquisa
                </button>

                <div id="container-cardapio-comida">
                    {itensCardapio.map(item => (
                        <div key={item.id} className="card-cardapio-comida">
                            <div className='img-box-cardapio-comida'>
                                <img 
                                    src={`http://localhost:3000/images/${item.Image[0]?.path}`} 
                                    alt={item.name}
                                    style={{ width: '100%', height: '10em', objectFit: 'cover' }}
                                />
                            </div>
                            <h3 className="dish-title-cardapio-comida">
                                {item.name}
                            </h3>
                            <span className="dish-description-cardapio-comida">
                                Disponível: {item.disponivel}
                            </span>

                            <div className="dish-price-cardapio-comida">
                                <h4>{item.price} kz</h4>
                                <button className="btn-default-cardapio-comida">
                                    <i className="fa-solid bi bi-bookmark-plus"
                                       onClick={handleButtonClick}
                                    ></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Cardapio;