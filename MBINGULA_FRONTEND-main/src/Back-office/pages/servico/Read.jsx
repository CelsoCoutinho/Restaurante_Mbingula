import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Read.css';

function Read() {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/getServicoById/${id}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className='read-container'>
            <div className="read-content">
                <h3 className="read-title">Dados do Serviço</h3>
                <div className="read-field">
                    <strong className="orange-text">ID: </strong> {data.id}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Tipo: </strong> {data.tipo}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Descrição: </strong> {data.descricao}
                </div>
                <div className="read-button-container">
                    <Link to="/Back-office/pages/servico" className='read-button'>Voltar</Link>
                </div>
            </div>
        </div>
    );
}

export default Read;
