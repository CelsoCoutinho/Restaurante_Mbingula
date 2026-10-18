import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Read.css';

function Read() {
    const [data, setData] = useState({});
    const [produto, setProduto] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/getEstoque/${id}`)
            .then(res => {
                setData(res.data);
                if (res.data.Produto && res.data.Produto.nome) {
                    axios.get(`http://localhost:3000/getAllProduto`)
                        .then(produtoRes => {
                            const produtoData = produtoRes.data.find(produto => produto.nome === res.data.Produto.nome);
                            setProduto(produtoData);
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className='read-container'>
            <div className="read-content">
                <h3 className="read-title">Dados do Estoque</h3>
                <div className="read-field">
                    <strong className="orange-text">ID: </strong> {data.id}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Quantidade: </strong> {data.quantidade}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Unidade: </strong> {data.unidade}
                </div>
                <div className="read-field">
                    <strong className="orange-text">ID do Produto: </strong> {produto ? produto.id : 'Loading...'}
                </div>
                <div className="read-field">
                    <strong className="orange-text">Nome do Produto: </strong> {produto ? produto.nome : 'Loading...'}
                </div>
                <div className="read-button-container">
                    <Link to="/Back-office/pages/estoque" className='read-button'>Voltar</Link>
                </div>
            </div>
        </div>
    );
}

export default Read;
