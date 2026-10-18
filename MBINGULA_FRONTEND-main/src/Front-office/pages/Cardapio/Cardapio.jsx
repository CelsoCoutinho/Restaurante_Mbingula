import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';

const Cardapio = () => {
    const [itensCardapio, setItensCardapio] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/getItemsCardapio');
                const data = await response.json();
                ensureFourItems(data);
            } catch (error) {
                console.error("Erro ao buscar os itens do cardápio:", error);
            }
        };

        fetchData();
    }, []);

    const ensureFourItems = (data) => {
        const totalItems = data.length;
        if (totalItems < 4) {
            const repeatedItems = [...data];
            while (repeatedItems.length < 4) {
                repeatedItems.push(data[repeatedItems.length % totalItems]);
            }
            setItensCardapio(repeatedItems);
        } else {
            setItensCardapio(data.slice(0, 4));
        }
    };

    return (
        <div>
            <Menu />
            <section id="cardapio-comida">
                <h2 className="cardapio-title">Cardápio</h2>
                <h3 className="cardapio-subtitle">Vizualize o nosso cardápio</h3>

                <div id="container-cardapio-comida">
                    {itensCardapio.map(item => (
                        <div key={item.id} className="card-cardapio-comida">
                            <div className='img-box-cardapio-comida'>
                                <img 
                                    src={`http://localhost:3000/images/${item.Image[0]?.path}`} 
                                    alt={item.name}
                                    // style={{ width: '100%', height: '200px', objectFit: 'cover' }}
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
                                <Link to="/Front-office/pages/CardapioItems" className="btn-default-cardapio-comida">
                                    ver mais
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Cardapio;
