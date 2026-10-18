import React, { useEffect, useState } from 'react';
import imagem from '../../assets/hero-bg.jpeg'
import Menu from '../../components/Menu';
import './AtividadeHome.css';

const Sobre = () => {
    const [atividade, setAtividade] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const response = await fetch('http://localhost:3000/getAllAtividades');
                const data = await response.json();

                if (data.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    setAtividade(data[randomIndex]);
                } else {
                    setError('De momento, não temos atividades marcadas.');
                }
            } catch (err) {
                setError('Ocorreu um erro ao buscar as atividades.');
            } finally {
                setLoading(false);
            }
        };

        fetchAtividades();
    }, []);

    return (
        <div>
            <Menu />
            <div className="container-about">
                <div className="row-about">
                    <div className="detail-box-about">
                        {loading && <p>Carregando atividades...</p>}
                        {error && <p>{error}</p>}
                        {atividade && (
                            <div className="atividade-info">
                                <h3>Atividade:</h3>
                                <p><div className='Title-description'>Tema:</div> {atividade.tema}</p>
                                <p><div className='Title-description'>Data:</div> {atividade.data}</p>
                                <p><div className='Title-description'>Hora:</div> {atividade.hora}</p>
                                <p><div className='Title-description'>Descrição:</div> {atividade.descricao}</p>
                            </div>
                        )}
                    </div>
                    <div className="img-box-about">
                        <img src={imagem} alt="home" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sobre;
