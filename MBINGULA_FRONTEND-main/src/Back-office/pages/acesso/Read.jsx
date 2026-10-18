import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Read.css';

function ReadAccess() {
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/accessById/${id}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className='read-container'>
            <div className="read-content">
                <h3 className="read-title">Dados do Acesso</h3>
                <div className="read-field">
                    <strong className="orange-text">ID: </strong> {data.id}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Nome: </strong> {data.name}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Criado em: </strong> {new Date(data.created_at).toLocaleString()}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Atualizado em: </strong> {new Date(data.updated_at).toLocaleString()}
                </div>
                <div className="read-button-container">
                    <Link to="/Back-office/pages/acesso" className='read-button'>Voltar</Link>
                </div>
            </div>
        </div>
    );
}

export default ReadAccess;
