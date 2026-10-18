import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Read.css';

function Read() {
    const [data, setData] = useState({});
    const [fornecedor, setFornecedor] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/getProduto/${id}`)
            .then(res => {
                setData(res.data);
                if (res.data.Fornecedor && res.data.Fornecedor.nome) {
                    axios.get(`http://localhost:3000/getAllFornecedor`)
                        .then(fornecedorRes => {
                            const fornecedorData = fornecedorRes.data.find(fornecedor => fornecedor.nome === res.data.Fornecedor.nome);
                            setFornecedor(fornecedorData);
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className='read-container'>
            <div className="read-content">
                <h3 className="read-title">Dados do produto</h3>
                <div className="read-field">
                    <strong className="orange-text">ID: </strong> {data.id}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Nome: </strong> {data.nome}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Descrição: </strong> {data.descricao}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Fornecedor: </strong> {fornecedor ? fornecedor.nome : 'Loading...'}
                </div>
                <div className="read-button-container">
                    <Link to="/Back-office/pages/produto" className='read-button'>Voltar</Link>
                </div>
            </div>
        </div>
    );
}

export default Read;
